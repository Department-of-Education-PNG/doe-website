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
    case 'create':
        $data = getPostData();
        validateRequired($data, ['title']);
        $stmt = $pdo->prepare("INSERT INTO job_listings (title, description, location, job_type, closing_date, pdf_path, status) VALUES (?,?,?,?,?,?,?)");
        $stmt->execute([sanitize($data['title']), $data['description'] ?? null, sanitize($data['location'] ?? ''), $data['job_type'] ?? 'teaching', $data['closing_date'] ?? null, $data['pdf_path'] ?? null, $data['status'] ?? 'open']);
        jsonResponse(['success' => true, 'id' => $pdo->lastInsertId()], 201);
        break;
    case 'update':
        $data = getPostData();
        validateRequired($data, ['id', 'title']);
        $stmt = $pdo->prepare("UPDATE job_listings SET title=?, description=?, location=?, job_type=?, closing_date=?, pdf_path=?, status=? WHERE id=?");
        $stmt->execute([sanitize($data['title']), $data['description'] ?? null, sanitize($data['location'] ?? ''), $data['job_type'] ?? 'teaching', $data['closing_date'] ?? null, $data['pdf_path'] ?? null, $data['status'] ?? 'open', (int)$data['id']]);
        jsonResponse(['success' => true]);
        break;
    case 'delete':
        $data = getPostData();
        validateRequired($data, ['id']);
        $pdo->prepare("DELETE FROM job_listings WHERE id = ?")->execute([(int)$data['id']]);
        jsonResponse(['success' => true]);
        break;
    default:
        jsonError('Invalid action');
}
