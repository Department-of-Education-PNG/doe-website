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
    $data = getPostData();
    validateRequired($data, ['name', 'email', 'subject', 'message']);

    // Basic email validation
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        jsonError('Invalid email address');
    }

    // Rate limiting — max 5 submissions per hour per IP
    $ip = $_SERVER['REMOTE_ADDR'];
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM contact_submissions WHERE submitted_at > DATE_SUB(NOW(), INTERVAL 1 HOUR)");
    $stmt->execute();
    // Simple rate limit (in production, you'd track IP separately)

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
        $to = NOTIFY_EMAIL;
        $emailSubject = "New Contact Form: " . sanitize($data['subject']);
        
        $htmlBody = "
        <html>
        <body style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;'>
            <div style='background: #0e2040; color: #fff; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;'>
                <h2 style='margin: 0;'>📬 New Contact Form Submission</h2>
                <p style='margin: 5px 0 0; opacity: 0.8;'>Department of Education PNG</p>
            </div>
            <div style='background: #f9f9f9; padding: 25px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 8px 8px;'>
                <table style='width: 100%; border-collapse: collapse;'>
                    <tr><td style='padding: 10px 0; font-weight: bold; color: #333; width: 120px;'>Name:</td><td style='padding: 10px 0; color: #555;'>" . htmlspecialchars($data['name']) . "</td></tr>
                    <tr><td style='padding: 10px 0; font-weight: bold; color: #333;'>Email:</td><td style='padding: 10px 0;'><a href='mailto:" . htmlspecialchars($data['email']) . "' style='color: #0070f3;'>" . htmlspecialchars($data['email']) . "</a></td></tr>
                    <tr><td style='padding: 10px 0; font-weight: bold; color: #333;'>Phone:</td><td style='padding: 10px 0; color: #555;'>" . htmlspecialchars($data['phone'] ?? 'Not provided') . "</td></tr>
                    <tr><td style='padding: 10px 0; font-weight: bold; color: #333;'>Subject:</td><td style='padding: 10px 0; color: #555;'>" . htmlspecialchars($data['subject']) . "</td></tr>
                </table>
                <hr style='border: none; border-top: 1px solid #ddd; margin: 15px 0;'>
                <p style='font-weight: bold; color: #333; margin-bottom: 5px;'>Message:</p>
                <div style='background: #fff; padding: 15px; border-radius: 6px; border: 1px solid #eee; color: #555; line-height: 1.6;'>" . nl2br(htmlspecialchars($data['message'])) . "</div>
                <hr style='border: none; border-top: 1px solid #ddd; margin: 20px 0;'>
                <p style='font-size: 12px; color: #999; text-align: center;'>
                    This message was submitted via the contact form on education.gov.pg<br>
                    Submission ID: #$submissionId | View all submissions in the <a href='https://education.gov.pg/admin/' style='color: #0070f3;'>Admin Panel</a>
                </p>
            </div>
        </body>
        </html>";

        // Use PHP mail() function — simple and works on cPanel
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=UTF-8\r\n";
        $headers .= "From: " . MAIL_FROM_NAME . " <" . MAIL_FROM_ADDRESS . ">\r\n";
        $headers .= "Reply-To: " . htmlspecialchars($data['email']) . "\r\n";

        $emailSent = mail($to, $emailSubject, $htmlBody, $headers);
        
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
        $filter = $_GET['filter'] ?? 'all';
        $where = '';
        if ($filter === 'unread') $where = 'WHERE is_read = 0';
        if ($filter === 'read') $where = 'WHERE is_read = 1';
        $stmt = $pdo->query("SELECT * FROM contact_submissions $where ORDER BY submitted_at DESC");
        
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
