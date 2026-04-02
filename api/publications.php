<?php
/**
 * Publications API
 */
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/middleware/auth.php';

jsonHeaders();
$pdo = Database::getInstance()->getConnection();
$action = $_GET['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'GET' && empty($action)) {
    if (isset($_GET['category'])) {
        $stmt = $pdo->prepare("SELECT * FROM publications WHERE category = ? ORDER BY sort_order ASC, year DESC");
        $stmt->execute([$_GET['category']]);
    } else {
        $stmt = $pdo->query("SELECT * FROM publications ORDER BY category ASC, sort_order ASC, year DESC");
    }
    jsonResponse(['data' => $stmt->fetchAll()]);
}

requireAuth();

switch ($action) {
    case 'list':
        $stmt = $pdo->query("SELECT * FROM publications ORDER BY category ASC, sort_order ASC");
        jsonResponse(['data' => $stmt->fetchAll()]);
        break;
    case 'get':
        $stmt = $pdo->prepare("SELECT * FROM publications WHERE id = ?");
        $stmt->execute([(int)$_GET['id']]);
        jsonResponse($stmt->fetch() ?: jsonError('Not found', 404));
        break;
    case 'create':
        $data = getPostData();
        validateRequired($data, ['title', 'category']);
        $stmt = $pdo->prepare("INSERT INTO publications (title, category, year, pdf_path, thumbnail_path, sort_order) VALUES (?,?,?,?,?,?)");
        $stmt->execute([sanitize($data['title']), $data['category'], $data['year'] ?? null, $data['pdf_path'] ?? null, $data['thumbnail_path'] ?? null, (int)($data['sort_order'] ?? 0)]);
        jsonResponse(['success' => true, 'id' => $pdo->lastInsertId()], 201);
        break;
    case 'update':
        $data = getPostData();
        validateRequired($data, ['id', 'title', 'category']);
        $stmt = $pdo->prepare("UPDATE publications SET title=?, category=?, year=?, pdf_path=?, thumbnail_path=?, sort_order=? WHERE id=?");
        $stmt->execute([sanitize($data['title']), $data['category'], $data['year'] ?? null, $data['pdf_path'] ?? null, $data['thumbnail_path'] ?? null, (int)($data['sort_order'] ?? 0), (int)$data['id']]);
        jsonResponse(['success' => true]);
        break;
    case 'delete':
        $data = getPostData();
        validateRequired($data, ['id']);
        $pdo->prepare("DELETE FROM publications WHERE id = ?")->execute([(int)$data['id']]);
        jsonResponse(['success' => true]);
        break;
    default:
        jsonError('Invalid action');
}
