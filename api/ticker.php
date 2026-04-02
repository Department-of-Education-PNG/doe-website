<?php
/**
 * News Ticker API
 */
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/middleware/auth.php';

jsonHeaders();
$pdo = Database::getInstance()->getConnection();
$action = $_GET['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'GET' && empty($action)) {
    $stmt = $pdo->query("SELECT * FROM news_ticker WHERE is_active = 1 ORDER BY sort_order ASC");
    jsonResponse(['data' => $stmt->fetchAll()]);
}

requireAuth();

switch ($action) {
    case 'list':
        jsonResponse(['data' => $pdo->query("SELECT * FROM news_ticker ORDER BY sort_order ASC")->fetchAll()]);
        break;
    case 'get':
        $stmt = $pdo->prepare("SELECT * FROM news_ticker WHERE id = ?");
        $stmt->execute([(int)$_GET['id']]);
        jsonResponse($stmt->fetch() ?: jsonError('Not found', 404));
        break;
    case 'create':
        $data = getPostData();
        validateRequired($data, ['label', 'text']);
        $stmt = $pdo->prepare("INSERT INTO news_ticker (label, text, is_active, sort_order) VALUES (?,?,?,?)");
        $stmt->execute([sanitize($data['label']), sanitize($data['text']), (int)($data['is_active'] ?? 1), (int)($data['sort_order'] ?? 0)]);
        jsonResponse(['success' => true, 'id' => $pdo->lastInsertId()], 201);
        break;
    case 'update':
        $data = getPostData();
        validateRequired($data, ['id', 'label', 'text']);
        $stmt = $pdo->prepare("UPDATE news_ticker SET label=?, text=?, is_active=?, sort_order=? WHERE id=?");
        $stmt->execute([sanitize($data['label']), sanitize($data['text']), (int)($data['is_active'] ?? 1), (int)($data['sort_order'] ?? 0), (int)$data['id']]);
        jsonResponse(['success' => true]);
        break;
    case 'delete':
        $data = getPostData();
        validateRequired($data, ['id']);
        $pdo->prepare("DELETE FROM news_ticker WHERE id = ?")->execute([(int)$data['id']]);
        jsonResponse(['success' => true]);
        break;
    default:
        jsonError('Invalid action');
}
