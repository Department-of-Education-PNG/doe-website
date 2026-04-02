<?php
/**
 * Events API
 */
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/middleware/auth.php';

jsonHeaders();
$pdo = Database::getInstance()->getConnection();
$action = $_GET['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'GET' && empty($action)) {
    if (isset($_GET['id'])) {
        $stmt = $pdo->prepare("SELECT * FROM events WHERE id = ?");
        $stmt->execute([(int)$_GET['id']]);
        jsonResponse($stmt->fetch() ?: jsonError('Not found', 404));
    }
    $status = $_GET['status'] ?? 'upcoming';
    $stmt = $pdo->prepare("SELECT * FROM events WHERE status = ? ORDER BY event_date ASC");
    $stmt->execute([$status]);
    jsonResponse(['data' => $stmt->fetchAll()]);
}

requireAuth();

switch ($action) {
    case 'list':
        jsonResponse(['data' => $pdo->query("SELECT * FROM events ORDER BY event_date DESC")->fetchAll()]);
        break;
    case 'get':
        $stmt = $pdo->prepare("SELECT * FROM events WHERE id = ?");
        $stmt->execute([(int)$_GET['id']]);
        jsonResponse($stmt->fetch() ?: jsonError('Not found', 404));
        break;
    case 'create':
        $data = getPostData();
        validateRequired($data, ['title', 'event_date']);
        $stmt = $pdo->prepare("INSERT INTO events (title, description, event_date, event_time, location, image_path, status) VALUES (?,?,?,?,?,?,?)");
        $stmt->execute([sanitize($data['title']), $data['description'] ?? null, $data['event_date'], $data['event_time'] ?? null, sanitize($data['location'] ?? ''), $data['image_path'] ?? null, $data['status'] ?? 'upcoming']);
        jsonResponse(['success' => true, 'id' => $pdo->lastInsertId()], 201);
        break;
    case 'update':
        $data = getPostData();
        validateRequired($data, ['id', 'title', 'event_date']);
        $stmt = $pdo->prepare("UPDATE events SET title=?, description=?, event_date=?, event_time=?, location=?, image_path=?, status=? WHERE id=?");
        $stmt->execute([sanitize($data['title']), $data['description'] ?? null, $data['event_date'], $data['event_time'] ?? null, sanitize($data['location'] ?? ''), $data['image_path'] ?? null, $data['status'] ?? 'upcoming', (int)$data['id']]);
        jsonResponse(['success' => true]);
        break;
    case 'delete':
        $data = getPostData();
        validateRequired($data, ['id']);
        $pdo->prepare("DELETE FROM events WHERE id = ?")->execute([(int)$data['id']]);
        jsonResponse(['success' => true]);
        break;
    default:
        jsonError('Invalid action');
}
