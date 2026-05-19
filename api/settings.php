<?php
/**
 * Settings API — Handle global site configuration
 * Standardized for Admin Panel 2.0
 */
require_once __DIR__ . '/middleware/auth.php';
safe_session_start();
require_once __DIR__ . '/helpers.php';

jsonHeaders();

$settingsFile = __DIR__ . '/config/settings.json';

// Initialize with defaults if missing
if (!file_exists($settingsFile)) {
    $defaults = [
        'maintenance_mode' => '0',
        'site_title' => 'Department of Education',
        'site_subtitle' => 'Papua New Guinea',
        'site_description' => 'The official website of the Department of Education, Papua New Guinea.',
        'site_copyright' => '© 2026 Department of Education, Papua New Guinea. All rights reserved.',
        'site_logo' => '',
        'site_favicon' => '',
        'footer_logo' => '',
        'footer_address' => 'Waigani, Port Moresby, Papua New Guinea',
        'footer_email' => 'info@education.gov.pg',
        'footer_phone' => '+675 301 3300',
        'social_facebook' => 'https://facebook.com/PNGDOE',
        'social_linkedin' => '',
        'social_whatsapp' => ''
    ];
    if (!is_dir(__DIR__ . '/config')) mkdir(__DIR__ . '/config', 0777, true);
    file_put_contents($settingsFile, json_encode($defaults, JSON_PRETTY_PRINT));
}

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'list':
        $raw = json_decode(file_get_contents($settingsFile), true);
        $list = [];
        foreach ($raw as $k => $v) {
            $list[] = ['setting_key' => $k, 'setting_value' => $v];
        }
        jsonResponse(['data' => $list]);
        break;

    case 'get':
    case '':
        $raw = json_decode(file_get_contents($settingsFile), true);
        // Coerce types for frontend consumption
        if (isset($raw['maintenance_mode'])) {
            $raw['maintenance_mode'] = ($raw['maintenance_mode'] == '1' || $raw['maintenance_mode'] === true);
        }
        jsonResponse($raw);
        break;

    case 'update':
        requireRole('super_admin');
        $payload = getPostData();
        $settings = $payload['settings'] ?? [];
        
        $current = json_decode(file_get_contents($settingsFile), true);
        foreach ($settings as $k => $v) {
            $current[$k] = $v;
        }
        
        file_put_contents($settingsFile, json_encode($current, JSON_PRETTY_PRINT));
        logActivity('UPDATE', 'settings', 0, "Updated global site settings");
        jsonSuccess(['message' => 'Settings saved']);
        break;

    case 'update_single':
        requireAuth();
        $payload = getPostData();
        $key = $payload['key'] ?? '';
        $val = $payload['value'] ?? '';

        if (!$key) jsonError('Missing key');

        $current = json_decode(file_get_contents($settingsFile), true);
        $current[$key] = $val;
        
        file_put_contents($settingsFile, json_encode($current, JSON_PRETTY_PRINT));
        logActivity('UPDATE', 'settings', 0, "Updated setting: $key to $val");
        jsonSuccess(['message' => "$key updated"]);
        break;

    default:
        jsonError('Invalid action');
}
