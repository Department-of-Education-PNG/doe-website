<?php
/**
 * Site Settings API
 */
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/middleware/auth.php';

jsonHeaders();
$pdo = Database::getInstance()->getConnection();
$action = $_GET['action'] ?? '';

// Public: Get all settings as key-value object
if ($_SERVER['REQUEST_METHOD'] === 'GET' && empty($action)) {
    $stmt = $pdo->query("SELECT setting_key, setting_value, setting_group FROM site_settings ORDER BY setting_group");
    $rows = $stmt->fetchAll();
    
    $settings = [];
    foreach ($rows as $row) {
        $settings[$row['setting_key']] = $row['setting_value'];
    }
    
    jsonResponse($settings);
}

requireAuth();

switch ($action) {
    case 'list':
        $stmt = $pdo->query("SELECT * FROM site_settings ORDER BY setting_group, id");
        jsonResponse(['data' => $stmt->fetchAll()]);
        break;

    case 'update':
        $data = getPostData();
        validateRequired($data, ['settings']);
        
        // settings is an object of key-value pairs
        $stmt = $pdo->prepare("UPDATE site_settings SET setting_value = ? WHERE setting_key = ?");
        foreach ($data['settings'] as $key => $value) {
            $stmt->execute([$value, $key]);
        }
        jsonResponse(['success' => true]);
        break;

    case 'create':
        $data = getPostData();
        validateRequired($data, ['setting_key', 'setting_value']);
        $stmt = $pdo->prepare("INSERT INTO site_settings (setting_key, setting_value, setting_group) VALUES (?,?,?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)");
        $stmt->execute([sanitize($data['setting_key']), $data['setting_value'], $data['setting_group'] ?? 'general']);
        jsonResponse(['success' => true]);
        break;

    default:
        jsonError('Invalid action');
}
