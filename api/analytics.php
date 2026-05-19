<?php
/**
 * Analytics API — Content & Message Insights
 */
require_once __DIR__ . '/middleware/auth.php';
safe_session_start();
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/helpers.php';

// Auth Check
jsonHeaders();
requireAuth();

try {
    $pdo = Database::getInstance()->getConnection();
    
    // 1. Content Distribution (MySQL)
    $contentStats = [];
    $tables = [
        'News' => 'news_articles',
        'Press' => 'press_releases',
        'Events' => 'events',
        'Jobs' => 'job_listings',
        'Publications' => 'publications',
        'Forms' => 'public_forms'
    ];

    foreach ($tables as $label => $table) {
        $stmt = $pdo->query("SELECT COUNT(*) FROM `$table` ");
        $contentStats[$label] = (int)$stmt->fetchColumn();
    }

    // 2. Message Trends (MySQL)
    $stmt = $pdo->query("SELECT DATE(submitted_at) as date, COUNT(*) as count FROM contact_submissions WHERE submitted_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) GROUP BY DATE(submitted_at) ORDER BY DATE(submitted_at) ASC");
    $trends = $stmt->fetchAll();
    
    $dailyTrends = [];
    foreach ($trends as $row) {
        $dailyTrends[$row['date']] = (int)$row['count'];
    }
    
    // Unread Count (MySQL)
    $unreadCount = (int)$pdo->query("SELECT COUNT(*) FROM contact_submissions WHERE is_read = 0")->fetchColumn();
    $totalMessages = (int)$pdo->query("SELECT COUNT(*) FROM contact_submissions")->fetchColumn();

    // Format trends for Chart.js
    $formattedTrends = [];
    foreach ($dailyTrends as $date => $count) {
        $formattedTrends[] = [
            'date' => date('D, M j', strtotime($date)),
            'count' => $count
        ];
    }

    // 3. Top Content (Top Viewed)
    $topJobs = $pdo->query("SELECT id, title, views FROM job_listings ORDER BY views DESC LIMIT 5")->fetchAll();
    $topNews = $pdo->query("SELECT id, title, views FROM news_articles ORDER BY views DESC LIMIT 5")->fetchAll();

    jsonSuccess([
        'contentDistribution' => $contentStats,
        'messageStatus' => [
            'Total' => $totalMessages,
            'Unread' => $unreadCount
        ],
        'messageDailyTrend' => $formattedTrends,
        'topContent' => [
            'Jobs' => $topJobs,
            'News' => $topNews
        ]
    ]);

} catch (Exception $e) {
    jsonError('Analytics failed: ' . $e->getMessage());
}
