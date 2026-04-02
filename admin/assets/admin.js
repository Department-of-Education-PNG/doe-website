/**
 * Admin Panel JavaScript
 * Handles navigation, CRUD operations, file uploads, and UI interactions
 */

const API_BASE = '../api';

// ===== NAVIGATION =====
function navigateTo(page) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    const section = document.getElementById('page-' + page);
    const navItem = document.querySelector(`[data-page="${page}"]`);

    if (section) {
        section.classList.add('active');
        loadPageData(page);
    }
    if (navItem) navItem.classList.add('active');

    document.getElementById('page-title').textContent = getPageTitle(page);

    // Close mobile sidebar
    document.querySelector('.sidebar')?.classList.remove('open');
}

function getPageTitle(page) {
    const titles = {
        'dashboard': 'Dashboard',
        'news': 'News & Articles',
        'press': 'Press Releases',
        'events': 'Events Calendar',
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
        'settings': 'Site Settings'
    };
    return titles[page] || page;
}

// ===== API HELPERS =====
async function apiGet(endpoint) {
    try {
        const r = await fetch(`${API_BASE}/${endpoint}`);
        return await r.json();
    } catch (e) {
        showToast('Connection error', 'error');
        return { data: [] };
    }
}

async function apiPost(endpoint, data) {
    try {
        const r = await fetch(`${API_BASE}/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return await r.json();
    } catch (e) {
        showToast('Connection error', 'error');
        return { error: 'Connection failed' };
    }
}

async function uploadFile(file, type = 'image') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    try {
        const r = await fetch(`${API_BASE}/upload.php`, { method: 'POST', body: formData });
        return await r.json();
    } catch (e) {
        showToast('Upload failed', 'error');
        return { error: 'Upload failed' };
    }
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${type === 'success' ? '✅' : '❌'}</span> ${message}`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}

// ===== MODAL HELPERS =====
function openModal(id) {
    document.getElementById(id).classList.add('show');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('show');
}

// ===== LOAD PAGE DATA =====
async function loadPageData(page) {
    switch(page) {
        case 'dashboard': loadDashboard(); break;
        case 'news': loadCrudTable('news.php?action=list', 'news', ['title', 'date_published', 'status']); break;
        case 'press': loadCrudTable('press-releases.php?action=list', 'press', ['title', 'date_published', 'status']); break;
        case 'events': loadCrudTable('events.php?action=list', 'events', ['title', 'event_date', 'location', 'status']); break;
        case 'gallery': loadCrudTable('gallery.php?action=list', 'gallery', ['title', 'tag', 'photo_count']); break;
        case 'publications': loadCrudTable('publications.php?action=list', 'publications', ['title', 'category', 'year']); break;
        case 'textbooks': loadCrudTable('textbooks.php?action=list', 'textbooks', ['grade_level', 'subject']); break;
        case 'jobs': loadCrudTable('jobs.php?action=list', 'jobs', ['title', 'job_type', 'closing_date', 'status']); break;
        case 'scholarships': loadCrudTable('scholarships.php?action=list', 'scholarships', ['title', 'deadline', 'status']); break;
        case 'forms': loadCrudTable('forms.php?action=list', 'forms', ['title', 'category']); break;
        case 'ticker': loadCrudTable('ticker.php?action=list', 'ticker', ['label', 'text', 'is_active']); break;
        case 'notices': loadCrudTable('notices.php?action=list', 'notices', ['title', 'card_type', 'is_active']); break;
        case 'leaders': loadLeaders(); break;
        case 'apps': loadCrudTable('app-links.php?action=list', 'apps', ['title', 'url', 'is_active']); break;
        case 'contact': loadContact(); break;
        case 'settings': loadSettings(); break;
    }
}

// ===== DASHBOARD =====
async function loadDashboard() {
    const [news, press, events, contact, jobs, pubs] = await Promise.all([
        apiGet('news.php?action=list'),
        apiGet('press-releases.php?action=list'),
        apiGet('events.php?action=list'),
        apiGet('contact.php?action=list'),
        apiGet('jobs.php?action=list'),
        apiGet('publications.php?action=list')
    ]);

    document.getElementById('stat-news').textContent = news.data?.length || 0;
    document.getElementById('stat-press').textContent = press.data?.length || 0;
    document.getElementById('stat-events').textContent = events.data?.length || 0;
    document.getElementById('stat-contact').textContent = contact.unread_count || 0;
    document.getElementById('stat-jobs').textContent = jobs.data?.length || 0;
    document.getElementById('stat-pubs').textContent = pubs.data?.length || 0;
}

// ===== GENERIC CRUD TABLE LOADER =====
async function loadCrudTable(endpoint, page, columns) {
    const result = await apiGet(endpoint);
    const tbody = document.getElementById(`${page}-tbody`);
    if (!tbody) return;

    if (!result.data || result.data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="${columns.length + 1}" style="text-align:center;padding:2rem;color:var(--admin-muted);">No records found. Click "Add New" to create one.</td></tr>`;
        return;
    }

    tbody.innerHTML = result.data.map(row => `
        <tr>
            ${columns.map(col => {
                let val = row[col] ?? '-';
                if (col === 'status') val = `<span class="status status-${val}">${val}</span>`;
                if (col === 'is_active') val = val == 1 ? '<span class="status status-published">Active</span>' : '<span class="status status-draft">Inactive</span>';
                if (col === 'url') val = `<a href="${val}" target="_blank" style="color:var(--admin-primary);font-size:0.8rem;">${val.substring(0,40)}...</a>`;
                return `<td>${val}</td>`;
            }).join('')}
            <td class="actions">
                <button class="btn btn-sm btn-outline" onclick="editRecord('${page}', ${row.id})">✏️ Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteRecord('${page}', ${row.id})">🗑️</button>
            </td>
        </tr>
    `).join('');
}

// ===== DELETE RECORD =====
async function deleteRecord(page, id) {
    if (!confirm('Are you sure you want to delete this record?')) return;

    const endpoints = {
        'news': 'news.php', 'press': 'press-releases.php', 'events': 'events.php',
        'gallery': 'gallery.php', 'publications': 'publications.php', 'textbooks': 'textbooks.php',
        'jobs': 'jobs.php', 'scholarships': 'scholarships.php', 'forms': 'forms.php',
        'ticker': 'ticker.php', 'notices': 'notices.php', 'apps': 'app-links.php',
        'contact': 'contact.php'
    };

    const result = await apiPost(`${endpoints[page]}?action=delete`, { id });
    if (result.success) {
        showToast('Record deleted successfully');
        loadPageData(page);
    } else {
        showToast(result.error || 'Delete failed', 'error');
    }
}

// ===== EDIT RECORD =====
async function editRecord(page, id) {
    const endpoints = {
        'news': 'news.php', 'press': 'press-releases.php', 'events': 'events.php',
        'gallery': 'gallery.php', 'publications': 'publications.php', 'textbooks': 'textbooks.php',
        'jobs': 'jobs.php', 'scholarships': 'scholarships.php', 'forms': 'forms.php',
        'ticker': 'ticker.php', 'notices': 'notices.php', 'apps': 'app-links.php'
    };

    const result = await apiGet(`${endpoints[page]}?action=get&id=${id}`);
    if (result.error) { showToast(result.error, 'error'); return; }

    // Populate modal form
    const modal = document.getElementById(`modal-${page}`);
    if (!modal) return;

    const form = modal.querySelector('form');
    if (form) {
        form.dataset.editId = id;
        Object.keys(result).forEach(key => {
            const input = form.querySelector(`[name="${key}"]`);
            if (input) {
                if (input.type === 'checkbox') {
                    input.checked = result[key] == 1;
                } else {
                    input.value = result[key] || '';
                }
            }
        });

        // Update TinyMCE if present
        if (typeof tinymce !== 'undefined') {
            const editors = ['content', 'message_content', 'description'];
            editors.forEach(field => {
                const editor = tinymce.get(`${page}-${field}`);
                if (editor && result[field]) editor.setContent(result[field]);
            });
        }
    }

    modal.querySelector('.admin-modal-header h3').textContent = 'Edit Record';
    openModal(`modal-${page}`);
}

// ===== SAVE RECORD (Create or Update) =====
async function saveRecord(page, form) {
    const endpoints = {
        'news': 'news.php', 'press': 'press-releases.php', 'events': 'events.php',
        'gallery': 'gallery.php', 'publications': 'publications.php', 'textbooks': 'textbooks.php',
        'jobs': 'jobs.php', 'scholarships': 'scholarships.php', 'forms': 'forms.php',
        'ticker': 'ticker.php', 'notices': 'notices.php', 'apps': 'app-links.php',
        'leaders': 'leaders.php'
    };

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => { data[key] = value; });

    // Handle checkboxes (unchecked = not in FormData)
    form.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        data[cb.name] = cb.checked ? 1 : 0;
    });

    // Get TinyMCE content
    if (typeof tinymce !== 'undefined') {
        const editors = ['content', 'message_content', 'description'];
        editors.forEach(field => {
            const editor = tinymce.get(`${page}-${field}`);
            if (editor) data[field] = editor.getContent();
        });
    }

    const editId = form.dataset.editId;
    const action = editId ? 'update' : 'create';
    if (editId) data.id = editId;

    const result = await apiPost(`${endpoints[page]}?action=${action}`, data);

    if (result.success) {
        showToast(editId ? 'Updated successfully' : 'Created successfully');
        closeModal(`modal-${page}`);
        form.reset();
        delete form.dataset.editId;
        if (typeof tinymce !== 'undefined') tinymce.activeEditor?.setContent('');
        loadPageData(page);
    } else {
        showToast(result.error || 'Save failed', 'error');
    }
}

// ===== FILE UPLOAD HANDLING =====
function setupFileUpload(zoneId, inputId, previewId, hiddenInputId, type = 'image') {
    const zone = document.getElementById(zoneId);
    const input = document.getElementById(inputId);
    if (!zone || !input) return;

    zone.addEventListener('click', () => input.click());
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.style.borderColor = 'var(--admin-primary)'; });
    zone.addEventListener('dragleave', () => { zone.style.borderColor = ''; });
    zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.style.borderColor = '';
        if (e.dataTransfer.files.length) handleFileSelect(e.dataTransfer.files[0], previewId, hiddenInputId, type);
    });

    input.addEventListener('change', () => {
        if (input.files.length) handleFileSelect(input.files[0], previewId, hiddenInputId, type);
    });
}

async function handleFileSelect(file, previewId, hiddenInputId, type) {
    const result = await uploadFile(file, type);
    if (result.success) {
        const preview = document.getElementById(previewId);
        const hidden = document.getElementById(hiddenInputId);
        if (hidden) hidden.value = result.file_path;
        if (preview) {
            if (type === 'image') {
                preview.innerHTML = `<img src="../${result.file_path}" class="file-preview">`;
            } else {
                preview.innerHTML = `<p style="color:var(--admin-success);">✅ ${result.file_name} uploaded</p>`;
            }
        }
        showToast('File uploaded successfully');
    }
}

// ===== LEADERS - Special handling =====
async function loadLeaders() {
    const result = await apiGet('leaders.php?action=list');
    if (!result.data) return;

    result.data.forEach(leader => {
        const prefix = leader.role;
        const nameEl = document.getElementById(`leader-${prefix}-name`);
        const titleEl = document.getElementById(`leader-${prefix}-title`);
        if (nameEl) nameEl.value = leader.name || '';
        if (titleEl) titleEl.value = leader.position_title || '';

        // Set TinyMCE after a brief delay
        setTimeout(() => {
            const editor = tinymce.get(`leaders-message_content_${prefix}`);
            if (editor) editor.setContent(leader.message_content || '');
        }, 500);

        // Store ID for saving
        const form = document.getElementById(`form-leader-${prefix}`);
        if (form) form.dataset.editId = leader.id;
    });
}

async function saveLeader(role) {
    const form = document.getElementById(`form-leader-${role}`);
    const data = {
        id: form.dataset.editId,
        name: document.getElementById(`leader-${role}-name`).value,
        position_title: document.getElementById(`leader-${role}-title`).value,
        photo_path: document.getElementById(`leader-${role}-photo`).value || `assets/images/leaders/${role}.png`,
        message_content: tinymce.get(`leaders-message_content_${role}`)?.getContent() || '',
        border_color: role === 'minister' ? '#4a90e2' : '#f5a623'
    };

    const result = await apiPost('leaders.php?action=update', data);
    if (result.success) {
        showToast(`${role === 'minister' ? 'Minister' : 'Secretary'}'s message updated`);
    } else {
        showToast(result.error || 'Update failed', 'error');
    }
}

// ===== CONTACT =====
async function loadContact() {
    const result = await apiGet('contact.php?action=list');
    const tbody = document.getElementById('contact-tbody');
    if (!tbody || !result.data) return;

    if (result.data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--admin-muted);">No submissions yet.</td></tr>';
        return;
    }

    tbody.innerHTML = result.data.map(row => `
        <tr style="${row.is_read == 0 ? 'font-weight:600;background:#f0f7ff;' : ''}">
            <td>${row.name}</td>
            <td><a href="mailto:${row.email}" style="color:var(--admin-primary);">${row.email}</a></td>
            <td>${row.subject}</td>
            <td>${new Date(row.submitted_at).toLocaleDateString()}</td>
            <td class="actions">
                <button class="btn btn-sm btn-outline" onclick="viewSubmission(${row.id})">👁️ View</button>
                <button class="btn btn-sm btn-danger" onclick="deleteRecord('contact', ${row.id})">🗑️</button>
            </td>
        </tr>
    `).join('');
}

async function viewSubmission(id) {
    const result = await apiGet(`contact.php?action=get&id=${id}`);
    if (result.error) return;

    document.getElementById('view-contact-name').textContent = result.name;
    document.getElementById('view-contact-email').textContent = result.email;
    document.getElementById('view-contact-email').href = `mailto:${result.email}`;
    document.getElementById('view-contact-phone').textContent = result.phone || 'Not provided';
    document.getElementById('view-contact-subject').textContent = result.subject;
    document.getElementById('view-contact-message').textContent = result.message;
    document.getElementById('view-contact-date').textContent = new Date(result.submitted_at).toLocaleString();

    openModal('modal-view-contact');
    loadContact(); // Refresh to mark as read
}

// ===== SETTINGS =====
async function loadSettings() {
    const result = await apiGet('settings.php?action=list');
    if (!result.data) return;

    result.data.forEach(s => {
        const input = document.getElementById(`setting-${s.setting_key}`);
        if (input) input.value = s.setting_value || '';
    });
}

async function saveSettings() {
    const settings = {};
    document.querySelectorAll('[id^="setting-"]').forEach(input => {
        const key = input.id.replace('setting-', '');
        settings[key] = input.value;
    });

    const result = await apiPost('settings.php?action=update', { settings });
    if (result.success) {
        showToast('Settings saved successfully');
    } else {
        showToast(result.error || 'Save failed', 'error');
    }
}

// ===== PASSWORD CHANGE =====
async function changePassword() {
    const current = document.getElementById('current-password').value;
    const newPass = document.getElementById('new-password').value;
    const confirm = document.getElementById('confirm-password').value;

    if (newPass !== confirm) { showToast('Passwords do not match', 'error'); return; }
    if (newPass.length < 8) { showToast('Password must be at least 8 characters', 'error'); return; }

    const result = await apiPost('auth.php?action=change_password', {
        current_password: current,
        new_password: newPass
    });

    if (result.success) {
        showToast('Password changed successfully');
        closeModal('modal-password');
        document.getElementById('current-password').value = '';
        document.getElementById('new-password').value = '';
        document.getElementById('confirm-password').value = '';
    } else {
        showToast(result.error || 'Failed', 'error');
    }
}

// ===== LOGOUT =====
async function logout() {
    await apiPost('auth.php?action=logout', {});
    window.location.href = 'index.php';
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    navigateTo('dashboard');

    // Mobile sidebar toggle
    const toggleBtn = document.getElementById('sidebar-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            document.querySelector('.sidebar').classList.toggle('open');
        });
    }
});
