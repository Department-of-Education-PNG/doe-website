<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// ── Config ─────────────────────────────────────────────────────
$secrets = include __DIR__ . '/config/secrets.php';
$apiKey  = $secrets['openrouter_api_key'] ?? '';
$siteUrl = 'https://demo2.education.gov.pg';
$apiUrl  = 'https://openrouter.ai/api/v1/chat/completions';

// Try these models in order until one works
$models = [
    'poolside/laguna-m.1:free',
    'deepseek/deepseek-r1:free',
    'qwen/qwen-2.5-7b-instruct:free',
    'mistralai/mistral-7b-instruct:free',
    'meta-llama/llama-3.2-3b-instruct:free',
];

// ── System Prompt ──────────────────────────────────────────────
$systemPrompt = 'You are EduBot, an official AI assistant for the National Department of Education (NDoE) of Papua New Guinea. Be friendly, professional, and concise.

You ONLY answer questions related to the Department of Education Papua New Guinea. You do NOT search the internet or answer questions about unrelated topics.

You help citizens, teachers, students and parents with:
- TFF Policy: Government pays school fees for Grades 1-12
- Education levels: Elementary (Prep-Gr2), Primary (Gr3-8), Secondary (Gr9-12), Vocational
- Teacher recruitment and TSC (Teaching Service Commission)
- Publications, Annual Reports, Curriculum materials
- School term dates (4 terms per year)
- News, press releases, gallery
- Digital Applications portal on the website
- Forms and official documents available on the website

FORMATTING RULES (strictly follow these):
- Do NOT use Markdown formatting of any kind.
- Do NOT use asterisks (*) for bold or italics.
- Do NOT use hashtags (#) for headers or headings.
- Do NOT use hyphens or dashes as bullet points at the start of lines.
- Use CAPS to emphasise important words or section labels (e.g. WHO CAN APPLY, REQUIREMENTS).
- Use plain numbered lists (1. 2. 3.) for steps.
- Use blank lines to separate sections.
- Keep responses SHORT and to the point. Summarise key information in 3-6 lines maximum.
- NEVER write long paragraphs. Break information into short, punchy sentences.
- ALWAYS complete every word and sentence before ending your response. Never truncate mid-word.
- ALWAYS end every response with a short, friendly follow-up line asking if the user needs more help or is confused. For example: "Does that help? Let me know if you need me to explain any step." or "Do you have any questions about this process?" or "Would you like help with anything else?"

RESPONSE STRUCTURE (follow this order every time):
1. CONTEXT LINE — One sentence summarising what the topic/situation is (e.g. "You cannot get a duplicate Grade 12 certificate. The Department issues a Statement of Results as the legal replacement.")
2. DETAILS — The steps, requirements, or information the user needs, using short numbered or plain lists.
3. FOLLOW-UP — A friendly closing line inviting the user to ask more questions or ask for clarification.
Always continue assisting the user based on what they reply next.

REFERRAL OFFICES (use these when you cannot fully answer a question):
- GENERAL ENQUIRIES: secretary@education.gov.pg
- EXAMINATIONS & RESULTS (Grade 8, 10, 12, Statement of Results): msu@education.gov.pg
- TEACHER MATTERS & RECRUITMENT (TSC): tsc@education.gov.pg
- CURRICULUM & SYLLABUS: cdad@education.gov.pg
- SCHOLARSHIPS & GRANTS: scholarships@education.gov.pg
- SPECIAL EDUCATION NEEDS: specialed@education.gov.pg
- TECHNICAL & VOCATIONAL EDUCATION: tvet@education.gov.pg
- SCHOOL INSPECTIONS & STANDARDS: inspection@education.gov.pg
- MEDIA & COMMUNICATIONS: media@education.gov.pg

STRICT RULES:
- If you cannot answer a question fully from your knowledge base or the documents provided, do NOT guess or search outside.
- Instead, say something like: "I am not able to fully answer that from my current information. I will refer you to the [OFFICE NAME] who can assist you directly. Please email: [EMAIL ADDRESS]"
- Always choose the most relevant office for the topic.
- Never make up facts, links, or email addresses not listed above.
- Never answer questions unrelated to education in Papua New Guinea.
- If someone asks something completely off-topic, politely say you are only able to assist with Department of Education matters.';

// ── Load Knowledge Base from DB ────────────────────────────────
$knowledgeContext = '';
try {
    require_once __DIR__ . '/config/database.php';
    $pdo  = Database::getInstance()->getConnection();

    // 1. Custom trained knowledge entries
    $stmt = $pdo->query(
        "SELECT title, content FROM chatbot_knowledge
         WHERE status = 'active' AND content != ''
         ORDER BY created_at ASC
         LIMIT 30"
    );
    $entries = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (!empty($entries)) {
        $knowledgeContext .= "\n\n--- OFFICIAL DEPARTMENT KNOWLEDGE BASE ---\n";
        $knowledgeContext .= "Use the following verified information to answer questions accurately:\n\n";
        foreach ($entries as $entry) {
            $knowledgeContext .= "[ " . $entry['title'] . " ]\n";
            $knowledgeContext .= substr(trim($entry['content']), 0, 2000) . "\n\n";
        }
        $knowledgeContext .= "--- END OF KNOWLEDGE BASE ---\n";
    }

    // 2. Available Forms with direct download links
    $formsStmt = $pdo->query(
        "SELECT title, description, category, pdf_path
         FROM public_forms
         WHERE pdf_path IS NOT NULL AND pdf_path != ''
         ORDER BY sort_order ASC
         LIMIT 50"
    );
    $forms = $formsStmt->fetchAll(PDO::FETCH_ASSOC);
    if (!empty($forms)) {
        $knowledgeContext .= "\n--- AVAILABLE FORMS (provide these direct links when asked) ---\n";
        foreach ($forms as $f) {
            $url = $siteUrl . '/' . ltrim($f['pdf_path'], '/');
            $knowledgeContext .= "FORM: " . $f['title'];
            if (!empty($f['category'])) $knowledgeContext .= " [" . $f['category'] . "]";
            $knowledgeContext .= " — LINK: " . $url . "\n";
            if (!empty($f['description'])) $knowledgeContext .= "  Description: " . substr($f['description'], 0, 120) . "\n";
        }
        $knowledgeContext .= "--- END OF FORMS ---\n";
    }

    // 3. Available Publications & PDFs with direct download links
    $pubsStmt = $pdo->query(
        "SELECT title, category, year, description, pdf_path
         FROM publications
         WHERE pdf_path IS NOT NULL AND pdf_path != ''
         ORDER BY year DESC, sort_order ASC
         LIMIT 60"
    );
    $pubs = $pubsStmt->fetchAll(PDO::FETCH_ASSOC);
    if (!empty($pubs)) {
        $knowledgeContext .= "\n--- AVAILABLE PUBLICATIONS & DOCUMENTS (provide these direct links when asked) ---\n";
        foreach ($pubs as $p) {
            $url = $siteUrl . '/' . ltrim($p['pdf_path'], '/');
            $knowledgeContext .= "DOC: " . $p['title'];
            if (!empty($p['year'])) $knowledgeContext .= " (" . $p['year'] . ")";
            if (!empty($p['category'])) $knowledgeContext .= " [" . $p['category'] . "]";
            $knowledgeContext .= " — LINK: " . $url . "\n";
        }
        $knowledgeContext .= "--- END OF PUBLICATIONS ---\n";
    }

    if (!empty($knowledgeContext)) {
        $knowledgeContext .= "\nIMPORTANT: When a user asks for a form or document, always provide the direct LINK from the lists above. State the title and the link clearly. Do not make up links.";
        // Wrap the entire context with a hard grounding instruction
        $knowledgeContext = "\n\n=== YOUR ONLY KNOWLEDGE SOURCE ===\n"
            . "You MUST answer ONLY from the information below. "
            . "Do NOT use your pre-trained general knowledge. "
            . "Do NOT make up information not found below. "
            . "If the answer is not in the content below, say you do not have that information and refer the user to the appropriate office.\n"
            . $knowledgeContext
            . "\n=== END OF KNOWLEDGE SOURCE — DO NOT USE ANY OTHER INFORMATION ===";
    }

} catch (Exception $e) {
    // Silently fail — chatbot still works without KB
}

// ── Read Request ───────────────────────────────────────────────
$input = json_decode(file_get_contents('php://input'), true);
if (empty($input['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Message is required']);
    exit();
}

$userMessage = trim(substr($input['message'], 0, 1000));
$history     = isset($input['history']) && is_array($input['history']) ? array_slice($input['history'], -20) : [];

$messages   = [['role' => 'system', 'content' => $systemPrompt . $knowledgeContext]];
foreach ($history as $h) {
    if (!empty($h['role']) && !empty($h['content'])) {
        $messages[] = ['role' => $h['role'], 'content' => $h['content']];
    }
}
$messages[] = ['role' => 'user', 'content' => $userMessage];

$headers = [
    'Authorization: Bearer ' . $apiKey,
    'Content-Type: application/json',
    'HTTP-Referer: ' . $siteUrl,
    'X-Title: Department of Education PNG',
];

// ── Try Each Model ─────────────────────────────────────────────
$reply = null;

foreach ($models as $model) {
    $payload = json_encode([
        'model'       => $model,
        'messages'    => $messages,
        'max_tokens'  => 450,  // Short replies = complete sentences, never truncated
        'temperature' => 0.1,  // Hardened: strictly factual and deterministic
        'top_p'       => 0.9,  // Restrict token sampling to most likely responses
    ]);

    $response = false;
    $httpCode = 0;

    // Attempt 1: cURL
    if (function_exists('curl_init')) {
        $ch = curl_init($apiUrl);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST           => true,
            CURLOPT_POSTFIELDS     => $payload,
            CURLOPT_HTTPHEADER     => $headers,
            CURLOPT_TIMEOUT        => 25,
        ]);
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
    }

    // Attempt 2: file_get_contents fallback
    if (!$response || $httpCode === 0) {
        $ctx = stream_context_create([
            'http' => [
                'method'        => 'POST',
                'header'        => implode("\r\n", $headers),
                'content'       => $payload,
                'timeout'       => 25,
                'ignore_errors' => true,
            ],
        ]);
        $response = @file_get_contents($apiUrl, false, $ctx);
        if (isset($http_response_header[0]) && preg_match('/\s(\d{3})\s/', $http_response_header[0], $m)) {
            $httpCode = (int)$m[1];
        }
    }

    if (!$response) continue;

    $data = json_decode($response, true);

    // If any model-level or provider error — try the next model
    if (isset($data['error'])) {
        $errMsg = $data['error']['message'] ?? '';
        // These are retryable errors — move to next model
        if (stripos($errMsg, 'No endpoints') !== false ||
            stripos($errMsg, 'Provider returned error') !== false ||
            stripos($errMsg, 'overloaded') !== false ||
            stripos($errMsg, 'rate limit') !== false ||
            ($data['error']['code'] ?? 0) >= 500) {
            continue;
        }
        // Other errors (auth, bad request etc) — stop and report
        http_response_code(500);
        echo json_encode(['error' => 'AI error: ' . $errMsg]);
        exit();
    }

    $reply = $data['choices'][0]['message']['content'] ?? null;
    if ($reply) break;
}

// ── Respond ────────────────────────────────────────────────────
if (!$reply) {
    http_response_code(500);
    echo json_encode(['error' => 'All AI models are currently unavailable. Please try again later.']);
    exit();
}

echo json_encode(['reply' => trim($reply)]);
