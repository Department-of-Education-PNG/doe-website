<?php
/**
 * Migration: Audit Logging & Enhanced User Profiles
 * This script updates the database to support user tracking and detailed activity logs.
 */
require_once __DIR__ . '/config/database.php';

try {
    $pdo = Database::getInstance()->getConnection();

    // 1. Add full_name to admin_users if it doesn't exist
    $cols = $pdo->query("SHOW COLUMNS FROM `admin_users` LIKE 'full_name'")->fetch();
    if (!$cols) {
        $pdo->exec("ALTER TABLE `admin_users` ADD COLUMN `full_name` VARCHAR(100) AFTER `username` ");
        echo "✓ Added 'full_name' column to admin_users\n";
        
        // Populate existing admin with a default name
        $pdo->exec("UPDATE `admin_users` SET `full_name` = 'System Administrator' WHERE `username` = 'admin'");
    }

    // 2. Create admin_activity_logs table
    $pdo->exec("CREATE TABLE IF NOT EXISTS `admin_activity_logs` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `user_id` INT NOT NULL,
        `user_full_name` VARCHAR(100) NOT NULL,
        `action` VARCHAR(50) NOT NULL,
        `target_table` VARCHAR(50) NOT NULL,
        `target_id` INT DEFAULT NULL,
        `details` TEXT DEFAULT NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    echo "✓ Created 'admin_activity_logs' table\n";

    echo "\nAll migrations completed successfully.";

} catch (Exception $e) {
    die("Migration failed: " . $e->getMessage());
}
