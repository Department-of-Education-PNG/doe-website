<?php
/**
 * Database Installation Script
 * Department of Education - Papua New Guinea
 * 
 * Run once: https://education.gov.pg/api/install.php
 * DELETE THIS FILE AFTER SUCCESSFUL INSTALLATION!
 */

require_once __DIR__ . '/config/database.php';

header('Content-Type: text/html; charset=utf-8');

echo "<h1>DoE Website — Database Installer</h1>";
echo "<pre>";

try {
    $pdo = Database::getInstance()->getConnection();
    echo "✅ Database connection successful.\n\n";

    // ===== TABLE 1: admin_users =====
    $pdo->exec("CREATE TABLE IF NOT EXISTS `admin_users` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `username` VARCHAR(50) NOT NULL UNIQUE,
        `password_hash` VARCHAR(255) NOT NULL,
        `email` VARCHAR(100) NOT NULL,
        `last_login` DATETIME DEFAULT NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    echo "✅ Table: admin_users\n";

    // ===== TABLE 2: news_articles =====
    $pdo->exec("CREATE TABLE IF NOT EXISTS `news_articles` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `title` VARCHAR(255) NOT NULL,
        `slug` VARCHAR(255) NOT NULL UNIQUE,
        `summary` TEXT,
        `content` LONGTEXT,
        `image_path` VARCHAR(500) DEFAULT NULL,
        `date_published` DATE NOT NULL,
        `is_featured` TINYINT(1) DEFAULT 0,
        `status` ENUM('draft','published') DEFAULT 'draft',
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    echo "✅ Table: news_articles\n";

    // ===== TABLE 3: press_releases =====
    $pdo->exec("CREATE TABLE IF NOT EXISTS `press_releases` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `title` VARCHAR(255) NOT NULL,
        `summary` TEXT,
        `image_path` VARCHAR(500) DEFAULT NULL,
        `pdf_path` VARCHAR(500) DEFAULT NULL,
        `date_published` DATE NOT NULL,
        `status` ENUM('draft','published') DEFAULT 'draft',
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    echo "✅ Table: press_releases\n";

    // ===== TABLE 4: events =====
    $pdo->exec("CREATE TABLE IF NOT EXISTS `events` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `title` VARCHAR(255) NOT NULL,
        `description` TEXT,
        `event_date` DATE NOT NULL,
        `event_time` TIME DEFAULT NULL,
        `location` VARCHAR(255) DEFAULT NULL,
        `image_path` VARCHAR(500) DEFAULT NULL,
        `status` ENUM('upcoming','past') DEFAULT 'upcoming',
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    echo "✅ Table: events\n";

    // ===== TABLE 5: gallery_albums =====
    $pdo->exec("CREATE TABLE IF NOT EXISTS `gallery_albums` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `title` VARCHAR(255) NOT NULL,
        `description` TEXT,
        `cover_image` VARCHAR(500) DEFAULT NULL,
        `tag` VARCHAR(50) DEFAULT NULL,
        `tag_color` VARCHAR(20) DEFAULT NULL,
        `sort_order` INT DEFAULT 0,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    echo "✅ Table: gallery_albums\n";

    // ===== TABLE 6: gallery_photos =====
    $pdo->exec("CREATE TABLE IF NOT EXISTS `gallery_photos` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `album_id` INT NOT NULL,
        `image_path` VARCHAR(500) NOT NULL,
        `caption` VARCHAR(255) DEFAULT NULL,
        `sort_order` INT DEFAULT 0,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (`album_id`) REFERENCES `gallery_albums`(`id`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    echo "✅ Table: gallery_photos\n";

    // ===== TABLE 7: publications =====
    $pdo->exec("CREATE TABLE IF NOT EXISTS `publications` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `title` VARCHAR(255) NOT NULL,
        `category` ENUM('annual_report','legislation','gov_plan','edu_policy','edu_plan') NOT NULL,
        `year` SMALLINT DEFAULT NULL,
        `pdf_path` VARCHAR(500) DEFAULT NULL,
        `thumbnail_path` VARCHAR(500) DEFAULT NULL,
        `sort_order` INT DEFAULT 0,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    echo "✅ Table: publications\n";

    // ===== TABLE 8: textbooks =====
    $pdo->exec("CREATE TABLE IF NOT EXISTS `textbooks` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `grade_level` VARCHAR(50) NOT NULL,
        `subject` VARCHAR(100) NOT NULL,
        `textbook_pdf` VARCHAR(500) DEFAULT NULL,
        `manual_pdf` VARCHAR(500) DEFAULT NULL,
        `sort_order` INT DEFAULT 0,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    echo "✅ Table: textbooks\n";

    // ===== TABLE 9: job_listings =====
    $pdo->exec("CREATE TABLE IF NOT EXISTS `job_listings` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `title` VARCHAR(255) NOT NULL,
        `description` TEXT,
        `location` VARCHAR(255) DEFAULT NULL,
        `job_type` ENUM('teaching','administrative','contract') DEFAULT 'teaching',
        `closing_date` DATE DEFAULT NULL,
        `pdf_path` VARCHAR(500) DEFAULT NULL,
        `status` ENUM('open','closed') DEFAULT 'open',
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    echo "✅ Table: job_listings\n";

    // ===== TABLE 10: scholarships =====
    $pdo->exec("CREATE TABLE IF NOT EXISTS `scholarships` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `title` VARCHAR(255) NOT NULL,
        `description` TEXT,
        `eligibility` TEXT,
        `deadline` DATE DEFAULT NULL,
        `external_link` VARCHAR(500) DEFAULT NULL,
        `status` ENUM('open','closed') DEFAULT 'open',
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    echo "✅ Table: scholarships\n";

    // ===== TABLE 11: public_forms =====
    $pdo->exec("CREATE TABLE IF NOT EXISTS `public_forms` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `title` VARCHAR(255) NOT NULL,
        `description` TEXT,
        `category` VARCHAR(100) DEFAULT NULL,
        `pdf_path` VARCHAR(500) DEFAULT NULL,
        `accent_color` VARCHAR(20) DEFAULT 'var(--primary)',
        `sort_order` INT DEFAULT 0,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    echo "✅ Table: public_forms\n";

    // ===== TABLE 12: news_ticker =====
    $pdo->exec("CREATE TABLE IF NOT EXISTS `news_ticker` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `label` VARCHAR(50) NOT NULL,
        `text` VARCHAR(500) NOT NULL,
        `is_active` TINYINT(1) DEFAULT 1,
        `sort_order` INT DEFAULT 0,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    echo "✅ Table: news_ticker\n";

    // ===== TABLE 13: notice_board =====
    $pdo->exec("CREATE TABLE IF NOT EXISTS `notice_board` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `title` VARCHAR(255) NOT NULL,
        `content` TEXT,
        `card_type` ENUM('dates','plan','quick_links') DEFAULT 'dates',
        `pdf_path` VARCHAR(500) DEFAULT NULL,
        `sort_order` INT DEFAULT 0,
        `is_active` TINYINT(1) DEFAULT 1,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    echo "✅ Table: notice_board\n";

    // ===== TABLE 14: leadership_messages =====
    $pdo->exec("CREATE TABLE IF NOT EXISTS `leadership_messages` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `role` ENUM('minister','secretary') NOT NULL,
        `name` VARCHAR(255) NOT NULL,
        `position_title` VARCHAR(255) NOT NULL,
        `photo_path` VARCHAR(500) DEFAULT NULL,
        `message_content` LONGTEXT,
        `border_color` VARCHAR(20) DEFAULT '#4a90e2',
        `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    echo "✅ Table: leadership_messages\n";

    // ===== TABLE 15: app_links =====
    $pdo->exec("CREATE TABLE IF NOT EXISTS `app_links` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `title` VARCHAR(100) NOT NULL,
        `description` VARCHAR(255) DEFAULT NULL,
        `url` VARCHAR(500) NOT NULL,
        `icon_emoji` VARCHAR(10) DEFAULT '🔗',
        `icon_color` VARCHAR(20) DEFAULT '#0078d4',
        `sort_order` INT DEFAULT 0,
        `is_active` TINYINT(1) DEFAULT 1,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    echo "✅ Table: app_links\n";

    // ===== TABLE 16: contact_submissions =====
    $pdo->exec("CREATE TABLE IF NOT EXISTS `contact_submissions` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `name` VARCHAR(255) NOT NULL,
        `email` VARCHAR(255) NOT NULL,
        `phone` VARCHAR(50) DEFAULT NULL,
        `subject` VARCHAR(255) NOT NULL,
        `message` TEXT NOT NULL,
        `is_read` TINYINT(1) DEFAULT 0,
        `email_sent` TINYINT(1) DEFAULT 0,
        `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    echo "✅ Table: contact_submissions\n";

    // ===== TABLE 17: site_settings =====
    $pdo->exec("CREATE TABLE IF NOT EXISTS `site_settings` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `setting_key` VARCHAR(100) NOT NULL UNIQUE,
        `setting_value` TEXT,
        `setting_group` VARCHAR(50) DEFAULT 'general',
        `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    echo "✅ Table: site_settings\n";

    echo "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    echo "All 17 tables created successfully!\n\n";

    // ===== SEED DATA =====
    echo "Seeding default data...\n\n";

    // Default admin user (password: changeme)
    $hash = password_hash('changeme', PASSWORD_BCRYPT);
    $stmt = $pdo->prepare("INSERT IGNORE INTO `admin_users` (username, password_hash, email) VALUES (?, ?, ?)");
    $stmt->execute(['admin', $hash, 'enquiries@education.gov.pg']);
    echo "✅ Admin user created (username: admin, password: changeme)\n";
    echo "   ⚠️  CHANGE YOUR PASSWORD IMMEDIATELY AFTER FIRST LOGIN!\n\n";

    // Default site settings
    $settings = [
        ['footer_address', 'Fincorp Haus, P.O Box 446 Waigani, National Capital District', 'contact'],
        ['footer_email', 'enquiries@education.gov.pg', 'contact'],
        ['footer_phone', '+675 328 8800', 'contact'],
        ['social_facebook', '#', 'social'],
        ['social_linkedin', '#', 'social'],
        ['social_whatsapp', '#', 'social'],
        ['site_title', 'Department of Education', 'general'],
        ['site_subtitle', 'Papua New Guinea', 'general'],
        ['site_description', 'Providing quality education for all in Papua New Guinea to promote national growth and opportunities.', 'general'],
    ];

    $stmt = $pdo->prepare("INSERT IGNORE INTO `site_settings` (setting_key, setting_value, setting_group) VALUES (?, ?, ?)");
    foreach ($settings as $s) {
        $stmt->execute($s);
    }
    echo "✅ Site settings seeded (" . count($settings) . " entries)\n";

    // Default leadership messages
    $stmt = $pdo->prepare("INSERT IGNORE INTO `leadership_messages` (role, name, position_title, photo_path, message_content, border_color) VALUES (?, ?, ?, ?, ?, ?)");
    
    $stmt->execute([
        'minister',
        'HON. LUCAS DAWA DEKENA, MP',
        'MINISTER FOR EDUCATION',
        'assets/images/leaders/minister.png',
        '<p>I welcome you to the new-look website for the National Department of Education.</p><p>Education is one of the major strategies for promoting socio-economic development in PNG since independence.</p><p>The Department of Education is the executive branch of the National Education System and is responsible for overseeing and coordinating the development and operations of the system.</p><p>Our vision for education in Papua New Guinea is to provide an education system that is affordable for parents and Government, that appreciates Christian and traditional values, and that prepares literate, skilled and healthy citizens, each educated and trained to their fullest potential, to contribute to the economic and social development of the country.</p><p>To achieve this we will provide 13 years of quality, relevant and affordable education for every child, regardless of his or her circumstance; include early childhood learning and Citizenship and Christian Values Education as well as 21st century skills such as problem-solving, self-direction and critical thinking.</p><p>I recommend this website to students, teachers, parents and the wider community who have interests in education.</p><p>Happy browsing!</p>',
        '#4a90e2'
    ]);
    
    $stmt->execute([
        'secretary',
        'DR. UKE KOMBRA, PhD, OBE',
        'SECRETARY FOR EDUCATION',
        'assets/images/leaders/secretary.png',
        '<p>HELLO, thank you for taking time to visit the Department of Education\'s new-look website.</p><p>We have redeveloped our website so it is more modern but simple and user-friendly for our visitors to easily access and find information and data about important policies and programs and announcements, news and events about what is happening in the National Education System.</p><p>Our mobile version (soon to be released) will enable users to easily access the website using their mobile phones. With such an approach we hope and aim to inform and connect with you, students, teachers, parents and everyone else on a real time basis.</p><p>We will strive to improve our site and seek your feedbacks, suggestions and recommendations so the website meets everyone\'s needs and gives updates on a daily basis. So, we count on your involvement and cooperation.</p><p>We hope you enjoy our new-look website and the content – WELCOME!</p><p>Thank you.</p>',
        '#f5a623'
    ]);
    echo "✅ Leadership messages seeded (Minister + Secretary)\n";

    // Default ticker items
    $tickerItems = [
        ['NEW', 'NDoE Graduate Teacher Recruitment of 2026 now open for applications', 1],
        ['BUDGET', 'Government allocates K904.5 million for education in 2026', 2],
        ['POLICY', 'Strict mandate issued — No enrollment fee for 2026 students', 3],
        ['REFORM', 'National curriculum reform integrates 21st century digital skills', 4],
        ['EVENT', 'National Teacher Conference 2026 — March 15, Port Moresby', 5],
    ];
    $stmt = $pdo->prepare("INSERT IGNORE INTO `news_ticker` (label, text, sort_order) VALUES (?, ?, ?)");
    foreach ($tickerItems as $t) {
        $stmt->execute($t);
    }
    echo "✅ News ticker items seeded (" . count($tickerItems) . " items)\n";

    // Default app links
    $appLinks = [
        ['Outlook Email', 'Staff Webmail Portal', 'https://mail.education.gov.pg/owa/', '📧', '#0078d4', 1],
        ['MyPaySlip', 'Teacher Payroll System', 'http://apps.education.gov.pg:8081/ords/f?p=144', '💰', '#2dca73', 2],
        ['Grade 11 Selection', 'Online Selection Portal', 'http://apps.education.gov.pg:8081/ords/f?p=103', '🎓', '#f5a623', 3],
        ['Info Management', 'Teacher Management System', 'http://apps.education.gov.pg:8081/ords/f?p=125', '👥', '#e74c3c', 4],
    ];
    $stmt = $pdo->prepare("INSERT IGNORE INTO `app_links` (title, description, url, icon_emoji, icon_color, sort_order) VALUES (?, ?, ?, ?, ?, ?)");
    foreach ($appLinks as $a) {
        $stmt->execute($a);
    }
    echo "✅ App links seeded (" . count($appLinks) . " items)\n";

    echo "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    echo "🎉 INSTALLATION COMPLETE!\n\n";
    echo "⚠️  IMPORTANT: DELETE THIS FILE (install.php) NOW!\n";
    echo "    Then login at: https://education.gov.pg/admin/\n";
    echo "    Username: admin\n";
    echo "    Password: changeme\n";

} catch (Exception $e) {
    echo "❌ ERROR: " . $e->getMessage() . "\n";
}

echo "</pre>";
