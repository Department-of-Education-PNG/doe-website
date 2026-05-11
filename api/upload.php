<?php
/**
 * File Upload Handler
 * Handles image and document uploads for admin panel.
 */
require_once __DIR__ . '/middleware/auth.php';
require_once __DIR__ . '/helpers.php';

jsonHeaders();
requireAuth();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonError('POST required', 405);
}

if (empty($_FILES['file'])) {
    jsonError('No file uploaded');
}

$file = $_FILES['file'];
$type = $_POST['type'] ?? 'image'; // 'image' or 'document'

// Validate file error
if ($file['error'] !== UPLOAD_ERR_OK) {
    $errorMessages = [
        UPLOAD_ERR_INI_SIZE => 'File exceeds maximum upload size',
        UPLOAD_ERR_FORM_SIZE => 'File exceeds form maximum size',
        UPLOAD_ERR_PARTIAL => 'File was only partially uploaded',
        UPLOAD_ERR_NO_FILE => 'No file was uploaded',
        UPLOAD_ERR_NO_TMP_DIR => 'Missing temporary folder',
        UPLOAD_ERR_CANT_WRITE => 'Failed to write file to disk',
    ];
    jsonError($errorMessages[$file['error']] ?? 'Unknown upload error');
}

// Max file size: 10MB
$maxSize = 10 * 1024 * 1024;
if ($file['size'] > $maxSize) {
    jsonError('File size exceeds 10MB limit');
}

// Allowed extensions
$imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
$documentExtensions = ['pdf', 'jpg', 'jpeg', 'png', 'webp', 'docx', 'doc', 'xls', 'xlsx', 'txt', 'csv'];
$knowledgeExtensions = ['pdf', 'txt', 'csv', 'xlsx', 'xls', 'docx', 'doc'];

if ($type === 'knowledge') {
    $allowedExtensions = $knowledgeExtensions;
} elseif ($type === 'document') {
    $allowedExtensions = $documentExtensions;
} else {
    $allowedExtensions = $imageExtensions;
}

$originalName = $file['name'];
$extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

if (!in_array($extension, $allowedExtensions)) {
    jsonError('File type not allowed. Accepted: ' . implode(', ', $allowedExtensions));
}

// Validate MIME type
$finfo = new finfo(FILEINFO_MIME_TYPE);
$mimeType = $finfo->file($file['tmp_name']);

$allowedMimes = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'application/pdf', 'text/plain', 'text/csv', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel'
];

if (!in_array($mimeType, $allowedMimes)) {
    jsonError('Invalid file type detected');
}

// Generate clean, descriptive filename
$fileNameOnly = preg_replace('/[^a-zA-Z0-9_.-]/', '', pathinfo($originalName, PATHINFO_FILENAME));
$newFilename = $fileNameOnly . '.' . $extension;

// Determine upload directory
$baseDir = realpath(__DIR__ . '/../uploads');
if (!$baseDir) {
    $baseDir = __DIR__ . '/../uploads';
    if (!is_dir($baseDir)) mkdir($baseDir, 0755, true);
    $baseDir = realpath($baseDir);
}

// Map the requested folder to a physical subfolder
$requestedFolder = $_POST['folder'] ?? '';
$isGallery = (isset($_POST['gallery']) && $_POST['gallery'] === '1') || $requestedFolder === 'gallery';

if ($isGallery) {
    $subDir = 'gallery';
} elseif (!empty($requestedFolder)) {
    // Whitelist allowed folders to prevent directory traversal
    $allowedFolders = ['news', 'press', 'events', 'publications', 'textbooks', 'jobs', 'scholarships', 'forms', 'notices', 'apps', 'calendars', 'knowledge'];
    $subDir = in_array($requestedFolder, $allowedFolders) ? $requestedFolder : ($type === 'document' || $type === 'knowledge' ? 'documents' : 'images');
} else {
    $subDir = ($type === 'document' || $type === 'knowledge') ? 'documents' : 'images';
    if ($type === 'knowledge') $subDir = 'knowledge';
}

$uploadDir = $baseDir . DIRECTORY_SEPARATOR . $subDir;
if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);

// Handle name collisions cleanly (filename-1.pdf, filename-2.pdf)
$counter = 1;
$fileNameOnly = preg_replace('/[^a-zA-Z0-9_.-]/', '', pathinfo($originalName, PATHINFO_FILENAME));
$finalName = $fileNameOnly . '.' . $extension;

while (file_exists($uploadDir . DIRECTORY_SEPARATOR . $finalName)) {
    $finalName = $fileNameOnly . '-' . $counter . '.' . $extension;
    $counter++;
}
$newFilename = $finalName;

$destination = $uploadDir . DIRECTORY_SEPARATOR . $newFilename;

if (move_uploaded_file($file['tmp_name'], $destination)) {
    // Return relative path for storage in DB
    $relativePath = "uploads/$subDir/$newFilename";
    
    // Custom transformation for masked URLs
    if ($requestedFolder === 'forms') {
        $relativePath = "f$newFilename";
    } elseif ($requestedFolder === 'publications' || $requestedFolder === 'textbooks') {
        $relativePath = $newFilename; // No prefix as requested
    }
    
    jsonResponse([
        'success' => true,
        'path' => $relativePath,
        'file_path' => $relativePath,
        'file_name' => $newFilename,
        'file_size' => $file['size'],
        'mime_type' => $mimeType
    ]);
} else {
    jsonError('Failed to save uploaded file', 500);
}
