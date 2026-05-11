<?php
/**
 * Scholarships API
 */
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/middleware/auth.php';

jsonHeaders();
$pdo = Database::getInstance()->getConnection();
$action = $_GET['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'GET' && empty($action)) {
    $stmt = $pdo->query("SELECT * FROM scholarships WHERE status = 'open' ORDER BY deadline ASC");
    jsonResponse(['data' => $stmt->fetchAll()]);
}

requireAuth();

switch ($action) {
    case 'list':
        jsonResponse(['data' => $pdo->query("SELECT * FROM scholarships ORDER BY created_at DESC")->fetchAll()]);
        break;
    case 'get':
        $stmt = $pdo->prepare("SELECT * FROM scholarships WHERE id = ?");
        $stmt->execute([(int)$_GET['id']]);
        jsonResponse($stmt->fetch() ?: jsonError('Not found', 404));
        break;
    case 'create':
        $data = getPostData();
        validateRequired($data, ['title']);
        $stmt = $pdo->prepare("INSERT INTO scholarships (title, description, eligibility, deadline, external_link, status) VALUES (?,?,?,?,?,?)");
        $stmt->execute([sanitize($data['title']), $data['description'] ?? null, $data['eligibility'] ?? null, $data['deadline'] ?? null, $data['external_link'] ?? null, $data['status'] ?? 'open']);
        $newId = $pdo->lastInsertId();
        logActivity('CREATE', 'scholarships', $newId, "Created scholarship: " . $data['title']);
        jsonResponse(['success' => true, 'id' => $newId], 201);
        break;
    case 'update':
        $data = getPostData();
        validateRequired($data, ['id', 'title']);
        $stmt = $pdo->prepare("UPDATE scholarships SET title=?, description=?, eligibility=?, deadline=?, external_link=?, status=? WHERE id=?");
        $stmt->execute([sanitize($data['title']), $data['description'] ?? null, $data['eligibility'] ?? null, $data['deadline'] ?? null, $data['external_link'] ?? null, $data['status'] ?? 'open', (int)$data['id']]);
        logActivity('UPDATE', 'scholarships', $data['id'], "Updated scholarship: " . $data['title']);
        jsonResponse(['success' => true]);
        break;
    case 'delete':
        $data = getPostData();
        validateRequired($data, ['id']);
        $pdo->prepare("DELETE FROM scholarships WHERE id = ?")->execute([(int)$data['id']]);
        logActivity('DELETE', 'scholarships', $data['id'], "Deleted scholarship ID: " . $data['id']);
        jsonResponse(['success' => true]);
        break;
    default:
        jsonError('Invalid action');
}
