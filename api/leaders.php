<?php
/**
 * Leadership Messages API
 */
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/middleware/auth.php';

jsonHeaders();
$pdo = Database::getInstance()->getConnection();
$action = $_GET['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'GET' && empty($action)) {
    $stmt = $pdo->query("SELECT * FROM leadership_messages ORDER BY id ASC");
    jsonResponse(['data' => $stmt->fetchAll()]);
}

requireAuth();

switch ($action) {
    case 'list':
        jsonResponse(['data' => $pdo->query("SELECT * FROM leadership_messages ORDER BY id ASC")->fetchAll()]);
        break;
    case 'get':
        $stmt = $pdo->prepare("SELECT * FROM leadership_messages WHERE id = ?");
        $stmt->execute([(int)$_GET['id']]);
        jsonResponse($stmt->fetch() ?: jsonError('Not found', 404));
        break;
    case 'update':
        $data = getPostData();
        validateRequired($data, ['id', 'name', 'position_title']);
        $stmt = $pdo->prepare("UPDATE leadership_messages SET name=?, position_title=?, photo_path=?, message_content=?, border_color=? WHERE id=?");
        $stmt->execute([sanitize($data['name']), sanitize($data['position_title']), $data['photo_path'] ?? null, $data['message_content'] ?? null, $data['border_color'] ?? '#4a90e2', (int)$data['id']]);
        jsonResponse(['success' => true]);
        break;
    default:
        jsonError('Invalid action. Leadership messages can only be updated, not created or deleted.');
}
