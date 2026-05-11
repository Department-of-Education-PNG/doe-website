<?php
require_once __DIR__ . '/config/database.php';
$pdo = Database::getInstance()->getConnection();
echo "<h3>Publications Schema:</h3><pre>";
$cols = $pdo->query("DESCRIBE publications")->fetchAll(PDO::FETCH_ASSOC);
print_r($cols);
echo "</pre>";
?>
