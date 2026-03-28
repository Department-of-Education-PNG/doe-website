// Internal Site Search Engine
window.SiteSearch = (() => {
    // Searchable content index — all pages, news, forms, publications, etc.
    const searchIndex = [
        // Pages
        { title: 'Home', description: 'Department of Education homepage with leadership messages, news, and quick links.', url: '#home', category: 'Page', icon: '🏠' },
        { title: 'About Us', description: 'Learn about the Department of Education, its mission, vision, organizational structure, and history.', url: '#about', category: 'Page', icon: '🏛️' },
        { title: 'Programs & Services', description: 'Activities, e-Participations, consultation papers, and public services offered by the Department.', url: '#programs', category: 'Page', icon: '📋' },
        { title: 'Publications', description: 'Official published documents, reports, education plans, and circulars from the Department.', url: '#publications', category: 'Page', icon: '📚' },
        { title: 'News & Events', description: 'Press releases, latest updates, and upcoming events from the Department of Education.', url: '#news', category: 'Page', icon: '📰' },
        { title: 'Careers', description: 'Job opportunities, scholarships, and career pathways in the Department of Education PNG.', url: '#careers', category: 'Page', icon: '💼' },
        { title: 'Contact Us', description: 'Get in touch with the Department of Education. Phone, email, and office address.', url: '#contact', category: 'Page', icon: '📞' },
        { title: 'Public Forms', description: 'Download official forms for school registration, teacher leave, student transfers, and more.', url: '#forms', category: 'Page', icon: '📝' },
        { title: 'App Gallery', description: 'Digital applications including Outlook Email, MyPaySlip, Grade 11 Selection, and Teacher Management.', url: '#app-gallery', category: 'Page', icon: '📱' },

        // News
        { title: 'NDoE Graduate Teacher Recruitment 2026', description: 'The Department of Education has officially opened applications for Graduate Teacher Recruitment for the 2026 academic year.', url: '#news', category: 'News', icon: '📰' },
        { title: 'Government Allocates K904.5 Million for Education', description: 'The Government of PNG has committed K904.5 million in the 2026 National Budget to support education across all levels.', url: '#news', category: 'News', icon: '📰' },
        { title: 'Strict 2026 Mandate: No Enrollment Fee', description: 'The Secretary for Education has issued a strict directive that no school shall charge enrollment fees under the GTFS policy.', url: '#news', category: 'News', icon: '📰' },
        { title: 'National Curriculum Reform: 21st Century Learning', description: 'Rolling out comprehensive curriculum reform to integrate digital literacy, critical thinking, and problem-solving.', url: '#news', category: 'News', icon: '📰' },

        // Publications & Documents
        { title: 'National Education Plan 2020-2029', description: 'The strategic education plan guiding the nation\'s education development for the decade.', url: '#publications', category: 'Publication', icon: '📄' },
        { title: 'Education Act 1983', description: 'The foundational legislative act governing the national education system of Papua New Guinea.', url: '#publications', category: 'Publication', icon: '📄' },
        { title: 'Teaching Service Act', description: 'The legislative framework governing the teaching service, employment conditions and professional standards.', url: '#publications', category: 'Publication', icon: '📄' },
        { title: 'Annual Report 2025', description: 'The Department of Education\'s annual report detailing achievements, challenges, and financial statements.', url: '#publications', category: 'Publication', icon: '📄' },
        { title: 'GFEP 2026 Manual', description: 'Government Free Education Policy operational manual for all schools and administrators.', url: '#publications', category: 'Publication', icon: '📄' },
        { title: 'Secretary\'s Circular', description: 'Official circular from the Secretary regarding 2026 term dates, examination schedules and school operations.', url: '#home', category: 'Publication', icon: '📄' },

        // Forms
        { title: 'School Registration Form', description: 'Official application form for new school registration and annual renewal.', url: '#forms', category: 'Form', icon: '📝' },
        { title: 'Teacher Leave Application', description: 'Submit requests for medical, recreational, or study leave via the Teaching Service Commission.', url: '#forms', category: 'Form', icon: '📝' },
        { title: 'Student Transfer Form', description: 'Required documentation for transferring students between provincial schools.', url: '#forms', category: 'Form', icon: '📝' },
        { title: 'Teacher Query (TQMS)', description: 'Query system for teacher payroll issues, appointment status and employment conditions.', url: '#forms', category: 'Form', icon: '📝' },

        // Apps & Portals
        { title: 'Outlook Email / Staff Webmail', description: 'Access the Department of Education staff webmail portal powered by Microsoft Outlook.', url: 'https://mail.education.gov.pg/owa/', category: 'App', icon: '📧' },
        { title: 'MyPaySlip — Teacher Payroll', description: 'Check your teacher pay slips and salary details through the online payroll system.', url: 'http://apps.education.gov.pg:8081/ords/f?p=144', category: 'App', icon: '💰' },
        { title: 'Grade 11 Selection Portal', description: 'Online portal for Grade 11 student selection and placement.', url: 'http://apps.education.gov.pg:8081/ords/f?p=103', category: 'App', icon: '🎓' },
        { title: 'Teacher Information Management', description: 'Manage teacher records, qualifications, and professional development information.', url: 'http://apps.education.gov.pg:8081/ords/f?p=125', category: 'App', icon: '👥' },

        // Leadership
        { title: 'Minister\'s Message — Hon. Lucas Dawa Dekena, MP', description: 'Welcome message from the Minister of Education outlining the vision for PNG education.', url: '#home', category: 'Leadership', icon: '👔' },
        { title: 'Secretary\'s Message — Dr. Uke Kombra, PhD, OBE', description: 'Welcome message from the Secretary for Education about the Department\'s new website and services.', url: '#home', category: 'Leadership', icon: '👔' },

        // Key Topics
        { title: 'Government Tuition Fee Free Subsidy (GTFS)', description: 'Information about the Government\'s free education policy subsidizing tuition costs for all students.', url: '#programs', category: 'Policy', icon: '🎓' },
        { title: 'Teaching Service Commission (TSC)', description: 'The independent body responsible for managing the teaching service in Papua New Guinea.', url: '#about', category: 'Division', icon: '🏛️' },
        { title: 'Curriculum Development Division', description: 'Responsible for designing, reviewing and implementing the national school curriculum.', url: '#about', category: 'Division', icon: '📚' },
        { title: '2026 Term & Examination Dates', description: 'Official school term dates, teacher resume dates, and examination schedules for 2026.', url: '#home', category: 'Notice', icon: '📅' },
        { title: 'PNG LEAP — Literacy Education Access Program', description: 'Program focused on improving literacy outcomes and access to education in remote areas.', url: '#programs', category: 'Program', icon: '📖' },
        { title: 'School Census 2026', description: 'Annual school census data collection form for student and teacher enrollment statistics.', url: '#forms', category: 'Form', icon: '📊' },
    ];

    function search(query) {
        if (!query || query.trim().length < 2) return [];
        const terms = query.toLowerCase().split(/\s+/);
        
        const results = searchIndex.map(item => {
            const titleLower = item.title.toLowerCase();
            const descLower = item.description.toLowerCase();
            const catLower = item.category.toLowerCase();
            let score = 0;

            for (const term of terms) {
                // Exact title match (highest)
                if (titleLower === term) score += 100;
                // Title starts with term
                else if (titleLower.startsWith(term)) score += 50;
                // Title contains term
                else if (titleLower.includes(term)) score += 30;
                // Category match
                if (catLower.includes(term)) score += 20;
                // Description contains term
                if (descLower.includes(term)) score += 10;
            }

            return { ...item, score };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8);

        return results;
    }

    function highlightMatch(text, query) {
        if (!query) return text;
        const terms = query.split(/\s+/).filter(t => t.length >= 2);
        let result = text;
        for (const term of terms) {
            const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            result = result.replace(regex, '<mark style="background: rgba(59,165,224,0.3); color: #fff; padding: 0 2px; border-radius: 3px;">$1</mark>');
        }
        return result;
    }

    function renderResults(results, query) {
        const container = document.getElementById('search-results');
        if (!container) return;

        if (results.length === 0 && query.length >= 2) {
            container.innerHTML = `
                <div class="search-no-results">
                    <span>🔍</span>
                    <p>No results found for "<strong>${query}</strong>"</p>
                    <p style="font-size: 0.85rem; margin-top: 0.5rem;">Try different keywords or browse the navigation menu.</p>
                </div>
            `;
            return;
        }

        if (results.length === 0) {
            container.innerHTML = '<div class="search-placeholder-text">Start typing to find pages, news articles, forms, and more...</div>';
            return;
        }

        container.innerHTML = results.map(item => `
            <a href="${item.url}" class="search-result-item" onclick="SiteSearch.close()">
                <div class="search-result-icon">${item.icon}</div>
                <div class="search-result-text">
                    <h4>${highlightMatch(item.title, query)}</h4>
                    <p>${highlightMatch(item.description, query)}</p>
                    <span class="search-result-tag">${item.category}</span>
                </div>
            </a>
        `).join('');
    }

    function open() {
        const overlay = document.getElementById('search-overlay');
        const input = document.getElementById('site-search-input');
        if (overlay) {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            setTimeout(() => input && input.focus(), 300);
        }
    }

    function close() {
        const overlay = document.getElementById('search-overlay');
        const input = document.getElementById('site-search-input');
        const results = document.getElementById('search-results');
        if (overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            if (input) input.value = '';
            if (results) results.innerHTML = '<div class="search-placeholder-text">Start typing to find pages, news articles, forms, and more...</div>';
        }
    }

    // Initialize event listeners
    function init() {
        const toggleBtn = document.getElementById('search-toggle-btn');
        const closeBtn = document.getElementById('search-close-btn');
        const overlay = document.getElementById('search-overlay');
        const input = document.getElementById('site-search-input');

        if (toggleBtn) toggleBtn.addEventListener('click', open);
        if (closeBtn) closeBtn.addEventListener('click', close);

        // Close on overlay background click
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) close();
            });
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') close();
            // Open with Ctrl+K or Cmd+K
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                open();
            }
        });

        // Live search as user types
        if (input) {
            input.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                const results = search(query);
                renderResults(results, query);
            });
        }
    }

    // Auto-init when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    return { open, close, search };
})();
