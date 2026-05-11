<?php
/**
 * RBAC Migration Script
 * Adds 'role' column to admin_users.
 */
require_once __DIR__ . '/config/database.php';

try {
    $pdo = Database::getInstance()->getConnection();
    
    echo "Starting RBAC Migration...\n";

    // 1. Add role column
    $pdo->exec("ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS role ENUM('super_admin', 'editor') DEFAULT 'editor' AFTER email");
    echo "✅ Column 'role' added to 'admin_users'.\n";

    // 2. Set current admin as super_admin
    $pdo->exec("UPDATE admin_users SET role = 'super_admin' WHERE username = 'admin'");
    echo "✅ User 'admin' promoted to 'super_admin'.\n";

    echo "\nMigration successful!\n";
    echo "You can now manage roles in the dashboard.\n";

} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}
