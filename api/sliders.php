<?php
/**
 * Hero Sliders API
 * Public: GET published sliders | Admin: Full CRUD
 */
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/middleware/auth.php';

jsonHeaders();

try {
    $pdo = Database::getInstance()->getConnection();
    $action = $_GET['action'] ?? '';

    // Public endpoint (GET sliders)
    if ($_SERVER['REQUEST_METHOD'] === 'GET' && empty($action)) {
        $stmt = $pdo->query("SELECT * FROM sliders WHERE is_active = 1 ORDER BY sort_order ASC, id DESC");
        jsonResponse(['data' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
    }

    // Admin endpoints below
    requireAuth();

    switch ($action) {
        case 'list':
            $stmt = $pdo->query("SELECT * FROM sliders ORDER BY sort_order ASC, id DESC");
            jsonResponse(['data' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
            break;

        case 'get':
            if (!isset($_GET['id'])) jsonError('ID missing');
            $stmt = $pdo->prepare("SELECT * FROM sliders WHERE id = ?");
            $stmt->execute([(int)$_GET['id']]);
            $slider = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!$slider) jsonError('Slider not found', 404);
            jsonResponse($slider);
            break;

        case 'create':
            $data = getPostData();
            validateRequired($data, ['title', 'image_path']);
            
            $stmt = $pdo->prepare("INSERT INTO sliders (title, image_path, sort_order, is_active) VALUES (?, ?, ?, ?)");
            $stmt->execute([
                sanitize($data['title']),
                sanitize($data['image_path']),
                (int)($data['sort_order'] ?? 0),
                (int)($data['is_active'] ?? 1)
            ]);
            $newId = $pdo->lastInsertId();
            logActivity('CREATE', 'sliders', $newId, "Created hero slider: " . $data['title']);
            jsonResponse(['success' => true, 'id' => $newId], 201);
            break;

        case 'update':
            $data = getPostData();
            validateRequired($data, ['id', 'title', 'image_path']);

            $stmt = $pdo->prepare("UPDATE sliders SET title=?, image_path=?, sort_order=?, is_active=? WHERE id=?");
            $stmt->execute([
                sanitize($data['title']),
                sanitize($data['image_path']),
                (int)($data['sort_order'] ?? 0),
                (int)($data['is_active'] ?? 1),
                (int)$data['id']
            ]);
            logActivity('UPDATE', 'sliders', $data['id'], "Updated hero slider: " . $data['title']);
            jsonResponse(['success' => true]);
            break;

        case 'delete':
            $data = getPostData();
            validateRequired($data, ['id']);
            $pdo->prepare("DELETE FROM sliders WHERE id = ?")->execute([(int)$data['id']]);
            logActivity('DELETE', 'sliders', $data['id'], "Deleted hero slider ID: " . $data['id']);
            jsonResponse(['success' => true]);
            break;

        default:
            jsonError('Invalid action');
    }
} catch (Exception $e) {
    jsonError('DB Error: ' . $e->getMessage());
}
