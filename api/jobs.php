<?php
/**
 * Job Listings API
 */
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/middleware/auth.php';

jsonHeaders();
$pdo = Database::getInstance()->getConnection();
$action = $_GET['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'GET' && empty($action)) {
    $stmt = $pdo->query("SELECT * FROM job_listings WHERE status = 'open' ORDER BY created_at DESC");
    jsonResponse(['data' => $stmt->fetchAll()]);
}

if ($action === 'increment_view' && isset($_GET['id'])) {
    $stmt = $pdo->prepare("UPDATE job_listings SET views = views + 1 WHERE id = ?");
    $stmt->execute([(int)$_GET['id']]);
    jsonResponse(['success' => true]);
}

requireAuth();

switch ($action) {
    case 'list':
        jsonResponse(['data' => $pdo->query("SELECT * FROM job_listings ORDER BY created_at DESC")->fetchAll()]);
        break;
    case 'get':
        $stmt = $pdo->prepare("SELECT * FROM job_listings WHERE id = ?");
        $stmt->execute([(int)$_GET['id']]);
        jsonResponse($stmt->fetch() ?: jsonError('Not found', 404));
        break;
    case 'get_types':
        $stmt = $pdo->query("SELECT DISTINCT job_type FROM job_listings WHERE job_type IS NOT NULL AND job_type != '' ORDER BY job_type ASC");
        jsonResponse(['data' => $stmt->fetchAll(PDO::FETCH_COLUMN)]);
        break;
    case 'create':
        $data = getPostData();
        validateRequired($data, ['title']);
        $stmt = $pdo->prepare("INSERT INTO job_listings (title, section, description, location, job_type, closing_date, pdf_path, status) VALUES (?,?,?,?,?,?,?,?)");
        $stmt->execute([
            sanitize($data['title']), 
            sanitize($data['section'] ?? 'job'),
            sanitizeHtml($data['description'] ?? null), 
            sanitize($data['location'] ?? ''), 
            sanitize($data['job_type'] ?? 'teaching'), 
            sanitize($data['closing_date'] ?? null), 
            sanitize($data['pdf_path'] ?? null), 
            sanitize($data['status'] ?? 'open')
        ]);
        $newId = $pdo->lastInsertId();
        logActivity('CREATE', 'job_listings', $newId, "Created job listing: " . $data['title']);
        jsonResponse(['success' => true, 'id' => $newId], 201);
        break;
    case 'update':
        $data = getPostData();
        validateRequired($data, ['id', 'title']);
        $stmt = $pdo->prepare("UPDATE job_listings SET title=?, section=?, description=?, location=?, job_type=?, closing_date=?, pdf_path=?, status=? WHERE id=?");
        $stmt->execute([
            sanitize($data['title']), 
            sanitize($data['section'] ?? 'job'),
            sanitizeHtml($data['description'] ?? null), 
            sanitize($data['location'] ?? ''), 
            sanitize($data['job_type'] ?? 'teaching'), 
            sanitize($data['closing_date'] ?? null), 
            sanitize($data['pdf_path'] ?? null), 
            sanitize($data['status'] ?? 'open'), 
            (int)$data['id']
        ]);
        logActivity('UPDATE', 'job_listings', $data['id'], "Updated job listing: " . $data['title']);
        jsonResponse(['success' => true]);
        break;
    case 'delete':
        $data = getPostData();
        validateRequired($data, ['id']);
        $pdo->prepare("DELETE FROM job_listings WHERE id = ?")->execute([(int)$data['id']]);
        logActivity('DELETE', 'job_listings', $data['id'], "Deleted job listing ID: " . $data['id']);
        jsonResponse(['success' => true]);
        break;
    default:
        jsonError('Invalid action');
}
