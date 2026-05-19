<?php
/**
 * Authentication Middleware
 * Checks for valid admin session before allowing access to protected routes.
 *
 * Roles (in descending privilege):
 *   super_admin       – Full access to everything
 *   curriculum_admin  – Access limited to curriculum_materials & textbooks
 *   editor            – General content access (legacy / fallback)
 */

function safe_session_start() {
    if (session_status() === PHP_SESSION_NONE) {
        $isSecure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || ($_SERVER['SERVER_PORT'] ?? 80) == 443;
        session_set_cookie_params([
            'path' => '/',
            'secure' => $isSecure,
            'httponly' => true,
            'samesite' => 'Lax'
        ]);
        session_start();
    }
}

function requireAuth() {
    safe_session_start();

    if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized. Please log in.']);
        exit;
    }
}

/**
 * Enforce minimum role requirement.
 * Hierarchy: super_admin > curriculum_admin > editor
 */
function requireRole($requiredRole) {
    requireAuth();

    $userRole = $_SESSION['admin_role'] ?? 'editor';

    if ($requiredRole === 'super_admin' && $userRole !== 'super_admin') {
        http_response_code(403);
        echo json_encode(['error' => 'Forbidden. Super Admin access required.']);
        exit;
    }
}

/**
 * Allow only super_admin and curriculum_admin.
 * Used by curriculum.php and textbooks.php to block regular editors.
 */
function requireCurriculumAccess() {
    requireAuth();

    $userRole = $_SESSION['admin_role'] ?? 'editor';
    $allowed = ['super_admin', 'curriculum_admin'];

    if (!in_array($userRole, $allowed)) {
        http_response_code(403);
        echo json_encode(['error' => 'Forbidden. Curriculum Admin or Super Admin access required.']);
        exit;
    }
}

/**
 * Check if the current user has a given role or higher.
 */
function hasRole($role) {
    safe_session_start();
    $userRole = $_SESSION['admin_role'] ?? 'editor';
    if ($role === 'super_admin') return $userRole === 'super_admin';
    if ($role === 'curriculum_admin') return in_array($userRole, ['super_admin', 'curriculum_admin']);
    return true; // editor or any authenticated user
}

function isLoggedIn() {
    safe_session_start();
    return isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;
}

function generateCsrfToken() {
    safe_session_start();
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function verifyCsrfToken($token) {
    safe_session_start();
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}
