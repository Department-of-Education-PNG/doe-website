<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: index.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard — DoE PNG</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/admin.css">
    <!-- TinyMCE CDN -->
    <script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>
</head>
<body>

<!-- Toast Container -->
<div class="toast-container" id="toast-container"></div>

<!-- Sidebar -->
<aside class="sidebar" id="sidebar">
    <div class="sidebar-brand">
        <img src="../assets/images/logo/DoE-Logo.png" alt="DoE" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2270%22>🏛️</text></svg>'">
        <div>
            <h2>DoE Admin</h2>
            <span>education.gov.pg</span>
        </div>
    </div>

    <nav class="sidebar-nav">
        <a class="nav-item active" data-page="dashboard" onclick="navigateTo('dashboard')">
            <span class="icon">📊</span> Dashboard
        </a>

        <div class="nav-label">Content</div>
        <a class="nav-item" data-page="news" onclick="navigateTo('news')">
            <span class="icon">📰</span> News & Articles
        </a>
        <a class="nav-item" data-page="press" onclick="navigateTo('press')">
            <span class="icon">📢</span> Press Releases
        </a>
        <a class="nav-item" data-page="events" onclick="navigateTo('events')">
            <span class="icon">📅</span> Events
        </a>
        <a class="nav-item" data-page="gallery" onclick="navigateTo('gallery')">
            <span class="icon">📸</span> Photo Gallery
        </a>
        <a class="nav-item" data-page="publications" onclick="navigateTo('publications')">
            <span class="icon">📄</span> Publications
        </a>
        <a class="nav-item" data-page="textbooks" onclick="navigateTo('textbooks')">
            <span class="icon">📚</span> Textbooks
        </a>

        <div class="nav-label">Careers</div>
        <a class="nav-item" data-page="jobs" onclick="navigateTo('jobs')">
            <span class="icon">💼</span> Job Listings
        </a>
        <a class="nav-item" data-page="scholarships" onclick="navigateTo('scholarships')">
            <span class="icon">🎓</span> Scholarships
        </a>

        <div class="nav-label">Homepage</div>
        <a class="nav-item" data-page="ticker" onclick="navigateTo('ticker')">
            <span class="icon">📣</span> News Ticker
        </a>
        <a class="nav-item" data-page="notices" onclick="navigateTo('notices')">
            <span class="icon">📋</span> Notice Board
        </a>
        <a class="nav-item" data-page="leaders" onclick="navigateTo('leaders')">
            <span class="icon">👤</span> Leadership
        </a>
        <a class="nav-item" data-page="apps" onclick="navigateTo('apps')">
            <span class="icon">🔗</span> App Links
        </a>
        <a class="nav-item" data-page="forms" onclick="navigateTo('forms')">
            <span class="icon">📝</span> Public Forms
        </a>

        <div class="nav-label">System</div>
        <a class="nav-item" data-page="contact" onclick="navigateTo('contact')">
            <span class="icon">📬</span> Contact <span class="badge" id="nav-unread-badge" style="display:none;">0</span>
        </a>
        <a class="nav-item" data-page="settings" onclick="navigateTo('settings')">
            <span class="icon">⚙️</span> Settings
        </a>
    </nav>
</aside>

<!-- Main Content -->
<div class="main-content">
    <div class="topbar">
        <div style="display:flex;align-items:center;gap:1rem;">
            <button class="mobile-toggle" id="sidebar-toggle">☰</button>
            <h1 id="page-title">Dashboard</h1>
        </div>
        <div class="topbar-actions">
            <a href="../" target="_blank">🌐 View Site</a>
            <button onclick="openModal('modal-password')">🔑 Password</button>
            <button onclick="logout()" style="color:var(--admin-danger);">Logout</button>
        </div>
    </div>

    <div class="content-area">

        <!-- ===== DASHBOARD PAGE ===== -->
        <div class="page-section active" id="page-dashboard">
            <div class="stats-grid">
                <div class="stat-card"><div class="stat-icon">📰</div><div class="stat-value" id="stat-news">0</div><div class="stat-label">News Articles</div></div>
                <div class="stat-card"><div class="stat-icon">📢</div><div class="stat-value" id="stat-press">0</div><div class="stat-label">Press Releases</div></div>
                <div class="stat-card"><div class="stat-icon">📅</div><div class="stat-value" id="stat-events">0</div><div class="stat-label">Events</div></div>
                <div class="stat-card" style="border-left: 3px solid var(--admin-primary);"><div class="stat-icon">📬</div><div class="stat-value" id="stat-contact">0</div><div class="stat-label">Unread Messages</div></div>
                <div class="stat-card"><div class="stat-icon">💼</div><div class="stat-value" id="stat-jobs">0</div><div class="stat-label">Job Listings</div></div>
                <div class="stat-card"><div class="stat-icon">📄</div><div class="stat-value" id="stat-pubs">0</div><div class="stat-label">Publications</div></div>
            </div>
            <div class="admin-card">
                <div class="admin-card-header"><h2>Quick Actions</h2></div>
                <div class="admin-card-body" style="display:flex;gap:1rem;flex-wrap:wrap;">
                    <button class="btn btn-primary" onclick="navigateTo('news');setTimeout(()=>openModal('modal-news'),300)">➕ Add News Article</button>
                    <button class="btn btn-primary" onclick="navigateTo('press');setTimeout(()=>openModal('modal-press'),300)">➕ Add Press Release</button>
                    <button class="btn btn-primary" onclick="navigateTo('events');setTimeout(()=>openModal('modal-events'),300)">➕ Add Event</button>
                    <button class="btn btn-outline" onclick="navigateTo('contact')">📬 View Messages</button>
                </div>
            </div>
        </div>

        <!-- ===== NEWS PAGE ===== -->
        <div class="page-section" id="page-news">
            <div class="admin-card">
                <div class="admin-card-header">
                    <h2>News Articles</h2>
                    <button class="btn btn-primary" onclick="document.getElementById('form-news').reset();delete document.getElementById('form-news').dataset.editId;document.querySelector('#modal-news .admin-modal-header h3').textContent='Add News Article';openModal('modal-news')">➕ Add New</button>
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
                    <button class="btn btn-primary" onclick="document.getElementById('form-press').reset();delete document.getElementById('form-press').dataset.editId;openModal('modal-press')">➕ Add New</button>
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
                    <button class="btn btn-primary" onclick="document.getElementById('form-events').reset();delete document.getElementById('form-events').dataset.editId;openModal('modal-events')">➕ Add New</button>
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
                    <button class="btn btn-primary" onclick="document.getElementById('form-gallery').reset();delete document.getElementById('form-gallery').dataset.editId;openModal('modal-gallery')">➕ Add Album</button>
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
                    <button class="btn btn-primary" onclick="document.getElementById('form-publications').reset();delete document.getElementById('form-publications').dataset.editId;openModal('modal-publications')">➕ Add Publication</button>
                </div>
                <div style="overflow-x:auto;">
                    <table class="data-table"><thead><tr><th>Title</th><th>Category</th><th>Year</th><th>Actions</th></tr></thead><tbody id="publications-tbody"></tbody></table>
                </div>
            </div>
        </div>

        <!-- ===== TEXTBOOKS PAGE ===== -->
        <div class="page-section" id="page-textbooks">
            <div class="admin-card">
                <div class="admin-card-header">
                    <h2>Textbooks & Manuals</h2>
                    <button class="btn btn-primary" onclick="document.getElementById('form-textbooks').reset();delete document.getElementById('form-textbooks').dataset.editId;openModal('modal-textbooks')">➕ Add Textbook</button>
                </div>
                <div style="overflow-x:auto;">
                    <table class="data-table"><thead><tr><th>Grade Level</th><th>Subject</th><th>Actions</th></tr></thead><tbody id="textbooks-tbody"></tbody></table>
                </div>
            </div>
        </div>

        <!-- ===== JOBS PAGE ===== -->
        <div class="page-section" id="page-jobs">
            <div class="admin-card">
                <div class="admin-card-header">
                    <h2>Job Listings</h2>
                    <button class="btn btn-primary" onclick="document.getElementById('form-jobs').reset();delete document.getElementById('form-jobs').dataset.editId;openModal('modal-jobs')">➕ Post Job</button>
                </div>
                <div style="overflow-x:auto;">
                    <table class="data-table"><thead><tr><th>Title</th><th>Type</th><th>Closing Date</th><th>Status</th><th>Actions</th></tr></thead><tbody id="jobs-tbody"></tbody></table>
                </div>
            </div>
        </div>

        <!-- ===== SCHOLARSHIPS PAGE ===== -->
        <div class="page-section" id="page-scholarships">
            <div class="admin-card">
                <div class="admin-card-header">
                    <h2>Scholarships</h2>
                    <button class="btn btn-primary" onclick="document.getElementById('form-scholarships').reset();delete document.getElementById('form-scholarships').dataset.editId;openModal('modal-scholarships')">➕ Add Scholarship</button>
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
                    <button class="btn btn-primary" onclick="document.getElementById('form-ticker').reset();delete document.getElementById('form-ticker').dataset.editId;openModal('modal-ticker')">➕ Add Ticker Item</button>
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
                    <button class="btn btn-primary" onclick="document.getElementById('form-notices').reset();delete document.getElementById('form-notices').dataset.editId;openModal('modal-notices')">➕ Add Notice</button>
                </div>
                <div style="overflow-x:auto;">
                    <table class="data-table"><thead><tr><th>Title</th><th>Type</th><th>Active</th><th>Actions</th></tr></thead><tbody id="notices-tbody"></tbody></table>
                </div>
            </div>
        </div>

        <!-- ===== LEADERS PAGE ===== -->
        <div class="page-section" id="page-leaders">
            <div class="admin-card">
                <div class="admin-card-header"><h2>Minister's Message</h2></div>
                <div class="admin-card-body">
                    <form id="form-leader-minister">
                        <div class="form-grid">
                            <div class="form-group"><label>Full Name</label><input type="text" id="leader-minister-name" name="name"></div>
                            <div class="form-group"><label>Position Title</label><input type="text" id="leader-minister-title" name="position_title"></div>
                            <div class="form-group full-width"><label>Photo Path</label><input type="text" id="leader-minister-photo" name="photo_path" value="assets/images/leaders/minister.png"></div>
                            <div class="form-group full-width"><label>Welcome Message</label><textarea id="leaders-message_content_minister" name="message_content" rows="10"></textarea></div>
                        </div>
                        <button type="button" class="btn btn-primary" onclick="saveLeader('minister')">💾 Save Minister's Message</button>
                    </form>
                </div>
            </div>
            <div class="admin-card">
                <div class="admin-card-header"><h2>Secretary's Message</h2></div>
                <div class="admin-card-body">
                    <form id="form-leader-secretary">
                        <div class="form-grid">
                            <div class="form-group"><label>Full Name</label><input type="text" id="leader-secretary-name" name="name"></div>
                            <div class="form-group"><label>Position Title</label><input type="text" id="leader-secretary-title" name="position_title"></div>
                            <div class="form-group full-width"><label>Photo Path</label><input type="text" id="leader-secretary-photo" name="photo_path" value="assets/images/leaders/secretary.png"></div>
                            <div class="form-group full-width"><label>Welcome Message</label><textarea id="leaders-message_content_secretary" name="message_content" rows="10"></textarea></div>
                        </div>
                        <button type="button" class="btn btn-primary" onclick="saveLeader('secretary')">💾 Save Secretary's Message</button>
                    </form>
                </div>
            </div>
        </div>

        <!-- ===== APP LINKS PAGE ===== -->
        <div class="page-section" id="page-apps">
            <div class="admin-card">
                <div class="admin-card-header">
                    <h2>Digital Applications</h2>
                    <button class="btn btn-primary" onclick="document.getElementById('form-apps').reset();delete document.getElementById('form-apps').dataset.editId;openModal('modal-apps')">➕ Add App Link</button>
                </div>
                <div style="overflow-x:auto;">
                    <table class="data-table"><thead><tr><th>Title</th><th>URL</th><th>Active</th><th>Actions</th></tr></thead><tbody id="apps-tbody"></tbody></table>
                </div>
            </div>
        </div>

        <!-- ===== PUBLIC FORMS PAGE ===== -->
        <div class="page-section" id="page-forms">
            <div class="admin-card">
                <div class="admin-card-header">
                    <h2>Public Forms</h2>
                    <button class="btn btn-primary" onclick="document.getElementById('form-forms').reset();delete document.getElementById('form-forms').dataset.editId;openModal('modal-forms')">➕ Add Form</button>
                </div>
                <div style="overflow-x:auto;">
                    <table class="data-table"><thead><tr><th>Title</th><th>Category</th><th>Actions</th></tr></thead><tbody id="forms-tbody"></tbody></table>
                </div>
            </div>
        </div>

        <!-- ===== CONTACT PAGE ===== -->
        <div class="page-section" id="page-contact">
            <div class="admin-card">
                <div class="admin-card-header"><h2>Contact Form Submissions</h2></div>
                <div style="overflow-x:auto;">
                    <table class="data-table"><thead><tr><th>Name</th><th>Email</th><th>Subject</th><th>Date</th><th>Actions</th></tr></thead><tbody id="contact-tbody"></tbody></table>
                </div>
            </div>
        </div>

        <!-- ===== SETTINGS PAGE ===== -->
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
                <div class="admin-card-header"><h2>Site Information</h2></div>
                <div class="admin-card-body">
                    <div class="form-grid">
                        <div class="form-group"><label>Site Title</label><input type="text" id="setting-site_title"></div>
                        <div class="form-group"><label>Subtitle</label><input type="text" id="setting-site_subtitle"></div>
                        <div class="form-group full-width"><label>Description</label><textarea id="setting-site_description" rows="3"></textarea></div>
                    </div>
                </div>
            </div>
            <button class="btn btn-primary" onclick="saveSettings()" style="margin-top:1rem;">💾 Save All Settings</button>
        </div>

    </div><!-- /content-area -->
</div><!-- /main-content -->

<!-- ===== MODALS ===== -->

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
                    <div class="form-group full-width"><label>Full Content</label><textarea id="news-content" name="content" rows="8"></textarea></div>
                    <div class="form-group full-width"><label>Image Path</label><input type="text" name="image_path" placeholder="uploads/images/..."></div>
                    <div class="form-group"><label><input type="checkbox" name="is_featured" value="1"> Feature on Homepage</label></div>
                </div>
                <div class="admin-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modal-news')">Cancel</button>
                    <button type="submit" class="btn btn-primary">💾 Save</button>
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
                    <div class="form-group"><label>Image Path</label><input type="text" name="image_path"></div>
                    <div class="form-group"><label>PDF Path</label><input type="text" name="pdf_path"></div>
                </div>
                <div class="admin-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modal-press')">Cancel</button>
                    <button type="submit" class="btn btn-primary">💾 Save</button>
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
                    <div class="form-group full-width"><label>Image Path</label><input type="text" name="image_path"></div>
                </div>
                <div class="admin-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modal-events')">Cancel</button>
                    <button type="submit" class="btn btn-primary">💾 Save</button>
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
                    <div class="form-group"><label>Cover Image Path</label><input type="text" name="cover_image"></div>
                    <div class="form-group"><label>Sort Order</label><input type="number" name="sort_order" value="0"></div>
                </div>
                <div class="admin-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modal-gallery')">Cancel</button>
                    <button type="submit" class="btn btn-primary">💾 Save</button>
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
                    <div class="form-group"><label>PDF Path</label><input type="text" name="pdf_path"></div>
                    <div class="form-group"><label>Thumbnail Path</label><input type="text" name="thumbnail_path"></div>
                    <div class="form-group"><label>Sort Order</label><input type="number" name="sort_order" value="0"></div>
                </div>
                <div class="admin-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modal-publications')">Cancel</button>
                    <button type="submit" class="btn btn-primary">💾 Save</button>
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
                    <div class="form-group"><label>Textbook PDF Path</label><input type="text" name="textbook_pdf"></div>
                    <div class="form-group"><label>Teacher Manual PDF Path</label><input type="text" name="manual_pdf"></div>
                    <div class="form-group"><label>Sort Order</label><input type="number" name="sort_order" value="0"></div>
                </div>
                <div class="admin-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modal-textbooks')">Cancel</button>
                    <button type="submit" class="btn btn-primary">💾 Save</button>
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
                    <div class="form-group"><label>Location</label><input type="text" name="location"></div>
                    <div class="form-group"><label>Type</label><select name="job_type"><option value="teaching">Teaching</option><option value="administrative">Administrative</option><option value="contract">Contract</option></select></div>
                    <div class="form-group"><label>Closing Date</label><input type="date" name="closing_date"></div>
                    <div class="form-group"><label>Status</label><select name="status"><option value="open">Open</option><option value="closed">Closed</option></select></div>
                    <div class="form-group full-width"><label>Description</label><textarea id="jobs-description" name="description" rows="6"></textarea></div>
                    <div class="form-group full-width"><label>PDF Path</label><input type="text" name="pdf_path"></div>
                </div>
                <div class="admin-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modal-jobs')">Cancel</button>
                    <button type="submit" class="btn btn-primary">💾 Save</button>
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
                    <div class="form-group full-width"><label>Description</label><textarea name="description" rows="4"></textarea></div>
                    <div class="form-group full-width"><label>Eligibility</label><textarea name="eligibility" rows="3"></textarea></div>
                    <div class="form-group full-width"><label>External Link</label><input type="url" name="external_link"></div>
                </div>
                <div class="admin-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modal-scholarships')">Cancel</button>
                    <button type="submit" class="btn btn-primary">💾 Save</button>
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
                    <button type="submit" class="btn btn-primary">💾 Save</button>
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
                    <div class="form-group"><label>Card Type</label><select name="card_type"><option value="dates">Term Dates</option><option value="plan">Education Plan</option><option value="quick_links">Quick Links</option></select></div>
                    <div class="form-group"><label>Sort Order</label><input type="number" name="sort_order" value="0"></div>
                    <div class="form-group full-width"><label>Content (HTML)</label><textarea id="notices-content" name="content" rows="6"></textarea></div>
                    <div class="form-group"><label>PDF Path</label><input type="text" name="pdf_path"></div>
                    <div class="form-group"><label><input type="checkbox" name="is_active" value="1" checked> Active</label></div>
                </div>
                <div class="admin-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modal-notices')">Cancel</button>
                    <button type="submit" class="btn btn-primary">💾 Save</button>
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
                    <div class="form-group"><label>Description</label><input type="text" name="description"></div>
                    <div class="form-group full-width"><label>URL *</label><input type="url" name="url" required></div>
                    <div class="form-group"><label>Icon Emoji</label><input type="text" name="icon_emoji" value="🔗"></div>
                    <div class="form-group"><label>Icon Color</label><input type="text" name="icon_color" value="#0078d4"></div>
                    <div class="form-group"><label>Sort Order</label><input type="number" name="sort_order" value="0"></div>
                    <div class="form-group"><label><input type="checkbox" name="is_active" value="1" checked> Active</label></div>
                </div>
                <div class="admin-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modal-apps')">Cancel</button>
                    <button type="submit" class="btn btn-primary">💾 Save</button>
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
                    <div class="form-group"><label>Category</label><input type="text" name="category" placeholder="e.g., Teacher Forms"></div>
                    <div class="form-group"><label>Accent Color</label><input type="text" name="accent_color" value="var(--primary)"></div>
                    <div class="form-group full-width"><label>Description</label><textarea name="description" rows="3"></textarea></div>
                    <div class="form-group"><label>PDF Path</label><input type="text" name="pdf_path"></div>
                    <div class="form-group"><label>Sort Order</label><input type="number" name="sort_order" value="0"></div>
                </div>
                <div class="admin-modal-footer">
                    <button type="button" class="btn btn-outline" onclick="closeModal('modal-forms')">Cancel</button>
                    <button type="submit" class="btn btn-primary">💾 Save</button>
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

<!-- Change Password Modal -->
<div class="admin-modal" id="modal-password">
    <div class="admin-modal-content" style="max-width:450px;">
        <div class="admin-modal-header"><h3>🔑 Change Password</h3><button class="admin-modal-close" onclick="closeModal('modal-password')">&times;</button></div>
        <div class="admin-modal-body">
            <div class="form-group"><label>Current Password</label><input type="password" id="current-password" required></div>
            <div class="form-group"><label>New Password (min 8 chars)</label><input type="password" id="new-password" required></div>
            <div class="form-group"><label>Confirm New Password</label><input type="password" id="confirm-password" required></div>
        </div>
        <div class="admin-modal-footer">
            <button class="btn btn-outline" onclick="closeModal('modal-password')">Cancel</button>
            <button class="btn btn-primary" onclick="changePassword()">🔑 Change Password</button>
        </div>
    </div>
</div>

<!-- Init TinyMCE -->
<script>
document.addEventListener('DOMContentLoaded', () => {
    tinymce.init({
        selector: '#news-content, #leaders-message_content_minister, #leaders-message_content_secretary, #notices-content, #jobs-description',
        height: 300,
        menubar: false,
        plugins: 'lists link image table code fullscreen',
        toolbar: 'undo redo | formatselect | bold italic underline | bullist numlist | link image table | code fullscreen',
        content_style: 'body { font-family: Inter, sans-serif; font-size: 14px; }',
        branding: false,
        promotion: false
    });
});
</script>

<script src="assets/admin.js"></script>
</body>
</html>
