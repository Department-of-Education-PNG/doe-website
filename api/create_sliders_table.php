<?php
require_once __DIR__ . '/config/database.php';

try {
    $pdo = Database::getInstance()->getConnection();
    
    $sql = "CREATE TABLE IF NOT EXISTS sliders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        image_path VARCHAR(255) NOT NULL,
        sort_order INT DEFAULT 0,
        is_active TINYINT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
    
    $pdo->exec($sql);
    
    // Insert initial data if empty
    $count = $pdo->query("SELECT COUNT(*) FROM sliders")->fetchColumn();
    if ($count == 0) {
        $initial = [
            ['Hero Image 1', 'assets/images/hero/hero-1.jpg', 1],
            ['Hero Image 2', 'assets/images/hero/hero-2.jpg', 2],
            ['Hero Image 3', 'assets/images/hero/hero-3.jpg', 3],
            ['Hero Image 4', 'assets/images/hero/hero-4.jpg', 4],
        ];
        
        $stmt = $pdo->prepare("INSERT INTO sliders (title, image_path, sort_order) VALUES (?, ?, ?)");
        foreach ($initial as $row) {
            $stmt->execute($row);
        }
    }
    
    echo "Success: Sliders table created and seeded.";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
