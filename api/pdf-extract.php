<?php
/**
 * PDF Text Extractor — Server-side, no external libraries required.
 * Uses pure PHP to parse PDF binary structure and extract text streams.
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

if ($file['error'] !== UPLOAD_ERR_OK) {
    jsonError('Upload error: ' . $file['error']);
}

$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
if ($ext !== 'pdf') {
    jsonError('Only PDF files supported');
}

if ($file['size'] > 20 * 1024 * 1024) {
    jsonError('File too large (max 20MB)');
}

$content = file_get_contents($file['tmp_name']);
if ($content === false) {
    jsonError('Could not read uploaded file');
}

$text = extractTextFromPdf($content);

if (empty(trim($text))) {
    // Try fallback: extract raw strings
    $text = extractRawStrings($content);
}

if (empty(trim($text))) {
    jsonError('No readable text found. This PDF may be a scanned image. Please paste the content manually.');
}

$text = cleanExtractedText($text);

jsonResponse([
    'success' => true,
    'text'    => $text,
    'chars'   => strlen($text),
    'words'   => str_word_count($text),
]);

// ── Pure PHP PDF text extraction ──────────────────────────────────

function extractTextFromPdf(string $data): string
{
    $text = '';

    // Strategy 1: Extract text from content streams between BT...ET blocks
    // These blocks contain the actual rendered text in a PDF
    if (preg_match_all('/BT[\s\S]*?ET/s', $data, $btBlocks)) {
        foreach ($btBlocks[0] as $block) {
            // Extract strings from Tj, TJ, ' and " operators
            // Tj — single string: (hello) Tj
            if (preg_match_all('/\(([^)\\\\]*(?:\\\\.[^)\\\\]*)*)\)\s*(?:Tj|\'|\")/s', $block, $tj)) {
                foreach ($tj[1] as $str) {
                    $text .= decodePdfString($str) . ' ';
                }
            }

            // TJ — array of strings: [(hel)(lo)] TJ
            if (preg_match_all('/\[([^\]]*)\]\s*TJ/s', $block, $tjs)) {
                foreach ($tjs[1] as $arr) {
                    if (preg_match_all('/\(([^)\\\\]*(?:\\\\.[^)\\\\]*)*)\)/s', $arr, $items)) {
                        foreach ($items[1] as $str) {
                            $text .= decodePdfString($str);
                        }
                    }
                }
                $text .= ' ';
            }
        }
    }

    // Strategy 2: Extract from compressed/uncompressed streams
    // Look for FlateDecode streams and try to decompress them
    if (function_exists('gzuncompress') || function_exists('gzinflate')) {
        $streamPattern = '/stream\r?\n([\s\S]*?)\r?\nendstream/';
        if (preg_match_all($streamPattern, $data, $streams)) {
            foreach ($streams[1] as $stream) {
                // Try zlib inflate (FlateDecode)
                $decoded = @gzuncompress($stream);
                if ($decoded === false) {
                    $decoded = @gzinflate($stream);
                }
                if ($decoded && strlen($decoded) > 10) {
                    // Extract BT/ET text from decompressed stream
                    if (preg_match_all('/BT[\s\S]*?ET/s', $decoded, $decompBlocks)) {
                        foreach ($decompBlocks[0] as $block) {
                            if (preg_match_all('/\(([^)\\\\]*(?:\\\\.[^)\\\\]*)*)\)\s*(?:Tj|\'|\")/s', $block, $tj)) {
                                foreach ($tj[1] as $str) {
                                    $text .= decodePdfString($str) . ' ';
                                }
                            }
                            if (preg_match_all('/\[([^\]]*)\]\s*TJ/s', $block, $tjs)) {
                                foreach ($tjs[1] as $arr) {
                                    if (preg_match_all('/\(([^)\\\\]*(?:\\\\.[^)\\\\]*)*)\)/s', $arr, $items)) {
                                        foreach ($items[1] as $str) {
                                            $text .= decodePdfString($str);
                                        }
                                    }
                                }
                                $text .= ' ';
                            }
                        }
                    }
                }
            }
        }
    }

    return $text;
}

function extractRawStrings(string $data): string
{
    // Last resort: pull all printable strings longer than 4 chars
    $text = '';
    preg_match_all('/\(([^\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\xff]{4,})\)/', $data, $matches);
    foreach ($matches[1] as $m) {
        if (ctype_print($m) || mb_detect_encoding($m, 'UTF-8', true)) {
            $text .= $m . ' ';
        }
    }
    return $text;
}

function decodePdfString(string $s): string
{
    // Handle PDF escape sequences
    $s = str_replace(['\\n', '\\r', '\\t'], ["\n", "\r", "\t"], $s);
    $s = preg_replace_callback('/\\\\([0-7]{1,3})/', function($m) {
        return chr(octdec($m[1]));
    }, $s);
    $s = str_replace(['\\\\', '\\(', '\\)'], ['\\', '(', ')'], $s);
    return $s;
}

function cleanExtractedText(string $text): string
{
    // Remove non-printable characters except newlines
    $text = preg_replace('/[^\x09\x0a\x0d\x20-\x7e\x80-\xff]/', ' ', $text);
    // Collapse whitespace
    $text = preg_replace('/[ \t]{2,}/', ' ', $text);
    $text = preg_replace('/\n{3,}/', "\n\n", $text);
    $text = trim($text);
    // Limit output
    if (strlen($text) > 60000) {
        $text = substr($text, 0, 60000) . "\n\n[Content truncated — " . strlen($text) . " total characters]";
    }
    return $text;
}
