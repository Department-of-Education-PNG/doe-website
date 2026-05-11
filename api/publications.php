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

// Version: 2026_04_22_V1
if ($_SERVER['REQUEST_METHOD'] === 'GET' && empty($action)) {
    if (isset($_GET['category'])) {
        $cat = $_GET['category'];
        if ($cat === 'Calendars') {
            $stmt = $pdo->query("SELECT * FROM publications WHERE category LIKE '%Calendar%' ORDER BY sort_order ASC, year DESC");
        } else {
            $categories = explode(',', $cat);
            $placeholders = implode(',', array_fill(0, count($categories), '?'));
            $stmt = $pdo->prepare("SELECT * FROM publications WHERE category IN ($placeholders) ORDER BY sort_order ASC, year DESC");
            $stmt->execute($categories);
        }
    } else {
        // General publications - exclude Calendars
        $stmt = $pdo->query("SELECT * FROM publications WHERE category NOT LIKE '%Calendar%' ORDER BY category ASC, sort_order ASC, year DESC");
    }
    jsonResponse(['data' => $stmt->fetchAll()]);
}

requireAuth();

switch ($action) {
    case 'list':
        $category = $_GET['category'] ?? '';
        if ($category === 'Calendars') {
            $stmt = $pdo->query("SELECT * FROM publications WHERE category LIKE '%Calendar%' ORDER BY sort_order ASC, year DESC");
        } elseif (!empty($category)) {
            $stmt = $pdo->prepare("SELECT * FROM publications WHERE category = ? ORDER BY sort_order ASC, year DESC");
            $stmt->execute([$category]);
        } else {
            // General publications list - exclude Calendars
            $stmt = $pdo->query("SELECT * FROM publications WHERE category NOT LIKE '%Calendar%' ORDER BY category ASC, sort_order ASC, year DESC");
        }
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
        $stmt = $pdo->prepare("INSERT INTO publications (title, category, year, description, pdf_path, thumbnail_path, sort_order) VALUES (?,?,?,?,?,?,?)");
        $stmt->execute([
            sanitize($data['title']), 
            $data['category'], 
            $data['year'] ?? null, 
            $data['description'] ?? null,
            $data['pdf_path'] ?? null, 
            $data['thumbnail_path'] ?? null, 
            (int)($data['sort_order'] ?? 0)
        ]);
        $newId = $pdo->lastInsertId();
        logActivity('CREATE', 'publications', $newId, "Created publication: " . $data['title']);
        jsonResponse(['success' => true, 'id' => $newId], 201);
        break;
    case 'update':
        $data = getPostData();
        validateRequired($data, ['id', 'title', 'category']);
        $stmt = $pdo->prepare("UPDATE publications SET title=?, category=?, year=?, description=?, pdf_path=?, thumbnail_path=?, sort_order=? WHERE id=?");
        $stmt->execute([
            sanitize($data['title']), 
            $data['category'], 
            $data['year'] ?? null, 
            $data['description'] ?? null,
            $data['pdf_path'] ?? null, 
            $data['thumbnail_path'] ?? null, 
            (int)($data['sort_order'] ?? 0), 
            (int)$data['id']
        ]);
        logActivity('UPDATE', 'publications', $data['id'], "Updated publication: " . $data['title']);
        jsonResponse(['success' => true]);
        break;
    case 'delete':
        $data = getPostData();
        validateRequired($data, ['id']);
        $pdo->prepare("DELETE FROM publications WHERE id = ?")->execute([(int)$data['id']]);
        logActivity('DELETE', 'publications', $data['id'], "Deleted publication ID: " . $data['id']);
        jsonResponse(['success' => true]);
        break;
    default:
        jsonError('Invalid action');
}
