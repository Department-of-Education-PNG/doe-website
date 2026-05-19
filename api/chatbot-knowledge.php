<?php
/**
 * Chatbot Knowledge Base API
 * Super Admin only — manages EduBot training data
 */
require_once __DIR__ . '/middleware/auth.php';
safe_session_start();
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/helpers.php';

jsonHeaders();
requireAuth();

// Super admin only
if ($_SESSION['admin_role'] !== 'super_admin') {
    jsonError('Unauthorized', 403);
}

$pdo    = Database::getInstance()->getConnection();
$action = $_GET['action'] ?? 'list';

// ── Ensure table exists ────────────────────────────────────────
$pdo->exec("CREATE TABLE IF NOT EXISTS chatbot_knowledge (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    source_type ENUM('text','url','file') NOT NULL DEFAULT 'text',
    source_ref  VARCHAR(500) NULL COMMENT 'URL or uploaded file path',
    content     LONGTEXT NOT NULL,
    status      ENUM('active','inactive') NOT NULL DEFAULT 'active',
    word_count  INT DEFAULT 0,
    created_by  INT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)");

switch ($action) {

    // ── List all entries ───────────────────────────────────────
    case 'list':
        $stmt = $pdo->query("SELECT id, title, source_type, source_ref, status, word_count, created_at FROM chatbot_knowledge ORDER BY created_at DESC");
        jsonResponse(['data' => $stmt->fetchAll()]);
        break;

    // ── Get one entry (for editing) ────────────────────────────
    case 'get':
        $stmt = $pdo->prepare("SELECT * FROM chatbot_knowledge WHERE id = ?");
        $stmt->execute([(int)$_GET['id']]);
        $row = $stmt->fetch();
        if (!$row) jsonError('Not found', 404);
        jsonResponse($row);
        break;

    // ── Create text or url entry ───────────────────────────────
    case 'create':
        $data = getPostData();
        validateRequired($data, ['title', 'source_type']);

        $title      = sanitize($data['title']);
        $sourceType = in_array($data['source_type'], ['text', 'url', 'file']) ? $data['source_type'] : 'text';
        $sourceRef  = sanitize($data['source_ref'] ?? '');
        $content    = trim($data['content']);
        $status     = ($data['status'] ?? 'active') === 'inactive' ? 'inactive' : 'active';
        $wordCount  = str_word_count(strip_tags($content));

        $stmt = $pdo->prepare("INSERT INTO chatbot_knowledge (title, source_type, source_ref, content, status, word_count, created_by) VALUES (?,?,?,?,?,?,?)");
        $stmt->execute([$title, $sourceType, $sourceRef, $content, $status, $wordCount, $_SESSION['admin_id'] ?? null]);
        $newId = $pdo->lastInsertId();
        jsonResponse(['success' => true, 'id' => $newId], 201);
        break;

    // ── Update entry ───────────────────────────────────────────
    case 'update':
        $data = getPostData();
        validateRequired($data, ['id', 'title']);

        $id         = (int)$data['id'];
        $title      = sanitize($data['title']);
        $sourceType = in_array($data['source_type'] ?? '', ['text', 'url', 'file']) ? $data['source_type'] : 'text';
        $sourceRef  = sanitize($data['source_ref'] ?? '');
        $content    = trim($data['content']);
        $status     = ($data['status'] ?? 'active') === 'inactive' ? 'inactive' : 'active';
        $wordCount  = str_word_count(strip_tags($content));

        $stmt = $pdo->prepare("UPDATE chatbot_knowledge SET title=?, source_type=?, source_ref=?, content=?, status=?, word_count=? WHERE id=?");
        $stmt->execute([$title, $sourceType, $sourceRef, $content, $status, $wordCount, $id]);
        jsonResponse(['success' => true]);
        break;

    // ── Delete entry ───────────────────────────────────────────
    case 'delete':
        $id = (int)($_GET['id'] ?? 0);
        if (!$id) jsonError('Invalid ID');
        $pdo->prepare("DELETE FROM chatbot_knowledge WHERE id = ?")->execute([$id]);
        jsonResponse(['success' => true]);
        break;

    // ── Scrape a URL and return text ───────────────────────────
    case 'scrape':
        $data = getPostData();
        $url  = trim($data['url'] ?? '');

        if (empty($url) || !filter_var($url, FILTER_VALIDATE_URL)) {
            jsonError('Invalid URL');
        }

        $ctx = stream_context_create([
            'http' => [
                'timeout'          => 15,
                'user_agent'       => 'Mozilla/5.0 (compatible; DoE-EduBot/1.0)',
                'follow_location'  => true,
                'ignore_errors'    => true,
            ],
        ]);

        $html = @file_get_contents($url, false, $ctx);

        if (!$html && function_exists('curl_init')) {
            $ch = curl_init($url);
            curl_setopt_array($ch, [
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_TIMEOUT        => 15,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_USERAGENT      => 'Mozilla/5.0 (compatible; DoE-EduBot/1.0)',
            ]);
            $html = curl_exec($ch);
            curl_close($ch);
        }

        if (!$html) {
            jsonError('Could not fetch URL. The website may be blocking automated access.');
        }

        // Strip scripts, styles, nav, footer
        $html = preg_replace('/<(script|style|nav|footer|header)[^>]*>.*?<\/\1>/si', '', $html);

        // Get text
        $text = html_entity_decode(strip_tags($html), ENT_QUOTES | ENT_HTML5, 'UTF-8');

        // Clean up whitespace
        $text = preg_replace('/[ \t]+/', ' ', $text);
        $text = preg_replace('/\n{3,}/', "\n\n", $text);
        $text = trim($text);

        // Limit to 8000 chars
        if (strlen($text) > 8000) {
            $text = substr($text, 0, 8000) . "\n\n[Content truncated — " . strlen($text) . " characters total]";
        }

        jsonResponse(['content' => $text, 'length' => strlen($text)]);
        break;

    // ── Toggle status ──────────────────────────────────────────
    case 'toggle':
        $id   = (int)($_GET['id'] ?? 0);
        $stmt = $pdo->prepare("UPDATE chatbot_knowledge SET status = IF(status='active','inactive','active') WHERE id=?");
        $stmt->execute([$id]);
        jsonResponse(['success' => true]);
        break;

    default:
        jsonError('Unknown action');
}
