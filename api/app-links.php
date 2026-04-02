<?php
/**
 * App Links API
 */
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/middleware/auth.php';

jsonHeaders();
$pdo = Database::getInstance()->getConnection();
$action = $_GET['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'GET' && empty($action)) {
    $stmt = $pdo->query("SELECT * FROM app_links WHERE is_active = 1 ORDER BY sort_order ASC");
    jsonResponse(['data' => $stmt->fetchAll()]);
}

requireAuth();

switch ($action) {
    case 'list':
        jsonResponse(['data' => $pdo->query("SELECT * FROM app_links ORDER BY sort_order ASC")->fetchAll()]);
        break;
    case 'get':
        $stmt = $pdo->prepare("SELECT * FROM app_links WHERE id = ?");
        $stmt->execute([(int)$_GET['id']]);
        jsonResponse($stmt->fetch() ?: jsonError('Not found', 404));
        break;
    case 'create':
        $data = getPostData();
        validateRequired($data, ['title', 'url']);
        $stmt = $pdo->prepare("INSERT INTO app_links (title, description, url, icon_emoji, icon_color, sort_order, is_active) VALUES (?,?,?,?,?,?,?)");
        $stmt->execute([sanitize($data['title']), sanitize($data['description'] ?? ''), $data['url'], $data['icon_emoji'] ?? '🔗', $data['icon_color'] ?? '#0078d4', (int)($data['sort_order'] ?? 0), (int)($data['is_active'] ?? 1)]);
        jsonResponse(['success' => true, 'id' => $pdo->lastInsertId()], 201);
        break;
    case 'update':
        $data = getPostData();
        validateRequired($data, ['id', 'title', 'url']);
        $stmt = $pdo->prepare("UPDATE app_links SET title=?, description=?, url=?, icon_emoji=?, icon_color=?, sort_order=?, is_active=? WHERE id=?");
        $stmt->execute([sanitize($data['title']), sanitize($data['description'] ?? ''), $data['url'], $data['icon_emoji'] ?? '🔗', $data['icon_color'] ?? '#0078d4', (int)($data['sort_order'] ?? 0), (int)($data['is_active'] ?? 1), (int)$data['id']]);
        jsonResponse(['success' => true]);
        break;
    case 'delete':
        $data = getPostData();
        validateRequired($data, ['id']);
        $pdo->prepare("DELETE FROM app_links WHERE id = ?")->execute([(int)$data['id']]);
        jsonResponse(['success' => true]);
        break;
    default:
        jsonError('Invalid action');
}
