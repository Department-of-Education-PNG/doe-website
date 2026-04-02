<?php
/**
 * Textbooks API
 */
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/middleware/auth.php';

jsonHeaders();
$pdo = Database::getInstance()->getConnection();
$action = $_GET['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'GET' && empty($action)) {
    $stmt = $pdo->query("SELECT * FROM textbooks ORDER BY sort_order ASC");
    jsonResponse(['data' => $stmt->fetchAll()]);
}

requireAuth();

switch ($action) {
    case 'list':
        jsonResponse(['data' => $pdo->query("SELECT * FROM textbooks ORDER BY sort_order ASC")->fetchAll()]);
        break;
    case 'get':
        $stmt = $pdo->prepare("SELECT * FROM textbooks WHERE id = ?");
        $stmt->execute([(int)$_GET['id']]);
        jsonResponse($stmt->fetch() ?: jsonError('Not found', 404));
        break;
    case 'create':
        $data = getPostData();
        validateRequired($data, ['grade_level', 'subject']);
        $stmt = $pdo->prepare("INSERT INTO textbooks (grade_level, subject, textbook_pdf, manual_pdf, sort_order) VALUES (?,?,?,?,?)");
        $stmt->execute([sanitize($data['grade_level']), sanitize($data['subject']), $data['textbook_pdf'] ?? null, $data['manual_pdf'] ?? null, (int)($data['sort_order'] ?? 0)]);
        jsonResponse(['success' => true, 'id' => $pdo->lastInsertId()], 201);
        break;
    case 'update':
        $data = getPostData();
        validateRequired($data, ['id', 'grade_level', 'subject']);
        $stmt = $pdo->prepare("UPDATE textbooks SET grade_level=?, subject=?, textbook_pdf=?, manual_pdf=?, sort_order=? WHERE id=?");
        $stmt->execute([sanitize($data['grade_level']), sanitize($data['subject']), $data['textbook_pdf'] ?? null, $data['manual_pdf'] ?? null, (int)($data['sort_order'] ?? 0), (int)$data['id']]);
        jsonResponse(['success' => true]);
        break;
    case 'delete':
        $data = getPostData();
        validateRequired($data, ['id']);
        $pdo->prepare("DELETE FROM textbooks WHERE id = ?")->execute([(int)$data['id']]);
        jsonResponse(['success' => true]);
        break;
    default:
        jsonError('Invalid action');
}
