<?php
/**
 * News Articles API
 * Public: GET published articles | Admin: Full CRUD
 */
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/middleware/auth.php';

jsonHeaders();

$pdo = Database::getInstance()->getConnection();
$action = $_GET['action'] ?? '';

// Public endpoints
if ($_SERVER['REQUEST_METHOD'] === 'GET' && empty($action)) {
    $pagination = getPagination();
    
    if (isset($_GET['id'])) {
        $stmt = $pdo->prepare("SELECT * FROM news_articles WHERE id = ? AND status = 'published'");
        $stmt->execute([(int)$_GET['id']]);
        $article = $stmt->fetch();
        if (!$article) jsonError('Article not found', 404);
        jsonResponse($article);
    }

    if (isset($_GET['slug'])) {
        $stmt = $pdo->prepare("SELECT * FROM news_articles WHERE slug = ? AND status = 'published'");
        $stmt->execute([$_GET['slug']]);
        $article = $stmt->fetch();
        if (!$article) jsonError('Article not found', 404);
        jsonResponse($article);
    }

    $where = "WHERE status = 'published'";
    $params = [];

    if (isset($_GET['featured']) && $_GET['featured'] == '1') {
        $where .= " AND is_featured = 1";
    }

    $countStmt = $pdo->prepare("SELECT COUNT(*) FROM news_articles $where");
    $countStmt->execute($params);
    $total = $countStmt->fetchColumn();

    $stmt = $pdo->prepare("SELECT * FROM news_articles $where ORDER BY date_published DESC, id DESC LIMIT ? OFFSET ?");
    $stmt->bindValue(1, $pagination['limit'], PDO::PARAM_INT);
    $stmt->bindValue(2, $pagination['offset'], PDO::PARAM_INT);
    $stmt->execute();

    jsonResponse([
        'data' => $stmt->fetchAll(),
        'total' => (int)$total,
        'page' => $pagination['page'],
        'limit' => $pagination['limit']
    ]);
}

// Admin endpoints
requireAuth();

switch ($action) {
    case 'list':
        $stmt = $pdo->query("SELECT * FROM news_articles ORDER BY date_published DESC, id DESC");
        jsonResponse(['data' => $stmt->fetchAll()]);
        break;

    case 'get':
        $stmt = $pdo->prepare("SELECT * FROM news_articles WHERE id = ?");
        $stmt->execute([(int)$_GET['id']]);
        $article = $stmt->fetch();
        if (!$article) jsonError('Not found', 404);
        jsonResponse($article);
        break;

    case 'create':
        $data = getPostData();
        validateRequired($data, ['title', 'date_published']);
        $slug = generateSlug($data['title']);
        
        // Ensure unique slug
        $check = $pdo->prepare("SELECT COUNT(*) FROM news_articles WHERE slug = ?");
        $check->execute([$slug]);
        if ($check->fetchColumn() > 0) $slug .= '-' . time();

        $stmt = $pdo->prepare("INSERT INTO news_articles (title, slug, summary, content, image_path, date_published, is_featured, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            sanitize($data['title']),
            $slug,
            $data['summary'] ?? null,
            $data['content'] ?? null,
            $data['image_path'] ?? null,
            $data['date_published'],
            (int)($data['is_featured'] ?? 0),
            $data['status'] ?? 'draft'
        ]);
        jsonResponse(['success' => true, 'id' => $pdo->lastInsertId()], 201);
        break;

    case 'update':
        $data = getPostData();
        validateRequired($data, ['id', 'title', 'date_published']);

        $stmt = $pdo->prepare("UPDATE news_articles SET title=?, summary=?, content=?, image_path=?, date_published=?, is_featured=?, status=? WHERE id=?");
        $stmt->execute([
            sanitize($data['title']),
            $data['summary'] ?? null,
            $data['content'] ?? null,
            $data['image_path'] ?? null,
            $data['date_published'],
            (int)($data['is_featured'] ?? 0),
            $data['status'] ?? 'draft',
            (int)$data['id']
        ]);
        jsonResponse(['success' => true]);
        break;

    case 'delete':
        $data = getPostData();
        validateRequired($data, ['id']);
        $pdo->prepare("DELETE FROM news_articles WHERE id = ?")->execute([(int)$data['id']]);
        jsonResponse(['success' => true]);
        break;

    default:
        jsonError('Invalid action');
}
