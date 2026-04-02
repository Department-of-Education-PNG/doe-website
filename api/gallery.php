<?php
/**
 * Gallery API — Albums and Photos
 */
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/middleware/auth.php';

jsonHeaders();
$pdo = Database::getInstance()->getConnection();
$action = $_GET['action'] ?? '';

// Public: Get albums with their photos
if ($_SERVER['REQUEST_METHOD'] === 'GET' && empty($action)) {
    $albums = $pdo->query("SELECT * FROM gallery_albums ORDER BY sort_order ASC")->fetchAll();
    
    foreach ($albums as &$album) {
        $stmt = $pdo->prepare("SELECT * FROM gallery_photos WHERE album_id = ? ORDER BY sort_order ASC");
        $stmt->execute([$album['id']]);
        $album['images'] = $stmt->fetchAll();
    }
    
    jsonResponse(['data' => $albums]);
}

requireAuth();

switch ($action) {
    // Album CRUD
    case 'list':
        $albums = $pdo->query("SELECT * FROM gallery_albums ORDER BY sort_order ASC")->fetchAll();
        foreach ($albums as &$album) {
            $stmt = $pdo->prepare("SELECT COUNT(*) FROM gallery_photos WHERE album_id = ?");
            $stmt->execute([$album['id']]);
            $album['photo_count'] = (int)$stmt->fetchColumn();
        }
        jsonResponse(['data' => $albums]);
        break;

    case 'get':
        $stmt = $pdo->prepare("SELECT * FROM gallery_albums WHERE id = ?");
        $stmt->execute([(int)$_GET['id']]);
        $album = $stmt->fetch();
        if (!$album) jsonError('Not found', 404);
        
        $photoStmt = $pdo->prepare("SELECT * FROM gallery_photos WHERE album_id = ? ORDER BY sort_order ASC");
        $photoStmt->execute([$album['id']]);
        $album['photos'] = $photoStmt->fetchAll();
        jsonResponse($album);
        break;

    case 'create':
        $data = getPostData();
        validateRequired($data, ['title']);
        $stmt = $pdo->prepare("INSERT INTO gallery_albums (title, description, cover_image, tag, tag_color, sort_order) VALUES (?,?,?,?,?,?)");
        $stmt->execute([sanitize($data['title']), $data['description'] ?? null, $data['cover_image'] ?? null, sanitize($data['tag'] ?? ''), $data['tag_color'] ?? 'var(--primary)', (int)($data['sort_order'] ?? 0)]);
        jsonResponse(['success' => true, 'id' => $pdo->lastInsertId()], 201);
        break;

    case 'update':
        $data = getPostData();
        validateRequired($data, ['id', 'title']);
        $stmt = $pdo->prepare("UPDATE gallery_albums SET title=?, description=?, cover_image=?, tag=?, tag_color=?, sort_order=? WHERE id=?");
        $stmt->execute([sanitize($data['title']), $data['description'] ?? null, $data['cover_image'] ?? null, sanitize($data['tag'] ?? ''), $data['tag_color'] ?? 'var(--primary)', (int)($data['sort_order'] ?? 0), (int)$data['id']]);
        jsonResponse(['success' => true]);
        break;

    case 'delete':
        $data = getPostData();
        validateRequired($data, ['id']);
        // Photos are cascade-deleted via FK
        $pdo->prepare("DELETE FROM gallery_albums WHERE id = ?")->execute([(int)$data['id']]);
        jsonResponse(['success' => true]);
        break;

    // Photo management
    case 'add_photo':
        $data = getPostData();
        validateRequired($data, ['album_id', 'image_path']);
        $stmt = $pdo->prepare("INSERT INTO gallery_photos (album_id, image_path, caption, sort_order) VALUES (?,?,?,?)");
        $stmt->execute([(int)$data['album_id'], $data['image_path'], $data['caption'] ?? null, (int)($data['sort_order'] ?? 0)]);
        jsonResponse(['success' => true, 'id' => $pdo->lastInsertId()], 201);
        break;

    case 'delete_photo':
        $data = getPostData();
        validateRequired($data, ['id']);
        $pdo->prepare("DELETE FROM gallery_photos WHERE id = ?")->execute([(int)$data['id']]);
        jsonResponse(['success' => true]);
        break;

    default:
        jsonError('Invalid action');
}
