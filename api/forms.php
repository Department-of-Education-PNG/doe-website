<?php
/**
 * Public Forms API
 */
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/middleware/auth.php';

jsonHeaders();
$pdo = Database::getInstance()->getConnection();
$action = $_GET['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'GET' && empty($action)) {
    $stmt = $pdo->query("SELECT * FROM public_forms ORDER BY sort_order ASC");
    jsonResponse(['data' => $stmt->fetchAll()]);
}

requireAuth();

switch ($action) {
    case 'list':
        jsonResponse(['data' => $pdo->query("SELECT * FROM public_forms ORDER BY sort_order ASC")->fetchAll()]);
        break;
    case 'get':
        $stmt = $pdo->prepare("SELECT * FROM public_forms WHERE id = ?");
        $stmt->execute([(int)$_GET['id']]);
        jsonResponse($stmt->fetch() ?: jsonError('Not found', 404));
        break;
    case 'create':
        $data = getPostData();
        validateRequired($data, ['title']);
        $stmt = $pdo->prepare("INSERT INTO public_forms (title, description, category, pdf_path, accent_color, sort_order) VALUES (?,?,?,?,?,?)");
        $stmt->execute([sanitize($data['title']), $data['description'] ?? null, sanitize($data['category'] ?? ''), $data['pdf_path'] ?? null, $data['accent_color'] ?? 'var(--primary)', (int)($data['sort_order'] ?? 0)]);
        jsonResponse(['success' => true, 'id' => $pdo->lastInsertId()], 201);
        break;
    case 'update':
        $data = getPostData();
        validateRequired($data, ['id', 'title']);
        $stmt = $pdo->prepare("UPDATE public_forms SET title=?, description=?, category=?, pdf_path=?, accent_color=?, sort_order=? WHERE id=?");
        $stmt->execute([sanitize($data['title']), $data['description'] ?? null, sanitize($data['category'] ?? ''), $data['pdf_path'] ?? null, $data['accent_color'] ?? 'var(--primary)', (int)($data['sort_order'] ?? 0), (int)$data['id']]);
        jsonResponse(['success' => true]);
        break;
    case 'delete':
        $data = getPostData();
        validateRequired($data, ['id']);
        $pdo->prepare("DELETE FROM public_forms WHERE id = ?")->execute([(int)$data['id']]);
        jsonResponse(['success' => true]);
        break;
    default:
        jsonError('Invalid action');
}
