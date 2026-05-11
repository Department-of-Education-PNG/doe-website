<?php
require_once 'config.php';
require_once 'helpers.php';

$album_id = 1; // Assuming album 1 exists
$dummy_file = '../uploads/gallery/dummy_test.jpg';
file_put_contents($dummy_file, 'dummy image content');

$stmt = $pdo->prepare("INSERT INTO gallery_photos (album_id, image_path) VALUES (?, ?)");
$stmt->execute([$album_id, 'uploads/gallery/dummy_test.jpg']);

echo "Created dummy photo in DB and disk.\n";
echo "Path: uploads/gallery/dummy_test.jpg\n";
echo "Exists: " . (file_exists($dummy_file) ? 'YES' : 'NO') . "\n";
