<?php
/**
 * Search Index API
 * Agreggates metadata for all searchable content on the portal
 */
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/helpers.php';

jsonHeaders();

$pdo = Database::getInstance()->getConnection();

try {
    $index = [];

    // 1. Static Pages (Constant)
    $staticPages = [
        ['title' => 'Home', 'description' => 'Department of Education homepage with leadership messages and quick links.', 'url' => '#home', 'category' => 'Page', 'icon' => '🏠'],
        ['title' => 'About Us', 'description' => 'Learn about the Department mission, vision and structure.', 'url' => '#about', 'category' => 'Page', 'icon' => '🏛️'],
        ['title' => 'News & Events', 'description' => 'Press releases and latest updates from the Department.', 'url' => '#news', 'category' => 'Page', 'icon' => '📰'],
        ['title' => 'Publications', 'description' => 'Official published documents and reports.', 'url' => '#publications', 'category' => 'Page', 'icon' => '📚'],
        ['title' => 'Public Forms', 'description' => 'Download official Department forms.', 'url' => '#forms', 'category' => 'Page', 'icon' => '📝'],
        ['title' => 'Careers', 'description' => 'Job opportunities and scholarships in Education.', 'url' => '#careers', 'category' => 'Page', 'icon' => '💼'],
        ['title' => 'Contact Us', 'description' => 'Get in touch with the Department.', 'url' => '#contact', 'category' => 'Page', 'icon' => '📞']
    ];
    $index = array_merge($index, $staticPages);

    // 2. News Articles
    try {
        $stmt = $pdo->query("SELECT title, summary, slug FROM news_articles WHERE status = 'published' LIMIT 50");
        while ($row = $stmt->fetch()) {
            $index[] = ['title' => $row['title'], 'description' => strip_tags($row['summary']), 'url' => '#news-detail/' . $row['slug'], 'category' => 'News', 'icon' => '📰'];
        }
    } catch (Exception $e) { /* table may not exist yet */ }

    // 3. Press Releases
    try {
        $stmt = $pdo->query("SELECT title, summary, slug FROM press_releases WHERE status = 'published' LIMIT 20");
        while ($row = $stmt->fetch()) {
            $index[] = ['title' => $row['title'], 'description' => strip_tags($row['summary']), 'url' => '#news-detail/' . $row['slug'], 'category' => 'Press', 'icon' => '📢'];
        }
    } catch (Exception $e) { /* table may not exist yet */ }

    // 4. Events
    try {
        $stmt = $pdo->query("SELECT title, location, event_date FROM events WHERE status = 'published' LIMIT 15");
        while ($row = $stmt->fetch()) {
            $index[] = ['title' => $row['title'], 'description' => 'Date: ' . $row['event_date'] . ' | Location: ' . $row['location'], 'url' => '#news', 'category' => 'Event', 'icon' => '📅'];
        }
    } catch (Exception $e) { /* table may not exist yet */ }

    // 5. Publications
    try {
        $stmt = $pdo->query("SELECT title, category, year FROM publications LIMIT 30");
        while ($row = $stmt->fetch()) {
            $index[] = ['title' => $row['title'], 'description' => 'Category: ' . $row['category'] . ' - Published in ' . $row['year'], 'url' => '#publications', 'category' => 'Publication', 'icon' => '📄'];
        }
    } catch (Exception $e) { /* table may not exist yet */ }

    // 6. Public Forms
    try {
        $stmt = $pdo->query("SELECT title, category, description FROM public_forms LIMIT 25");
        while ($row = $stmt->fetch()) {
            $index[] = ['title' => $row['title'], 'description' => strip_tags($row['description'] ?? 'Download official form'), 'url' => '#forms', 'category' => 'Form', 'icon' => '📝'];
        }
    } catch (Exception $e) { /* table may not exist yet */ }

    // 7. App Links
    try {
        $stmt = $pdo->query("SELECT title, description, url, icon_emoji FROM app_links WHERE is_active = 1");
        while ($row = $stmt->fetch()) {
            $index[] = ['title' => $row['title'], 'description' => $row['description'], 'url' => $row['url'], 'category' => 'App', 'icon' => $row['icon_emoji'] ?: '📱'];
        }
    } catch (Exception $e) { /* table may not exist yet */ }

    // 8. FAQs
    try {
        $stmt = $pdo->query("SELECT question, answer, category FROM faqs WHERE status = 'published' OR 1=1 LIMIT 50");
        while ($row = $stmt->fetch()) {
            $index[] = ['title' => $row['question'], 'description' => strip_tags($row['answer']), 'url' => '#faq', 'category' => 'FAQ', 'icon' => '❓'];
        }
    } catch (Exception $e) { /* table may not exist yet */ }

    jsonResponse(['data' => $index]);

} catch (Exception $e) {
    // Even if DB is completely unavailable, return static pages only
    jsonResponse(['data' => $staticPages]);
}
