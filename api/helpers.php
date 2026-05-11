<?php
/**
 * Shared Helper Functions
 * Department of Education PNG
 */
 
// Optimization: Start output buffering with Gzip compression to speed up the delivery of page content
if (!isset($_SESSION)) {
    if(!ob_start("ob_gzhandler")) ob_start();
}

// Set JSON response headers
function jsonHeaders() {
    // Suppress any warnings from echoing to output to prevent JSON corruption
    error_reporting(0);
    ini_set('display_errors', 0);

    header('Content-Type: application/json; charset=utf-8');

    // SECURITY: Restrict CORS to known origins only — never use wildcard (*) with credentials
    $allowedOrigins = [
        'https://education.gov.pg',
        'http://localhost',
        'http://127.0.0.1',
    ];
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if (in_array(rtrim($origin, '/'), $allowedOrigins, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Access-Control-Allow-Credentials: true');
    }
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');

    // Security headers on every API response
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: SAMEORIGIN');
    header('Referrer-Policy: strict-origin-when-cross-origin');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

// Send JSON response
function jsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

// Success alias for jsonResponse
function jsonSuccess($data) {
    if (is_array($data)) {
        $data['success'] = true;
    } else {
        $data = ['success' => true, 'data' => $data];
    }
    jsonResponse($data, 200);
}

// Send error response
function jsonError($message, $statusCode = 400) {
    jsonResponse(['success' => false, 'error' => $message], $statusCode);
}

// Sanitize input string (strict - remove all HTML)
function sanitize($input) {
    if ($input === null) return null;
    $input = trim($input);
    $input = strip_tags($input); // Remove all HTML tags
    return htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
}

// Sanitize HTML input (relaxed - allow safe formatting)
function sanitizeHtml($input) {
    if ($input === null) return null;
    $input = trim($input);
    
    // 1. Whitelist tags
    $allowed = '<p><a><b><i><u><strong><em><ul><li><ol><img><br><h1><h2><h3><h4><h5><h6><table><tr><td><th><tbody><thead><tfoot><span><div><hr><blockquote>';
    $sanitized = strip_tags($input, $allowed);
    
    // 2. Aggressively remove common XSS vectors from whitelisted tags (onmouseleave, onerror, etc.)
    $sanitized = preg_replace('/\s+on[a-z]+\s*=\s*(["\'][^"\']*["\']|[^\s>]+)/i', '', $sanitized);
    $sanitized = preg_replace('/href\s*=\s*["\']\s*javascript:[^"\']*["\']/i', 'href="#"', $sanitized);
    
    return $sanitized;
}

// Sanitize Slug
function sanitizeSlug($input) {
    if ($input === null) return null;
    return preg_replace('/[^a-z0-9-]/i', '', $input);
}

// Generate URL-friendly slug from title
function generateSlug($title) {
    $slug = strtolower($title);
    $slug = preg_replace('/[^a-z0-9\s-]/', '', $slug);
    $slug = preg_replace('/[\s-]+/', '-', $slug);
    $slug = trim($slug, '-');
    return $slug;
}

// Get pagination parameters
function getPagination() {
    $page = max(1, (int)($_GET['page'] ?? 1));
    $limit = min(100, max(1, (int)($_GET['limit'] ?? 20)));
    $offset = ($page - 1) * $limit;
    return ['page' => $page, 'limit' => $limit, 'offset' => $offset];
}

// Get POST body as JSON or form data
function getPostData() {
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
    
    if (strpos($contentType, 'application/json') !== false) {
        $raw = file_get_contents('php://input');
        return json_decode($raw, true) ?? [];
    }
    
    return $_POST;
}

// Validate required fields
function validateRequired($data, $fields) {
    $missing = [];
    foreach ($fields as $field) {
        if (empty($data[$field]) && $data[$field] !== '0' && $data[$field] !== 0) {
            $missing[] = $field;
        }
    }
    if (!empty($missing)) {
        jsonError('Missing required fields: ' . implode(', ', $missing));
    }
}

// Get visitor IP
function getVisitorIp() {
    $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'])[0];
    }
    return trim($ip);
}

// Rate limiting (MySQL-based for cPanel compatibility)
function checkRateLimit($key, $limit = 60, $windowMinutes = 1) {
    require_once __DIR__ . '/config/database.php';
    $pdo = Database::getInstance()->getConnection();
    $ip = getVisitorIp();
    $fullKey = $key . '_' . $ip;

    // 1. Cleanup old entries
    $pdo->prepare("DELETE FROM rate_limits WHERE expires_at < NOW()")->execute();

    // 2. Check current limit
    $stmt = $pdo->prepare("SELECT hits FROM rate_limits WHERE limiter_key = ?");
    $stmt->execute([$fullKey]);
    $hit = $stmt->fetch();

    if ($hit) {
        if ($hit['hits'] >= $limit) {
            jsonError("Too many requests. Please try again in $windowMinutes minutes.", 429);
        }
        $pdo->prepare("UPDATE rate_limits SET hits = hits + 1 WHERE limiter_key = ?")->execute([$fullKey]);
    } else {
        $expires = date('Y-m-d H:i:s', strtotime("+$windowMinutes minutes"));
        $pdo->prepare("INSERT INTO rate_limits (limiter_key, hits, expires_at) VALUES (?, 1, ?)")->execute([$fullKey, $expires]);
    }
}

// Get base URL for uploads
function getUploadBaseUrl() {
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'];
    return $protocol . '://' . $host;
}


// Detailed Audit Logging
function logActivity($action, $table, $recordId, $details = null) {
    try {
        require_once __DIR__ . '/config/database.php';
        $pdo = Database::getInstance()->getConnection();
        
        $userId = $_SESSION['admin_id'] ?? 0;
        $userFullName = $_SESSION['admin_full_name'] ?? ($_SESSION['admin_username'] ?? 'Anonymous');
        
        $stmt = $pdo->prepare("INSERT INTO admin_activity_logs (user_id, user_full_name, action, target_table, target_id, details) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $userId,
            $userFullName,
            $action,
            $table,
            $recordId,
            is_array($details) ? json_encode($details, JSON_UNESCAPED_UNICODE) : $details
        ]);
        return true;
    } catch (Exception $e) {
        // Silently fail logging to prevent stopping the main transaction
        error_log("Logging failed: " . $e->getMessage());
        return false;
    }
}
