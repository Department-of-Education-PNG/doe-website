<?php
/**
 * SECURE ADMIN CREATOR SCRIPT
 * Use this to create your first admin account after migrating from Firebase.
 * 
 * INSTRUCTIONS:
 * 1. Open this file in your browser: domain.com/api/create_admin.php
 * 2. It will create a default admin user.
 * 3. DELETE THIS FILE IMMEDIATELY AFTER USE.
 */

require_once __DIR__ . '/config/database.php';

// --- CONFIGURATION ---
$new_username = 'admin@education.gov.pg';
$new_password = 'Password2026!'; // CHANGE THIS AFTER LOGIN
$display_name = 'Portal Administrator';

// --- EXECUTION ---
try {
    $pdo = Database::getInstance()->getConnection();
    
    // Check if user exists
    $stmt = $pdo->prepare("SELECT id FROM admin_users WHERE username = ?");
    $stmt->execute([$new_username]);
    
    if ($stmt->fetch()) {
        die("<h3>Setup Error: Admin user already exists.</h3><p>Please use the password reset feature or check your database.</p>");
    }

    // Create hash
    $hash = password_hash($new_password, PASSWORD_BCRYPT);

    // Insert
    $stmt = $pdo->prepare("INSERT INTO admin_users (username, password_hash, full_name, role) VALUES (?, ?, ?, 'superadmin')");
    $stmt->execute([$new_username, $hash, $display_name]);

    echo "<h1>Department of Education — Admin Setup</h1>";
    echo "<p style='color: green; font-weight: bold;'>SUCCESS: Admin account created successfully!</p>";
    echo "<ul>";
    echo "<li><b>URL:</b> <a href='../admin/'>admin/</a></li>";
    echo "<li><b>Username:</b> $new_username</li>";
    echo "<li><b>Password:</b> $new_password</li>";
    echo "</ul>";
    echo "<p style='color: red; font-weight: bold;'>⚠️ IMPORTANT: Delete this file (api/create_admin.php) from your server immediately for security.</p>";

} catch (Exception $e) {
    echo "<h3>System Error</h3>";
    echo "<pre>" . $e->getMessage() . "</pre>";
}
