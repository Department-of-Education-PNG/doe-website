<?php
/**
 * FAQs API
 * Public: GET active FAQs
 */
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/middleware/auth.php';

jsonHeaders();

$pdo = Database::getInstance()->getConnection();
$action = $_GET['action'] ?? '';

// Public endpoint
if ($_SERVER['REQUEST_METHOD'] === 'GET' && empty($action)) {
    try {
        $stmt = $pdo->prepare("SELECT * FROM faqs WHERE is_active = 1 ORDER BY sort_order ASC, created_at DESC");
        $stmt->execute();
        $faqs = $stmt->fetchAll();
        
        jsonResponse([
            'success' => true,
            'data' => $faqs
        ]);
    } catch (Exception $e) {
        jsonError('Database error: ' . $e->getMessage());
    }
}

// Admin endpoints
requireAuth();

switch ($action) {
    case 'list':
        $stmt = $pdo->query("SELECT * FROM faqs ORDER BY sort_order ASC");
        jsonResponse(['data' => $stmt->fetchAll()]);
        break;

    case 'create':
        $data = getPostData();
        validateRequired($data, ['question', 'answer']);
        $stmt = $pdo->prepare("INSERT INTO faqs (question, answer, category, sort_order, is_active) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([
            sanitize($data['question']),
            sanitizeHtml($data['answer']),
            sanitize($data['category'] ?? 'General'),
            (int)($data['sort_order'] ?? 0),
            (int)($data['is_active'] ?? 1)
        ]);
        $newId = $pdo->lastInsertId();
        logActivity('CREATE', 'faqs', $newId, "Created FAQ: " . $data['question']);
        jsonResponse(['success' => true, 'id' => $newId], 201);
        break;

    case 'update':
        $data = getPostData();
        validateRequired($data, ['id', 'question', 'answer']);
        $stmt = $pdo->prepare("UPDATE faqs SET question=?, answer=?, category=?, sort_order=?, is_active=? WHERE id=?");
        $stmt->execute([
            sanitize($data['question']),
            sanitizeHtml($data['answer']),
            sanitize($data['category'] ?? 'General'),
            (int)($data['sort_order'] ?? 0),
            (int)($data['is_active'] ?? 1),
            (int)$data['id']
        ]);
        logActivity('UPDATE', 'faqs', $data['id'], "Updated FAQ: " . $data['question']);
        jsonResponse(['success' => true]);
        break;

    case 'delete':
        $data = getPostData();
        validateRequired($data, ['id']);
        $pdo->prepare("DELETE FROM faqs WHERE id = ?")->execute([(int)$data['id']]);
        logActivity('DELETE', 'faqs', $data['id'], "Deleted FAQ ID: " . $data['id']);
        jsonResponse(['success' => true]);
        break;

    default:
        jsonError('Invalid action');
}
