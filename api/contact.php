<?php
/**
 * Contact Form API — Save to DB + Send Email
 */
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/config/mail.php';
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/middleware/auth.php';

jsonHeaders();
$pdo = Database::getInstance()->getConnection();
$action = $_GET['action'] ?? '';

// Public: Submit contact form
if ($_SERVER['REQUEST_METHOD'] === 'POST' && empty($action)) {
    // Rate limit: 3 submissions per hour per IP
    checkRateLimit('contact', 10, 60);

    $data = getPostData();
    validateRequired($data, ['name', 'email', 'subject', 'message']);

    // Basic email validation
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        jsonError('Invalid email address');
    }

    // Save to database
    $stmt = $pdo->prepare("INSERT INTO contact_submissions (name, email, phone, subject, message) VALUES (?,?,?,?,?)");
    $stmt->execute([
        sanitize($data['name']),
        sanitize($data['email']),
        sanitize($data['phone'] ?? ''),
        sanitize($data['subject']),
        sanitize($data['message'])
    ]);
    $submissionId = $pdo->lastInsertId();

    // Send email notification
    $emailSent = false;
    try {
        require_once __DIR__ . '/config/mailer.php';
        
        $to = NOTIFY_EMAIL;
        $emailSubject = "Contact Form: " . sanitize($data['subject']);
        
        $htmlBody = "
        <div style='font-family: Arial, sans-serif; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; max-width: 600px; background: #ffffff;'>
            <div style='background: #0e2040; color: #ffffff; padding: 25px; text-align: center;'>
                <h2 style='margin: 0; font-size: 22px; font-weight: bold;'>Inquiry Received</h2>
                <p style='margin: 5px 0 0; opacity: 0.8; font-size: 14px;'>Website Communication Portal</p>
            </div>
            <div style='padding: 25px; color: #333;'>
                <p style='margin: 0 0 10px;'><strong>Name:</strong> " . htmlspecialchars($data['name']) . "</p>
                <p style='margin: 0 0 10px;'><strong>Email:</strong> " . htmlspecialchars($data['email']) . "</p>
                <p style='margin: 0 0 10px;'><strong>Phone:</strong> " . htmlspecialchars($data['phone'] ?? 'N/A') . "</p>
                <p style='margin: 0 0 20px;'><strong>Subject:</strong> " . htmlspecialchars($data['subject']) . "</p>
                
                <div style='padding: 15px; background: #f8f9fa; border-left: 4px solid #0e2040; border-radius: 4px;'>
                    <strong style='color: #0e2040;'>Message:</strong><br>
                    <div style='margin-top: 8px; line-height: 1.6;'>" . nl2br(htmlspecialchars($data['message'])) . "</div>
                </div>
                
                <div style='margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee; font-size: 11px; color: #888; text-align: center;'>
                    <p style='margin-bottom: 5px;'>Submission ID: #$submissionId | Submission Date: " . date("d M Y, H:i") . "</p>
                    <p style='margin: 0;'>&copy; 2026 Department of Education, Papua New Guinea. All rights reserved.</p>
                </div>
            </div>
        </div>";

        // Use new Direct SMTP Mailer
        $emailSent = Mailer::send($to, $emailSubject, $htmlBody);
        
        // Update email_sent status
        $pdo->prepare("UPDATE contact_submissions SET email_sent = ? WHERE id = ?")->execute([$emailSent ? 1 : 0, $submissionId]);

    } catch (Exception $e) {
        // Email failed but submission is saved — continue gracefully
        error_log("Contact email failed: " . $e->getMessage());
    }

    jsonResponse([
        'success' => true,
        'message' => 'Thank you! Your message has been received.',
        'email_sent' => $emailSent
    ], 201);
}

// Public: GET not allowed
if ($_SERVER['REQUEST_METHOD'] === 'GET' && empty($action)) {
    jsonError('Method not allowed', 405);
}

// Admin endpoints
requireAuth();

switch ($action) {
    case 'list':
        // SECURITY: strict allowlist — never concatenate raw $_GET into query
        $filter = $_GET['filter'] ?? 'all';
        $allowedFilters = ['all' => '', 'unread' => 'WHERE is_read = 0', 'read' => 'WHERE is_read = 1'];
        $where = $allowedFilters[$filter] ?? ''; // Default to 'all' if invalid value
        $stmt = $pdo->query("SELECT * FROM contact_submissions {$where} ORDER BY submitted_at DESC");
        
        // Count unread
        $unreadCount = $pdo->query("SELECT COUNT(*) FROM contact_submissions WHERE is_read = 0")->fetchColumn();
        
        jsonResponse(['data' => $stmt->fetchAll(), 'unread_count' => (int)$unreadCount]);
        break;

    case 'get':
        $stmt = $pdo->prepare("SELECT * FROM contact_submissions WHERE id = ?");
        $stmt->execute([(int)$_GET['id']]);
        $submission = $stmt->fetch();
        if (!$submission) jsonError('Not found', 404);
        
        // Mark as read
        $pdo->prepare("UPDATE contact_submissions SET is_read = 1 WHERE id = ?")->execute([(int)$_GET['id']]);
        $submission['is_read'] = 1;
        jsonResponse($submission);
        break;

    case 'mark_read':
        $data = getPostData();
        validateRequired($data, ['id']);
        $pdo->prepare("UPDATE contact_submissions SET is_read = 1 WHERE id = ?")->execute([(int)$data['id']]);
        jsonResponse(['success' => true]);
        break;

    case 'delete':
        $data = getPostData();
        validateRequired($data, ['id']);
        $pdo->prepare("DELETE FROM contact_submissions WHERE id = ?")->execute([(int)$data['id']]);
        jsonResponse(['success' => true]);
        break;

    default:
        jsonError('Invalid action');
}
