<?php
/**
 * RBAC Diagnostic & Auto-Fix Tool
 * Use this to verify why tabs are missing and force-fix your account.
 */
session_start();
require_once __DIR__ . '/config/database.php';

echo "<html><head><title>RBAC Diagnostic</title><style>body{font-family:sans-serif;line-height:1.6;padding:20px;max-width:800px;margin:0 auto;background:#f4f7f6;} .card{background:#white;padding:20px;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.1);margin-bottom:20px;} h2{color:#1a1a2e;} .status{padding:10px;border-radius:4px;font-weight:bold;} .success{background:#d4edda;color:#155724;} .error{background:#f8d7da;color:#721c24;} .info{background:#e2e3e5;color:#383d41;} pre{background:#eee;padding:10px;border-radius:4px;overflow-x:auto;}</style></head><body>";
echo "<h2>RBAC Diagnostic Tool</h2>";

// 1. Check Session State
echo "<div class='card'><h3>1. Current Session State</h3>";
if (!isset($_SESSION['admin_id'])) {
    echo "<p class='status error'>❌ You are not logged in! Please log in to the dashboard first, then come back to this page.</p>";
} else {
    echo "<ul>";
    echo "<li><strong>User ID:</strong> " . $_SESSION['admin_id'] . "</li>";
    echo "<li><strong>Username:</strong> " . ($_SESSION['admin_username'] ?? 'Not set') . "</li>";
    echo "<li><strong>Session Role:</strong> <span class='status info'>" . ($_SESSION['admin_role'] ?? 'NOT SET') . "</span></li>";
    echo "</ul>";
}
echo "</div>";

// 2. Check Database State
echo "<div class='card'><h3>2. Database State</h3>";
try {
    $pdo = Database::getInstance()->getConnection();
    $username = $_SESSION['admin_username'] ?? 'admin';
    
    $stmt = $pdo->prepare("SELECT id, username, role FROM admin_users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if (!$user) {
        echo "<p class='status error'>❌ User '$username' not found in database.</p>";
    } else {
        echo "<ul>";
        echo "<li><strong>DB User ID:</strong> " . $user['id'] . "</li>";
        echo "<li><strong>DB Role:</strong> <span class='status info'>" . ($user['role'] ?? 'NULL (Table might not be updated)') . "</span></li>";
        echo "</ul>";
        
        if ($user['role'] !== 'super_admin') {
            echo "<p class='status error'>❌ Your database role is NOT 'super_admin'. This is why tabs are hidden.</p>";
            echo "<form method='POST'><button type='submit' name='fix_db' style='padding:10px 20px;background:#1a1a2e;color:white;border:none;border-radius:4px;cursor:pointer;'>Click here to fix Database Role</button></form>";
        } else {
            echo "<p class='status success'>✅ Database role is correct (super_admin).</p>";
        }
    }
} catch (Exception $e) {
    echo "<p class='status error'>❌ Database Error: " . $e->getMessage() . "</p>";
}
echo "</div>";

// 3. Handle Fix Actions
if (isset($_POST['fix_db'])) {
    try {
        $stmt = $pdo->prepare("UPDATE admin_users SET role = 'super_admin' WHERE username = ?");
        $stmt->execute([$username]);
        echo "<p class='status success'>✅ Database updated! Please refresh this page.</p>";
    } catch (Exception $e) {
        echo "<p class='status error'>❌ Failed to update database: " . $e->getMessage() . "</p>";
    }
}

// 4. Force Update Session
echo "<div class='card'><h3>3. Session Management</h3>";
if (isset($user) && $user['role'] === 'super_admin' && ($_SESSION['admin_role'] ?? '') !== 'super_admin') {
    $_SESSION['admin_role'] = 'super_admin';
    echo "<p class='status success'>✅ SESSION FIXED! Your session was out of date, I have force-updated it to Super Admin.</p>";
} else if (isset($_SESSION['admin_role']) && $_SESSION['admin_role'] === 'super_admin') {
    echo "<p class='status success'>✅ Your session is already marked as Super Admin.</p>";
}

echo "<p>If everything above is green, <a href='../admin/dashboard.php'>return to your dashboard</a> and refresh (Ctrl+F5). The tabs should now be visible.</p>";
echo "</div>";

echo "</body></html>";
