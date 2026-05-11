<?php
/**
 * Authentication Middleware
 * Checks for valid admin session before allowing access to protected routes.
 */

function requireAuth() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized. Please log in.']);
        exit;
    }
}

/**
 * Enforce minimum role requirement
 */
function requireRole($requiredRole) {
    requireAuth();
    
    $userRole = $_SESSION['admin_role'] ?? 'editor';
    
    // hierarchy: super_admin > editor
    if ($requiredRole === 'super_admin' && $userRole !== 'super_admin') {
        http_response_code(403);
        echo json_encode(['error' => 'Forbidden. Super Admin access required.']);
        exit;
    }
}

function isLoggedIn() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    return isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;
}

function generateCsrfToken() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function verifyCsrfToken($token) {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}
