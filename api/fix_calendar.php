<?php
/**
 * Data Fix Script for Calendars
 * Updates test records to official 2026 data.
 */
require_once __DIR__ . '/config/database.php';

try {
    $pdo = Database::getInstance()->getConnection();
    
    // 1. Update the 'test' calendar record (id 6) to be the official one
    $stmt = $pdo->prepare("UPDATE publications SET 
        title = 'National Education Calendar 2026', 
        category = 'Education Calendar', 
        year = 2026, 
        description = 'Official National Education Calendar for all schools and institutions in Papua New Guinea for the 2026 academic year.',
        thumbnail_path = 'uploads/images/2026_Edu_Calendar.png',
        pdf_path = 'uploads/images/2026_Edu_Calendar.png'
        WHERE id = 6 OR title LIKE '%test calendar%'");
    
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        echo "Successfully updated " . $stmt->rowCount() . " calendar record(s).<br>";
    } else {
        // If id 6 doesn't exist or doesn't match, maybe create it?
        $count = $pdo->query("SELECT COUNT(*) FROM publications WHERE category LIKE '%Calendar%'")->fetchColumn();
        if ($count == 0) {
            $stmt = $pdo->prepare("INSERT INTO publications (title, category, year, description, thumbnail_path, pdf_path, sort_order) 
                VALUES ('National Education Calendar 2026', 'Education Calendar', 2026, 'Official National Education Calendar for 2026.', 'uploads/images/2026_Edu_Calendar.png', 'uploads/images/2026_Edu_Calendar.png', 1)");
            $stmt->execute();
            echo "Inserted new National Education Calendar record.<br>";
        } else {
            echo "Calendar records already exist. Check database for details.<br>";
        }
    }

    echo "Data fix complete.";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
