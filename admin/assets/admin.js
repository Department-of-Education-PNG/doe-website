/**
 * Admin Panel JavaScript — Final Version
 * DoE PNG Admin Dashboard
 */

const API_BASE = '../api';
let userRole = 'editor'; // Default to restricted

// ===== NAVIGATION =====
function navigateTo(page) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    const section = document.getElementById('page-' + page);
    const navItem = document.querySelector(`[data-page="${page}"]`);

    if (section) {
        section.classList.add('active');

        // Re-initialize any rich editors in this section if they didn't catch on boot
        if (typeof tinymce !== 'undefined') {
            section.querySelectorAll('textarea.rich-editor').forEach(el => {
                if (!tinymce.get(el.id)) {
                    tinymce.init({
                        selector: '#' + el.id,
                        base_url: 'https://cdn.jsdelivr.net/npm/tinymce@6',
                        suffix: '.min',
                        height: 320,
                        skin: 'oxide',
                        content_css: 'default',
                        menubar: false,
                        plugins: 'lists link table code fullscreen wordcount',
                        toolbar: 'undo redo | blocks | bold italic underline | bullist numlist | link table | removeformat | code fullscreen',
                        content_style: 'body { font-family: Inter, system-ui, sans-serif; font-size: 14px; line-height: 1.6; color: #1a1a2e; }',
                        branding: false,
                        promotion: false
                    });
                }
            });
        }


        loadPageData(page);
    }
    if (navItem) navItem.classList.add('active');

    // Initialize custom selects for this section
    initCustomSelects(section);

    document.getElementById('page-title').textContent = getPageTitle(page);

    // Close mobile sidebar
    document.querySelector('.sidebar')?.classList.remove('open');

    // Update URL hash without scrolling
    history.replaceState(null, '', `#${page}`);

    // Refresh icons for newly visible content
    if (window.lucide) {
        setTimeout(() => {
            lucide.createIcons({
                attrs: { 'stroke-width': 2, 'class': 'lucide' }
            });
        }, 10);
    }
}

function getPageTitle(page) {
    const titles = {
        'dashboard': 'Dashboard',
        'news': 'News & Articles',
        'press': 'Press Releases',
        'events': 'Events Calendar',
        'calendars': 'Calendars & Term Dates',
        'gallery': 'Photo Gallery',
        'publications': 'Publications',
        'textbooks': 'Textbooks & Manuals',
        'jobs': 'Job Opportunities',
        'scholarships': 'Scholarships',
        'forms': 'Public Forms',
        'ticker': 'News Ticker',
        'notices': 'Notice Board',
        'leaders': 'Leadership Messages',
        'apps': 'Digital Applications',
        'contact': 'Contact Submissions',
        'settings': 'Site Settings',
        'faq': 'FAQs',
        'edubot': 'EduBot Training'
    };
    return titles[page] || page;
}

// ===== UI ENHANCEMENTS: CUSTOM SELECTS =====
/**
 * Transforms native <select> into a premium styled component.
 */
function initCustomSelects(parent = document) {
    parent.querySelectorAll('select').forEach(select => {
        if (select.closest('.custom-select-container') || select.classList.contains('no-custom')) return;

        const container = document.createElement('div');
        container.className = 'custom-select-container';

        const trigger = document.createElement('div');
        trigger.className = 'custom-select-trigger';

        const selectedOption = select.options[select.selectedIndex];
        const isPlaceholder = selectedOption && (selectedOption.disabled || selectedOption.value === '');
        trigger.textContent = selectedOption ? selectedOption.textContent : 'Select...';
        if (isPlaceholder) trigger.style.color = 'var(--admin-muted, #9ca3af)';
        else trigger.style.color = '';

        const optionsList = document.createElement('div');
        optionsList.className = 'custom-options-list';

        Array.from(select.options).forEach((opt, idx) => {
            // Skip disabled placeholder options from the visible list
            if (opt.disabled) return;

            const customOpt = document.createElement('div');
            customOpt.className = 'custom-option' + (opt.selected ? ' selected' : '');
            customOpt.textContent = opt.textContent;

            customOpt.onclick = (e) => {
                e.stopPropagation();
                select.selectedIndex = idx;
                trigger.textContent = opt.textContent;
                trigger.style.color = '';

                optionsList.querySelectorAll('.custom-option').forEach(o => o.classList.remove('selected'));
                customOpt.classList.add('selected');

                container.classList.remove('open');
                select.dispatchEvent(new Event('change', { bubbles: true }));
            };
            optionsList.appendChild(customOpt);
        });

        trigger.onclick = (e) => {
            e.stopPropagation();
            document.querySelectorAll('.custom-select-container.open').forEach(c => {
                if (c !== container) c.classList.remove('open');
            });
            container.classList.toggle('open');
        };

        select.parentNode.insertBefore(container, select);
        container.appendChild(select);
        container.appendChild(trigger);
        container.appendChild(optionsList);
    });
}

function refreshCustomSelect(select) {
    const container = select.closest('.custom-select-container');
    if (!container) return;

    // Remove the old custom elements
    const trigger = container.querySelector('.custom-select-trigger');
    const list = container.querySelector('.custom-options-list');
    if (trigger) trigger.remove();
    if (list) list.remove();

    // Unwrap the select
    const parent = container.parentNode;
    parent.insertBefore(select, container);
    container.remove();

    // Re-initialize
    initCustomSelects(parent);
}

/**
 * Synchronizes custom select UI with underlying <select> values.
 * Call this after programmatic changes to select.value.
 */
function syncCustomSelects(parent = document) {
    parent.querySelectorAll('.custom-select-container').forEach(container => {
        const select = container.querySelector('select');
        const trigger = container.querySelector('.custom-select-trigger');
        const optionsList = container.querySelector('.custom-options-list');

        if (select && trigger) {
            const selectedOption = select.options[select.selectedIndex];
            trigger.textContent = selectedOption ? selectedOption.textContent : 'Select...';

            // Sync selected class in options
            if (optionsList) {
                optionsList.querySelectorAll('.custom-option').forEach((opt, idx) => {
                    opt.classList.toggle('selected', idx === select.selectedIndex);
                });
            }
        }
    });

    // Close any open ones on sync
    document.querySelectorAll('.custom-select-container.open').forEach(c => c.classList.remove('open'));
}

/**
 * Re-syncs custom dropdown UI with underlying native select values.
 * Call this after programmatically setting a select value.
 */
function refreshCustomSelects(parent = document) {
    parent.querySelectorAll('.custom-select-container').forEach(container => {
        const select = container.querySelector('select');
        const trigger = container.querySelector('.custom-select-trigger');
        const optionsList = container.querySelector('.custom-options-list');

        if (select && trigger) {
            const selectedOption = select.options[select.selectedIndex];
            trigger.textContent = selectedOption ? selectedOption.textContent : 'Select...';
            if (optionsList) {
                Array.from(optionsList.children).forEach((optEl, idx) => {
                    optEl.classList.toggle('selected', idx === select.selectedIndex);
                });
            }
        }
    });
}

// Global click-to-close
document.addEventListener('click', () => {
    document.querySelectorAll('.custom-select-container.open').forEach(c => c.classList.remove('open'));
});


// ===== API HELPERS =====
async function apiGet(endpoint) {
    try {
        const r = await fetch(`${API_BASE}/${endpoint}`, { credentials: 'same-origin' });
        const result = await r.json();

        if (!r.ok) {
            const errorMsg = result.error || `Server Error (${r.status})`;
            showToast(errorMsg, 'error');
            throw new Error(errorMsg);
        }
        return result;
    } catch (e) {
        console.error('API GET error:', e);
        if (!e.message.includes('Server Error')) {
            showToast('Connection error — check server', 'error');
        }
        return { data: [], error: e.message };
    }
}

async function apiPost(endpoint, data) {
    try {
        const r = await fetch(`${API_BASE}/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'same-origin'
        });
        const result = await r.json();

        if (!r.ok) {
            const errorMsg = result.error || `Server Error (${r.status})`;
            showToast(errorMsg, 'error');
            return { error: errorMsg };
        }
        return result;
    } catch (e) {
        console.error('API POST error:', e);
        showToast('Connection error — check server', 'error');
        return { error: 'Connection failed' };
    }
}

async function uploadFile(file, type = 'image', isGallery = false, folder = '') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    if (folder) formData.append('folder', folder);
    if (isGallery) formData.append('gallery', '1');
    try {
        const r = await fetch(`${API_BASE}/upload.php`, {
            method: 'POST',
            body: formData,
            credentials: 'same-origin'
        });
        return await r.json();
    } catch (e) {
        showToast('Upload failed', 'error');
        return { error: 'Upload failed' };
    }
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    // Icon selection
    let iconName = 'check-circle';
    if (type === 'error') iconName = 'alert-circle';
    if (type === 'info') iconName = 'info';

    toast.innerHTML = `
        <i data-lucide="${iconName}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Refresh icons
    if (window.lucide) lucide.createIcons();

    // Remove toast after duration
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 400);
    }, 4500);
}
let CURRENT_PAGE = 'overview';
const CK_EDITORS = {};

// ===== EDITOR HELPERS =====
function setEditorContent(id, content) {
    const textarea = document.getElementById(id);
    if (textarea) textarea.value = content || '';

    // Handle Ace Editor if it exists
    if (typeof ACE_EDITORS !== 'undefined' && ACE_EDITORS[id]) {
        ACE_EDITORS[id].setValue(content || '', -1);
        return;
    }

    // CKEditor 5 support
    if (CK_EDITORS[id]) {
        CK_EDITORS[id].setData(content || '');
    } else {
        // Fallback for non-CKEditor or if it's still initializing
        setTimeout(() => {
            if (CK_EDITORS[id]) CK_EDITORS[id].setData(content || '');
        }, 500);
    }
}



// ===== MODAL HELPERS =====
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('show');

        // Custom select support
        initCustomSelects(modal);
        refreshCustomSelects(modal);

        // Ensure any rich editors inside the modal are initialized
        if (typeof ClassicEditor !== 'undefined') {
            modal.querySelectorAll('textarea.rich-editor').forEach(el => {
                if (!CK_EDITORS[el.id]) {
                    ClassicEditor
                        .create(el, {
                            toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'insertTable', 'undo', 'redo'],
                        })
                        .then(editor => {
                            CK_EDITORS[el.id] = editor;
                        })
                        .catch(error => {
                            console.error('CKEditor Init Error:', error);
                        });
                }
            });
        }


        // Focus first input
        setTimeout(() => {
            const firstInput = modal.querySelector('input:not([type="hidden"]):not([type="checkbox"]), textarea, select');
            if (firstInput) firstInput.focus();
        }, 100);
    }
}

function closeModal(id) {
    document.getElementById(id)?.classList.remove('show');
}

// Close modal when clicking backdrop
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('admin-modal')) {
        e.target.classList.remove('show');
    }
});

// Close modal on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.admin-modal.show').forEach(m => m.classList.remove('show'));
    }
});

// ===== ENDPOINT MAP =====
const ENDPOINTS = {
    'news': 'news.php',
    'press': 'press-releases.php',
    'events': 'events.php',
    'gallery': 'gallery.php',
    'publications': 'publications.php',
    'textbooks': 'textbooks.php',
    'jobs': 'jobs.php',
    'scholarships': 'scholarships.php',
    'forms': 'forms.php',
    'ticker': 'ticker.php',
    'notices': 'notices.php',
    'apps': 'app-links.php',
    'contact': 'contact.php',
    'leaders': 'leaders.php',
    'sliders': 'sliders.php',
    'calendars': 'publications.php',
    'faq': 'faq.php',
    'users': 'users.php',
    'logs': 'users.php',
    'gtfs': 'gtfs.php'
};

async function loadLogsTable() {
    const tbody = document.getElementById('logs-tbody');
    if (!tbody) return;

    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;">Loading logs...</td></tr>';
    const result = await apiGet('users.php?action=activity_logs');

    if (!result.data || result.data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:3rem;color:var(--admin-muted);">No activity logs found.</td></tr>';
        return;
    }

    tbody.innerHTML = result.data.map(log => {
        const date = new Date(log.created_at);
        const timeStr = date.toLocaleDateString('en-PG', { day: 'numeric', month: 'short' }) + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        return `
            <tr>
                <td style="white-space:nowrap;font-size:0.85rem;color:var(--admin-muted);">${timeStr}</td>
                <td style="font-weight:600;">${log.user_full_name}</td>
                <td><span class="status status-${String(log.action).toLowerCase()}">${log.action}</span></td>
                <td style="font-size:0.85rem;color:var(--admin-muted);">${log.target_table} #${log.target_id || ''}</td>
                <td>${log.details || '—'}</td>
            </tr>
        `;
    }).join('');
}

// ===== FILE FIELDS PER PAGE (field => type) =====
const FILE_FIELDS = {
    'news': [['image_path', 'image']],
    'press': [['image_path', 'image'], ['pdf_path', 'document']],
    'events': [['image_path', 'image']],
    'gallery': [['cover_image', 'image']],
    'publications': [['pdf_path', 'document'], ['thumbnail_path', 'image']],
    'textbooks': [['textbook_pdf', 'document'], ['manual_pdf', 'document']],
    'gtfs': [['pdf_path', 'document']],
    'jobs': [['pdf_path', 'document']],
    'notices': [['pdf_path', 'document'], ['thumbnail_path', 'image']],
    'forms': [['pdf_path', 'document']],
    'apps': [['image_path', 'image']],
    'sliders': [['image_path', 'image']],
    'calendars': [['pdf_path', 'document'], ['thumbnail_path', 'image']]
};

// ===== LOAD PAGE DATA =====
async function loadPageData(page) {
    switch (page) {
        case 'dashboard': loadDashboard(); break;
        case 'news': loadCrudTable('news.php?action=list', 'news', ['title', 'date_published', 'views', 'status']); break;
        case 'press': loadCrudTable('press-releases.php?action=list', 'press', ['title', 'date_published', 'views', 'status']); break;
        case 'events': loadCrudTable('events.php?action=list', 'events', ['title', 'event_date', 'location', 'status']); break;
        case 'calendars': loadCrudTable('publications.php?action=list&category=Calendars', 'calendars', ['title', 'year', 'created_at']); break;
        case 'gallery': loadCrudTable('gallery.php?action=list', 'gallery', ['title', 'tag', 'photo_count']); break;
        case 'publications': loadCrudTable('publications.php?action=list', 'publications', ['title', 'category', 'year']); break;
        case 'textbooks': loadCrudTable('textbooks.php?action=list', 'textbooks', ['grade_level', 'subject']); break;
        case 'gtfs': loadCrudTable('gtfs.php?action=list', 'gtfs', ['year', 'title', 'category', 'pdf_path', 'uploaded_at']); break;
        case 'jobs': loadCrudTable('jobs.php?action=list', 'jobs', ['title', 'section', 'job_type', 'closing_date', 'status']); break;
        case 'scholarships': loadCrudTable('scholarships.php?action=list', 'scholarships', ['title', 'deadline', 'status']); break;
        case 'forms': loadCrudTable('forms.php?action=list', 'forms', ['title', 'category', 'pdf_path']); break;
        case 'ticker': loadCrudTable('ticker.php?action=list', 'ticker', ['label', 'text', 'is_active']); break;
        case 'notices': loadCrudTable('notices.php?action=list', 'notices', ['title', 'card_type', 'is_active']); break;
        case 'leaders': loadLeaders(); break;
        case 'apps': loadCrudTable('app-links.php?action=list', 'apps', ['title', 'category', 'url', 'is_active']); break;
        case 'faq': loadCrudTable('faq.php?action=list', 'faq', ['question', 'category', 'sort_order', 'is_active']); break;
        case 'contact':
            loadContact();
            break;
        case 'users':
            loadCrudTable('users.php?action=list', 'users', ['username', 'full_name', 'role', 'last_login']);
            break;
        case 'logs':
            loadLogsTable();
            break;
        case 'sliders': loadCrudTable('sliders.php?action=list', 'sliders', ['image_path', 'title', 'sort_order', 'is_active']); break;
        case 'settings': loadSettings(); break;
        case 'edubot': loadEdubotTable(); break;
    }
}

// ===== DASHBOARD =====
async function loadDashboard() {
    const statEls = ['stat-news', 'stat-press', 'stat-events', 'stat-contact', 'stat-jobs', 'stat-pubs'];
    statEls.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = '<span class="loading-dot"></span>';
    });

    try {
        const analytics = await apiGet('analytics.php');
        const counts = analytics.contentDistribution || {};
        const messages = analytics.messageStatus || {};

        document.getElementById('stat-news').textContent = counts.News || 0;
        document.getElementById('stat-press').textContent = counts.Press || 0;
        document.getElementById('stat-events').textContent = counts.Events || 0;
        document.getElementById('stat-contact').textContent = messages.Unread || 0;
        document.getElementById('stat-jobs').textContent = counts.Jobs || 0;
        document.getElementById('stat-pubs').textContent = counts.Publications || 0;

        // Update unread badge in nav
        const unreadCount = messages.Unread || 0;
        const badge = document.getElementById('nav-unread-badge');
        if (badge) {
            badge.textContent = unreadCount;
            badge.style.display = unreadCount > 0 ? 'inline' : 'none';
        }

        // Initialize Charts
        loadAnalytics();

    } catch (err) {
        console.error('Dashboard load failed:', err);
        // Ensure stats aren't stuck on loading indicators — set to 0 if failed
        const stats = ['news', 'press', 'events', 'contact', 'jobs', 'pubs'];
        stats.forEach(s => {
            const el = document.getElementById(`stat-${s}`);
            if (el && (el.textContent === '—' || el.textContent === '')) el.textContent = '0';
        });
    }
}

// ===== ANALYTICS & CHARTS =====
let contactChart = null;
let activityChart = null;
let jobViewsChart = null;

async function loadAnalytics() {
    try {
        const result = await apiGet('analytics.php');
        if (result.error) return;

        // 1. Contact Insights (Last 7 Days)
        const ctxContact = document.getElementById('contactInsightsChart');
        if (ctxContact) {
            if (contactChart) contactChart.destroy();

            const datasets = result.messageDailyTrend || [];
            const labels = datasets.map(d => d.date);
            const data = datasets.map(d => d.count);

            contactChart = new Chart(ctxContact, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Messages received',
                        data: data,
                        borderColor: '#4a90e2',
                        backgroundColor: 'rgba(74, 144, 226, 0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3,
                        pointBackgroundColor: '#fff',
                        pointBorderColor: '#4a90e2',
                        pointBorderWidth: 2,
                        pointRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
                        x: { grid: { display: false } }
                    }
                }
            });
        }

        // 2. Content Activity Chart
        const ctxActivity = document.getElementById('activityChart');
        if (ctxActivity) {
            if (activityChart) activityChart.destroy();
            const counts = result.contentDistribution || {};

            activityChart = new Chart(ctxActivity, {
                type: 'bar',
                data: {
                    labels: Object.keys(counts),
                    datasets: [{
                        data: Object.values(counts),
                        backgroundColor: ['#4a90e2', '#34c759', '#ff9f43', '#af52de', '#ff3b30', '#5856d6'],
                        borderRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
                        x: { grid: { display: false } }
                    }
                }
            });
        }

        // 3. Job Views Chart
        const ctxJobViews = document.getElementById('jobViewsChart');
        if (ctxJobViews && result.topContent && result.topContent.Jobs) {
            if (jobViewsChart) jobViewsChart.destroy();
            const topJobs = result.topContent.Jobs;

            jobViewsChart = new Chart(ctxJobViews, {
                type: 'bar',
                data: {
                    labels: topJobs.map(j => j.title.length > 20 ? j.title.substring(0, 20) + '…' : j.title),
                    datasets: [{
                        label: 'Page Views',
                        data: topJobs.map(j => j.views),
                        backgroundColor: '#af52de',
                        borderRadius: 6
                    }]
                },
                options: {
                    indexAxis: 'y', // Horizontal bars
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
                        y: { grid: { display: false } }
                    }
                }
            });
        }
    } catch (e) {
        console.error('Chart load error:', e);
    }
}

// ===== COLUMN LABELS =====
const COLUMN_LABELS = {
    'title': 'Title',
    'date_published': 'Date',
    'status': 'Status',
    'event_date': 'Event Date',
    'location': 'Location',
    'tag': 'Tag',
    'photo_count': 'Photos',
    'category': 'Category',
    'year': 'Year',
    'grade_level': 'Grade Level',
    'subject': 'Subject',
    'job_type': 'Type',
    'closing_date': 'Closing Date',
    'deadline': 'Deadline',
    'label': 'Label',
    'text': 'Text',
    'is_active': 'Active',
    'card_type': 'Type',
    'url': 'URL',
    'views': 'Views',
    'sort_order': 'Order',
    'image_path': 'Image',
    'pdf_path': 'PDF Link'
};

// ===== GENERIC CRUD TABLE LOADER =====
async function loadCrudTable(endpoint, page, columns) {
    const tbody = document.getElementById(`${page}-tbody`);
    if (!tbody) return;

    tbody.innerHTML = `<tr><td colspan="${columns.length + 1}" style="text-align:center;padding:2rem;color:var(--admin-muted);">
        <span style="display:inline-block;width:20px;height:20px;border:2px solid var(--admin-primary);border-top-color:transparent;border-radius:50%;animation:spin 0.8s linear infinite;"></span>
        Loading...
    </td></tr>`;

    const result = await apiGet(endpoint);

    if (!result.data || result.data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="${columns.length + 1}" style="text-align:center;padding:3rem;color:var(--admin-muted);">
            <div style="font-size:2rem;margin-bottom:0.5rem;">📭</div>
            No records found. Click <strong>Add New</strong> to get started.
        </td></tr>`;
        return;
    }

    tbody.innerHTML = result.data.map(row => `
        <tr data-id="${row.id}">
            ${columns.map(col => {
        let val = row[col];
        if (val === null || val === undefined) val = '—';

        // Format specific columns
        if (col === 'status') {
            val = `<span class="status status-${val}">${val}</span>`;
        } else if (col === 'is_active') {
            val = val == 1
                ? '<span class="status status-published">Active</span>'
                : '<span class="status status-draft">Inactive</span>';
        } else if (col === 'image_path' || col === 'cover_image' || col === 'thumbnail_path') {
            let imgPath = val;
            if (imgPath !== '—' && !imgPath.startsWith('http') && !imgPath.startsWith('uploads/')) {
                // iec handler removed
            }
            const imgUrl = imgPath !== '—' ? (imgPath.startsWith('http') ? imgPath : `../${imgPath}`) : '';
            val = imgUrl
                ? `<img src="${imgUrl}" style="width:40px;height:40px;object-fit:cover;border-radius:4px;border:1px solid var(--admin-border);">`
                : '—';
        } else if (col === 'url' || col === 'pdf_path' || col === 'textbook_pdf' || col === 'manual_pdf') {
            const short = String(val).length > 35 ? String(val).substring(0, 35) + '…' : val;
            // For masked paths (forms/publications/textbooks), they should point to root (../ from admin)
            let finalUrl = val;
            if (val !== '—' && !val.startsWith('http') && !val.startsWith('../')) {
                finalUrl = `../${val}`;
            }
            val = `<a href="${finalUrl}" target="_blank" class="table-link" title="${val}">${short}</a>`;
        } else if (col === 'date_published' || col === 'event_date' || col === 'closing_date' || col === 'deadline' || col === 'last_login' || col === 'created_at') {
            if (val && val !== '—') {
                try {
                    const date = new Date(val);
                    val = date.toLocaleDateString('en-PG', { day: 'numeric', month: 'short', year: 'numeric' });
                    if (col === 'last_login' || col === 'created_at') {
                        val += ` <small>${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>`;
                    }
                } catch (e) { }
            }
        } else if (col === 'title') {
            const short = String(val).length > 60 ? String(val).substring(0, 60) + '…' : val;
            val = `<span title="${val}">${short}</span>`;
        } else if (col === 'text') {
            const short = String(val).length > 55 ? String(val).substring(0, 55) + '…' : val;
            val = `<span title="${val}">${short}</span>`;
        } else if (col === 'category') {
            // Prettify category slugs
            val = String(val).replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        } else if (col === 'job_type') {
            val = String(val).replace(/\b\w/g, c => c.toUpperCase());
        }

        return `<td>${val}</td>`;
    }).join('')}
            <td class="actions">
                <div class="actions-wrapper">
                    ${page === 'gallery' ? `
                    <button class="btn btn-sm btn-primary" onclick="managePhotos(${row.id})"><i data-lucide="images"></i>Photos</button>
                    ` : ''}
                    <button class="btn btn-sm btn-outline" onclick="editRecord('${page}', ${row.id})"><i data-lucide="edit-3"></i>Edit</button>
                    ${(userRole === 'super_admin' || ['calendars', 'apps', 'ticker', 'notices', 'forms', 'publications', 'textbooks', 'jobs', 'scholarships', 'gtfs'].includes(page)) ? `
                    <button class="btn btn-sm btn-danger" onclick="deleteRecord('${page}', ${row.id})"><i data-lucide="trash-2"></i></button>
                    ` : ''}
                </div>
            </td>
        </tr>
    `).join('');
    if (window.lucide) {
        lucide.createIcons({
            attrs: { 'stroke-width': 2, 'class': 'lucide' }
        });
    }
}

// ===== DELETE RECORD =====
async function deleteRecord(page, id) {
    if (userRole !== 'super_admin' && !['calendars', 'apps', 'ticker', 'notices', 'forms', 'publications', 'textbooks', 'jobs', 'scholarships', 'gtfs'].includes(page)) {
        showToast('Permission Denied: Only Super Admins can delete records.', 'error');
        return;
    }
    const confirmed = await showConfirmDialog('Delete Record', 'Are you sure you want to permanently delete this record? This action cannot be undone.');
    if (!confirmed) return;

    const endpoint = ENDPOINTS[page];
    if (!endpoint) return;

    const result = await apiPost(`${endpoint}?action=delete`, { id });
    if (result.success) {
        showToast('Record deleted successfully');
        loadPageData(page);
    } else {
        showToast(result.error || 'Delete failed', 'error');
    }
}

// ===== EDIT RECORD ROUTER =====
async function editRecord(page, id) {
    if (page === 'users') {
        await editUser(id);
    } else if (page === 'curriculum') {
        await editCurriculumEntry(id);
    } else if (page === 'edubot') {
        await editEdubotEntry(id);
    } else {
        await editRecordGeneric(page, id);
    }
}

// ===== EDIT RECORD =====
async function editRecordGeneric(page, id) {
    try {
        const endpoint = ENDPOINTS[page];
        if (!endpoint) return;

        // Show loading state on edit button
        showToast('Loading record…', 'info');

        const result = await apiGet(`${endpoint}?action=get&id=${id}`);
        if (result.error) {
            showToast(result.error, 'error');
            return;
        }

        const modalId = `modal-${page}`;
        const modal = document.getElementById(modalId);
        if (!modal) {
            showToast(`Modal ${modalId} not found`, 'error');
            return;
        }

        const form = modal.querySelector('form');
        if (form) {
            form.reset();
            form.dataset.editId = id;

            // Clear all upload previews before populating
            modal.querySelectorAll('.upload-preview-box').forEach(el => el.innerHTML = '');

            // Populate all fields
            Object.keys(result).forEach(key => {
                try {
                    const input = form.querySelector(`[name="${key}"]`);
                    if (!input) return;
                    if (input.type === 'checkbox') {
                        input.checked = result[key] == 1;
                    } else if (input.tagName === 'SELECT') {
                        input.value = result[key] || '';
                    } else {
                        input.value = result[key] !== null ? result[key] : '';
                    }
                } catch (e) {
                    console.error('Error populating field:', key, e);
                }
            });

            // Trigger GTFS fields toggle
            if (page === 'gtfs') {
                toggleGtfsFields(result.category);
            }


            // Sync TinyMCE editors
            const fieldPage = page;
            ['content', 'description'].forEach(field => {
                const editorId = `${fieldPage}-${field}`;
                if (result[field] !== undefined) {
                    setEditorContent(editorId, result[field]);
                }
            });

            // Show previews for existing uploaded files
            const filePage = page;
            (FILE_FIELDS[filePage] || []).forEach(([field, type]) => {
                if (result[field]) showExistingFilePreview(filePage, field, result[field], type);
            });

            // Sync custom selects after population
            syncCustomSelects(modal);

            // Update modal title
            const headerEl = modal.querySelector('.admin-modal-header h3');
            if (headerEl) headerEl.textContent = `Edit ${getPageTitle(page).replace(/s$/, '')}`;
        }

        openModal(modalId);

        // Populate categories for forms and select the current one
        if (page === 'forms') {
            loadFormCategories(result.category);
        }

        // Populate card types for notices and select current
        if (page === 'notices') {
            loadNoticeCardTypes(result.card_type);
        }

        // Populate job types and select current
        if (page === 'jobs') {
            loadJobTypes(result.job_type);
        }
    } catch (e) {
        console.error('editRecordGeneric Error:', e);
        showToast('UI Error: ' + e.message, 'error');
    }
}

// ===== JOB TYPES LOADER =====
async function loadJobTypes(selectedValue = '') {
    const select = document.getElementById('jobs-type-select');
    if (!select) return;

    const result = await apiGet('jobs.php?action=get_types');
    const types = result.data || ['teaching', 'administrative', 'contract'];

    // Keep unique list
    const finalTypes = Array.from(new Set([...['teaching', 'administrative', 'contract'], ...types]));

    let html = '';
    finalTypes.forEach(t => {
        html += `<option value="${t}" ${t === selectedValue ? 'selected' : ''}>${t.charAt(0).toUpperCase() + t.slice(1)}</option>`;
    });
    html += `<option value="__NEW__">+ Add New Type...</option>`;

    select.innerHTML = html;

    // Hide/show new input
    const group = document.getElementById('jobs-new-type-group');
    if (group) group.style.display = (selectedValue && !finalTypes.includes(selectedValue)) ? 'block' : 'none';

    refreshCustomSelect(select);
}

// ===== SAVE RECORD (Create or Update) =====
async function saveRecord(page, form) {
    const endpoint = ENDPOINTS[page];
    if (!endpoint) return;

    // Disable submit button to prevent double submit
    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Saving…';
    }

    // Check for ongoing uploads
    const isUploading = form.querySelector('.file-upload-zone[style*="animation"]');
    if (isUploading || form.innerText.includes('Uploading…')) {
        showToast('Please wait for file uploads to complete', 'warning');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Save';
        }
        return;
    }

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        if (key !== 'category_select' && key !== 'job_type_select') data[key] = value;
    });

    // Special handling for jobs type dropdown
    if (page === 'jobs') {
        const select = document.getElementById('jobs-type-select');
        const newInput = document.getElementById('jobs-new-type-input');
        if (select && select.value === '__NEW__') {
            const val = newInput.value.trim();
            if (!val) {
                showToast('Please enter a job type name', 'warning');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Save';
                }
                return;
            }
            data.job_type = val;
        } else if (select) {
            data.job_type = select.value;
        }
    }

    // Special handling for notices card_type dropdown
    if (page === 'notices') {
        const select = document.getElementById('notices-card-type-select');
        const newInput = document.getElementById('notices-new-type-input');
        if (select && select.value === '__NEW__') {
            const val = newInput.value.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
            if (!val) {
                showToast('Please enter a card type name', 'warning');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i data-lucide="save"></i>Save';
                    if (window.lucide) lucide.createIcons();
                }
                return;
            }
            data.card_type = val;
        } else if (select) {
            data.card_type = select.value;
        }
    }

    // Special handling for forms category dropdown
    if (page === 'forms') {
        const select = document.getElementById('forms-category-select');
        const newInput = document.getElementById('forms-new-category-input');
        if (select && select.value === '__NEW__') {
            const val = newInput.value.trim();
            if (!val) {
                showToast('Please enter a category name', 'warning');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i data-lucide="save"></i>Save';
                    if (window.lucide) lucide.createIcons();
                }
                return;
            }
            data.category = val;
        } else if (select) {
            data.category = select.value;
        }
    }

    // CRITICAL FIX: Explicitly check for file paths in the form to ensure they aren't missed
    const pathFields = ['pdf_path', 'thumbnail_path', 'textbook_pdf', 'manual_pdf', 'image_path', 'cover_image', 'file_path'];
    pathFields.forEach(f => {
        const input = form.querySelector(`input[name="${f}"]`);
        if (input && input.value) {
            let path = input.value;

            // Transform for forms if needed (uploads/forms/file.pdf -> ffile.pdf)
            if (page === 'forms' && path.startsWith('uploads/forms/')) {
                path = path.replace(/^uploads\/forms\//, 'f');
            }

            // Transform for publications & textbooks (uploads/X/file.pdf -> file.pdf)
            if ((page === 'publications' || page === 'textbooks') && path.includes(`uploads/${page}/`)) {
                path = path.split('/').pop(); // Just the filename
            }

            data[f] = path;
        }
    });

    console.log(`[Admin] Final data to save:`, data);

    // Handle unchecked checkboxes (absent from FormData)
    form.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        data[cb.name] = cb.checked ? 1 : 0;
    });

    // Validation
    let isValid = true;
    let errorMsg = 'Please fill in all required fields';

    if (page === 'textbooks') {
        if (!data.grade_level || !data.subject) isValid = false;
    } else if (page === 'ticker') {
        if (!data.label || !data.text) isValid = false;
    } else if (page === 'faq') {
        if (!data.question) isValid = false;

    } else {
        if (!data.title) {
            isValid = false;
            errorMsg = 'Title is required';
        }
    }

    if (!isValid) {
        showToast(errorMsg, 'error');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i data-lucide="save"></i>Save';
            if (window.lucide) lucide.createIcons();
        }
        return;
    }

    // Get Rich Editor content
    ['content', 'description'].forEach(field => {
        const editorId = `${page}-${field}`;
        if (CK_EDITORS[editorId]) {
            data[field] = CK_EDITORS[editorId].getData();
        }
    });

    const editId = form.dataset.editId;
    const action = editId ? 'update' : 'create';
    if (editId) data.id = editId;

    console.log(`[Admin] Saving ${page}:`, data);

    const result = await apiPost(`${endpoint}?action=${action}`, data);

    // Re-enable button
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i data-lucide="save"></i>Save';
        if (window.lucide) lucide.createIcons();
    }

    if (result.success) {
        showToast(editId ? 'Record updated successfully ✓' : 'Record created successfully ✓');
        const modalId = `modal-${page}`;
        closeModal(modalId);
        form.reset();
        delete form.dataset.editId;

        // Clear TinyMCE
        if (typeof tinymce !== 'undefined') {
            const fieldPage = page;
            ['content', 'description'].forEach(field => {
                const editor = tinymce.get(`${fieldPage}-${field}`);
                if (editor) editor.setContent('');
            });
        }

        loadPageData(page);
    } else {
        showToast(result.error || 'Save failed — check required fields', 'error');
    }
}

function openAddModal(page) {
    const modalId = `modal-${page}`;
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const form = modal.querySelector('form');
    if (form) {
        form.reset();
        delete form.dataset.editId;

        // Clear upload previews
        const previewPage = page;
        modal.querySelectorAll('.upload-preview-box').forEach(el => el.innerHTML = '');

        // Clear TinyMCE
        if (typeof tinymce !== 'undefined') {
            ['content', 'description'].forEach(field => {
                const editor = tinymce.get(`${previewPage}-${field}`);
                if (editor) editor.setContent('');
            });
        }

        // Special handling for jobs type dropdown
        if (page === 'jobs') {
            loadJobTypes();
        }

        // Populate card types for notices
        if (page === 'notices') {
            loadNoticeCardTypes();
        }

        // GTFS extra fields
        if (page === 'gtfs') {
            toggleGtfsFields('');
        }
    }

    const headerEl = modal.querySelector('.admin-modal-header h3');
    if (headerEl) {
        const labels = {
            'news': 'Add News Article', 'press': 'Add Press Release', 'events': 'Add Event',
            'gallery': 'Add Photo Album', 'publications': 'Add Publication', 'textbooks': 'Add Textbook',
            'jobs': 'Post Job Opening', 'scholarships': 'Add Scholarship', 'forms': 'Add Public Form',
            'ticker': 'Add Ticker Item', 'notices': 'Add Notice', 'apps': 'Add App Link',
            'faq': 'Add FAQ', 'calendars': 'Add Calendar'
        };
        headerEl.textContent = labels[page] || 'Add New';
    }

    // Refresh custom selects for this modal
    initCustomSelects(modal);
    syncCustomSelects(modal);

    openModal(modalId);

    // Populate categories for forms
    if (page === 'forms') {
        loadFormCategories();
    }
}

// ===== MODAL FILE UPLOAD HANDLERS =====

async function handleModalUpload(input, modal, field, type, folder = '') {
    if (!input.files || !input.files.length) return;
    await handleModalUploadFile(input.files[0], modal, field, type, folder);
    input.value = ''; // Reset so same file can be re-selected
}

async function handleModalUploadFile(file, modal, field, type, folder = '') {
    const zoneEl = document.getElementById(`zone-${modal}-${field}`);
    const previewEl = document.getElementById(`preview-${modal}-${field}`);
    const hiddenInput = document.querySelector(`#modal-${modal} [name="${field}"]`);

    // Show spinner in zone
    if (zoneEl) {
        zoneEl.innerHTML = `<span style="display:inline-block;width:18px;height:18px;border:2px solid var(--admin-primary);border-top-color:transparent;border-radius:50%;animation:spin 0.8s linear infinite;vertical-align:middle;margin-right:8px;"></span><span style="color:var(--admin-muted);font-size:0.85rem;">Uploading…</span>`;
    }

    const result = await uploadFile(file, type, false, folder);

    // Restore zone
    if (zoneEl) {
        const isImg = type === 'image';
        zoneEl.innerHTML = isImg
            ? `<span class="upload-icon">🖼️</span><p>Click or drag &amp; drop image here</p><small>JPG, PNG, WebP • Max 10MB</small>`
            : `<span class="upload-icon">📄</span><p>Click or drag &amp; drop PDF here</p><small>PDF only • Max 10MB</small>`;
        if (result.success) {
            zoneEl.style.borderColor = 'var(--admin-success)';
            setTimeout(() => { if (zoneEl) zoneEl.style.borderColor = ''; }, 2000);
        }
    }

    if (result.success) {
        if (hiddenInput) {
            hiddenInput.value = result.file_path;
            console.log(`[Admin] Updated hidden input [name="${field}"] with value:`, result.file_path);
        } else {
            console.warn(`[Admin] Could not find hidden input [name="${field}"] in modal #${modal}`);
        }
        if (previewEl) {
            if (type === 'image') {
                previewEl.innerHTML = `
                    <div class="upload-preview-item">
                        <img src="../${result.file_path}" class="upload-img-preview" alt="Uploaded">
                        <div class="upload-preview-info">
                            <span class="upload-preview-name">✅ ${result.file_name}</span>
                            <button type="button" class="remove-upload" onclick="clearModalUpload('${modal}','${field}')">✕ Remove</button>
                        </div>
                    </div>`;
            } else {
                previewEl.innerHTML = `
                    <div class="upload-file-preview">
                        <span>📄 ${result.file_name}</span>
                        <a href="../${result.file_path}" target="_blank" style="color:var(--admin-primary);font-size:0.8rem;text-decoration:none;">Preview</a>
                        <button type="button" class="remove-upload" onclick="clearModalUpload('${modal}','${field}')">✕</button>
                    </div>`;
            }
        }
        showToast(`${type === 'image' ? 'Image' : 'PDF'} uploaded ✓`);
    } else {
        if (previewEl) previewEl.innerHTML = `<p style="color:var(--admin-danger);font-size:0.82rem;padding:0.5rem 0;">❌ ${result.error || 'Upload failed'}</p>`;
        showToast(result.error || 'Upload failed', 'error');
    }
}

function clearModalUpload(modal, field) {
    const previewEl = document.getElementById(`preview-${modal}-${field}`);
    const hiddenInput = document.querySelector(`#modal-${modal} [name="${field}"]`);
    const fileInput = document.getElementById(`file-${modal}-${field}`);
    if (previewEl) previewEl.innerHTML = '';
    if (hiddenInput) hiddenInput.value = '';
    if (fileInput) fileInput.value = '';
}

function showExistingFilePreview(modal, field, filePath, type) {
    const previewEl = document.getElementById(`preview-${modal}-${field}`);
    if (!previewEl || !filePath) return;
    
    let finalPath = filePath;
    
    const filename = finalPath.split('/').pop();
    if (type === 'image') {
        previewEl.innerHTML = `
            <div class="upload-preview-item">
                <img src="../${finalPath}" class="upload-img-preview" alt="Current" onerror="this.style.display='none'">
                <div class="upload-preview-info">
                    <span class="upload-preview-name">📌 Current: ${filename}</span>
                    <button type="button" class="remove-upload" onclick="clearModalUpload('${modal}','${field}')">✕ Remove</button>
                </div>
            </div>`;
    } else {
        const isImg = finalPath.match(/\.(jpg|jpeg|png|webp|gif)$/i);
        previewEl.innerHTML = `
            <div class="upload-file-preview">
                ${isImg ? `<img src="../${finalPath}" style="width:30px;height:30px;object-fit:cover;border-radius:4px;margin-right:8px;">` : '<span>📄</span>'}
                <span style="flex:1;">Current: ${filename}</span>
                <a href="../${finalPath}" target="_blank" style="color:var(--admin-primary);font-size:0.8rem;text-decoration:none;margin-right:8px;">Preview</a>
                <button type="button" class="remove-upload" onclick="clearModalUpload('${modal}','${field}')">✕</button>
            </div>`;
    }
}

// ===== LEADERS - Special handling =====
async function loadLeaders() {
    const result = await apiGet('leaders.php?action=list');
    if (!result.data) return;

    result.data.forEach(leader => {
        const prefix = leader.role; // 'minister' or 'secretary'

        const nameEl = document.getElementById(`leader-${prefix}-name`);
        const titleEl = document.getElementById(`leader-${prefix}-title`);
        const photoEl = document.getElementById(`leader-${prefix}-photo`);
        const msgEl = document.getElementById(`leaders-message_content_${prefix}`);

        if (nameEl) nameEl.value = leader.name || '';
        if (titleEl) titleEl.value = leader.position_title || '';
        if (photoEl) photoEl.value = leader.photo_path || `assets/images/leaders/${prefix}.png`;
        if (msgEl) msgEl.value = leader.message_content || '';

        // Show current photo preview
        const previewEl = document.getElementById(`leader-${prefix}-photo-preview`);
        if (previewEl && leader.photo_path) {
            previewEl.innerHTML = `<img src="../${leader.photo_path}" class="file-preview" alt="${prefix} photo" onerror="this.style.display='none'">`;
        }

        // Store record ID on the form for save
        const form = document.getElementById(`form-leader-${prefix}`);
        if (form) form.dataset.editId = leader.id;
    });
}

async function saveLeader(role) {
    const form = document.getElementById(`form-leader-${role}`);
    if (!form) return;

    const btn = form.querySelector('.btn-primary');
    if (btn) { btn.disabled = true; btn.textContent = 'Saving…'; }

    const editorId = `leaders-message_content_${role}`;
    const editor = typeof tinymce !== 'undefined' ? tinymce.get(editorId) : null;
    const messageContent = editor ? editor.getContent() : (document.getElementById(editorId)?.value || '');

    const data = {
        id: form.dataset.editId,
        role: role,
        name: document.getElementById(`leader-${role}-name`)?.value || '',
        position_title: document.getElementById(`leader-${role}-title`)?.value || '',
        photo_path: document.getElementById(`leader-${role}-photo`)?.value || `assets/images/leaders/${role}.png`,
        message_content: messageContent,
        border_color: role === 'minister' ? '#4a90e2' : '#f5a623'
    };

    const result = await apiPost('leaders.php?action=update', data);

    if (btn) {
        btn.disabled = false;
        btn.innerHTML = `<i data-lucide="save"></i>Save ${role === 'minister' ? "Minister's" : "Secretary's"} Message`;
        if (window.lucide) lucide.createIcons();
    }

    if (result.success) {
        showToast(`${role === 'minister' ? "Minister's" : "Secretary's"} message updated successfully ✓`);
    } else {
        showToast(result.error || 'Update failed', 'error');
    }
}

// ===== CLEAR LEADER MESSAGE =====
async function clearLeader(role) {
    const label = role === 'minister' ? "Minister's" : "Secretary's";
    const confirmed = await showConfirmDialog(
        `Delete ${label} Message`,
        `This will permanently remove all content (name, photo, message) for the ${label} section. It will no longer appear on the homepage until you add new content. Continue?`
    );
    if (!confirmed) return;

    const result = await apiPost('leaders.php?action=clear', { role });
    if (result.success) {
        showToast(`${label} message cleared. It will no longer show on the homepage.`);
        // Reset the form fields
        const prefixes = { minister: 'minister', secretary: 'secretary' };
        const prefix = prefixes[role];
        const nameEl = document.getElementById(`leader-${prefix}-name`);
        const titleEl = document.getElementById(`leader-${prefix}-title`);
        const photoEl = document.getElementById(`leader-${prefix}-photo`);
        const msgEl = document.getElementById(`leaders-message_content_${prefix}`);
        const previewEl = document.getElementById(`leader-${prefix}-photo-preview`);
        if (nameEl) nameEl.value = '';
        if (titleEl) titleEl.value = '';
        if (photoEl) photoEl.value = '';
        if (msgEl) msgEl.value = '';
        if (previewEl) previewEl.innerHTML = '';
    } else {
        showToast(result.error || 'Clear failed', 'error');
    }
}

async function loadContact() {
    const result = await apiGet('contact.php?action=list');
    const tbody = document.getElementById('contact-tbody');
    if (!tbody) return;

    if (!result.data || result.data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:3rem;color:var(--admin-muted);">
            <div style="font-size:2rem;margin-bottom:0.8rem;opacity:0.3;"><i data-lucide="mail-x" style="width:48px;height:48px;"></i></div>
            No contact submissions yet.
        </td></tr>`;
        return;
    }

    const unread = result.data.filter(r => r.is_read == 0).length;
    const badge = document.getElementById('nav-unread-badge');
    if (badge) {
        badge.textContent = unread;
        badge.style.display = unread > 0 ? 'inline' : 'none';
    }

    tbody.innerHTML = result.data.map(row => {
        const date = row.submitted_at ? new Date(row.submitted_at).toLocaleDateString('en-PG', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
        const rowStyle = row.is_read == 0 ? 'background:#f0f7ff;font-weight:600;' : '';
        const unreadBadge = row.is_read == 0 ? '<span style="display:inline-block;width:8px;height:8px;background:var(--admin-primary);border-radius:50%;margin-right:6px;"></span>' : '';
        return `
            <tr style="${rowStyle}">
                <td>${unreadBadge}${row.name || '—'}</td>
                <td><a href="mailto:${row.email}" class="table-link">${row.email}</a></td>
                <td>${row.subject || '—'}</td>
                <td>${date}</td>
                <td class="actions">
                    <button class="btn btn-sm btn-outline" onclick="viewSubmission(${row.id})"><i data-lucide="eye"></i>View</button>
                    ${userRole === 'super_admin' ? `
                    <button class="btn btn-sm btn-danger" onclick="deleteRecord('contact', ${row.id})"><i data-lucide="trash-2"></i></button>
                    ` : ''}
                </td>
            </tr>
        `;
    }).join('');
    if (window.lucide) lucide.createIcons();
}

async function viewSubmission(id) {
    const result = await apiGet(`contact.php?action=get&id=${id}`);
    if (result.error || !result.name) {
        showToast('Could not load message', 'error');
        return;
    }

    document.getElementById('view-contact-name').textContent = result.name || '—';
    const emailEl = document.getElementById('view-contact-email');
    emailEl.textContent = result.email || '—';
    emailEl.href = `mailto:${result.email}`;
    document.getElementById('view-contact-phone').textContent = result.phone || 'Not provided';
    document.getElementById('view-contact-subject').textContent = result.subject || '—';
    document.getElementById('view-contact-message').textContent = result.message || '—';
    document.getElementById('view-contact-date').textContent = result.submitted_at
        ? new Date(result.submitted_at).toLocaleString('en-PG') : '—';

    openModal('modal-view-contact');
    // Refresh table after short delay to show read state
    setTimeout(() => loadContact(), 500);
}

// ===== SETTINGS =====
async function loadSettings() {
    const result = await apiGet('settings.php?action=list');
    if (!result.data) return;

    result.data.forEach(s => {
        const input = document.getElementById(`setting-${s.setting_key}`);
        if (input) {
            if (input.type === 'checkbox') {
                input.checked = s.setting_value == '1';
                if (s.setting_key === 'maintenance_mode') {
                    updateMaintenanceText(input.checked);
                }
            } else {
                input.value = s.setting_value || '';
            }

            // Image Previews for branding
            const imageKeys = ['site_logo', 'site_favicon', 'footer_logo'];
            if (imageKeys.includes(s.setting_key)) {
                const preview = document.getElementById(`preview-setting-${s.setting_key}`);
                if (preview) {
                    if (s.setting_value) {
                        preview.innerHTML = `<img src="../${s.setting_value}" style="width:100%; height:100%; object-fit:contain;">`;
                    } else {
                        preview.innerHTML = `<i data-lucide="image" style="color:var(--admin-muted); width:32px;"></i>`;
                        if (window.lucide) lucide.createIcons();
                    }
                }

                // Sync UI elements
                if (s.setting_key === 'site_logo') {
                    const sidebarLogo = document.getElementById('admin-sidebar-logo');
                    if (sidebarLogo) {
                        if (s.setting_value) {
                            sidebarLogo.src = `../${s.setting_value}`;
                            sidebarLogo.style.display = 'block';
                        } else {
                            sidebarLogo.style.display = 'none';
                        }
                    }
                }

                if (s.setting_key === 'site_title') {
                    const sidebarTitle = document.getElementById('admin-sidebar-title');
                    if (sidebarTitle) sidebarTitle.textContent = s.setting_value || 'Admin Panel';
                }

                if (s.setting_key === 'site_subtitle') {
                    const sidebarSub = document.getElementById('admin-sidebar-subtitle');
                    if (sidebarSub) sidebarSub.textContent = s.setting_value || 'Site Management';
                }

                if (s.setting_key === 'site_favicon') {
                    const favicon = document.getElementById('admin-favicon');
                    if (favicon) favicon.href = s.setting_value ? `../${s.setting_value}` : 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
                }
            }
        }
    });
}

function updateMaintenanceText(enabled) {
    const text = document.getElementById('maintenance-status-text');
    if (text) {
        text.textContent = enabled ? 'Enabled' : 'Disabled';
        text.style.color = enabled ? 'var(--admin-danger)' : 'var(--text-muted)';
    }
}

async function toggleMaintenance(enabled) {
    updateMaintenanceText(enabled);
    const result = await apiPost('settings.php?action=update_single', {
        key: 'maintenance_mode',
        value: enabled ? '1' : '0'
    });
    if (result.success) {
        showToast(`Maintenance Mode ${enabled ? 'ACTIVATED' : 'DEACTIVATED'}`, enabled ? 'info' : 'success');
    } else {
        showToast('Failed to toggle Maintenance Mode', 'error');
    }
}

async function handleSettingUpload(input, key) {
    if (!input.files || !input.files[0]) return;
    const file = input.files[0];

    console.log(`[Branding] Starting upload for ${key}:`, file.name);

    // Show spinner in zone
    const zoneEl = document.getElementById(`zone-setting-${key}`);
    const originalZoneHTML = zoneEl ? zoneEl.innerHTML : '';
    if (zoneEl) {
        zoneEl.innerHTML = `<span style="display:inline-block;width:18px;height:18px;border:2px solid var(--admin-primary);border-top-color:transparent;border-radius:50%;animation:spin 0.8s linear infinite;vertical-align:middle;margin-right:8px;"></span><span style="color:var(--admin-muted);font-size:0.85rem;">Uploading…</span>`;
    }

    try {
        const result = await uploadFile(file, 'image');
        console.log(`[Branding] Upload result for ${key}:`, result);

        // Restore zone
        if (zoneEl) zoneEl.innerHTML = originalZoneHTML;

        if (result.success) {
            const hiddenInput = document.getElementById(`setting-${key}`);
            if (hiddenInput) {
                hiddenInput.value = result.file_path;
                console.log(`[Branding] Updated hidden input setting-${key} to ${result.file_path}`);
            }

            const preview = document.getElementById(`preview-setting-${key}`);
            if (preview) {
                preview.innerHTML = `<img src="../${result.file_path}" style="width:100%; height:100%; object-fit:contain;">`;
            }
            showToast('Logo uploaded ✓. Remember to Save All Settings.', 'info');
        } else {
            showToast(result.error || 'Upload failed', 'error');
            console.error(`[Branding] Upload failed for ${key}:`, result.error);
        }
    } catch (err) {
        if (zoneEl) zoneEl.innerHTML = originalZoneHTML;
        showToast('Upload error occurred', 'error');
        console.error(`[Branding] Exception during ${key} upload:`, err);
    }
}

function downloadBackup() {
    showToast('Preparing database backup...', 'info');
    window.location.href = `${API_BASE}/admin_actions.php?action=backup`;
}

async function saveSettings() {
    const btn = document.querySelector('#page-settings .btn-primary');
    if (btn) { btn.disabled = true; btn.innerHTML = '<span class="loading-dot"></span> Saving...'; }

    const settings = {};
    document.querySelectorAll('[id^="setting-"]').forEach(input => {
        const key = input.id.replace('setting-', '');
        if (input.type === 'checkbox') {
            settings[key] = input.checked ? '1' : '0';
        } else {
            settings[key] = input.value;
        }
    });

    const result = await apiPost('settings.php?action=update', { settings });

    if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<i data-lucide="save"></i>Save All Settings';
        if (window.lucide) lucide.createIcons();
    }

    if (result.success) {
        showToast('Settings saved successfully ✓');
        await loadSettings(); // Refresh UI with new settings
    } else {
        showToast(result.error || 'Save failed', 'error');
    }
}

async function removeLogo(key = 'site_logo') {
    const labels = {
        'site_logo': 'Header Logo',
        'footer_logo': 'Footer Logo',
        'site_favicon': 'Favicon'
    };
    const label = labels[key] || 'Logo';

    if (!confirm(`Remove ${label}?\n\nIt will be reset to the default branding.`)) return;

    const defaultLogo = '';
    const hiddenInput = document.getElementById(`setting-${key}`);
    if (hiddenInput) hiddenInput.value = defaultLogo;

    const preview = document.getElementById(`preview-setting-${key}`);
    if (preview) {
        if (defaultLogo) {
            preview.innerHTML = `<img src="../${defaultLogo}" style="width:100%; height:100%; object-fit:contain;">`;
        } else {
            preview.innerHTML = `<i data-lucide="image" style="color:var(--admin-muted); width:32px;"></i>`;
            if (window.lucide) lucide.createIcons();
        }
    }

    showToast(`${label} reset to default. Click "Save All Settings" to apply.`, 'info');
}

async function resetSiteSettings() {
    if (userRole !== 'super_admin') {
        showToast('Permission Denied: Only Super Admins can reset site settings.', 'error');
        return;
    }

    if (!confirm('FACTORY RESET SITE?\n\nCRITICAL: This will restore ALL site settings (titles, branding, and contact info) to defaults. This action cannot be undone.')) return;

    const defaults = {
        'maintenance_mode': '0',
        'site_title': 'Department of Education PNG',
        'site_subtitle': 'Ensuring Quality Education for All',
        'site_description': 'The official website of the Department of Education, Papua New Guinea.',
        'site_copyright': '© 2026 Department of Education, Papua New Guinea. All rights reserved.',
        'site_logo': '',
        'site_favicon': '',
        'footer_logo': '',
        'footer_address': 'Waigani, Port Moresby, Papua New Guinea',
        'footer_email': 'info@education.gov.pg',
        'footer_phone': '+675 301 3300',
        'social_facebook': 'https://facebook.com/PNGDOE',
        'social_linkedin': '',
        'social_whatsapp': ''
    };

    const result = await apiPost('settings.php?action=update', { settings: defaults });

    if (result.success) {
        showToast('Site settings reset to defaults! Reloading...', 'success');
        setTimeout(() => location.reload(), 1500);
    } else {
        showToast(result.error || 'Reset failed', 'error');
    }
}

// ===== PASSWORD CHANGE =====
async function changePassword() {
    const current = document.getElementById('current-password').value;
    const newPass = document.getElementById('new-password').value;
    const confirm = document.getElementById('confirm-password').value;

    if (!current) { showToast('Please enter your current password', 'error'); return; }
    if (newPass !== confirm) { showToast('New passwords do not match', 'error'); return; }
    if (newPass.length < 8) { showToast('Password must be at least 8 characters', 'error'); return; }

    const btn = document.querySelector('#modal-password .btn-primary');
    if (btn) { btn.disabled = true; btn.textContent = 'Changing…'; }

    const result = await apiPost('auth.php?action=change_password', {
        current_password: current,
        new_password: newPass
    });

    if (btn) { btn.disabled = false; btn.textContent = '🔑 Change Password'; }

    if (result.success) {
        showToast('Password changed successfully ✓');
        closeModal('modal-password');
        ['current-password', 'new-password', 'confirm-password'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
        });
    } else {
        showToast(result.error || 'Failed to change password', 'error');
    }
}

// ===== LOGOUT =====
async function logout() {
    const confirmed = await showConfirmDialog('Logout', 'Are you sure you want to log out of the admin panel?');
    if (!confirmed) return;
    await apiPost('auth.php?action=logout', {});
    window.location.href = 'index.php';
}

// ===== CONFIRM DIALOG (Promise-based) =====
function showConfirmDialog(title, message) {
    return new Promise(resolve => {
        // Remove any existing confirm dialog
        const existing = document.getElementById('admin-confirm-dialog');
        if (existing) existing.remove();

        const dialog = document.createElement('div');
        dialog.id = 'admin-confirm-dialog';
        dialog.className = 'admin-modal show';
        dialog.innerHTML = `
            <div class="admin-modal-content" style="max-width:400px;">
                <div class="admin-modal-header">
                    <h3>⚠️ ${title}</h3>
                </div>
                <div class="admin-modal-body">
                    <p style="color:var(--admin-muted);line-height:1.6;">${message}</p>
                </div>
                <div class="admin-modal-footer">
                    <button class="btn btn-outline" id="confirm-cancel"><i data-lucide="x"></i>Cancel</button>
                    <button class="btn btn-danger" id="confirm-ok"><i data-lucide="check"></i>Confirm</button>
                </div>
            </div>
        `;
        document.body.appendChild(dialog);
        if (window.lucide) lucide.createIcons();

        document.getElementById('confirm-ok').addEventListener('click', () => {
            dialog.remove();
            resolve(true);
        });
        document.getElementById('confirm-cancel').addEventListener('click', () => {
            dialog.remove();
            resolve(false);
        });
    });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    // Check URL hash for initial page
    const hash = window.location.hash.replace('#', '');
    const validPages = Object.keys(ENDPOINTS).concat(['dashboard', 'settings']);
    const startPage = validPages.includes(hash) ? hash : 'dashboard';

    navigateTo(startPage);
    initCustomSelects(); // Global init

    // Initial icon load
    if (window.lucide) {
        lucide.createIcons({
            attrs: { 'stroke-width': 2, 'class': 'lucide' }
        });
    }

    // Initial TinyMCE init (for visible elements)
    if (typeof tinymce !== 'undefined') {
        tinymce.init({
            selector: 'textarea.rich-editor',
            base_url: 'https://cdn.jsdelivr.net/npm/tinymce@6',
            suffix: '.min',
            height: 320,
            skin: 'oxide',
            content_css: 'default',
            menubar: false,
            plugins: 'lists link table code fullscreen wordcount',
            toolbar: 'undo redo | blocks | bold italic underline | bullist numlist | link table | removeformat | code fullscreen',
            content_style: 'body { font-family: Inter, system-ui, sans-serif; font-size: 14px; line-height: 1.6; color: #1a1a2e; }',
            branding: false,
            promotion: false
        });
    }

    // Refresh unread count every 60s
    setInterval(refreshUnreadBadge, 60000);

    // Initial auth check
    checkSession();
});

async function checkSession() {
    try {
        const res = await apiGet('auth.php?action=check');
        if (res.logged_in) {
            userRole = res.role || 'editor';
            console.log(`[RBAC] Logged in as: ${userRole}`); // Debug to console
            document.body.setAttribute('data-user-role', userRole);

            // Apply restrictions immediately
            applyRoleRestrictions();
        } else {
            window.location.href = 'index.php';
        }
    } catch (e) {
        console.error("[RBAC] Auth check failed", e);
    }
}

function applyRoleRestrictions() {
    if (userRole !== 'super_admin') {
        const restrictedPages = ['settings', 'users', 'logs'];

        // 1. Hide sidebar items
        restrictedPages.forEach(p => {
            const navItem = document.querySelector(`.nav-item[data-page="${p}"]`);
            if (navItem) navItem.style.setProperty('display', 'none', 'important');
        });

        // 2. Hide any other elements tagged for super_admin (header labels, buttons, etc.)
        document.querySelectorAll('[data-role="super_admin"]').forEach(el => {
            el.style.setProperty('display', 'none', 'important');
        });

        // 3. If user is on a restricted page, kick them to dashboard
        const currentHash = window.location.hash.replace('#', '');
        if (restrictedPages.includes(currentHash)) navigateTo('dashboard');
    }
}

// ===== REAL-TIME NOTIFICATIONS (POLLING) =====
async function refreshUnreadBadge() {
    const result = await apiGet('contact.php?action=list');
    const unread = result.unread_count || 0;
    const badge = document.getElementById('nav-unread-badge');
    if (badge) {
        badge.textContent = unread;
        badge.style.display = unread > 0 ? 'inline' : 'none';
    }
    // Also update dashboard stat if visible
    const statEl = document.getElementById('stat-contact');
    if (statEl && document.getElementById('page-dashboard')?.classList.contains('active')) {
        statEl.textContent = unread;
    }
}

// ===== GALLERY MANAGEMENT =====

async function managePhotos(albumId) {
    const result = await apiGet(`gallery.php?action=get&id=${albumId}`);
    if (result.error) {
        showToast(result.error, 'error');
        return;
    }

    const modal = document.getElementById('modal-album-photos');
    document.getElementById('manage-album-title').textContent = result.title || 'Untitled Album';
    document.getElementById('manage-album-desc').textContent = result.description || 'No description provided';
    modal.dataset.albumId = albumId;

    // Reset progress UI
    document.getElementById('upload-progress-container').style.display = 'none';

    await refreshAlbumPhotos(albumId);
    openModal('modal-album-photos');
}

async function refreshAlbumPhotos(albumId) {
    const grid = document.getElementById('album-photos-grid');
    const countEl = document.getElementById('album-photo-count');
    grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--admin-muted);">
            <div class="loading-dot" style="border-width: 3px; width: 24px; height: 24px; border-top-color: var(--admin-primary);"></div>
            <p style="margin-top: 1rem;">Loading album photos...</p>
        </div>`;

    const result = await apiGet(`gallery.php?action=get_photos&album_id=${albumId}`);
    if (result.error) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--admin-danger); padding: 2rem;">Error: ${result.error}</p>`;
        return;
    }

    const photos = result.data || [];
    countEl.textContent = photos.length;

    if (photos.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem 2rem; color: var(--admin-muted); border: 2px dashed var(--admin-border); border-radius: 16px; background: #fff;">
                <div style="font-size: 3.5rem; margin-bottom: 1rem; opacity: 0.2;">📸</div>
                <h4 style="color: var(--admin-text); font-weight: 700; margin-bottom: 0.5rem;">Album is empty</h4>
                <p style="font-size: 0.9rem;">Start by uploading some photos above.</p>
            </div>`;
        return;
    }

    grid.innerHTML = photos.map(p => `
        <div class="photo-card" id="photo-${p.id}" style="animation: fadeIn 0.3s ease forwards;">
            <img src="../${p.image_path}" alt="Photo" onerror="this.src='../assets/images/placeholder.png'">
            <div class="photo-overlay">
                <button class="delete-photo-btn" onclick="deletePhoto(${p.id}, ${albumId})" title="Delete image">
                    <i data-lucide="trash-2"></i>
                </button>
            </div>
        </div>
    `).join('');

    if (window.lucide) {
        lucide.createIcons({
            attrs: { 'stroke-width': 2.5, 'class': 'lucide' }
        });
    }
}

async function handleAlbumMultiUpload(files) {
    if (!files || !files.length) return;

    const modal = document.getElementById('modal-album-photos');
    const albumId = modal.dataset.albumId;
    if (!albumId) return;

    const container = document.getElementById('upload-progress-container');
    const bar = document.getElementById('upload-progress-bar');
    const text = document.getElementById('upload-status-text');
    const percentText = document.getElementById('upload-percent-text');

    container.style.display = 'block';
    container.style.animation = 'fadeIn 0.3s ease';

    const total = files.length;
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < total; i++) {
        const file = files[i];

        // Skip if file is too large (10MB)
        if (file.size > 10 * 1024 * 1024) {
            failCount++;
            continue;
        }

        const percent = Math.round(((i) / total) * 100);

        text.textContent = `Uploading ${i + 1} of ${total}: ${file.name.substring(0, 20)}${file.name.length > 20 ? '...' : ''}`;
        percentText.textContent = `${percent}%`;
        bar.style.width = `${percent}%`;

        // 1. Upload file
        const uploadRes = await uploadFile(file, 'image', true, 'gallery');
        if (uploadRes.success) {
            // 2. Add to album
            const addRes = await apiPost(`gallery.php?action=add_photo`, {
                album_id: albumId,
                image_path: uploadRes.file_path
            });
            if (addRes.success) {
                successCount++;
                // Refresh grid incrementally for better UX
                if (total > 5 && (i % 3 === 0)) refreshAlbumPhotos(albumId);
            } else {
                failCount++;
            }
        } else {
            failCount++;
        }
    }

    // Reset file input so user can pick same files again
    const fileInput = document.getElementById('file-album-multi');
    if (fileInput) fileInput.value = '';

    bar.style.width = '100%';
    percentText.textContent = '100%';

    if (successCount === total) {
        text.textContent = `Success! All ${total} photos uploaded ✓`;
        text.style.color = 'var(--admin-success)';
    } else {
        text.textContent = `Completed: ${successCount} success, ${failCount} failed`;
        text.style.color = failCount === total ? 'var(--admin-danger)' : 'var(--admin-accent)';
    }

    await refreshAlbumPhotos(albumId);
    loadPageData('gallery'); // Refresh main table

    setTimeout(() => {
        container.style.display = 'none';
        bar.style.width = '0%';
        text.style.color = '';
    }, 6000);
}

async function deletePhoto(photoId, albumId) {
    const confirmed = await showConfirmDialog('Delete Photo', 'Are you sure you want to permanently delete this photo?');
    if (!confirmed) return;

    const result = await apiPost(`gallery.php?action=delete_photo`, { id: photoId });
    if (result.success) {
        showToast('Photo removed successfully');
        refreshAlbumPhotos(albumId);
        loadPageData('gallery');
    } else {
        showToast(result.error || 'Failed to delete photo', 'error');
    }
}


// ===================================================================
// ===== EDUBOT KNOWLEDGE BASE =======================================
// ===================================================================

async function loadEdubotTable() {
    const tbody = document.getElementById('edubot-tbody');
    if (!tbody) return;

    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--admin-muted);">Loading knowledge base...</td></tr>';

    const result = await apiGet('chatbot-knowledge.php?action=list');
    const data = result.data || [];

    // Update stats
    const total = data.length;
    const active = data.filter(r => r.status === 'active').length;
    const words = data.reduce((sum, r) => sum + (parseInt(r.word_count) || 0), 0);

    const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val.toLocaleString(); };
    setEl('kb-stat-total', total);
    setEl('kb-stat-active', active);
    setEl('kb-stat-words', words);

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:3rem;color:var(--admin-muted);">
            <div style="font-size:2.5rem;margin-bottom:0.75rem;">🧠</div>
            <strong>No knowledge entries yet.</strong><br>
            <small>Click <strong>Add Knowledge</strong> to start training EduBot.</small>
        </td></tr>`;
        return;
    }

    const typeIcon = { text: '✏️', url: '🌐', file: '📄' };
    const typeBadge = t => `<span style="background:rgba(99,102,241,0.1);color:#6366f1;padding:2px 8px;border-radius:20px;font-size:0.75rem;font-weight:600;">${typeIcon[t] || '📝'} ${t}</span>`;

    tbody.innerHTML = data.map(row => {
        const date = new Date(row.created_at).toLocaleDateString('en-PG', { day: 'numeric', month: 'short', year: '2-digit' });
        const srcRef = row.source_ref
            ? `<a href="${row.source_ref}" target="_blank" class="table-link" title="${row.source_ref}" style="max-width:180px;display:inline-block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${row.source_ref.replace(/^https?:\/\//, '').substring(0, 35)}…</a>`
            : '<span style="color:var(--admin-muted);">—</span>';
        const isActive = row.status === 'active';
        const statusBadge = isActive
            ? '<span class="status status-published">Active</span>'
            : '<span class="status status-draft">Inactive</span>';

        return `<tr data-id="${row.id}">
            <td style="font-weight:600;max-width:200px;">${row.title}</td>
            <td>${typeBadge(row.source_type)}</td>
            <td>${srcRef}</td>
            <td style="color:var(--admin-muted);font-size:0.85rem;">${(parseInt(row.word_count) || 0).toLocaleString()}</td>
            <td>${statusBadge}</td>
            <td style="color:var(--admin-muted);font-size:0.85rem;white-space:nowrap;">${date}</td>
            <td>
                <div style="display:flex;gap:0.4rem;flex-wrap:nowrap;">
                    <button class="btn btn-sm btn-outline" onclick="editEdubotEntry(${row.id})" title="Edit">
                        <i data-lucide="pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline" onclick="toggleEdubotEntry(${row.id})" title="${isActive ? 'Deactivate' : 'Activate'}" style="color:${isActive ? '#f59e0b' : '#10b981'};">
                        <i data-lucide="${isActive ? 'pause-circle' : 'play-circle'}"></i>
                    </button>
                    <button class="btn btn-sm btn-outline" onclick="deleteEdubotEntry(${row.id}, '${row.title.replace(/'/g, "\\'")}')" title="Delete" style="color:var(--admin-danger);">
                        <i data-lucide="trash-2"></i>
                    </button>
                </div>
            </td>
        </tr>`;
    }).join('');

    if (window.lucide) setTimeout(() => lucide.createIcons(), 10);
}

function openAddEdubotModal() {
    document.getElementById('kb-id').value = '';
    document.getElementById('kb-title').value = '';
    document.getElementById('kb-content').value = '';
    document.getElementById('kb-url').value = '';
    document.getElementById('kb-source-type').value = 'text';
    document.getElementById('kb-status').value = 'active';
    document.getElementById('edubot-modal-title').textContent = '🧠 Add Knowledge Entry';
    handleKbSourceTypeChange('text');
    updateKbWordCount();
    openModal('modal-edubot');
}

async function editEdubotEntry(id) {
    const result = await apiGet(`chatbot-knowledge.php?action=get&id=${id}`);
    if (result.error) { showToast(result.error, 'error'); return; }

    document.getElementById('kb-id').value = result.id;
    document.getElementById('kb-title').value = result.title;
    document.getElementById('kb-content').value = result.content;
    document.getElementById('kb-url').value = result.source_ref || '';
    document.getElementById('kb-source-type').value = result.source_type || 'text';
    document.getElementById('kb-status').value = result.status;
    document.getElementById('edubot-modal-title').textContent = '✏️ Edit Knowledge Entry';
    handleKbSourceTypeChange(result.source_type || 'text');
    updateKbWordCount();
    openModal('modal-edubot');
}

async function saveEdubotEntry() {
    const id = document.getElementById('kb-id').value;
    const title = document.getElementById('kb-title').value.trim();
    const content = document.getElementById('kb-content').value.trim();
    const srcType = document.getElementById('kb-source-type').value;
    const srcRef = document.getElementById('kb-url').value.trim();
    const status = document.getElementById('kb-status').value;

    if (!title) { showToast('Title is required', 'error'); return; }

    const btn = document.getElementById('btn-save-kb');
    btn.disabled = true;
    btn.innerHTML = '<i class="loading-dot"></i> Saving...';

    const action = id ? 'update' : 'create';
    const payload = { id, title, source_type: srcType, source_ref: srcRef, content, status };
    const result = await apiPost(`chatbot-knowledge.php?action=${action}`, payload);

    btn.disabled = false;
    btn.innerHTML = '<i data-lucide="save"></i> Save Entry';
    if (window.lucide) lucide.createIcons();

    if (result.success || result.id) {
        showToast(id ? 'Knowledge entry updated!' : 'Knowledge entry added — EduBot is smarter now! 🧠', 'success');
        closeModal('modal-edubot');
        loadEdubotTable();
    } else {
        showToast(result.error || 'Save failed', 'error');
    }
}

async function toggleEdubotEntry(id) {
    const result = await apiGet(`chatbot-knowledge.php?action=toggle&id=${id}`);
    if (result.success) {
        showToast('Status updated', 'success');
        loadEdubotTable();
    } else {
        showToast(result.error || 'Failed', 'error');
    }
}

async function deleteEdubotEntry(id, title) {
    const confirmed = await showConfirmDialog('Delete Knowledge Entry', `Are you sure you want to delete "${title}"? EduBot will no longer use this knowledge.`);
    if (!confirmed) return;
    const result = await apiGet(`chatbot-knowledge.php?action=delete&id=${id}`);
    if (result.success) {
        showToast('Entry deleted', 'success');
        loadEdubotTable();
    } else {
        showToast(result.error || 'Delete failed', 'error');
    }
}

// URL scraping
async function scrapeKbUrl() {
    const url = document.getElementById('kb-url').value.trim();
    if (!url) { showToast('Enter a URL first', 'error'); return; }

    const btn = document.getElementById('btn-scrape');
    btn.disabled = true;
    btn.innerHTML = '<i class="loading-dot"></i> Fetching...';

    const result = await apiPost('chatbot-knowledge.php?action=scrape', { url });

    btn.disabled = false;
    btn.innerHTML = '<i data-lucide="download-cloud"></i> Fetch';
    if (window.lucide) lucide.createIcons();

    if (result.content) {
        document.getElementById('kb-content').value = result.content;
        updateKbWordCount();
        showToast(`Fetched ${result.length.toLocaleString()} characters from URL`, 'success');
        // Auto-set title from URL hostname if blank
        const titleEl = document.getElementById('kb-title');
        if (!titleEl.value) {
            try { titleEl.value = 'Content from ' + new URL(url).hostname; } catch (e) { }
        }
    } else {
        showToast(result.error || 'Could not scrape URL', 'error');
    }
}

// File text extraction (client-side for TXT/CSV; server fallback for PDF)
async function extractKbFile(input) {
    const file = input.files[0];
    const status = document.getElementById('kb-file-status');
    if (!file) return;

    const ext = file.name.split('.').pop().toLowerCase();
    status.textContent = `📂 Processing ${file.name}…`;

    if (ext === 'txt') {
        const text = await file.text();
        document.getElementById('kb-content').value = text.substring(0, 20000);
        updateKbWordCount();
        status.textContent = `✅ ${file.name} loaded (${text.length.toLocaleString()} characters)`;
        if (!document.getElementById('kb-title').value) {
            document.getElementById('kb-title').value = file.name.replace(/\.[^.]+$/, '');
        }
    } else if (ext === 'csv') {
        const text = await file.text();
        // Convert CSV rows to readable lines
        const lines = text.split('\n').slice(0, 500);
        const pretty = lines.map(l => l.replace(/,/g, ' | ')).join('\n');
        document.getElementById('kb-content').value = pretty.substring(0, 20000);
        updateKbWordCount();
        status.textContent = `✅ ${file.name} loaded (${lines.length} rows)`;
        if (!document.getElementById('kb-title').value) {
            document.getElementById('kb-title').value = file.name.replace(/\.[^.]+$/, '');
        }
    } else if (ext === 'pdf') {
        status.textContent = '⏳ Uploading and extracting PDF text…';

        try {
            // Send the PDF to our server-side extractor
            const formData = new FormData();
            formData.append('file', file);

            const r = await fetch(`${API_BASE}/pdf-extract.php`, {
                method: 'POST',
                body: formData,
                credentials: 'same-origin'
            });
            const res = await r.json();

            if (res.success && res.text) {
                // Populate the content box with extracted text
                document.getElementById('kb-content').value = res.text;
                updateKbWordCount();
                status.textContent = `✅ Extracted ${res.words.toLocaleString()} words from PDF! Now uploading file…`;

                // Auto-set title from filename if blank
                if (!document.getElementById('kb-title').value) {
                    document.getElementById('kb-title').value = file.name.replace('.pdf', '');
                }

                // Also save the file path for reference
                const uploadForm = new FormData();
                uploadForm.append('file', file);
                uploadForm.append('type', 'knowledge');
                const up = await fetch(`${API_BASE}/upload.php`, { method: 'POST', body: uploadForm, credentials: 'same-origin' });
                const upRes = await up.json();
                if (upRes.path) document.getElementById('kb-url').value = upRes.path;

                status.textContent = `✅ PDF processed! ${res.words.toLocaleString()} words extracted. 🧠`;
            } else {
                // Server gave a clear error (e.g. scanned image PDF)
                status.innerHTML = `⚠️ ${res.error || 'Could not extract text.'} Please <strong>paste</strong> the text manually below.`;
            }

        } catch (e) {
            console.error('PDF extract error:', e);
            status.innerHTML = `⚠️ Network error reading PDF. Please <strong>paste</strong> the text manually below.`;
        }

    } else {
        status.textContent = '⚠️ Format not supported for auto-extraction. Paste content manually.';
    }
}

function handleKbSourceTypeChange(type) {
    document.getElementById('kb-url-panel').style.display = type === 'url' ? 'block' : 'none';
    document.getElementById('kb-file-panel').style.display = type === 'file' ? 'block' : 'none';
}

function updateKbWordCount() {
    const text = document.getElementById('kb-content').value;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const el = document.getElementById('kb-word-counter');
    if (el) el.textContent = words.toLocaleString() + ' words';
}


/**
 * Category handling for Public Forms
 */
function handleCategoryChange(page, value) {
    const wrap = document.getElementById(`${page}-new-category-wrap`);
    const input = document.getElementById(`${page}-new-category-input`);
    if (value === '__NEW__') {
        if (wrap) wrap.style.display = 'block';
        if (input) input.focus();
    } else {
        if (wrap) wrap.style.display = 'none';
    }
}

async function loadFormCategories(selectedVal = '') {
    const select = document.getElementById('forms-category-select');
    const wrap = document.getElementById('forms-new-category-wrap');
    const input = document.getElementById('forms-new-category-input');

    if (!select) return;

    // Reset UI
    if (wrap) wrap.style.display = 'none';
    if (input) input.value = '';

    const res = await apiGet('forms.php?action=categories');
    if (res && res.data) {
        // Keep the first "Select" and last "Add New"
        const firstOpt = select.options[0];
        const lastOpt = select.options[select.options.length - 1];

        select.innerHTML = '';
        select.appendChild(firstOpt);

        res.data.forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat;
            opt.textContent = cat;
            select.appendChild(opt);
        });

        select.appendChild(lastOpt);

        if (selectedVal) {
            select.value = selectedVal;
            // If it wasn't in the list (rare but possible), show as NEW?
            if (select.selectedIndex === -1) {
                select.value = '__NEW__';
                handleCategoryChange('forms', '__NEW__');
                if (input) input.value = selectedVal;
            }
        } else {
            select.selectedIndex = 0;
        }

        // REFRESH CUSTOM SELECT UI
        refreshCustomSelect(select);
    }
}

// =============================================
// ===== CURRICULUM MATERIALS MODULE =====
// =============================================

let currentCurriculumTab = 'elementary';

// Register curriculum in page title map
if (typeof getPageTitle === 'function') {
    const _orig = getPageTitle;
    window.getPageTitle = function (page) {
        if (page === 'curriculum') return 'Curriculum Materials';
        return _orig(page);
    };
}

// Hook into loadPageData
const _origLoadPage = loadPageData;
window.loadPageData = async function (page) {
    if (page === 'curriculum') {
        loadCurriculumTable(currentCurriculumTab);
        return;
    }
    if (page === 'users') {
        loadUsersTable();
        return;
    }
    return _origLoadPage(page);
};

function switchCurriculumTab(level) {
    currentCurriculumTab = level;
    ['elementary', 'primary', 'secondary'].forEach(l => {
        const btn = document.getElementById(`ctab-${l}`);
        if (!btn) return;
        btn.className = l === level ? 'btn btn-primary' : 'btn btn-outline';
        btn.style.borderRadius = '8px 8px 0 0';
        btn.style.fontSize = '0.85rem';
    });
    loadCurriculumTable(level);
}

async function loadCurriculumTable(level) {
    const tbody = document.getElementById('curriculum-tbody');
    if (!tbody) return;
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:3rem;color:var(--admin-muted);">Loading ${level} curriculum...</td></tr>`;

    const result = await apiGet(`curriculum.php?action=list&level=${level}`);
    if (!result.data || result.data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:3rem;color:var(--admin-muted);">
            <div style="font-size:2rem;margin-bottom:0.5rem;">📂</div>
            No ${level} curriculum entries yet. Click <strong>Add Entry</strong> to upload PDFs.
        </td></tr>`;
        return;
    }

    tbody.innerHTML = result.data.map(row => {
        const syllabusLink = row.syllabus_url
            ? `<a href="../${row.syllabus_url}" target="_blank" class="btn btn-sm btn-outline" style="font-size:0.78rem;"><i data-lucide="file-text"></i> View PDF</a>`
            : `<span style="color:var(--admin-muted);font-size:0.8rem;">—</span>`;
        const guideLink = row.teachers_guide_url
            ? `<a href="../${row.teachers_guide_url}" target="_blank" class="btn btn-sm btn-outline" style="font-size:0.78rem;"><i data-lucide="file-text"></i> View PDF</a>`
            : `<span style="color:var(--admin-muted);font-size:0.8rem;">—</span>`;
        const updated = row.updated_at
            ? new Date(row.updated_at).toLocaleDateString('en-PG', { day: 'numeric', month: 'short', year: 'numeric' })
            : '—';
        return `
        <tr data-id="${row.id}">
            <td style="font-weight:600;">${row.grade}</td>
            <td>${row.subject}</td>
            <td>${syllabusLink}</td>
            <td>${guideLink}</td>
            <td style="font-size:0.82rem;color:var(--admin-muted);">${row.uploaded_by || '—'}</td>
            <td style="font-size:0.82rem;color:var(--admin-muted);">${updated}</td>
            <td class="actions">
                <div class="actions-wrapper">
                    <button class="btn btn-sm btn-outline" onclick="editCurriculumEntry(${row.id})"><i data-lucide="edit-3"></i> Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteCurriculumEntry(${row.id})"><i data-lucide="trash-2"></i></button>
                </div>
            </td>
        </tr>`;
    }).join('');

    if (window.lucide) lucide.createIcons({ attrs: { 'stroke-width': 2, 'class': 'lucide' } });
}

function openCurriculumModal(data = null) {
    const isEdit = !!data;
    document.getElementById('curriculum-modal-title').innerHTML = isEdit
        ? '<i data-lucide="edit-3"></i> Edit Curriculum Entry'
        : '<i data-lucide="library"></i> Add Curriculum Entry';
    document.getElementById('curriculum-id').value = isEdit ? data.id : '';
    document.getElementById('curriculum-level').value = isEdit ? data.level : currentCurriculumTab;
    document.getElementById('curriculum-grade').value = isEdit ? data.grade : '';
    document.getElementById('curriculum-subject').value = isEdit ? data.subject : '';
    document.getElementById('curriculum-syllabus_url').value = isEdit ? (data.syllabus_url || '') : '';
    document.getElementById('curriculum-teachers_guide_url').value = isEdit ? (data.teachers_guide_url || '') : '';

    // Show existing PDF previews
    ['syllabus', 'guide'].forEach(type => {
        const key = type === 'syllabus' ? 'syllabus_url' : 'teachers_guide_url';
        const preview = document.getElementById(`preview-curriculum-${type}`);
        if (preview) {
            const val = isEdit ? (data[key] || '') : '';
            if (val) {
                const fname = val.split('/').pop();
                preview.innerHTML = `<div class="upload-preview-box" style="margin-top:0.5rem;padding:0.5rem 0.75rem;background:rgba(59,165,224,0.07);border-radius:6px;font-size:0.82rem;"><i data-lucide="file-text"></i> ${fname} <a href="../${val}" target="_blank" style="margin-left:0.5rem;color:var(--admin-primary);">View</a></div>`;
            } else {
                preview.innerHTML = '';
            }
        }
    });

    openModal('modal-curriculum');
    if (window.lucide) lucide.createIcons();
}

async function editCurriculumEntry(id) {
    const result = await apiGet(`curriculum.php?action=list`);
    if (!result.data) return;
    const item = result.data.find(r => r.id == id);
    if (item) openCurriculumModal(item);
}

async function deleteCurriculumEntry(id) {
    const confirmed = await showConfirmDialog('Delete Entry', 'Permanently delete this curriculum entry? Any uploaded PDFs on the server will remain but will no longer be linked.');
    if (!confirmed) return;
    const result = await apiPost('curriculum.php?action=delete', { id });
    if (result.success) {
        showToast('Entry deleted ✓');
        loadCurriculumTable(currentCurriculumTab);
    } else {
        showToast(result.error || 'Delete failed', 'error');
    }
}

async function handleCurriculumUpload(file, field) {
    if (!file) return;
    const previewId = field === 'syllabus_url' ? 'preview-curriculum-syllabus' : 'preview-curriculum-guide';
    const inputId = `curriculum-${field}`;
    const preview = document.getElementById(previewId);
    if (preview) preview.innerHTML = `<div style="padding:0.5rem;color:var(--admin-muted);font-size:0.82rem;"><span style="display:inline-block;width:14px;height:14px;border:2px solid var(--admin-primary);border-top-color:transparent;border-radius:50%;animation:spin 0.8s linear infinite;"></span> Uploading…</div>`;

    const result = await uploadFile(file, 'document');
    if (result.success) {
        document.getElementById(inputId).value = result.file_path;
        const fname = result.file_name || result.file_path.split('/').pop();
        if (preview) preview.innerHTML = `<div style="margin-top:0.5rem;padding:0.5rem 0.75rem;background:rgba(59,165,224,0.07);border-radius:6px;font-size:0.82rem;color:var(--admin-muted);">✓ <strong>${fname}</strong></div>`;
        showToast('PDF uploaded ✓');
    } else {
        if (preview) preview.innerHTML = `<p style="color:var(--admin-danger);font-size:0.8rem;">Upload failed</p>`;
        showToast(result.error || 'Upload failed', 'error');
    }
}

async function saveCurriculumEntry() {
    const id = document.getElementById('curriculum-id').value;
    const data = {
        level: document.getElementById('curriculum-level').value,
        grade: document.getElementById('curriculum-grade').value.trim(),
        subject: document.getElementById('curriculum-subject').value.trim(),
        syllabus_url: document.getElementById('curriculum-syllabus_url').value,
        teachers_guide_url: document.getElementById('curriculum-teachers_guide_url').value
    };

    if (!data.level || !data.grade || !data.subject) {
        showToast('Level, Grade, and Subject are required', 'error');
        return;
    }

    const action = id ? 'update' : 'create';
    if (id) data.id = id;

    const result = await apiPost(`curriculum.php?action=${action}`, data);
    if (result.success) {
        showToast(id ? 'Entry updated ✓' : 'Entry created ✓');
        closeModal('modal-curriculum');
        loadCurriculumTable(data.level);
    } else {
        showToast(result.error || 'Save failed', 'error');
    }
}

// =============================================
// ===== USERS MODULE (with Designation/Role) =====
// =============================================

async function loadUsersTable() {
    const tbody = document.getElementById('users-tbody');
    if (!tbody) return;
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:2rem;"><span style="display:inline-block;width:20px;height:20px;border:2px solid var(--admin-primary);border-top-color:transparent;border-radius:50%;animation:spin 0.8s linear infinite;"></span> Loading...</td></tr>`;

    const result = await apiGet('users.php?action=list');
    if (!result.data || result.data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:3rem;color:var(--admin-muted);">No admin users found.</td></tr>`;
        return;
    }

    const roleBadge = (role) => {
        const map = {
            super_admin: { label: 'Super Admin', color: '#ef4444' },
            curriculum_admin: { label: 'Curriculum Admin', color: '#3b82f6' },
            editor: { label: 'Editor', color: '#6b7280' }
        };
        const r = map[role] || { label: role, color: '#6b7280' };
        return `<span style="display:inline-block;padding:0.2rem 0.6rem;border-radius:20px;font-size:0.75rem;font-weight:600;background:${r.color}22;color:${r.color};border:1px solid ${r.color}44;">${r.label}</span>`;
    };

    tbody.innerHTML = result.data.map(user => {
        const lastLogin = user.last_login
            ? new Date(user.last_login).toLocaleDateString('en-PG', { day: 'numeric', month: 'short', year: 'numeric' })
            : 'Never';
        return `
        <tr>
            <td style="font-weight:600;">${user.username}</td>
            <td>${user.full_name || '—'}</td>
            <td style="font-size:0.82rem;color:var(--admin-muted);">${user.designation || '—'}</td>
            <td>${roleBadge(user.role)}</td>
            <td style="font-size:0.82rem;">${user.email || '—'}</td>
            <td style="font-size:0.82rem;color:var(--admin-muted);">${lastLogin}</td>
            <td class="actions">
                <div class="actions-wrapper">
                    <button class="btn btn-sm btn-outline" onclick="editUser(${user.id})"><i data-lucide="edit-3"></i> Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})"><i data-lucide="trash-2"></i></button>
                </div>
            </td>
        </tr>`;
    }).join('');

    if (window.lucide) lucide.createIcons({ attrs: { 'stroke-width': 2, 'class': 'lucide' } });
}

function openUserModal(data = null) {
    const isEdit = !!data;
    const title = document.getElementById('users-modal-title');
    if (title) title.innerHTML = isEdit ? '<i data-lucide="user-check"></i> Edit Admin User' : '<i data-lucide="user-plus"></i> Add Admin User';
    document.getElementById('user-id').value = isEdit ? data.id : '';
    document.getElementById('user-username').value = isEdit ? data.username : '';
    document.getElementById('user-password').value = '';
    document.getElementById('user-fullname').value = isEdit ? (data.full_name || '') : '';
    document.getElementById('user-designation').value = isEdit ? (data.designation || '') : '';
    document.getElementById('user-email').value = isEdit ? (data.email || '') : '';
    const roleSelect = document.getElementById('user-role');
    const roleVal = isEdit ? (data.role || '') : '';
    roleSelect.value = roleVal;
    toggleDesignationHint(roleVal);
    // Refresh the custom-select UI to reflect the new value
    const roleContainer = roleSelect.closest('.custom-select-container');
    if (roleContainer) {
        const trigger = roleContainer.querySelector('.custom-select-trigger');
        if (trigger) {
            const selOpt = roleSelect.options[roleSelect.selectedIndex];
            const isBlank = !selOpt || selOpt.disabled || selOpt.value === '';
            trigger.textContent = selOpt ? selOpt.textContent : '— Select a role —';
            trigger.style.color = isBlank ? 'var(--admin-muted, #9ca3af)' : '';
            roleContainer.querySelectorAll('.custom-option').forEach(o => {
                o.classList.toggle('selected', o.textContent === (selOpt ? selOpt.textContent : ''));
            });
        }
    }
    toggleDesignationHint(document.getElementById('user-role').value);
    const pwHint = document.getElementById('user-pw-hint');
    if (pwHint) pwHint.textContent = isEdit ? '(leave blank to keep current)' : '(required for new users)';
    openModal('modal-users');
    if (window.lucide) lucide.createIcons();
}

function toggleDesignationHint(role) {
    const hint = document.getElementById('designation-hint');
    if (!hint) return;
    if (!role) {
        hint.style.display = 'none';
        return;
    }
    const messages = {
        super_admin: '<strong style="color:var(--admin-text);">Super Admin</strong> has unrestricted access to all modules including user management, settings, and logs.',
        curriculum_admin: '<strong style="color:var(--admin-text);">Curriculum Admin</strong> can only access Curriculum Materials and Textbooks. All their actions are recorded in Activity Logs.',
        editor: '<strong style="color:var(--admin-text);">Editor</strong> can manage general content (news, events, publications) but cannot access system settings, users, or curriculum PDFs.'
    };
    hint.querySelector('div').innerHTML = messages[role] || '';
    hint.style.display = messages[role] ? 'block' : 'none';
}

async function editUser(id) {
    const result = await apiGet(`users.php?action=get&id=${id}`);
    if (result.error) { showToast(result.error, 'error'); return; }
    openUserModal(result);
}

async function deleteUser(id) {
    const confirmed = await showConfirmDialog('Delete User', 'Are you sure you want to permanently delete this admin account?');
    if (!confirmed) return;
    const result = await apiPost('users.php?action=delete', { id });
    if (result.success) {
        showToast('User deleted ✓');
        loadUsersTable();
    } else {
        showToast(result.error || 'Delete failed', 'error');
    }
}

async function saveUserRecord() {
    const id = document.getElementById('user-id').value;
    const data = {
        username: document.getElementById('user-username').value.trim(),
        full_name: document.getElementById('user-fullname').value.trim(),
        designation: document.getElementById('user-designation').value.trim(),
        email: document.getElementById('user-email').value.trim(),
        role: document.getElementById('user-role').value,
        password: document.getElementById('user-password').value
    };

    if (!data.username || !data.full_name || !data.email || !data.role) {
        showToast('Username, Full Name, Email, and Role are required', 'error');
        return;
    }
    if (!id && !data.password) {
        showToast('Password is required for new users', 'error');
        return;
    }

    const action = id ? 'update' : 'create';
    if (id) data.id = id;

    const result = await apiPost(`users.php?action=${action}`, data);
    if (result.success) {
        showToast(id ? 'User updated ✓' : 'User created ✓');
        closeModal('modal-users');
        loadUsersTable();
    } else {
        showToast(result.error || 'Save failed', 'error');
    }
}

// Wire up "Add User" button
const _addUsersBtn = document.querySelector('[onclick="openAddModal(\'users\')"]');
if (_addUsersBtn) {
    _addUsersBtn.setAttribute('onclick', 'openUserModal()');
}

// GTFS Extra Fields Toggle
function toggleGtfsFields(category) {
    const extraFields = document.querySelectorAll('.gtfs-extra-field');
    const isSchoolGrant = (category === 'School Grant');
    extraFields.forEach(field => {
        field.style.display = isSchoolGrant ? 'block' : 'none';
        const selects = field.querySelectorAll('select');
        if (!isSchoolGrant) selects.forEach(s => s.value = '');
    });
}

// ===== NOTICE CARD TYPES =====
function handleNoticeTypeChange(value) {
    const wrap = document.getElementById('notices-new-type-wrap');
    const input = document.getElementById('notices-new-type-input');
    if (value === '__NEW__') {
        if (wrap) wrap.style.display = 'block';
        if (input) input.focus();
    } else {
        if (wrap) wrap.style.display = 'none';
    }
}

async function loadNoticeCardTypes(selectedValue = '') {
    const select = document.getElementById('notices-card-type-select');
    const wrap = document.getElementById('notices-new-type-wrap');
    const input = document.getElementById('notices-new-type-input');
    if (!select) return;

    if (wrap) wrap.style.display = 'none';
    if (input) input.value = '';

    const result = await apiGet('notices.php?action=list');
    const defaultTypes = ['dates', 'plan', 'quick_links'];
    let types = [...defaultTypes];

    if (result && result.data) {
        result.data.forEach(item => {
            if (item.card_type && !types.includes(item.card_type)) {
                types.push(item.card_type);
            }
        });
    }

    // Clear old options and rebuild
    select.innerHTML = '';

    types.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t;
        let label = t;
        if (t === 'dates') label = 'Term Dates';
        else if (t === 'plan') label = 'Education Plan';
        else if (t === 'quick_links') label = 'Quick Links';
        else label = t.charAt(0).toUpperCase() + t.slice(1).replace(/_/g, ' ');
        opt.textContent = label;
        select.appendChild(opt);
    });

    // Add "+ Add New Type..." option
    const newOpt = document.createElement('option');
    newOpt.value = '__NEW__';
    newOpt.textContent = '+ Add New Type...';
    select.appendChild(newOpt);

    if (selectedValue) {
        select.value = selectedValue;
        if (select.selectedIndex === -1) {
            // If it's not in the dropdown list, add it dynamically
            const customOpt = document.createElement('option');
            customOpt.value = selectedValue;
            customOpt.textContent = selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1).replace(/_/g, ' ');
            // Insert before "__NEW__"
            select.insertBefore(customOpt, newOpt);
            select.value = selectedValue;
        }
    }

    // Refresh custom select representation
    const parentContainer = select.closest('.custom-select-container');
    if (parentContainer) {
        refreshCustomSelect(select);
    }
}

// =============================================
