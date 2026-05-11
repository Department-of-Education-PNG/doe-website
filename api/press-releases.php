<?php
/**
 * Press Releases API
 */
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/middleware/auth.php';

jsonHeaders();
$pdo = Database::getInstance()->getConnection();
$action = $_GET['action'] ?? '';

// Public: Increment view
if ($action === 'increment_view' && isset($_GET['id'])) {
    $stmt = $pdo->prepare("UPDATE press_releases SET views = views + 1 WHERE id = ?");
    $stmt->execute([(int)$_GET['id']]);
    jsonResponse(['success' => true]);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && empty($action)) {
    $pagination = getPagination();
    
    if (isset($_GET['id'])) {
        $stmt = $pdo->prepare("SELECT * FROM press_releases WHERE id = ? AND status = 'published'");
        $stmt->execute([(int)$_GET['id']]);
        jsonResponse($stmt->fetch() ?: jsonError('Not found', 404));
    }

    $stmt = $pdo->prepare("SELECT * FROM press_releases WHERE status = 'published' ORDER BY date_published DESC LIMIT ? OFFSET ?");
    $stmt->bindValue(1, $pagination['limit'], PDO::PARAM_INT);
    $stmt->bindValue(2, $pagination['offset'], PDO::PARAM_INT);
    $stmt->execute();
    jsonResponse(['data' => $stmt->fetchAll()]);
}

requireAuth();

switch ($action) {
    case 'list':
        jsonResponse(['data' => $pdo->query("SELECT * FROM press_releases ORDER BY date_published DESC")->fetchAll()]);
        break;
    case 'get':
        $stmt = $pdo->prepare("SELECT * FROM press_releases WHERE id = ?");
        $stmt->execute([(int)$_GET['id']]);
        jsonResponse($stmt->fetch() ?: jsonError('Not found', 404));
        break;
    case 'create':
        $data = getPostData();
        validateRequired($data, ['title', 'date_published']);
        $stmt = $pdo->prepare("INSERT INTO press_releases (title, summary, image_path, pdf_path, date_published, status) VALUES (?,?,?,?,?,?)");
        $stmt->execute([
            sanitize($data['title']), 
            sanitizeHtml($data['summary'] ?? null), 
            sanitize($data['image_path'] ?? null), 
            sanitize($data['pdf_path'] ?? null), 
            sanitize($data['date_published']), 
            sanitize($data['status'] ?? 'draft')
        ]);
        $newId = $pdo->lastInsertId();
        logActivity('CREATE', 'press_releases', $newId, "Created press release: " . $data['title']);
        jsonResponse(['success' => true, 'id' => $newId], 201);
        break;
    case 'update':
        $data = getPostData();
        validateRequired($data, ['id', 'title']);
        $stmt = $pdo->prepare("UPDATE press_releases SET title=?, summary=?, image_path=?, pdf_path=?, date_published=?, status=? WHERE id=?");
        $stmt->execute([
            sanitize($data['title']), 
            sanitizeHtml($data['summary'] ?? null), 
            sanitize($data['image_path'] ?? null), 
            sanitize($data['pdf_path'] ?? null), 
            sanitize($data['date_published'] ?? date('Y-m-d')), 
            sanitize($data['status'] ?? 'draft'), 
            (int)$data['id']
        ]);
        logActivity('UPDATE', 'press_releases', $data['id'], "Updated press release: " . $data['title']);
        jsonResponse(['success' => true]);
        break;
    case 'delete':
        $data = getPostData();
        validateRequired($data, ['id']);
        $pdo->prepare("DELETE FROM press_releases WHERE id = ?")->execute([(int)$data['id']]);
        logActivity('DELETE', 'press_releases', $data['id'], "Deleted press release ID: " . $data['id']);
        jsonResponse(['success' => true]);
        break;
    default:
        jsonError('Invalid action');
}
