<?php
if (session_status() === PHP_SESSION_NONE) {
    $isSecure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || ($_SERVER['SERVER_PORT'] ?? 80) == 443;
    session_set_cookie_params([
        'path' => '/',
        'secure' => $isSecure,
        'httponly' => true,
        'samesite' => 'Lax'
    ]);
    session_start();
}
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: index.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Admin Dashboard — DoE PNG</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="icon" id="admin-favicon" type="image/png" href="">
    <link rel="stylesheet" href="assets/admin.css">
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <!-- Lucide Icons -->
    <script src="https://cdn.jsdelivr.net/npm/lucide@0.412.0/dist/umd/lucide.min.js"></script>
    <!-- CKEditor 5 -->
    <script src="https://cdn.ckeditor.com/ckeditor5/41.1.0/classic/ckeditor.js"></script>
    <!-- Ace Editor for Admins who Code -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.7/ace.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.7/mode-html.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.7/theme-monokai.js"></script>
    <style>
        i[data-lucide], .lucide { width: 18px; height: 18px; vertical-align: middle; stroke-width: 2px; }
    </style>
    
</head>
<body>
<div class="desktop-lock">
    <div class="desktop-lock-content">
        <span class="desktop-lock-icon">🖥️</span>
        <h2>Desktop Experience Only</h2>
        <p>The Administrative Portal is optimized for large screens to ensure data accuracy and complex content management. Please switch to a tablet or desktop device to продолжить.</p>
        <a href="../" class="desktop-lock-back">← Return to Public Website</a>
    </div>
</div>

<!-- Toast Container -->
<div class="toast-container" id="toast-container"></div>

<!-- Sidebar -->
<aside class="sidebar" id="sidebar">
    <div class="sidebar-brand">
        <img src="../assets/images/logo/DoE-Logo.png" alt="Logo" style="width:40px; height:40px; object-fit:contain;">
        <div>
            <h2>Department of Education</h2>
            <span>Admin Panel</span>
        </div>
    </div>

    <nav class="sidebar-nav">
        <a class="nav-item active" data-page="dashboard" onclick="navigateTo('dashboard')">
            <i data-lucide="bar-chart-3"></i> Dashboard
        </a>

        <?php if ($_SESSION['admin_role'] !== 'curriculum_admin'): ?>
        <div class="nav-label">Content</div>
        <a class="nav-item" data-page="news" onclick="navigateTo('news')">
            <i data-lucide="newspaper"></i> News & Articles
        </a>
        <a class="nav-item" data-page="press" onclick="navigateTo('press')">
            <i data-lucide="megaphone"></i> Press Releases
        </a>
        <a class="nav-item" data-page="events" onclick="navigateTo('events')">
            <i data-lucide="calendar"></i> Events
        </a>
        <a class="nav-item" data-page="calendars" onclick="navigateTo('calendars')">
            <i data-lucide="calendar-days"></i> Calendars & Term Dates
        </a>
        <a class="nav-item" data-page="gallery" onclick="navigateTo('gallery')">
            <i data-lucide="image"></i> Photo Gallery
        </a>
        <a class="nav-item" data-page="publications" onclick="navigateTo('publications')">
            <i data-lucide="file-text"></i> Publications
        </a>
        <?php endif; ?>

        <div class="nav-label">Education & Subsidies</div>
        <a class="nav-item" data-page="gtfs" onclick="navigateTo('gtfs')">
            <i data-lucide="file-check-2"></i> GTFS Reports
        </a>
        <a class="nav-item" data-page="textbooks" onclick="navigateTo('textbooks')">
            <i data-lucide="book-open"></i> Textbooks & Manuals
        </a>
        <a class="nav-item" data-page="curriculum" onclick="navigateTo('curriculum')" style="background:linear-gradient(135deg,rgba(59,165,224,0.12),rgba(245,166,35,0.08));border-left:3px solid var(--admin-primary);">
            <i data-lucide="library"></i> <span>Curriculum Materials</span>
        </a>


        <?php if ($_SESSION['admin_role'] !== 'curriculum_admin'): ?>
        <a class="nav-item" data-page="faq" onclick="navigateTo('faq')">
            <i data-lucide="help-circle"></i> FAQs
        </a>

        <div class="nav-label">Careers</div>
        <a class="nav-item" data-page="jobs" onclick="navigateTo('jobs')">
            <i data-lucide="briefcase"></i> Job Listings
        </a>
        <a class="nav-item" data-page="scholarships" onclick="navigateTo('scholarships')">
            <i data-lucide="graduation-cap"></i> Scholarships
        </a>

        <div class="nav-label">Homepage</div>
        <a class="nav-item" data-page="ticker" onclick="navigateTo('ticker')">
            <i data-lucide="radio"></i> News Ticker
        </a>
        <a class="nav-item" data-page="notices" onclick="navigateTo('notices')">
            <i data-lucide="clipboard-list"></i> Notice Board
        </a>
        <a class="nav-item" data-page="leaders" onclick="navigateTo('leaders')">
            <i data-lucide="user"></i> Leadership
        </a>
        <a class="nav-item" data-page="apps" onclick="navigateTo('apps')">
            <i data-lucide="link"></i> App Links
        </a>
        <a class="nav-item" data-page="forms" onclick="navigateTo('forms')">
            <i data-lucide="file-edit"></i> Public Forms
        </a>
        <?php endif; ?>

        <?php if ($_SESSION['admin_role'] === 'super_admin'): ?>
        <div class="nav-label">System Management</div>
        <a class="nav-item" data-page="users" onclick="navigateTo('users')">
            <i data-lucide="users"></i> Users
        </a>
        <a class="nav-item" data-page="logs" onclick="navigateTo('logs')">
            <i data-lucide="scroll"></i> Activity Logs
        </a>
        <div class="nav-item" onclick="navigateTo('sliders')" data-page="sliders">
            <i data-lucide="layout-template"></i><span>Hero Sliders</span>
        </div>
        <a class="nav-item" data-page="edubot" onclick="navigateTo('edubot')" style="background:linear-gradient(135deg,rgba(16,185,129,0.15),rgba(59,130,246,0.1));border-left:3px solid #10b981;">
            <i data-lucide="brain"></i> <span>EduBot Training</span>
        </a>
        <?php endif; ?>
        <?php if ($_SESSION['admin_role'] !== 'curriculum_admin'): ?>
        <a class="nav-item" data-page="contact" onclick="navigateTo('contact')">
            <i data-lucide="mail"></i>Contact <span class="badge" id="nav-unread-badge" style="display:none;">0</span>
        </a>
        <?php endif; ?>
        <?php if ($_SESSION['admin_role'] === 'super_admin'): ?>
        <a class="nav-item" data-page="settings" onclick="navigateTo('settings')">
            <i data-lucide="settings"></i>Settings
        </a>
        <?php endif; ?>
    </nav>
</aside>

<!-- Main Content -->
<div class="main-content">
        <header class="topbar">
            <h1>Dashboard Overview</h1>
            
            <div class="topbar-actions">
                <?php if ($_SESSION['admin_role'] === 'super_admin'): ?>
                <button onclick="downloadBackup()" style="color:var(--admin-warning); border-color:var(--admin-warning);"><i data-lucide="download"></i>Backup DB</button>
                <?php endif; ?>
                <a href="../" target="_blank"><i data-lucide="globe"></i>View Site</a>
                <?php if ($_SESSION['admin_role'] === 'super_admin'): ?>
                <button onclick="openModal('modal-password')"><i data-lucide="key"></i>Password</button>
                <?php endif; ?>
                <button onclick="logout()" style="color:var(--admin-danger);"><i data-lucide="log-out"></i>Logout</button>
            </div>
        </header>

    <div class="content-area">

        <!-- ===== DASHBOARD PAGE ===== -->
        <div class="page-section active" id="page-dashboard">
            <?php if ($_SESSION['admin_role'] === 'curriculum_admin'): ?>
            <div class="admin-card" style="margin-bottom:2rem; background: linear-gradient(135deg, rgba(59,165,224,0.1), rgba(245,166,35,0.05)); border: none;">
                <div class="admin-card-body" style="padding: 3rem 2rem; text-align: center;">
                    <div style="background: white; width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                        <i data-lucide="library" style="width: 32px; height: 32px; color: var(--admin-primary);"></i>
                    </div>
                    <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Welcome, <?php echo htmlspecialchars($_SESSION['admin_username']); ?></h2>
                    <p style="color: var(--admin-muted); max-width: 500px; margin: 0 auto 1.5rem auto;">
                        You are logged in as a <strong>Curriculum Admin</strong>. You have exclusive access to manage the Department of Education's Curriculum Materials and Textbooks.
                    </p>
                    <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
                        <button class="btn btn-primary" onclick="navigateTo('curriculum')">
                            <i data-lucide="library"></i> Manage Curriculum
                        </button>
                        <button class="btn btn-outline" onclick="navigateTo('textbooks')">
                            <i data-lucide="book-open"></i> Manage Textbooks
                        </button>
                        <button class="btn btn-outline" onclick="navigateTo('gtfs')">
                            <i data-lucide="file-check-2"></i> GTFS Reports
                        </button>
                    </div>
                </div>
            </div>
            <?php else: ?>
            <div class="stats-grid">
                <div class="stat-card"><div class="stat-icon"><i data-lucide="newspaper"></i></div><div class="stat-value" id="stat-news">0</div><div class="stat-label">News Articles</div></div>
                <div class="stat-card"><div class="stat-icon"><i data-lucide="megaphone"></i></div><div class="stat-value" id="stat-press">0</div><div class="stat-label">Press Releases</div></div>
                <div class="stat-card"><div class="stat-icon"><i data-lucide="calendar"></i></div><div class="stat-value" id="stat-events">0</div><div class="stat-label">Events</div></div>
                <div class="stat-card" style="border-left: 3px solid var(--admin-primary);"><div class="stat-icon"><i data-lucide="mail"></i></div><div class="stat-value" id="stat-contact">0</div><div class="stat-label">Unread Messages</div></div>
                <div class="stat-card"><div class="stat-icon"><i data-lucide="briefcase"></i></div><div class="stat-value" id="stat-jobs">0</div><div class="stat-label">Job Listings</div></div>
                <div class="stat-card"><div class="stat-icon"><i data-lucide="file-text"></i></div><div class="stat-value" id="stat-pubs">0</div><div class="stat-label">Publications</div></div>
            </div>
            <div class="admin-card">
                <div class="admin-card-header"><h2>Quick Actions</h2></div>
                <div class="admin-card-body" style="display:flex;gap:1rem;flex-wrap:wrap;">
                    <button class="btn btn-primary" onclick="navigateTo('news');setTimeout(()=>openModal('modal-news'),300)"><i data-lucide="plus-circle"></i>Add News Article</button>
                    <button class="btn btn-primary" onclick="navigateTo('press');setTimeout(()=>openModal('modal-press'),300)"><i data-lucide="plus-circle"></i>Add Press Release</button>
                    <button class="btn btn-primary" onclick="navigateTo('events');setTimeout(()=>openModal('modal-events'),300)"><i data-lucide="plus-circle"></i>Add Event</button>
                    <button class="btn btn-outline" onclick="navigateTo('contact')"><i data-lucide="mail"></i>View Messages</button>
                </div>
            </div>

            <!-- Analytics Section -->
            <div style="margin-top:1.5rem; display:grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap:1.5rem;">
                <div class="admin-card">
                    <div class="admin-card-header"><h2><i data-lucide="activity"></i>Recent Contact Activity</h2></div>
                    <div class="admin-card-body">
                        <canvas id="contactInsightsChart" style="height:280px;"></canvas>
                    </div>
                </div>
                <div class="admin-card">
                    <div class="admin-card-header"><h2><i data-lucide="activity"></i>Content Activity (30 Days)</h2></div>
                    <div class="admin-card-body">
                        <canvas id="activityChart" style="height:280px;"></canvas>
                    </div>
                </div>
                <!-- Job Views Stats -->
                <div class="admin-card">
                    <div class="admin-card-header"><h2><i data-lucide="bar-chart"></i>Top Job Listings by Views</h2></div>
                    <div class="admin-card-body">
                        <canvas id="jobViewsChart" style="height:280px;"></canvas>
                    </div>
                </div>
            </div>
            <?php endif; ?>
        </div>

        <!-- Hero Sliders Page -->
        <?php if ($_SESSION['admin_role'] === 'super_admin'): ?>
        <div id="page-sliders" class="page-section">
            <div class="admin-card">
                <div class="admin-card-header">
                    <h2><i data-lucide="image"></i>Hero Slider Management</h2>
                    <button class="btn btn-primary" onclick="openAddModal('sliders')"><i data-lucide="plus"></i>Add New Slide</button>
                </div>
                <div class="admin-card-body">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Sort Order</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="sliders-tbody">
                            <tr><td colspan="5" style="text-align:center;padding:2rem;">Loading sliders…</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <?php endif; ?>

        <!-- ===== NEWS PAGE ===== -->
        <div class="page-section" id="page-news">
            <div class="admin-card">
                <div class="admin-card-header">
                    <h2>News Articles</h2>
                    <button class="btn btn-primary" onclick="openAddModal('news')"><i data-lucide="plus-circle"></i>Add New</button>
                </div>
                <div style="overflow-x:auto;">
                    <table class="data-table"><thead><tr><th>Title</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead><tbody id="news-tbody"></tbody></table>
                </div>
            </div>
        </div>

        <!-- ===== PRESS RELEASES PAGE ===== -->
        <div class="page-section" id="page-press">
            <div class="admin-card">
                <div class="admin-card-header">
                    <h2>Press Releases</h2>
                    <button class="btn btn-primary" onclick="openAddModal('press')"><i data-lucide="plus-circle"></i>Add New</button>
                </div>
                <div style="overflow-x:auto;">
                    <table class="data-table"><thead><tr><th>Title</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead><tbody id="press-tbody"></tbody></table>
                </div>
            </div>
        </div>

        <!-- ===== EVENTS PAGE ===== -->
        <div class="page-section" id="page-events">
            <div class="admin-card">
                <div class="admin-card-header">
                    <h2>Events</h2>
                    <button class="btn btn-primary" onclick="openAddModal('events')"><i data-lucide="plus-circle"></i>Add New</button>
                </div>
                <div style="overflow-x:auto;">
                    <table class="data-table"><thead><tr><th>Title</th><th>Date</th><th>Location</th><th>Status</th><th>Actions</th></tr></thead><tbody id="events-tbody"></tbody></table>
                </div>
            </div>
        </div>

        <!-- ===== GALLERY PAGE ===== -->
        <div class="page-section" id="page-gallery">
            <div class="admin-card">
                <div class="admin-card-header">
                    <h2>Photo Albums</h2>
                    <button class="btn btn-primary" onclick="openAddModal('gallery')"><i data-lucide="plus-circle"></i>Add Album</button>
                </div>
                <div style="overflow-x:auto;">
                    <table class="data-table"><thead><tr><th>Title</th><th>Tag</th><th>Photos</th><th>Actions</th></tr></thead><tbody id="gallery-tbody"></tbody></table>
                </div>
            </div>
        </div>

        <!-- ===== PUBLICATIONS PAGE ===== -->
        <div class="page-section" id="page-publications">
            <div class="admin-card">
                <div class="admin-card-header">
                    <h2>Publications & Documents</h2>
                    <button class="btn btn-primary" onclick="openAddModal('publications')"><i data-lucide="plus-circle"></i>Add Publication</button>
                </div>
                <div style="overflow-x:auto;">
                    <table class="data-table"><thead><tr><th>Title</th><th>Category</th><th>Year</th><th>Actions</th></tr></thead><tbody id="publications-tbody"></tbody></table>
                </div>
            </div>
        </div>

        <!-- ===== CALENDARS PAGE ===== -->
        <div class="page-section" id="page-calendars">
            <div class="admin-card">
                <div class="admin-card-header">
                    <h2>Calendars & Term Dates</h2>
                    <button class="btn btn-primary" onclick="openAddModal('calendars')"><i data-lucide="plus-circle"></i>Add Calendar</button>
                </div>
                <div style="overflow-x:auto;">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Calendar Title</th>
                                <th>Year</th>
                                <th>Date Added</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="calendars-tbody">
                            <!-- Dynamic calendars will be loaded here -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- ===== TEXTBOOKS PAGE ===== -->
        <div class="page-section" id="page-textbooks">
            <div class="admin-card">
                <div class="admin-card-header">
                    <h2>Textbooks & Manuals</h2>
                    <button class="btn btn-primary" onclick="openAddModal('textbooks')"><i data-lucide="plus-circle"></i>Add Textbook</button>
                </div>
                <div style="overflow-x:auto;">
                    <table class="data-table"><thead><tr><th>Grade Level</th><th>Subject</th><th>Actions</th></tr></thead><tbody id="textbooks-tbody"></tbody></table>
                </div>
            </div>
        </div>

        <!-- ===== GTFS REPORTS PAGE ===== -->
        <div class="page-section" id="page-gtfs">
            <div class="admin-card">
                <div class="admin-card-header">
                    <h2>Government Tuition Fee Subsidy (GTFS)</h2>
                    <button class="btn btn-primary" onclick="openAddModal('gtfs')"><i data-lucide="plus"></i> Add GTFS Report</button>
                </div>
                <div style="overflow-x:auto;">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Year</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>PDF Document</th>
                                <th>Uploaded</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="gtfs-tbody"></tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- ===== FAQ PAGE ===== -->
        <div class="page-section" id="page-faq">
            <div class="admin-card">
                <div class="admin-card-header">
                    <h2>Frequently Asked Questions</h2>
                    <button class="btn btn-primary" onclick="openAddModal('faq')"><i data-lucide="plus-circle"></i>Add FAQ</button>
                </div>
                <div style="overflow-x:auto;">
                    <table class="data-table"><thead><tr><th>Question</th><th>Category</th><th>Order</th><th>Status</th><th>Actions</th></tr></thead><tbody id="faq-tbody"></tbody></table>
                </div>
            </div>
        </div>

        <!-- ===== CURRICULUM MATERIALS PAGE ===== -->
        <div class="page-section" id="page-curriculum">
            <div style="background:linear-gradient(135deg,rgba(59,165,224,0.1),rgba(245,166,35,0.06));border:1px solid rgba(59,165,224,0.2);border-radius:12px;padding:1rem 1.5rem;margin-bottom:1.5rem;display:flex;gap:1rem;align-items:center;">
                <i data-lucide="library" style="color:var(--admin-primary);flex-shrink:0;width:24px;height:24px;"></i>
                <div style="font-size:0.88rem;line-height:1.6;color:var(--admin-muted);">
                    <strong style="color:var(--admin-text);">Curriculum Materials</strong> &mdash; Upload Syllabus PDFs and Teacher's Guides for Elementary, Primary, and Secondary education levels. These entries appear live on the public website.
                </div>
            </div>
            <div style="display:flex;gap:0.5rem;margin-bottom:1.5rem;border-bottom:2px solid var(--admin-border);padding-bottom:0;">
                <button id="ctab-elementary" class="btn btn-primary" onclick="switchCurriculumTab('elementary')" style="border-radius:8px 8px 0 0;font-size:0.85rem;"><i data-lucide="school"></i> Elementary</button>
                <button id="ctab-primary" class="btn btn-outline" onclick="switchCurriculumTab('primary')" style="border-radius:8px 8px 0 0;font-size:0.85rem;"><i data-lucide="book"></i> Primary</button>
                <button id="ctab-secondary" class="btn btn-outline" onclick="switchCurriculumTab('secondary')" style="border-radius:8px 8px 0 0;font-size:0.85rem;"><i data-lucide="graduation-cap"></i> Secondary</button>
                <button class="btn btn-primary" onclick="openCurriculumModal()" style="margin-left:auto;"><i data-lucide="plus-circle"></i> Add Entry</button>
            </div>
            <div class="admin-card">
                <div style="overflow-x:auto;">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Grade / Stage</th>
                                <th>Subject</th>
                                <th>Syllabus PDF</th>
                                <th>Teacher's Guide PDF</th>
                                <th>Uploaded By</th>
                                <th>Updated</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="curriculum-tbody">
                            <tr><td colspan="7" style="text-align:center;padding:3rem;color:var(--admin-muted);">Loading...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


        <!-- ===== JOBS PAGE ===== -->
        <div class="page-section" id="page-jobs">
            <div class="admin-card">
                <div class="admin-card-header">
                    <h2>Job Listings</h2>
                    <button class="btn btn-primary" onclick="openAddModal('jobs')"><i data-lucide="plus-circle"></i>Post Job</button>
                </div>
                <div style="overflow-x:auto;">
                    <table class="data-table"><thead><tr><th>Title</th><th>Type</th><th>Closing Date</th><th>Views</th><th>Status</th><th>Actions</th></tr></thead><tbody id="jobs-tbody"></tbody></table>
                </div>
            </div>
        </div>

        <!-- ===== SCHOLARSHIPS PAGE ===== -->
        <div class="page-section" id="page-scholarships">
            <div class="admin-card">
                <div class="admin-card-header">
                    <h2>Scholarships</h2>
                    <button class="btn btn-primary" onclick="openAddModal('scholarships')"><i data-lucide="plus-circle"></i>Add Scholarship</button>
                </div>
                <div style="overflow-x:auto;">
                    <table class="data-table"><thead><tr><th>Title</th><th>Deadline</th><th>Status</th><th>Actions</th></tr></thead><tbody id="scholarships-tbody"></tbody></table>
                </div>
            </div>
        </div>

        <!-- ===== TICKER PAGE ===== -->
        <div class="page-section" id="page-ticker">
            <div class="admin-card">
                <div class="admin-card-header">
                    <h2>News Ticker Headlines</h2>
                    <button class="btn btn-primary" onclick="openAddModal('ticker')"><i data-lucide="plus-circle"></i>Add Ticker Item</button>
                </div>
                <div style="overflow-x:auto;">
                    <table class="data-table"><thead><tr><th>Label</th><th>Text</th><th>Active</th><th>Actions</th></tr></thead><tbody id="ticker-tbody"></tbody></table>
                </div>
            </div>
        </div>

        <!-- ===== NOTICES PAGE ===== -->
        <div class="page-section" id="page-notices">
            <div class="admin-card">
                <div class="admin-card-header">
                    <h2>Notice Board</h2>
                    <button class="btn btn-primary" onclick="openAddModal('notices')"><i data-lucide="plus-circle"></i>Add Notice</button>
                </div>
                <div style="overflow-x:auto;">
                    <table class="data-table"><thead><tr><th>Title</th><th>Type</th><th>Active</th><th>Actions</th></tr></thead><tbody id="notices-tbody"></tbody></table>
                </div>
            </div>
        </div>

        <!-- ===== LEADERS PAGE ===== -->
        <div class="page-section" id="page-leaders">
            <!-- Minister -->
            <div class="admin-card">
                <div class="admin-card-header"><h2><i data-lucide="user"></i>Minister's Message</h2></div>
                <div class="admin-card-body">
                    <form id="form-leader-minister">
                        <div class="form-grid">
                            <div class="form-group"><label>Full Name *</label><input type="text" id="leader-minister-name" name="name" placeholder="Hon. Minister Name" required></div>
                            <div class="form-group"><label>Position Title *</label><input type="text" id="leader-minister-title" name="position_title" placeholder="Minister for Education" required></div>
                            <div class="form-group full-width">
                                <label>Profile Photo</label>
                                <div style="display:flex;gap:1.5rem;align-items:flex-start;flex-wrap:wrap;">
                                    <div>
                                        <div class="file-upload-zone" style="width:200px;" onclick="document.getElementById('minister-photo-input').click()">
                                            <span class="upload-icon">📷</span>
                                            <p>Click to upload photo</p>
                                            <small>JPG, PNG • Max 2MB</small>
                                        </div>
                                        <input type="file" id="minister-photo-input" accept="image/*" style="display:none" onchange="handleLeaderPhoto(this,'minister')">
                                    </div>
                                    <div id="leader-minister-photo-preview" style="min-width:100px;"></div>
                                </div>
                                <input type="text" id="leader-minister-photo" name="photo_path" placeholder="Or type path: assets/images/leaders/minister.png" style="margin-top:0.75rem;">
                            </div>
                            <div class="form-group full-width">
                                <label style="display:flex; justify-content:space-between; align-items:center;">
                                    Welcome Message
                                    <small style="color:var(--admin-muted);font-weight:400;">Plain text — press Enter for new paragraph</small>
                                </label>
                                <textarea id="leaders-message_content_minister" name="message_content" rows="14" placeholder="Enter the Minister's welcome message..." style="width:100%;padding:0.85rem 1rem;border:1px solid var(--admin-border);border-radius:8px;font-family:Inter,system-ui,sans-serif;font-size:0.95rem;line-height:1.7;color:var(--admin-text);background:var(--admin-surface);resize:vertical;"></textarea>
                            </div>
                        </div>
                        <div style="margin-top:1rem; display:flex; gap:0.75rem; flex-wrap:wrap;">
                            <button type="button" class="btn btn-primary" onclick="saveLeader('minister')"><i data-lucide="save"></i>Save Minister's Message</button>
                            <button type="button" class="btn btn-danger" onclick="clearLeader('minister')"><i data-lucide="trash-2"></i>Delete Message</button>
                        </div>
                    </form>
                </div>
            </div>
            <!-- Secretary -->
            <div class="admin-card">
                <div class="admin-card-header"><h2><i data-lucide="user"></i>Secretary's Message</h2></div>
                <div class="admin-card-body">
                    <form id="form-leader-secretary">
                        <div class="form-grid">
                            <div class="form-group"><label>Full Name *</label><input type="text" id="leader-secretary-name" name="name" placeholder="Secretary Name" required></div>
                            <div class="form-group"><label>Position Title *</label><input type="text" id="leader-secretary-title" name="position_title" placeholder="Secretary for Education" required></div>
                            <div class="form-group full-width">
                                <label>Profile Photo</label>
                                <div style="display:flex;gap:1.5rem;align-items:flex-start;flex-wrap:wrap;">
                                    <div>
                                        <div class="file-upload-zone" style="width:200px;" onclick="document.getElementById('secretary-photo-input').click()">
                                            <span class="upload-icon">📷</span>
                                            <p>Click to upload photo</p>
                                            <small>JPG, PNG • Max 2MB</small>
                                        </div>
                                        <input type="file" id="secretary-photo-input" accept="image/*" style="display:none" onchange="handleLeaderPhoto(this,'secretary')">
                                    </div>
                                    <div id="leader-secretary-photo-preview" style="min-width:100px;"></div>
                                </div>
                                <input type="text" id="leader-secretary-photo" name="photo_path" placeholder="Or type path: assets/images/leaders/secretary.png" style="margin-top:0.75rem;">
                            </div>
                            <div class="form-group full-width">
                                <label style="display:flex; justify-content:space-between; align-items:center;">
                                    Welcome Message
                                    <small style="color:var(--admin-muted);font-weight:400;">Plain text — press Enter for new paragraph</small>
                                </label>
                                <textarea id="leaders-message_content_secretary" name="message_content" rows="14" placeholder="Enter the Secretary's welcome message..." style="width:100%;padding:0.85rem 1rem;border:1px solid var(--admin-border);border-radius:8px;font-family:Inter,system-ui,sans-serif;font-size:0.95rem;line-height:1.7;color:var(--admin-text);background:var(--admin-surface);resize:vertical;"></textarea>
                            </div>
                        </div>
                        <div style="margin-top:1rem; display:flex; gap:0.75rem; flex-wrap:wrap;">
                            <button type="button" class="btn btn-primary" onclick="saveLeader('secretary')"><i data-lucide="save"></i>Save Secretary's Message</button>
                            <button type="button" class="btn btn-danger" onclick="clearLeader('secretary')"><i data-lucide="trash-2"></i>Delete Message</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- ===== APP LINKS PAGE ===== -->
        <div class="page-section" id="page-apps">
            <div class="admin-card">
                <div class="admin-card-header">
                    <h2>Digital Applications</h2>
                    <button class="btn btn-primary" onclick="openAddModal('apps')"><i data-lucide="plus-circle"></i>Add App Link</button>
                </div>
                <div style="overflow-x:auto;">
                    <table class="data-table"><thead><tr><th>Title</th><th>Category</th><th>URL</th><th>Active</th><th>Actions</th></tr></thead><tbody id="apps-tbody"></tbody></table>
                </div>
            </div>
        </div>

        <!-- ===== PUBLIC FORMS PAGE ===== -->
        <div class="page-section" id="page-forms">
            <div class="admin-card">
                <div class="admin-card-header">
                    <h2>Public Forms</h2>
                    <button class="btn btn-primary" onclick="openAddModal('forms')"><i data-lucide="plus-circle"></i>Add Form</button>
                </div>
                <div style="overflow-x:auto;">
                    <table class="data-table"><thead><tr><th>Title</th><th>Category</th><th>Actions</th></tr></thead><tbody id="forms-tbody"></tbody></table>
                </div>
            </div>
        </div>

        <div class="page-section" id="page-contact">
            <div class="admin-card">
                <div class="admin-card-header">
                    <h2><i data-lucide="mail"></i> Contact Submissions</h2>
                    <div style="display:flex;gap:0.5rem;align-items:center;">
                        <button class="btn btn-sm btn-outline" id="filter-all" onclick="setContactFilter('all')" style="font-weight:600;">All</button>
                        <button class="btn btn-sm btn-outline" id="filter-unread" onclick="setContactFilter('unread')">Unread <span id="filter-unread-count" style="background:var(--admin-danger);color:#fff;border-radius:10px;padding:0 6px;font-size:0.7rem;"></span></button>
                    </div>
                </div>
                <div style="overflow-x:auto;">
                    <table class="data-table"><thead><tr><th>Name</th><th>Email</th><th>Subject</th><th>Date</th><th>Actions</th></tr></thead><tbody id="contact-tbody"></tbody></table>
                </div>
            </div>
        </div>

        <!-- ===== USERS PAGE ===== -->
        <?php if ($_SESSION['admin_role'] === 'super_admin'): ?>
        <div class="page-section" id="page-users">
            <div class="admin-card">
                <div class="admin-card-header">
                    <h2><i data-lucide="users"></i> Admin Users</h2>
                    <button class="btn btn-primary" onclick="openUserModal()"><i data-lucide="plus-circle"></i>Add User</button>
                </div>
                <div style="overflow-x:auto;">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Full Name</th>
                                <th>Designation</th>
                                <th>Role</th>
                                <th>Email</th>
                                <th>Last Login</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="users-tbody"></tbody>
                    </table>
                </div>
            </div>
        </div>
        <?php endif; ?>

        <!-- ===== ACTIVITY LOGS PAGE ===== -->
        <?php if ($_SESSION['admin_role'] === 'super_admin'): ?>
        <div class="page-section" id="page-logs">
            <div class="admin-card">
                <div class="admin-card-header">
                    <h2><i data-lucide="scroll"></i> Activity Logs</h2>
                    <button class="btn btn-sm btn-outline" onclick="loadPageData('logs')"><i data-lucide="refresh-cw"></i>Refresh</button>
                </div>
                <div style="overflow-x:auto;">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>User</th>
                                <th>Action</th>
                                <th>Target</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody id="logs-tbody"></tbody>
                    </table>
                </div>
            </div>
        </div>
        <?php endif; ?>

        <!-- ===== SETTINGS PAGE ===== -->
        <?php if ($_SESSION['admin_role'] === 'super_admin'): ?>
        <div class="page-section" id="page-settings">
            <div class="admin-card">
                <div class="admin-card-header"><h2>Contact Information</h2></div>
                <div class="admin-card-body">
                    <div class="form-grid">
                        <div class="form-group full-width"><label>Address</label><input type="text" id="setting-footer_address"></div>
                        <div class="form-group"><label>Email</label><input type="email" id="setting-footer_email"></div>
                        <div class="form-group"><label>Phone</label><input type="text" id="setting-footer_phone"></div>
                    </div>
                </div>
            </div>
            <div class="admin-card">
                <div class="admin-card-header"><h2>Social Media Links</h2></div>
                <div class="admin-card-body">
                    <div class="form-grid">
                        <div class="form-group"><label>Facebook URL</label><input type="text" id="setting-social_facebook"></div>
                        <div class="form-group"><label>LinkedIn URL</label><input type="text" id="setting-social_linkedin"></div>
                        <div class="form-group"><label>WhatsApp URL</label><input type="text" id="setting-social_whatsapp"></div>
                    </div>
                </div>
            </div>
            <div class="admin-card">
                <div class="admin-card-header"><h2>System Controls</h2></div>
                <div class="admin-card-body">
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Maintenance Mode</label>
                            <div style="display:flex;align-items:center;gap:1rem;margin-top:0.5rem;">
                                <label class="switch">
                                    <input type="checkbox" id="setting-maintenance_mode" onchange="toggleMaintenance(this.checked)">
                                    <span class="slider round"></span>
                                </label>
                                <span id="maintenance-status-text" style="font-weight:600; font-size:0.9rem; color:var(--text-muted);">Disabled</span>
                            </div>
                            <p style="font-size:0.8rem; color:var(--text-muted); margin-top:0.5rem;">When enabled, visitors will see a "Back Soon" screen instead of the website.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="admin-card">
                <div class="admin-card-header"><h2>Site Information</h2></div>
                <div class="admin-card-body">
                    <div class="form-grid">
                        <div class="form-group"><label>Site Title</label><input type="text" id="setting-site_title"></div>
                        <div class="form-group"><label>Subtitle</label><input type="text" id="setting-site_subtitle"></div>
                        <div class="form-group full-width"><label>Description</label><textarea id="setting-site_description" rows="3"></textarea></div>
                        <div class="form-group full-width"><label>Copyright Text</label><input type="text" id="setting-site_copyright"></div>
                    </div>
                </div>
            </div>

            <!-- Branding & Logos Section -->
            <div class="admin-card">
                <div class="admin-card-header">
                    <h2><i data-lucide="palette"></i> Branding & Logos</h2>
                    <p style="font-size:0.8rem; color:var(--admin-muted); margin:0;">Manage site-wide visual identity</p>
                </div>
                <div class="admin-card-body">
                    <div style="display: flex; flex-direction: column; gap: 0;">
                        <!-- Favicon Row -->
                        <div style="display: flex; align-items: center; gap: 2rem; padding: 1.5rem 0; border-bottom: 1px solid var(--admin-border);">
                            <div id="preview-setting-site_favicon" style="width:60px; height:60px; border-radius:10px; border:1px solid var(--admin-border); display:flex; align-items:center; justify-content:center; background:#fff; overflow:hidden; flex-shrink:0;">
                                <div id="zone-setting-site_favicon">
                                    <i data-lucide="image" style="color:var(--admin-muted); width:24px;"></i>
                                </div>
                            </div>
                            <div style="flex:1;">
                                <h4 style="margin:0 0 0.25rem 0; font-size:1rem; color:var(--admin-text);">Site Favicon</h4>
                                <p style="font-size:0.82rem; color:var(--admin-muted); margin-bottom:0.8rem;">The browser tab icon. Recommended: .ico or .png (32x32px).</p>
                                <div style="display:flex; gap:0.6rem;">
                                    <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('file-setting-site_favicon').click()">
                                        <i data-lucide="upload"></i> Upload Favicon
                                    </button>
                                    <button type="button" class="btn btn-outline btn-sm" onclick="removeLogo('site_favicon')" style="color:var(--admin-danger); border-color:rgba(239, 68, 68, 0.15);">
                                        <i data-lucide="trash-2"></i> Remove
                                    </button>
                                </div>
                                <input type="file" id="file-setting-site_favicon" accept="image/x-icon,image/png,image/jpeg" style="display:none" onchange="handleSettingUpload(this, 'site_favicon')">
                                <input type="hidden" id="setting-site_favicon">
                            </div>
                        </div>

                        <!-- Header Logo Row -->
                        <div style="display: flex; align-items: center; gap: 2rem; padding: 1.5rem 0; border-bottom: 1px solid var(--admin-border);">
                            <div id="preview-setting-site_logo" style="width:100px; height:100px; border-radius:12px; border:1px solid var(--admin-border); display:flex; align-items:center; justify-content:center; background:#fff; overflow:hidden; flex-shrink:0;">
                                <div id="zone-setting-site_logo">
                                    <i data-lucide="image" style="color:var(--admin-muted); width:32px;"></i>
                                </div>
                            </div>
                            <div style="flex:1;">
                                <h4 style="margin:0 0 0.25rem 0; font-size:1rem; color:var(--admin-text);">Header Logo</h4>
                                <p style="font-size:0.82rem; color:var(--admin-muted); margin-bottom:0.8rem;">Primary branding for the website header and admin sidebar.</p>
                                <div style="display:flex; gap:0.6rem;">
                                    <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('file-setting-site_logo').click()">
                                        <i data-lucide="upload"></i> Change Header Logo
                                    </button>
                                    <button type="button" class="btn btn-outline btn-sm" onclick="removeLogo('site_logo')" style="color:var(--admin-danger); border-color:rgba(239, 68, 68, 0.15);">
                                        <i data-lucide="trash-2"></i> Remove
                                    </button>
                                </div>
                                <input type="file" id="file-setting-site_logo" accept="image/*" style="display:none" onchange="handleSettingUpload(this, 'site_logo')">
                                <input type="hidden" id="setting-site_logo">
                            </div>
                        </div>

                        <!-- Footer Logo Row -->
                        <div style="display: flex; align-items: center; gap: 2rem; padding: 1.5rem 0;">
                            <div id="preview-setting-footer_logo" style="width:100px; height:100px; border-radius:12px; border:1px solid var(--admin-border); display:flex; align-items:center; justify-content:center; background:#fff; overflow:hidden; flex-shrink:0;">
                                <div id="zone-setting-footer_logo">
                                    <i data-lucide="image" style="color:var(--admin-muted); width:32px;"></i>
                                </div>
                            </div>
                            <div style="flex:1;">
                                <h4 style="margin:0 0 0.25rem 0; font-size:1rem; color:var(--admin-text);">Footer Logo</h4>
                                <p style="font-size:0.82rem; color:var(--admin-muted); margin-bottom:0.8rem;">Alternative logo for the footer. Defaults to Header Logo if empty.</p>
                                <div style="display:flex; gap:0.6rem;">
                                    <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('file-setting-footer_logo').click()">
                                        <i data-lucide="upload"></i> Change Footer Logo
                                    </button>
                                    <button type="button" class="btn btn-outline btn-sm" onclick="removeLogo('footer_logo')" style="color:var(--admin-danger); border-color:rgba(239, 68, 68, 0.15);">
                                        <i data-lucide="trash-2"></i> Remove
                                    </button>
                                </div>
                                <input type="file" id="file-setting-footer_logo" accept="image/*" style="display:none" onchange="handleSettingUpload(this, 'footer_logo')">
                                <input type="hidden" id="setting-footer_logo">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="settings-actions" style="margin-top: 1rem; display: flex; justify-content: flex-end; width: 100%;">
                <button class="btn btn-primary btn-lg" onclick="saveSettings()" style="width: auto; padding: 0.8rem 2.5rem;"><i data-lucide="save"></i>Save All Settings</button>
            </div>

            <!-- Danger Zone -->
            <div class="admin-card" style="border-top: 4px solid var(--admin-danger); margin-top: 2.5rem; opacity: 0.9;">
                <div class="card-header" style="display:flex; align-items:center; gap:1rem;">
                    <div style="width:40px; height:40px; border-radius:10px; background:rgba(239, 68, 68, 0.1); color:var(--admin-danger); display:flex; align-items:center; justify-content:center;">
                        <i data-lucide="alert-triangle"></i>
                    </div>
                    <div>
                        <h3 style="color:var(--admin-danger); margin:0;">Danger Zone</h3>
                        <p style="font-size:0.85rem; margin:0;">Actions here are permanent and require super admin privileges.</p>
                    </div>
                </div>
                <div class="card-body">
                    <div style="display:flex; justify-content:space-between; align-items:center; padding:1.25rem; background:rgba(239, 68, 68, 0.03); border-radius:12px; border:1px dashed rgba(239, 68, 68, 0.15);">
                        <div style="flex:1; padding-right:2rem;">
                            <h4 style="margin:0 0 0.25rem 0; font-weight:600;">Reset Site Configuration</h4>
                            <p style="font-size:0.85rem; color:var(--admin-muted); margin:0;">Restore all site settings (titles, subtitles, contact info) to defaults. This will not delete database records or uploaded media.</p>
                        </div>
                        <button class="btn btn-danger" onclick="resetSiteSettings()" style="white-space:nowrap;">
                            <i data-lucide="refresh-ccw"></i> Reset Site
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <?php endif; ?>

        <!-- ===== EDUBOT TRAINING PAGE (super_admin only) ===== -->
        <?php if ($_SESSION['admin_role'] === 'super_admin'): ?>
        <div class="page-section" id="page-edubot">

            <!-- Stats Row -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1rem;margin-bottom:1.5rem;">
                <div class="stat-card" style="border-left:3px solid #10b981;">
                    <div class="stat-icon" style="background:rgba(16,185,129,0.1);color:#10b981;"><i data-lucide="brain"></i></div>
                    <div class="stat-value" id="kb-stat-total">0</div>
                    <div class="stat-label">Knowledge Entries</div>
                </div>
                <div class="stat-card" style="border-left:3px solid #3b82f6;">
                    <div class="stat-icon" style="background:rgba(59,130,246,0.1);color:#3b82f6;"><i data-lucide="check-circle"></i></div>
                    <div class="stat-value" id="kb-stat-active">0</div>
                    <div class="stat-label">Active Entries</div>
                </div>
                <div class="stat-card" style="border-left:3px solid #f59e0b;">
                    <div class="stat-icon" style="background:rgba(245,158,11,0.1);color:#f59e0b;"><i data-lucide="type"></i></div>
                    <div class="stat-value" id="kb-stat-words">0</div>
                    <div class="stat-label">Total Words Trained</div>
                </div>
            </div>

            <!-- How it works banner -->
            <div style="background:linear-gradient(135deg,rgba(16,185,129,0.08),rgba(59,130,246,0.08));border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:1rem 1.5rem;margin-bottom:1.5rem;display:flex;gap:1rem;align-items:flex-start;">
                <i data-lucide="info" style="color:#10b981;flex-shrink:0;margin-top:2px;"></i>
                <div style="font-size:0.88rem;line-height:1.6;color:var(--admin-muted);">
                    <strong style="color:var(--admin-text);">How EduBot Training Works:</strong>
                    Add knowledge entries — plain text, scraped web pages, or extracted file content.
                    Active entries are automatically injected into EduBot's context before every conversation.
                    Keep entries focused and factual for best results.
                </div>
            </div>

            <!-- Knowledge Table -->
            <div class="admin-card">
                <div class="admin-card-header">
                    <h2><i data-lucide="database"></i> Knowledge Base</h2>
                    <button class="btn btn-primary" onclick="openModal('modal-edubot')" id="btn-add-knowledge">
                        <i data-lucide="plus"></i> Add Knowledge
                    </button>
                </div>
                <div style="overflow-x:auto;">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Source / Ref</th>
                                <th>Words</th>
                                <th>Status</th>
                                <th>Added</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="edubot-tbody">
                            <tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--admin-muted);">Loading...</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <?php endif; ?>

    </div><!-- /content-area -->
</div><!-- /main-content -->

<!-- ===== MODALS ===== -->

<!-- EduBot Training Modal -->
<div class="admin-modal" id="modal-edubot">
    <div class="admin-modal-content" style="max-width:720px;">
        <div class="admin-modal-header">
            <h3 id="edubot-modal-title">🧠 Add Knowledge Entry</h3>
            <button class="admin-modal-close" onclick="closeModal('modal-edubot')">&times;</button>
        </div>
        <div class="admin-modal-body">
            <form id="form-edubot" onsubmit="event.preventDefault(); saveEdubotEntry()">
                <input type="hidden" id="kb-id" value="">

                <div class="form-grid">
                    <div class="form-group full-width">
                        <label>Entry Title *</label>
                        <input type="text" id="kb-title" placeholder="e.g., TFF Policy Details, School Contact Info, Enrolment Process" required>
                    </div>

                    <div class="form-group">
                        <label>Source Type *</label>
                        <select id="kb-source-type" onchange="handleKbSourceTypeChange(this.value)" class="no-custom">
                            <option value="text">✏️ Plain Text / Manual Entry</option>
                            <option value="url">🌐 Scrape from URL</option>
                            <option value="file">📄 Upload File (PDF / CSV / TXT)</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Status</label>
                        <select id="kb-status" class="no-custom">
                            <option value="active">Active (EduBot uses this)</option>
                            <option value="inactive">Inactive (disabled)</option>
                        </select>
                    </div>

                    <!-- URL Scraper Panel -->
                    <div class="form-group full-width" id="kb-url-panel" style="display:none;">
                        <label>Website URL to Scrape</label>
                        <div style="display:flex;gap:0.5rem;">
                            <input type="url" id="kb-url" placeholder="https://education.gov.pg/policies" style="flex:1;">
                            <button type="button" class="btn btn-outline" onclick="scrapeKbUrl()" id="btn-scrape" style="white-space:nowrap;">
                                <i data-lucide="download-cloud"></i> Fetch
                            </button>
                        </div>
                        <small style="color:var(--admin-muted);margin-top:0.25rem;display:block;">The page text will be extracted and placed in the content box below.</small>
                    </div>

                    <!-- File Upload Panel -->
                    <div class="form-group full-width" id="kb-file-panel" style="display:none;">
                        <label>Upload File (PDF, CSV, TXT)</label>
                        <div class="file-upload-zone" onclick="document.getElementById('kb-file-input').click()">
                            <i data-lucide="upload" style="width:24px;height:24px;margin-bottom:0.5rem;"></i>
                            <p>Click to select file</p>
                            <small>PDF, CSV, TXT, XLSX — Max 5MB. Text will be extracted.</small>
                        </div>
                        <input type="file" id="kb-file-input" accept=".pdf,.csv,.txt,.xlsx,.xls" style="display:none" onchange="extractKbFile(this)">
                        <div id="kb-file-status" style="margin-top:0.5rem;font-size:0.85rem;color:var(--admin-muted);"></div>
                    </div>

                    <!-- Content Box -->
                    <div class="form-group full-width">
                        <label style="display:flex;justify-content:space-between;align-items:center;">
                            Knowledge Content (Optional)
                            <span id="kb-word-counter" style="font-size:0.75rem;color:var(--admin-muted);font-weight:400;">0 words</span>
                        </label>
                        <textarea id="kb-content" rows="12" placeholder="Paste or type the knowledge content here. Be specific and factual. EduBot will use this text to answer user questions." oninput="updateKbWordCount()" style="font-family:monospace;font-size:0.88rem;line-height:1.6;"></textarea>
                    </div>
                </div>

                <div class="admin-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modal-edubot')">Cancel</button>
                    <button type="submit" class="btn btn-primary" id="btn-save-kb">
                        <i data-lucide="save"></i> Save Entry
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- News Modal -->
<div class="admin-modal" id="modal-news">
    <div class="admin-modal-content">
        <div class="admin-modal-header"><h3>Add News Article</h3><button class="admin-modal-close" onclick="closeModal('modal-news')">&times;</button></div>
        <div class="admin-modal-body">
            <form id="form-news" onsubmit="event.preventDefault();saveRecord('news',this)">
                <div class="form-grid">
                    <div class="form-group full-width"><label>Title *</label><input type="text" name="title" required></div>
                    <div class="form-group"><label>Date Published *</label><input type="date" name="date_published" required></div>
                    <div class="form-group"><label>Status</label><select name="status"><option value="draft">Draft</option><option value="published">Published</option></select></div>
                    <div class="form-group full-width"><label>Summary</label><textarea name="summary" rows="3"></textarea></div>
                    <div class="form-group full-width"><label>Full Content</label><textarea id="news-content" name="content" rows="8" class="rich-editor"></textarea></div>
                    <div class="form-group full-width">
                        <label>Cover Image</label>
                        <div class="file-upload-zone" id="zone-news-image_path" onclick="document.getElementById('file-news-image_path').click()" ondragover="event.preventDefault();this.classList.add('dragging')" ondragleave="this.classList.remove('dragging')" ondrop="event.preventDefault();this.classList.remove('dragging');if(event.dataTransfer.files[0])handleModalUploadFile(event.dataTransfer.files[0],'news','image_path','image','news')">
                            <span class="upload-icon">🖼️</span>
                            <p>Click or drag &amp; drop image here</p>
                            <small>JPG, PNG, WebP • Max 10MB</small>
                        </div>
                        <input type="file" id="file-news-image_path" accept="image/*" style="display:none" onchange="handleModalUpload(this,'news','image_path','image','news')">
                        <div id="preview-news-image_path" class="upload-preview-box"></div>
                        <input type="hidden" name="image_path">
                    </div>
                    <div class="form-group"><label><input type="checkbox" name="is_featured" value="1"> Feature on Homepage</label></div>
                </div>
                <div class="admin-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modal-news')">Cancel</button>
                    <button type="submit" class="btn btn-primary"><i data-lucide="save"></i> Save</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Press Releases Modal -->
<div class="admin-modal" id="modal-press">
    <div class="admin-modal-content">
        <div class="admin-modal-header"><h3>Add Press Release</h3><button class="admin-modal-close" onclick="closeModal('modal-press')">&times;</button></div>
        <div class="admin-modal-body">
            <form id="form-press" onsubmit="event.preventDefault();saveRecord('press',this)">
                <div class="form-grid">
                    <div class="form-group full-width"><label>Title *</label><input type="text" name="title" required></div>
                    <div class="form-group"><label>Date *</label><input type="date" name="date_published" required></div>
                    <div class="form-group"><label>Status</label><select name="status"><option value="draft">Draft</option><option value="published">Published</option></select></div>
                    <div class="form-group full-width"><label>Summary</label><textarea name="summary" rows="3"></textarea></div>
                    <div class="form-group full-width">
                        <label>Cover Image</label>
                        <div class="file-upload-zone" id="zone-press-image_path" onclick="document.getElementById('file-press-image_path').click()" ondragover="event.preventDefault();this.classList.add('dragging')" ondragleave="this.classList.remove('dragging')" ondrop="event.preventDefault();this.classList.remove('dragging');if(event.dataTransfer.files[0])handleModalUploadFile(event.dataTransfer.files[0],'press','image_path','image','press')">
                            <span class="upload-icon">🖼️</span>
                            <p>Click or drag &amp; drop image here</p>
                            <small>JPG, PNG, WebP • Max 10MB</small>
                        </div>
                        <input type="file" id="file-press-image_path" accept="image/*" style="display:none" onchange="handleModalUpload(this,'press','image_path','image','press')">
                        <div id="preview-press-image_path" class="upload-preview-box"></div>
                        <input type="hidden" name="image_path">
                    </div>
                    <div class="form-group full-width">
                        <label>PDF Document</label>
                        <div class="file-upload-zone" id="zone-press-pdf_path" onclick="document.getElementById('file-press-pdf_path').click()" ondragover="event.preventDefault();this.classList.add('dragging')" ondragleave="this.classList.remove('dragging')" ondrop="event.preventDefault();this.classList.remove('dragging');if(event.dataTransfer.files[0])handleModalUploadFile(event.dataTransfer.files[0],'press','pdf_path','document')">
                            <span class="upload-icon">📄</span>
                            <p>Click or drag &amp; drop PDF here</p>
                            <small>PDF only • Max 10MB</small>
                        </div>
                        <input type="file" id="file-press-pdf_path" accept=".pdf" style="display:none" onchange="handleModalUpload(this,'press','pdf_path','document')">
                        <div id="preview-press-pdf_path" class="upload-preview-box"></div>
                        <input type="hidden" name="pdf_path">
                    </div>
                </div>
                <div class="admin-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modal-press')">Cancel</button>
                    <button type="submit" class="btn btn-primary"><i data-lucide="save"></i> Save</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Events Modal -->
<div class="admin-modal" id="modal-events">
    <div class="admin-modal-content">
        <div class="admin-modal-header"><h3>Add Event</h3><button class="admin-modal-close" onclick="closeModal('modal-events')">&times;</button></div>
        <div class="admin-modal-body">
            <form id="form-events" onsubmit="event.preventDefault();saveRecord('events',this)">
                <div class="form-grid">
                    <div class="form-group full-width"><label>Title *</label><input type="text" name="title" required></div>
                    <div class="form-group"><label>Date *</label><input type="date" name="event_date" required></div>
                    <div class="form-group"><label>Time</label><input type="time" name="event_time"></div>
                    <div class="form-group"><label>Location</label><input type="text" name="location"></div>
                    <div class="form-group"><label>Status</label><select name="status"><option value="upcoming">Upcoming</option><option value="past">Past</option></select></div>
                    <div class="form-group full-width"><label>Description</label><textarea name="description" rows="4"></textarea></div>
                    <div class="form-group full-width">
                        <label>Event Image</label>
                        <div class="file-upload-zone" id="zone-events-image_path" onclick="document.getElementById('file-events-image_path').click()" ondragover="event.preventDefault();this.classList.add('dragging')" ondragleave="this.classList.remove('dragging')" ondrop="event.preventDefault();this.classList.remove('dragging');if(event.dataTransfer.files[0])handleModalUploadFile(event.dataTransfer.files[0],'events','image_path','image','events')">
                            <i data-lucide="image" class="upload-icon"></i>
                            <p>Click or drag &amp; drop image here</p>
                            <small>JPG, PNG, WebP • Max 10MB</small>
                        </div>
                        <input type="file" id="file-events-image_path" accept="image/*" style="display:none" onchange="handleModalUpload(this,'events','image_path','image','events')">
                        <div id="preview-events-image_path" class="upload-preview-box"></div>
                        <input type="hidden" name="image_path">
                    </div>
                </div>
                <div class="admin-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modal-events')">Cancel</button>
                    <button type="submit" class="btn btn-primary"><i data-lucide="save"></i> Save</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Gallery Modal -->
<div class="admin-modal" id="modal-gallery">
    <div class="admin-modal-content">
        <div class="admin-modal-header"><h3>Add Album</h3><button class="admin-modal-close" onclick="closeModal('modal-gallery')">&times;</button></div>
        <div class="admin-modal-body">
            <form id="form-gallery" onsubmit="event.preventDefault();saveRecord('gallery',this)">
                <div class="form-grid">
                    <div class="form-group full-width"><label>Album Title *</label><input type="text" name="title" required></div>
                    <div class="form-group"><label>Tag</label><input type="text" name="tag" placeholder="e.g., CULTURAL"></div>
                    <div class="form-group"><label>Tag Color</label><input type="text" name="tag_color" value="var(--primary)"></div>
                    <div class="form-group full-width"><label>Description</label><textarea name="description" rows="3"></textarea></div>
                    <div class="form-group full-width">
                        <label>Album Cover Image</label>
                        <div class="file-upload-zone" id="zone-gallery-cover_image" onclick="document.getElementById('file-gallery-cover_image').click()" ondragover="event.preventDefault();this.classList.add('dragging')" ondragleave="this.classList.remove('dragging')" ondrop="event.preventDefault();this.classList.remove('dragging');if(event.dataTransfer.files[0])handleModalUploadFile(event.dataTransfer.files[0],'gallery','cover_image','image','gallery')">
                            <i data-lucide="image" class="upload-icon"></i>
                            <p>Click or drag &amp; drop image here</p>
                            <small>JPG, PNG, WebP • Max 10MB</small>
                        </div>
                        <input type="file" id="file-gallery-cover_image" accept="image/*" style="display:none" onchange="handleModalUpload(this,'gallery','cover_image','image','gallery')">
                        <div id="preview-gallery-cover_image" class="upload-preview-box"></div>
                        <input type="hidden" name="cover_image">
                    </div>
                    <div class="form-group"><label>Sort Order</label><input type="number" name="sort_order" value="0"></div>
                </div>
                <div class="admin-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modal-gallery')">Cancel</button>
                    <button type="submit" class="btn btn-primary"><i data-lucide="save"></i> Save</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Publications Modal -->
<div class="admin-modal" id="modal-publications">
    <div class="admin-modal-content">
        <div class="admin-modal-header"><h3>Add Publication</h3><button class="admin-modal-close" onclick="closeModal('modal-publications')">&times;</button></div>
        <div class="admin-modal-body">
            <form id="form-publications" onsubmit="event.preventDefault();saveRecord('publications',this)">
                <div class="form-grid">
                    <div class="form-group full-width"><label>Title *</label><input type="text" name="title" required></div>
                    <div class="form-group"><label>Category *</label><select name="category" required>
                        <option value="annual_report">Annual Report</option>
                        <option value="legislation">Legislation</option>
                        <option value="gov_plan">Government Plan</option>
                        <option value="edu_policy">Education Policy</option>
                        <option value="edu_plan">Education Plan</option>
                    </select></div>
                    <div class="form-group"><label>Year</label><input type="number" name="year" min="2000" max="2099"></div>
                    <div class="form-group full-width"><label>Description</label><textarea name="description" rows="2" placeholder="e.g. Official 2026 School Term Dates"></textarea></div>
                    <div class="form-group full-width">
                        <label>Publication PDF</label>
                        <div class="file-upload-zone" id="zone-publications-pdf_path" onclick="document.getElementById('file-publications-pdf_path').click()" ondragover="event.preventDefault();this.classList.add('dragging')" ondragleave="this.classList.remove('dragging')" ondrop="event.preventDefault();this.classList.remove('dragging');if(event.dataTransfer.files[0])handleModalUploadFile(event.dataTransfer.files[0],'publications','pdf_path','document','publications')">
                            <i data-lucide="file-text" class="upload-icon"></i>
                            <p>Click or drag &amp; drop PDF here</p>
                            <small>PDF only • Max 10MB</small>
                        </div>
                        <input type="file" id="file-publications-pdf_path" accept=".pdf" style="display:none" onchange="handleModalUpload(this,'publications','pdf_path','document','publications')">
                        <div id="preview-publications-pdf_path" class="upload-preview-box"></div>
                        <input type="hidden" name="pdf_path">
                    </div>
                    <div class="form-group full-width">
                        <label>Cover Thumbnail Image</label>
                        <div class="file-upload-zone" id="zone-publications-thumbnail_path" onclick="document.getElementById('file-publications-thumbnail_path').click()" ondragover="event.preventDefault();this.classList.add('dragging')" ondragleave="this.classList.remove('dragging')" ondrop="event.preventDefault();this.classList.remove('dragging');if(event.dataTransfer.files[0])handleModalUploadFile(event.dataTransfer.files[0],'publications','thumbnail_path','image','publications')">
                            <span class="upload-icon">🖼️</span>
                            <p>Click or drag &amp; drop thumbnail here</p>
                            <small>JPG, PNG, WebP • Max 10MB</small>
                        </div>
                        <input type="file" id="file-publications-thumbnail_path" accept="image/*" style="display:none" onchange="handleModalUpload(this,'publications','thumbnail_path','image','publications')">
                        <div id="preview-publications-thumbnail_path" class="upload-preview-box"></div>
                        <input type="hidden" name="thumbnail_path">
                    </div>
                    <div class="form-group"><label>Sort Order</label><input type="number" name="sort_order" value="0"></div>
                </div>
                <div class="admin-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modal-publications')">Cancel</button>
                    <button type="submit" class="btn btn-primary"><i data-lucide="save"></i> Save</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Calendars Modal -->
<div class="admin-modal" id="modal-calendars">
    <div class="admin-modal-content">
        <div class="admin-modal-header"><h3>Add Calendar</h3><button class="admin-modal-close" onclick="closeModal('modal-calendars')">&times;</button></div>
        <div class="admin-modal-body">
            <form id="form-calendars" onsubmit="event.preventDefault();saveRecord('calendars',this)">
                <div class="form-grid">
                    <div class="form-group full-width"><label>Title *</label><input type="text" name="title" required></div>
                    <div class="form-group"><label>Category *</label><select name="category" required>
                        <option value="Education Calendar">Education Calendar</option>
                        <option value="Division Calendar">Division Calendar</option>
                    </select></div>
                    <div class="form-group"><label>Year</label><input type="number" name="year" min="2000" max="2099"></div>
                    <div class="form-group full-width"><label>Description</label><textarea name="description" rows="2" placeholder="e.g. Official 2026 School Term Dates"></textarea></div>
                    <div class="form-group full-width">
                        <label>Calendar File (PDF or Image)</label>
                        <div class="file-upload-zone" id="zone-calendars-pdf_path" onclick="document.getElementById('file-calendars-pdf_path').click()" ondragover="event.preventDefault();this.classList.add('dragging')" ondragleave="this.classList.remove('dragging')" ondrop="event.preventDefault();this.classList.remove('dragging');if(event.dataTransfer.files[0])handleModalUploadFile(event.dataTransfer.files[0],'calendars','pdf_path','document','calendars')">
                            <i data-lucide="file-text" class="upload-icon"></i>
                            <p>Click or drag &amp; drop PDF or Image here</p>
                            <small>PDF, JPG, PNG • Max 10MB</small>
                        </div>
                        <input type="file" id="file-calendars-pdf_path" accept=".pdf,image/*" style="display:none" onchange="handleModalUpload(this,'calendars','pdf_path','document','calendars')">
                        <div id="preview-calendars-pdf_path" class="upload-preview-box"></div>
                        <input type="hidden" name="pdf_path">
                    </div>
                    <div class="form-group full-width">
                        <label>Thumbnail Image</label>
                        <div class="file-upload-zone" id="zone-calendars-thumbnail_path" onclick="document.getElementById('file-calendars-thumbnail_path').click()" ondragover="event.preventDefault();this.classList.add('dragging')" ondragleave="this.classList.remove('dragging')" ondrop="event.preventDefault();this.classList.remove('dragging');if(event.dataTransfer.files[0])handleModalUploadFile(event.dataTransfer.files[0],'calendars','thumbnail_path','image','calendars')">
                            <span class="upload-icon">🖼️</span>
                            <p>Click or drag &amp; drop thumbnail here</p>
                            <small>JPG, PNG, WebP • Max 10MB</small>
                        </div>
                        <input type="file" id="file-calendars-thumbnail_path" accept="image/*" style="display:none" onchange="handleModalUpload(this,'calendars','thumbnail_path','image','calendars')">
                        <div id="preview-calendars-thumbnail_path" class="upload-preview-box"></div>
                        <input type="hidden" name="thumbnail_path">
                    </div>
                    <div class="form-group"><label>Sort Order</label><input type="number" name="sort_order" value="0"></div>
                </div>
                <div class="admin-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modal-calendars')">Cancel</button>
                    <button type="submit" class="btn btn-primary"><i data-lucide="save"></i> Save</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Textbooks Modal -->
<div class="admin-modal" id="modal-textbooks">
    <div class="admin-modal-content">
        <div class="admin-modal-header"><h3>Add Textbook</h3><button class="admin-modal-close" onclick="closeModal('modal-textbooks')">&times;</button></div>
        <div class="admin-modal-body">
            <form id="form-textbooks" onsubmit="event.preventDefault();saveRecord('textbooks',this)">
                <div class="form-grid">
                    <div class="form-group"><label>Grade Level *</label><input type="text" name="grade_level" required placeholder="e.g., Grade 1 & 2"></div>
                    <div class="form-group"><label>Subject *</label><input type="text" name="subject" required placeholder="e.g., Mathematics"></div>
                    <div class="form-group full-width">
                        <label>Textbook PDF</label>
                        <div class="file-upload-zone" id="zone-textbooks-textbook_pdf" onclick="document.getElementById('file-textbooks-textbook_pdf').click()" ondragover="event.preventDefault();this.classList.add('dragging')" ondragleave="this.classList.remove('dragging')" ondrop="event.preventDefault();this.classList.remove('dragging');if(event.dataTransfer.files[0])handleModalUploadFile(event.dataTransfer.files[0],'textbooks','textbook_pdf','document','textbooks')">
                            <i data-lucide="file-text" class="upload-icon"></i>
                            <p>Click or drag &amp; drop textbook PDF here</p>
                            <small>PDF only • Max 10MB</small>
                        </div>
                        <input type="file" id="file-textbooks-textbook_pdf" accept=".pdf" style="display:none" onchange="handleModalUpload(this,'textbooks','textbook_pdf','document','textbooks')">
                        <div id="preview-textbooks-textbook_pdf" class="upload-preview-box"></div>
                        <input type="hidden" name="textbook_pdf">
                    </div>
                    <div class="form-group full-width">
                        <label>Teacher's Manual PDF</label>
                        <div class="file-upload-zone" id="zone-textbooks-manual_pdf" onclick="document.getElementById('file-textbooks-manual_pdf').click()" ondragover="event.preventDefault();this.classList.add('dragging')" ondragleave="this.classList.remove('dragging')" ondrop="event.preventDefault();this.classList.remove('dragging');if(event.dataTransfer.files[0])handleModalUploadFile(event.dataTransfer.files[0],'textbooks','manual_pdf','document','textbooks')">
                            <i data-lucide="file-text" class="upload-icon"></i>
                            <p>Click or drag &amp; drop teacher manual PDF here</p>
                            <small>PDF only • Max 10MB</small>
                        </div>
                        <input type="file" id="file-textbooks-manual_pdf" accept=".pdf" style="display:none" onchange="handleModalUpload(this,'textbooks','manual_pdf','document','textbooks')">
                        <div id="preview-textbooks-manual_pdf" class="upload-preview-box"></div>
                        <input type="hidden" name="manual_pdf">
                    </div>
                    <div class="form-group"><label>Sort Order</label><input type="number" name="sort_order" value="0"></div>
                </div>
                <div class="admin-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modal-textbooks')">Cancel</button>
                    <button type="submit" class="btn btn-primary"><i data-lucide="save"></i> Save</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- GTFS Modal -->
<div class="admin-modal" id="modal-gtfs">
    <div class="admin-modal-content">
        <div class="admin-modal-header"><h3>Add/Edit GTFS Report</h3><button class="admin-modal-close" onclick="closeModal('modal-gtfs')">&times;</button></div>
        <div class="admin-modal-body">
            <form id="form-gtfs" onsubmit="event.preventDefault();saveRecord('gtfs',this)">
                <input type="hidden" name="id">
                <div class="form-grid">
                    <div class="form-group">
                        <label>Year *</label>
                        <select name="year" required>
                            <?php 
                            $currentYear = date('Y');
                            for($y = $currentYear + 1; $y >= 2010; $y--) {
                                echo "<option value='$y'>$y</option>";
                            }
                            ?>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Category *</label>
                        <select name="category" required onchange="toggleGtfsFields(this.value)">
                            <option value="Subsidy Report">Subsidy Report (General)</option>
                            <option value="Project Fees">Project Fees</option>
                            <option value="Distribution List">Distribution List</option>
                            <option value="Policy Document">Policy Document</option>
                            <option value="School Grant">School Grant</option>
                        </select>
                    </div>
                    <div class="form-group gtfs-extra-field" style="display:none;">
                        <label>Quarter</label>
                        <select name="quarter">
                            <option value="">Select Quarter</option>
                            <option value="Q1">Quarter 1</option>
                            <option value="Q2">Quarter 2</option>
                            <option value="Q3">Quarter 3</option>
                            <option value="Q4">Quarter 4</option>
                        </select>
                    </div>
                    <div class="form-group gtfs-extra-field" style="display:none;">
                        <label>Region</label>
                        <select name="region">
                            <option value="">Select Region</option>
                            <option value="Highlands">Highlands Region</option>
                            <option value="Momase">Momase Region</option>
                            <option value="Southern">Southern Region</option>
                            <option value="Islands">Islands Region</option>
                        </select>
                    </div>
                    <div class="form-group full-width"><label>Report Title *</label><input type="text" name="title" required placeholder="e.g. 2025 Approved GTFS Project Fees"></div>
                    <div class="form-group full-width">
                        <label>Upload PDF *</label>
                        <div class="file-upload-zone" id="zone-gtfs-pdf_path" onclick="document.getElementById('file-gtfs-pdf_path').click()" ondragover="event.preventDefault();this.classList.add('dragging')" ondragleave="this.classList.remove('dragging')" ondrop="event.preventDefault();this.classList.remove('dragging');if(event.dataTransfer.files[0])handleModalUploadFile(event.dataTransfer.files[0],'gtfs','pdf_path','document','gtfs')">
                            <span class="upload-icon">📄</span>
                            <p>Click or drag &amp; drop PDF here</p>
                            <small>PDF only • Max 10MB</small>
                        </div>
                        <input type="file" id="file-gtfs-pdf_path" accept=".pdf" style="display:none" onchange="handleModalUpload(this,'gtfs','pdf_path','document','gtfs')">
                        <div id="preview-gtfs-pdf_path" class="upload-preview-box"></div>
                        <input type="hidden" name="pdf_path" required>
                    </div>
                </div>
                <div class="admin-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modal-gtfs')">Cancel</button>
                    <button type="submit" class="btn btn-primary"><i data-lucide="save"></i> Save</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Jobs Modal -->
<div class="admin-modal" id="modal-jobs">
    <div class="admin-modal-content">
        <div class="admin-modal-header"><h3>Post Job</h3><button class="admin-modal-close" onclick="closeModal('modal-jobs')">&times;</button></div>
        <div class="admin-modal-body">
            <form id="form-jobs" onsubmit="event.preventDefault();saveRecord('jobs',this)">
                <div class="form-grid">
                    <div class="form-group full-width"><label>Job Title *</label><input type="text" name="title" required></div>
                    <div class="form-group">
                        <label>Post Under Section</label>
                        <select name="section">
                            <option value="job">Latest Job Openings</option>
                            <option value="scholarship">Featured Scholarships</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Location</label>
                        <input type="text" name="location">
                    </div>
                    <div class="form-group">
                        <label>Type</label>
                        <select name="job_type_select" id="jobs-type-select" onchange="if(this.value==='__NEW__'){document.getElementById('jobs-new-type-group').style.display='block'}else{document.getElementById('jobs-new-type-group').style.display='none'}">
                            <option value="teaching">Teaching</option>
                            <option value="administrative">Administrative</option>
                            <option value="contract">Contract</option>
                            <option value="__NEW__">+ Add New Type...</option>
                        </select>
                        <input type="hidden" name="job_type">
                    </div>
                    <div class="form-group" id="jobs-new-type-group" style="display:none;">
                        <label>New Type Name</label>
                        <input type="text" id="jobs-new-type-input" placeholder="e.g. Consultancy">
                    </div>
                    <div class="form-group"><label>Closing Date</label><input type="date" name="closing_date"></div>
                    <div class="form-group"><label>Status</label><select name="status"><option value="open">Open</option><option value="closed">Closed</option></select></div>
                    <div class="form-group full-width"><label>Description</label><textarea id="jobs-description" name="description" rows="6" class="rich-editor"></textarea></div>
                    <div class="form-group full-width">
                        <label>Job Description PDF</label>
                        <div class="file-upload-zone" id="zone-jobs-pdf_path" onclick="document.getElementById('file-jobs-pdf_path').click()" ondragover="event.preventDefault();this.classList.add('dragging')" ondragleave="this.classList.remove('dragging')" ondrop="event.preventDefault();this.classList.remove('dragging');if(event.dataTransfer.files[0])handleModalUploadFile(event.dataTransfer.files[0],'jobs','pdf_path','document','jobs')">
                            <span class="upload-icon">📄</span>
                            <p>Click or drag &amp; drop PDF here</p>
                            <small>PDF only • Max 10MB</small>
                        </div>
                        <input type="file" id="file-jobs-pdf_path" accept=".pdf" style="display:none" onchange="handleModalUpload(this,'jobs','pdf_path','document','jobs')">
                        <div id="preview-jobs-pdf_path" class="upload-preview-box"></div>
                        <input type="hidden" name="pdf_path">
                    </div>
                </div>
                <div class="admin-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modal-jobs')">Cancel</button>
                    <button type="submit" class="btn btn-primary"><i data-lucide="save"></i> Save</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Scholarships Modal -->
<div class="admin-modal" id="modal-scholarships">
    <div class="admin-modal-content">
        <div class="admin-modal-header"><h3>Add Scholarship</h3><button class="admin-modal-close" onclick="closeModal('modal-scholarships')">&times;</button></div>
        <div class="admin-modal-body">
            <form id="form-scholarships" onsubmit="event.preventDefault();saveRecord('scholarships',this)">
                <div class="form-grid">
                    <div class="form-group full-width"><label>Title *</label><input type="text" name="title" required></div>
                    <div class="form-group"><label>Deadline</label><input type="date" name="deadline"></div>
                    <div class="form-group"><label>Status</label><select name="status"><option value="open">Open</option><option value="closed">Closed</option></select></div>
                    <div class="form-group full-width"><label>Description</label><textarea id="scholarships-description" name="description" rows="4" class="rich-editor"></textarea></div>
                    <div class="form-group full-width"><label>Eligibility</label><textarea name="eligibility" rows="3"></textarea></div>
                    <div class="form-group full-width"><label>External Link</label><input type="url" name="external_link"></div>
                </div>
                <div class="admin-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modal-scholarships')">Cancel</button>
                    <button type="submit" class="btn btn-primary"><i data-lucide="save"></i> Save</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Ticker Modal -->
<div class="admin-modal" id="modal-ticker">
    <div class="admin-modal-content">
        <div class="admin-modal-header"><h3>Add Ticker Item</h3><button class="admin-modal-close" onclick="closeModal('modal-ticker')">&times;</button></div>
        <div class="admin-modal-body">
            <form id="form-ticker" onsubmit="event.preventDefault();saveRecord('ticker',this)">
                <div class="form-grid">
                    <div class="form-group"><label>Label *</label><input type="text" name="label" required placeholder="e.g., NEW, BUDGET, POLICY"></div>
                    <div class="form-group"><label>Sort Order</label><input type="number" name="sort_order" value="0"></div>
                    <div class="form-group full-width"><label>Text *</label><input type="text" name="text" required placeholder="Ticker headline text..."></div>
                    <div class="form-group"><label><input type="checkbox" name="is_active" value="1" checked> Active</label></div>
                </div>
                <div class="admin-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modal-ticker')">Cancel</button>
                    <button type="submit" class="btn btn-primary"><i data-lucide="save"></i> Save</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- FAQ Modal -->
<div class="admin-modal" id="modal-faq">
    <div class="admin-modal-content">
        <div class="admin-modal-header"><h3>Add FAQ</h3><button class="admin-modal-close" onclick="closeModal('modal-faq')">&times;</button></div>
        <div class="admin-modal-body">
            <form id="form-faq" onsubmit="event.preventDefault();saveRecord('faq',this)">
                <div class="form-grid">
                    <div class="form-group full-width"><label>Question *</label><input type="text" name="question" required placeholder="Enter the question..."></div>
                    <div class="form-group full-width"><label>Answer *</label><textarea name="answer" rows="6" required placeholder="Enter the answer..."></textarea></div>
                    <div class="form-group"><label>Category</label><input type="text" name="category" placeholder="e.g., General, Careers, Enrollment"></div>
                    <div class="form-group"><label>Sort Order</label><input type="number" name="sort_order" value="0"></div>
                    <div class="form-group"><label><input type="checkbox" name="is_active" value="1" checked> Active</label></div>
                </div>
                <div class="admin-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modal-faq')">Cancel</button>
                    <button type="submit" class="btn btn-primary"><i data-lucide="save"></i> Save</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Notices Modal -->
<div class="admin-modal" id="modal-notices">
    <div class="admin-modal-content">
        <div class="admin-modal-header"><h3>Add Notice</h3><button class="admin-modal-close" onclick="closeModal('modal-notices')">&times;</button></div>
        <div class="admin-modal-body">
            <form id="form-notices" onsubmit="event.preventDefault();saveRecord('notices',this)">
                <div class="form-grid">
                    <div class="form-group full-width"><label>Title *</label><input type="text" name="title" required></div>
                    <div class="form-group">
                        <label>Card Type</label>
                        <select name="card_type" id="notices-card-type-select" onchange="handleNoticeTypeChange(this.value)">
                            <option value="dates">Term Dates</option>
                            <option value="plan">Education Plan</option>
                            <option value="quick_links">Quick Links</option>
                            <option value="__NEW__">+ Add New Type...</option>
                        </select>
                    </div>
                    <div class="form-group" id="notices-new-type-wrap" style="display:none;">
                        <label>New Card Type Name *</label>
                        <input type="text" id="notices-new-type-input" placeholder="e.g. notices, announcements">
                    </div>
                    <div class="form-group"><label>Sort Order</label><input type="number" name="sort_order" value="0"></div>
                    <div class="form-group full-width"><label>Content (HTML)</label><textarea id="notices-content" name="content" rows="6" class="rich-editor"></textarea></div>
                    
                    <div class="form-group full-width">
                        <label>Document Cover Image (Mainly for Education Plan)</label>
                        <div class="file-upload-zone" id="zone-notices-thumbnail_path" onclick="document.getElementById('file-notices-thumbnail_path').click()" ondragover="event.preventDefault();this.classList.add('dragging')" ondragleave="this.classList.remove('dragging')" ondrop="event.preventDefault();this.classList.remove('dragging');if(event.dataTransfer.files[0])handleModalUploadFile(event.dataTransfer.files[0],'notices','thumbnail_path','image','notices')">
                            <span class="upload-icon">📷</span>
                            <p>Click or drag &amp; drop image here</p>
                            <small>Image only • Max 10MB</small>
                        </div>
                        <input type="file" id="file-notices-thumbnail_path" accept="image/*" style="display:none" onchange="handleModalUpload(this,'notices','thumbnail_path','image','notices')">
                        <div id="preview-notices-thumbnail_path" class="upload-preview-box"></div>
                        <input type="hidden" name="thumbnail_path">
                    </div>

                    <div class="form-group full-width">
                        <label>Attachment PDF</label>
                        <div class="file-upload-zone" id="zone-notices-pdf_path" onclick="document.getElementById('file-notices-pdf_path').click()" ondragover="event.preventDefault();this.classList.add('dragging')" ondragleave="this.classList.remove('dragging')" ondrop="event.preventDefault();this.classList.remove('dragging');if(event.dataTransfer.files[0])handleModalUploadFile(event.dataTransfer.files[0],'notices','pdf_path','document','notices')">
                            <span class="upload-icon">📄</span>
                            <p>Click or drag &amp; drop PDF here</p>
                            <small>PDF only • Max 10MB</small>
                        </div>
                        <input type="file" id="file-notices-pdf_path" accept=".pdf" style="display:none" onchange="handleModalUpload(this,'notices','pdf_path','document','notices')">
                        <div id="preview-notices-pdf_path" class="upload-preview-box"></div>
                        <input type="hidden" name="pdf_path">
                    </div>
                    <div class="form-group"><label><input type="checkbox" name="is_active" value="1" checked> Active</label></div>
                </div>
                <div class="admin-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modal-notices')">Cancel</button>
                    <button type="submit" class="btn btn-primary"><i data-lucide="save"></i> Save</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- App Links Modal -->
<div class="admin-modal" id="modal-apps">
    <div class="admin-modal-content">
        <div class="admin-modal-header"><h3>Add App Link</h3><button class="admin-modal-close" onclick="closeModal('modal-apps')">&times;</button></div>
        <div class="admin-modal-body">
            <form id="form-apps" onsubmit="event.preventDefault();saveRecord('apps',this)">
                <div class="form-grid">
                    <div class="form-group"><label>Title *</label><input type="text" name="title" required></div>
                    <div class="form-group"><label>Category *</label>
                        <select name="category" required>
                            <option value="New Apps Launched">New Apps Launched</option>
                            <option value="NDoE Apps">NDoE Apps</option>
                            <option value="Teacher Self-Service Apps">Teacher Self-Service Apps</option>
                            <option value="School Administration Systems">School Administration Systems</option>
                        </select>
                    </div>
                    <div class="form-group full-width"><label>Description</label><input type="text" name="description"></div>
                    <div class="form-group full-width"><label>URL *</label><input type="url" name="url" required></div>
                    <div class="form-group full-width">
                        <label>App Logo (Image)</label>
                        <div class="file-upload-zone" id="zone-apps-image_path" onclick="document.getElementById('file-apps-image_path').click()" ondragover="event.preventDefault();this.classList.add('dragging')" ondragleave="this.classList.remove('dragging')" ondrop="event.preventDefault();this.classList.remove('dragging');if(event.dataTransfer.files[0])handleModalUploadFile(event.dataTransfer.files[0],'apps','image_path','image','apps')">
                            <span class="upload-icon">🖼️</span>
                            <p>Click or drag &amp; drop logo image here</p>
                            <small>JPG, PNG, SVG • Max 2MB</small>
                        </div>
                        <input type="file" id="file-apps-image_path" accept="image/*" style="display:none" onchange="handleModalUpload(this,'apps','image_path','image','apps')">
                        <div id="preview-apps-image_path" class="upload-preview-box"></div>
                        <input type="hidden" name="image_path">
                    </div>
                    <div class="form-group"><label>Fallback Emoji</label><input type="text" name="icon_emoji" value="🔗"></div>
                    <div class="form-group"><label>Sort Order</label><input type="number" name="sort_order" value="0"></div>
                    <div class="form-group"><label><input type="checkbox" name="is_active" value="1" checked> Active</label></div>
                </div>
                <div class="admin-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modal-apps')">Cancel</button>
                    <button type="submit" class="btn btn-primary"><i data-lucide="save"></i> Save</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Public Forms Modal -->
<div class="admin-modal" id="modal-forms">
    <div class="admin-modal-content">
        <div class="admin-modal-header"><h3>Add Public Form</h3><button class="admin-modal-close" onclick="closeModal('modal-forms')">&times;</button></div>
        <div class="admin-modal-body">
            <form id="form-forms" onsubmit="event.preventDefault();saveRecord('forms',this)">
                <div class="form-grid">
                    <div class="form-group full-width"><label>Title *</label><input type="text" name="title" required></div>
                    <div class="form-group">
                        <label>Category *</label>
                        <select name="category_select" id="forms-category-select" onchange="handleCategoryChange('forms', this.value)" required>
                            <option value="">Select Category...</option>
                            <!-- Populated by JS -->
                            <option value="__NEW__">+ Add New Category...</option>
                        </select>
                        <div id="forms-new-category-wrap" style="display:none; margin-top:0.5rem;">
                            <input type="text" id="forms-new-category-input" placeholder="Enter new category name..." style="border-color:var(--admin-primary);">
                        </div>
                        <input type="hidden" name="category">
                    </div>
                    <div class="form-group"><label>Sort Order</label><input type="number" name="sort_order" value="0"></div>
                    <div class="form-group full-width">
                        <label>Accent Color</label>
                        <div style="display:flex; align-items:center; gap:0.5rem; background:rgba(0,0,0,0.02); padding:0.4rem; border-radius:6px; border:1px solid var(--admin-border);">
                            <input type="color" value="#3ba5e0" style="width:50px; height:38px; border:none; padding:2px; cursor:pointer; background:transparent;" onchange="document.getElementById('accent-color-text').value = this.value">
                            <input type="text" name="accent_color" id="accent-color-text" value="#3ba5e0" placeholder="e.g. #3ba5e0 or var(--primary)" style="flex:1; border:none; background:transparent; font-family:monospace; font-size:0.9rem;">
                        </div>
                        <small style="color:var(--admin-muted); display:block; margin-top:0.3rem;">Visual identifier color for this form's icon/border.</small>
                    </div>
                    <div class="form-group full-width"><label>Description</label><textarea name="description" rows="3"></textarea></div>
                    <div class="form-group full-width">
                        <label>Form PDF</label>
                        <div class="file-upload-zone" id="zone-forms-pdf_path" onclick="document.getElementById('file-forms-pdf_path').click()" ondragover="event.preventDefault();this.classList.add('dragging')" ondragleave="this.classList.remove('dragging')" ondrop="event.preventDefault();this.classList.remove('dragging');if(event.dataTransfer.files[0])handleModalUploadFile(event.dataTransfer.files[0],'forms','pdf_path','document','forms')">
                            <i data-lucide="file-up" class="upload-icon"></i>
                            <p>Click or drag &amp; drop PDF here</p>
                            <small>PDF only • Max 10MB</small>
                        </div>
                        <input type="file" id="file-forms-pdf_path" accept=".pdf" style="display:none" onchange="handleModalUpload(this,'forms','pdf_path','document','forms')">
                        <div id="preview-forms-pdf_path" class="upload-preview-box"></div>
                        <input type="hidden" name="pdf_path">
                    </div>
                </div>
                <div class="admin-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modal-forms')">Cancel</button>
                    <button type="submit" class="btn btn-primary"><i data-lucide="save"></i> Save</button>
                </div>
            </form>
        </div>
    </div>
</div>


<!-- View Contact Modal -->
<div class="admin-modal" id="modal-view-contact">
    <div class="admin-modal-content">
        <div class="admin-modal-header"><h3>📬 Contact Submission</h3><button class="admin-modal-close" onclick="closeModal('modal-view-contact')">&times;</button></div>
        <div class="admin-modal-body">
            <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:0.7rem 1rem;font-weight:600;width:120px;color:var(--admin-muted);">Name:</td><td id="view-contact-name" style="padding:0.7rem 1rem;"></td></tr>
                <tr><td style="padding:0.7rem 1rem;font-weight:600;color:var(--admin-muted);">Email:</td><td style="padding:0.7rem 1rem;"><a id="view-contact-email" style="color:var(--admin-primary);"></a></td></tr>
                <tr><td style="padding:0.7rem 1rem;font-weight:600;color:var(--admin-muted);">Phone:</td><td id="view-contact-phone" style="padding:0.7rem 1rem;"></td></tr>
                <tr><td style="padding:0.7rem 1rem;font-weight:600;color:var(--admin-muted);">Subject:</td><td id="view-contact-subject" style="padding:0.7rem 1rem;"></td></tr>
                <tr><td style="padding:0.7rem 1rem;font-weight:600;color:var(--admin-muted);">Date:</td><td id="view-contact-date" style="padding:0.7rem 1rem;"></td></tr>
            </table>
            <hr style="margin:1rem 0;border:none;border-top:1px solid var(--admin-border);">
            <p style="font-weight:600;margin-bottom:0.5rem;">Message:</p>
            <div id="view-contact-message" style="background:#f9f9f9;padding:1rem;border-radius:8px;border:1px solid var(--admin-border);line-height:1.6;white-space:pre-wrap;"></div>
        </div>
        <div class="admin-modal-footer">
            <button class="btn btn-outline" onclick="closeModal('modal-view-contact')">Close</button>
        </div>
    </div>
</div>

<!-- Users Modal -->
<div class="admin-modal" id="modal-users">
    <div class="admin-modal-content" style="max-width:580px;">
        <div class="admin-modal-header">
            <h3 id="users-modal-title"><i data-lucide="user-plus"></i> Add Admin User</h3>
            <button class="admin-modal-close" onclick="closeModal('modal-users')">&times;</button>
        </div>
        <div class="admin-modal-body">
            <form id="form-users" onsubmit="event.preventDefault(); saveUserRecord()">
                <input type="hidden" id="user-id" value="">
                <div class="form-grid">
                    <div class="form-group">
                        <label>Username *</label>
                        <input type="text" id="user-username" required placeholder="e.g. jsmith" autocomplete="off">
                    </div>
                    <div class="form-group">
                        <label>Password <span id="user-pw-hint" style="font-weight:400;color:var(--admin-muted);font-size:0.78rem;">(required for new users)</span></label>
                        <input type="password" id="user-password" placeholder="Leave blank to keep current" autocomplete="new-password">
                    </div>
                    <div class="form-group">
                        <label>Full Name *</label>
                        <input type="text" id="user-fullname" required placeholder="e.g. John Smith">
                    </div>
                    <div class="form-group">
                        <label>Designation</label>
                        <input type="text" id="user-designation" placeholder="e.g. Curriculum Officer">
                    </div>
                    <div class="form-group">
                        <label>Email *</label>
                        <input type="email" id="user-email" required placeholder="e.g. jsmith@doe.gov.pg">
                    </div>
                    <div class="form-group">
                        <label>Role *</label>
                        <select id="user-role" required onchange="toggleDesignationHint(this.value)">
                            <option value="" disabled selected>— Select a role —</option>
                            <option value="super_admin">Super Admin — Full Access</option>
                            <option value="curriculum_admin">Curriculum Admin — Content Only</option>
                            <option value="editor">Editor — General Content</option>
                        </select>
                    </div>
                    <div class="form-group full-width" id="designation-hint" style="display:none;">
                        <div style="background:rgba(59,165,224,0.08);border-left:3px solid var(--admin-primary);padding:0.75rem 1rem;border-radius:0 8px 8px 0;font-size:0.83rem;color:var(--admin-muted);">
                            <strong style="color:var(--admin-text);">Curriculum Admin</strong> can only access Curriculum Materials and Textbooks. All their actions are recorded in Activity Logs.
                        </div>
                    </div>
                </div>
                <div class="admin-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modal-users')">Cancel</button>
                    <button type="submit" class="btn btn-primary"><i data-lucide="save"></i> Save User</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Curriculum Materials Modal -->
<div class="admin-modal" id="modal-curriculum">
    <div class="admin-modal-content" style="max-width:600px;">
        <div class="admin-modal-header">
            <h3 id="curriculum-modal-title"><i data-lucide="library"></i> Add Curriculum Entry</h3>
            <button class="admin-modal-close" onclick="closeModal('modal-curriculum')">&times;</button>
        </div>
        <div class="admin-modal-body">
            <form id="form-curriculum" onsubmit="event.preventDefault(); saveCurriculumEntry()">
                <input type="hidden" id="curriculum-id" value="">
                <div class="form-grid">
                    <div class="form-group">
                        <label>Education Level *</label>
                        <select id="curriculum-level" class="no-custom" required>
                            <option value="elementary">Elementary</option>
                            <option value="primary">Primary</option>
                            <option value="secondary">Secondary</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Grade / Stage *</label>
                        <input type="text" id="curriculum-grade" required placeholder="e.g. Elementary Prep, Grade 3">
                    </div>
                    <div class="form-group full-width">
                        <label>Subject *</label>
                        <input type="text" id="curriculum-subject" required placeholder="e.g. Mathematics, English">
                    </div>
                    <div class="form-group full-width">
                        <label>Syllabus PDF</label>
                        <div class="file-upload-zone" id="zone-curriculum-syllabus" onclick="document.getElementById('file-curriculum-syllabus').click()" ondragover="event.preventDefault();this.classList.add('dragging')" ondragleave="this.classList.remove('dragging')" ondrop="event.preventDefault();this.classList.remove('dragging');if(event.dataTransfer.files[0])handleCurriculumUpload(event.dataTransfer.files[0],'syllabus_url')">
                            <i data-lucide="file-text" style="width:24px;height:24px;margin-bottom:0.5rem;"></i>
                            <p>Click or drag &amp; drop Syllabus PDF here</p>
                            <small>PDF only • Max 20MB</small>
                        </div>
                        <input type="file" id="file-curriculum-syllabus" accept=".pdf" style="display:none" onchange="handleCurriculumUpload(this.files[0],'syllabus_url')">
                        <div id="preview-curriculum-syllabus" class="upload-preview-box"></div>
                        <input type="hidden" id="curriculum-syllabus_url">
                    </div>
                    <div class="form-group full-width">
                        <label>Teacher's Guide PDF</label>
                        <div class="file-upload-zone" id="zone-curriculum-guide" onclick="document.getElementById('file-curriculum-guide').click()" ondragover="event.preventDefault();this.classList.add('dragging')" ondragleave="this.classList.remove('dragging')" ondrop="event.preventDefault();this.classList.remove('dragging');if(event.dataTransfer.files[0])handleCurriculumUpload(event.dataTransfer.files[0],'teachers_guide_url')">
                            <i data-lucide="file-text" style="width:24px;height:24px;margin-bottom:0.5rem;"></i>
                            <p>Click or drag &amp; drop Teacher's Guide PDF here</p>
                            <small>PDF only • Max 20MB</small>
                        </div>
                        <input type="file" id="file-curriculum-guide" accept=".pdf" style="display:none" onchange="handleCurriculumUpload(this.files[0],'teachers_guide_url')">
                        <div id="preview-curriculum-guide" class="upload-preview-box"></div>
                        <input type="hidden" id="curriculum-teachers_guide_url">
                    </div>
                </div>
                <div class="admin-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modal-curriculum')">Cancel</button>
                    <button type="submit" class="btn btn-primary"><i data-lucide="save"></i> Save Entry</button>
                </div>
            </form>
        </div>
    </div>
</div>


<!-- Change Password Modal -->
<div class="admin-modal" id="modal-password">
    <div class="admin-modal-content" style="max-width:450px;">
        <div class="admin-modal-header"><h3>🔑 Change Password</h3><button class="admin-modal-close" onclick="closeModal('modal-password')">&times;</button></div>
        <div class="admin-modal-body">
            <form id="form-change-password" onsubmit="event.preventDefault(); changePassword();">
                <!-- Hidden username field helps password managers -->
                <input type="text" name="username" value="Admin" style="display:none" autocomplete="username">
                
                <div class="form-group">
                    <label>Current Password</label>
                    <input type="password" id="current-password" autocomplete="current-password" required>
                </div>
                <div class="form-group">
                    <label>New Password (min 8 chars)</label>
                    <input type="password" id="new-password" autocomplete="new-password" required>
                </div>
                <div class="form-group">
                    <label>Confirm New Password</label>
                    <input type="password" id="confirm-password" autocomplete="new-password" required>
                </div>
                
                <div class="admin-modal-footer" style="padding: 1.5rem 0 0 0; border-top: 0;">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modal-password')">Cancel</button>
                    <button type="submit" class="btn btn-primary">🔑 Change Password</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Gallery Photos Management Modal -->
<div class="admin-modal" id="modal-album-photos">
    <div class="admin-modal-content" style="max-width: 800px;">
        <div class="admin-modal-header">
            <h3>🖼️ Manage Album Photos</h3>
            <button class="admin-modal-close" onclick="closeModal('modal-album-photos')">&times;</button>
        </div>
        <div class="admin-modal-body">
            <div id="album-info-header" style="margin-bottom: 2rem; padding: 1.25rem; border-radius: 12px; background: rgba(0, 112, 243, 0.05); border: 1px solid rgba(0, 112, 243, 0.1);">
                <div style="display: flex; align-items: flex-start; gap: 1rem;">
                    <div style="background: var(--admin-primary); color: #fff; width: 48px; height: 48px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <i data-lucide="images" style="width: 24px; height: 24px;"></i>
                    </div>
                    <div>
                        <h4 id="manage-album-title" style="font-size: 1.1rem; font-weight: 700; color: var(--admin-text); margin-bottom: 0.25rem;">Album Title</h4>
                        <p id="manage-album-desc" style="font-size: 0.88rem; color: var(--admin-muted); line-height: 1.4;">Description goes here...</p>
                    </div>
                </div>
            </div>

            <div class="form-group full-width">
                <label style="font-weight: 700; font-size: 0.9rem; margin-bottom: 0.75rem; display: block;">Add New Photos (Bulk Upload)</label>
                <div class="file-upload-zone" id="zone-album-multi" onclick="document.getElementById('file-album-multi').click()" 
                     ondragover="event.preventDefault();this.classList.add('dragging')" 
                     ondragleave="this.classList.remove('dragging')" 
                     ondrop="event.preventDefault();this.classList.remove('dragging');if(event.dataTransfer.files.length)handleAlbumMultiUpload(event.dataTransfer.files)">
                    <div class="upload-icon" style="font-size: 2.5rem; margin-bottom: 0.5rem;">☁️</div>
                    <p style="font-weight: 600; color: var(--admin-text);">Click or drag & drop multiple images here</p>
                    <small>JPG, PNG, WebP • Max 10MB per file • High-res recommended</small>
                </div>
                <input type="file" id="file-album-multi" accept="image/*" multiple style="display:none" onchange="if(this.files.length)handleAlbumMultiUpload(this.files)">
                
                <div id="upload-progress-container" style="display:none; margin-top:1.5rem; background: #fff; padding: 1.25rem; border-radius: 12px; border: 1px solid var(--admin-border); box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
                    <div style="display:flex; justify-content:space-between; margin-bottom:0.75rem;">
                        <span id="upload-status-text" style="font-size:0.85rem; font-weight:700; color: var(--admin-primary);">Uploading 0/0...</span>
                        <span id="upload-percent-text" style="font-size:0.85rem; font-weight:700; color: var(--admin-primary);">0%</span>
                    </div>
                    <div style="height:10px; background:rgba(0,112,243,0.1); border-radius:10px; overflow:hidden;">
                        <div id="upload-progress-bar" style="height:100%; width:0%; background:linear-gradient(90deg, #3ba5e0, #1e7ab8); transition:width 0.4s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 0 10px rgba(59, 165, 224, 0.4);"></div>
                    </div>
                </div>
            </div>

            <div style="margin-top: 2.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
                    <label style="font-weight: 700; font-size: 0.9rem; color: var(--admin-text);">Album Photos (<span id="album-photo-count">0</span>)</label>
                    <div style="font-size: 0.75rem; color: var(--admin-muted);">Hover on image to delete</div>
                </div>
                <div id="album-photos-grid" class="admin-photo-grid">
                    <!-- Photos will be injected here -->
                </div>
            </div>
        </div>
        <div class="admin-modal-footer">
            <button class="btn btn-primary" onclick="closeModal('modal-album-photos')"><i data-lucide="check"></i> Done</button>
        </div>
    </div>
</div>

    <!-- Slider Modal -->
    <div id="modal-sliders" class="admin-modal">
        <div class="admin-modal-content">
            <div class="admin-modal-header">
                <h3>Add New Slide</h3>
                <button class="admin-modal-close" onclick="closeModal('modal-sliders')">&times;</button>
            </div>
            <form id="form-sliders" onsubmit="event.preventDefault(); saveRecord('sliders')">
                <input type="hidden" name="id">
                <div class="admin-modal-body">
                    <div class="form-grid">
                        <div class="form-group full-width">
                            <label>Internal Title *</label>
                            <input type="text" name="title" required placeholder="e.g. Student Graduation Hero">
                        </div>
                        <div class="form-group">
                            <label>Sort Order</label>
                            <input type="number" name="sort_order" value="0">
                        </div>
                        <div class="form-group">
                            <label>Status</label>
                            <select name="is_active">
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>
                        </div>
                        <div class="form-group full-width">
                            <label>Hero Image *</label>
                            <div class="file-upload-zone" id="zone-sliders-image_path" onclick="document.getElementById('file-sliders-image_path').click()" ondragover="event.preventDefault();this.classList.add('dragging')" ondragleave="this.classList.remove('dragging')" ondrop="event.preventDefault();this.classList.remove('dragging');if(event.dataTransfer.files[0])handleModalUploadFile(event.dataTransfer.files[0],'sliders','image_path','image')">
                                <div id="preview-sliders-image_path" class="upload-preview-container">
                                    <div class="upload-placeholder">
                                        <i data-lucide="image"></i>
                                        <p>Click or drag to upload hero image</p>
                                        <span>Recommended: 1920x1080px</span>
                                    </div>
                                </div>
                            </div>
                            <input type="file" id="file-sliders-image_path" style="display:none" accept="image/*" onchange="if(this.files[0])handleModalUploadFile(this.files[0],'sliders','image_path','image')">
                            <input type="hidden" name="image_path" required>
                        </div>
                    </div>
                </div>
                <div class="admin-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modal-sliders')">Cancel</button>
                    <button type="submit" class="btn btn-primary"><i data-lucide="save"></i>Save Slide</button>
                </div>
            </form>
        </div>
    </div>

<!-- Init TinyMCE -->
<script>
    /* Global TinyMCE init removed - now handled in admin.js */

// ===== LEADER PHOTO UPLOAD =====
async function handleLeaderPhoto(input, role) {
    if (!input.files.length) return;
    const file = input.files[0];
    const previewEl = document.getElementById(`leader-${role}-photo-preview`);
    const pathInput = document.getElementById(`leader-${role}-photo`);

    if (previewEl) {
        previewEl.innerHTML = `<div style="padding:0.5rem;color:var(--admin-muted);font-size:0.82rem;">
            <span style="display:inline-block;width:14px;height:14px;border:2px solid var(--admin-primary);border-top-color:transparent;border-radius:50%;animation:spin 0.8s linear infinite;"></span>
            Uploading…
        </div>`;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'image');

    try {
        const r = await fetch('../api/upload.php', { method: 'POST', body: formData, credentials: 'same-origin' });
        const result = await r.json();

        if (result.success) {
            if (pathInput) pathInput.value = result.file_path;
            if (previewEl) {
                previewEl.innerHTML = `<img src="../${result.file_path}" style="width:100px;height:120px;object-fit:cover;border-radius:8px;border:1px solid var(--admin-border);display:block;" alt="${role} photo">
                    <p style="font-size:0.72rem;color:var(--admin-muted);margin-top:0.3rem;">${result.file_name}</p>`;
            }
            showToast('Photo uploaded ✓');
        } else {
            if (previewEl) previewEl.innerHTML = `<p style="color:var(--admin-danger);font-size:0.8rem;">Upload failed</p>`;
            showToast(result.error || 'Upload failed', 'error');
        }
    } catch (e) {
        showToast('Upload error', 'error');
    }
}

// ===== CONTACT FILTER =====
let currentContactFilter = 'all';

function setContactFilter(filter) {
    currentContactFilter = filter;
    document.getElementById('filter-all').style.fontWeight = filter === 'all' ? '700' : '400';
    document.getElementById('filter-unread').style.fontWeight = filter === 'unread' ? '700' : '400';
    loadContactWithFilter(filter);
}

async function loadContactWithFilter(filter) {
    const result = await apiGet(`contact.php?action=list&filter=${filter}`);
    const tbody = document.getElementById('contact-tbody');
    if (!tbody) return;

    // Update unread count badge on filter button
    const unreadCountEl = document.getElementById('filter-unread-count');
    if (unreadCountEl) unreadCountEl.textContent = result.unread_count || '';

    if (!result.data || result.data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:3rem;color:var(--admin-muted);">
            <div style="margin-bottom:0.5rem;"><i data-lucide="inbox" style="width:40px;height:40px;opacity:0.3;"></i></div>
            ${filter === 'unread' ? 'No unread messages.' : 'No contact submissions yet.'}
        </td></tr>`;
        return;
    }

    // Update nav badge
    const badge = document.getElementById('nav-unread-badge');
    if (badge) {
        badge.textContent = result.unread_count || 0;
        badge.style.display = (result.unread_count || 0) > 0 ? 'inline' : 'none';
    }

    tbody.innerHTML = result.data.map(row => {
        const date = row.submitted_at
            ? new Date(row.submitted_at).toLocaleDateString('en-PG', { day: 'numeric', month: 'short', year: 'numeric' })
            : '—';
        const rowStyle = row.is_read == 0 ? 'background:#f0f7ff;font-weight:600;' : '';
        const dot = row.is_read == 0
            ? '<span style="display:inline-block;width:7px;height:7px;background:var(--admin-primary);border-radius:50%;margin-right:6px;vertical-align:middle;"></span>'
            : '';
        return `
            <tr style="${rowStyle}">
                <td>${dot}${row.name || '—'}</td>
                <td><a href="mailto:${row.email}" class="table-link">${row.email}</a></td>
                <td>${row.subject || '—'}</td>
                <td>${date}</td>
                <td class="actions">
                    <button class="btn btn-sm btn-outline" onclick="viewSubmission(${row.id})"><i data-lucide="eye"></i> View</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteRecord('contact', ${row.id})"><i data-lucide="trash-2"></i></button>
                </td>
            </tr>
        `;
    }).join('');
    
    // Initial icon load with stroke width fix
    if (window.lucide) {
        lucide.createIcons({
            attrs: {
                'stroke-width': 2,
                class: 'lucide-icon'
            }
        });
    }
}

// ===== ANALYTICS LOGIC =====
let charts = { activity: null, distribution: null };

async function loadAnalytics() {
    try {
        const result = await apiGet('analytics.php');
        if (!result) return;

        // 1. Distribution Chart (Pie)
        const distCtx = document.getElementById('distributionChart').getContext('2d');
        if (charts.distribution) charts.distribution.destroy();
        
        charts.distribution = new Chart(distCtx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(result.contentDistribution),
                datasets: [{
                    data: Object.values(result.contentDistribution),
                    backgroundColor: ['#0070f3', '#f5a623', '#27ae60', '#3498db', '#9b59b6', '#e74c3c'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } } },
                cutout: '65%'
            }
        });

        // 2. Activity Chart (Line)
        const actCtx = document.getElementById('activityChart').getContext('2d');
        if (charts.activity) charts.activity.destroy();

        charts.activity = new Chart(actCtx, {
            type: 'line',
            data: {
                labels: result.activity.map(a => new Date(a.date).toLocaleDateString('en-PG', { month: 'short', day: 'numeric' })),
                datasets: [{
                    label: 'New Content',
                    data: result.activity.map(a => a.count),
                    borderColor: '#0070f3',
                    backgroundColor: 'rgba(0, 112, 243, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, grid: { display: false } },
                    x: { grid: { display: false } }
                },
                plugins: { legend: { display: false } }
            }
        });

    } catch (e) {
        console.error('Analytics error:', e);
    }
}

// Hook into initial load
window.addEventListener('load', () => {
    if (window.lucide) {
        lucide.createIcons({
            attrs: { 'stroke-width': 2, 'class': 'lucide' }
        });
    }
});

const originalInitialStats = window.loadInitialStats;
window.loadInitialStats = async function() {
    if (typeof originalInitialStats === 'function') await originalInitialStats();
    await loadAnalytics();
};

</script>

<script src="assets/admin.js?v=<?= time() ?>"></script>
</body>
</html>
