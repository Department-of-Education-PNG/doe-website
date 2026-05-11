<?php
/**
 * Auth API — Login / Logout / Session Check
 */
session_start();
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/middleware/auth.php';

jsonHeaders();

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'login':
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') jsonError('POST required', 405);
        
        // Rate limit: 5 attempts per 15 minutes per IP
        checkRateLimit('login', 5, 15);

        $data = getPostData();
        validateRequired($data, ['username', 'password']);

        $pdo = Database::getInstance()->getConnection();
        $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE username = ? LIMIT 1");
        $stmt->execute([$data['username']]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($data['password'], $user['password_hash'])) {
            jsonError('Invalid username or password', 401);
        }

        // Update last login
        $pdo->prepare("UPDATE admin_users SET last_login = NOW() WHERE id = ?")->execute([$user['id']]);

        // Set session
        session_regenerate_id(true);
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_id'] = $user['id'];
        $_SESSION['admin_username'] = $user['username'];
        $_SESSION['admin_full_name'] = $user['full_name'] ?? $user['username'];
        $_SESSION['admin_role'] = $user['role'] ?? 'editor';
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));

        jsonResponse([
            'success' => true,
            'message' => 'Login successful',
            'csrf_token' => $_SESSION['csrf_token']
        ]);
        break;

    case 'logout':
        session_destroy();
        jsonResponse(['success' => true, 'message' => 'Logged out']);
        break;

    case 'check':
        $loggedIn = isLoggedIn();
        $role = $_SESSION['admin_role'] ?? null;
        
        // Auto-Repair: If logged in but role is missing (post-migration), fetch it.
        if ($loggedIn && !$role && isset($_SESSION['admin_id'])) {
            $pdo = Database::getInstance()->getConnection();
            $stmt = $pdo->prepare("SELECT role FROM admin_users WHERE id = ?");
            $stmt->execute([$_SESSION['admin_id']]);
            $role = $stmt->fetchColumn();
            if ($role) {
                $_SESSION['admin_role'] = $role;
            }
        }

        jsonResponse([
            'logged_in' => $loggedIn,
            'username' => $_SESSION['admin_username'] ?? null,
            'full_name' => $_SESSION['admin_full_name'] ?? null,
            'role' => $role
        ]);
        break;

    case 'change_password':
        requireAuth();
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') jsonError('POST required', 405);
        $data = getPostData();
        validateRequired($data, ['current_password', 'new_password']);

        if (strlen($data['new_password']) < 8) {
            jsonError('New password must be at least 8 characters');
        }

        $pdo = Database::getInstance()->getConnection();
        $stmt = $pdo->prepare("SELECT password_hash FROM admin_users WHERE id = ?");
        $stmt->execute([$_SESSION['admin_id']]);
        $user = $stmt->fetch();

        if (!password_verify($data['current_password'], $user['password_hash'])) {
            jsonError('Current password is incorrect', 401);
        }

        $newHash = password_hash($data['new_password'], PASSWORD_BCRYPT);
        $pdo->prepare("UPDATE admin_users SET password_hash = ? WHERE id = ?")->execute([$newHash, $_SESSION['admin_id']]);

        jsonResponse(['success' => true, 'message' => 'Password changed successfully']);
        break;

    default:
        jsonError('Invalid action. Use: login, logout, check, change_password');
}
