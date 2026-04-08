window.HomeComponent = {
    render: async () => {
        // Fetch all dynamic data in parallel
        const [tickerData, leadersData, appsData, noticesData, formsData, docsData, newsData] = await Promise.all([
            DoEAPI.get('ticker.php'),
            DoEAPI.get('leaders.php'),
            DoEAPI.get('app-links.php'),
            DoEAPI.get('notices.php'),
            DoEAPI.get('forms.php'),
            DoEAPI.get('publications.php'),
            DoEAPI.get('news.php?featured=1')
        ]);

        // --- Data Processing & Fallbacks ---
        
        // Ticker Fallback
        const tickerItems = (tickerData && tickerData.data && tickerData.data.length > 0) 
            ? tickerData.data 
            : [
                { label: 'NEW', text: 'NDoE Graduate Teacher Recruitment of 2026 now open for applications' },
                { label: 'BUDGET', text: 'Government allocates K904.5 million for education in 2026' },
                { label: 'POLICY', text: 'Strict mandate issued — No enrollment fee for 2026 students' }
            ];

        // Leaders Fallback
        const leaders = (leadersData && leadersData.data && leadersData.data.length > 0)
            ? leadersData.data
            : [
                { role: 'minister', name: 'HON. LUCAS DAWA DEKENA, MP', position_title: 'MINISTER FOR EDUCATION', photo_path: 'assets/images/leaders/minister.png', message_content: '<p>I welcome you to the new-look website for the National Department of Education...</p>', border_color: '#4a90e2' },
                { role: 'secretary', name: 'DR. UKE KOMBRA, PhD, OBE', position_title: 'SECRETARY FOR EDUCATION', photo_path: 'assets/images/leaders/secretary.png', message_content: '<p>HELLO, thank you for taking time to visit the Department of Education\'s new-look website...</p>', border_color: '#f5a623' }
            ];
        
        const minister = leaders.find(l => l.role === 'minister') || leaders[0];
        const secretary = leaders.find(l => l.role === 'secretary') || leaders[1];

        // Apps Fallback
        const apps = (appsData && appsData.data && appsData.data.length > 0)
            ? appsData.data
            : [
                { title: 'Outlook Email', description: 'Staff Webmail Portal', url: 'https://mail.education.gov.pg/owa/', icon_emoji: '📧', icon_color: '#0078d4' },
                { title: 'MyPaySlip', description: 'Teacher Payroll System', url: 'http://apps.education.gov.pg:8081/ords/f?p=144', icon_emoji: '💰', icon_color: '#2dca73' },
                { title: 'Grade 11 Selection', description: 'Online Selection Portal', url: 'http://apps.education.gov.pg:8081/ords/f?p=103', icon_emoji: '🎓', icon_color: '#f5a623' },
                { title: 'Info Management', description: 'Teacher Management System', url: 'http://apps.education.gov.pg:8081/ords/f?p=125', icon_emoji: '👥', icon_color: '#e74c3c' }
            ];

        // Notices Fallback
        const notices = (noticesData && noticesData.data && noticesData.data.length > 0)
            ? noticesData.data
            : [
                { title: '2026 TERM & EXAMINATION DATES', content: '<ul style="list-style: none; color: var(--text-muted);"><li style="margin-bottom: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem;"><strong>Jan 19, 2026:</strong> Teachers Resume Duties</li></ul>', card_type: 'dates' },
                { title: 'National Education Plan', content: '<p style="color: var(--text-muted); margin-bottom: 1rem;">View or download the National Education Plan 2020 - 2029.</p>', card_type: 'plan' },
                { title: 'Quick Links & Portals', content: '<div style="display: flex; flex-direction: column; gap: 0.8rem; align-items: center;"><a href="#" class="quick-link">DoE Portal</a></div>', card_type: 'quick_links' }
            ];

        // Forms Fallback
        const forms = (formsData && formsData.data && formsData.data.length > 0)
            ? formsData.data.slice(0, 3)
            : [
                { title: 'School Registration Form', description: 'Official application form for new school registration and annual renewal.', accent_color: 'var(--primary)' },
                { title: 'Teacher Leave Application', description: 'Submit requests for medical, recreational, or study leave via the TSC.', accent_color: 'var(--accent)' },
                { title: 'Student Transfer Form', description: 'Required documentation for transferring students between provincial schools.', accent_color: '#fff' }
            ];

        // Docs Fallback
        const docs = (docsData && docsData.data && docsData.data.length > 0)
            ? docsData.data
            : [
                { title: 'NEP 2020-2029', thumbnail_path: 'assets/images/documents/doc-img-01.png' },
                { title: 'Annual Report 2025', thumbnail_path: 'assets/images/documents/doc-img-02.png' },
                { title: 'Education Act 1983', thumbnail_path: 'assets/images/documents/doc-img-03.png' },
                { title: 'GFEP 2026 Manual', thumbnail_path: 'assets/images/documents/doc-img-04.png' },
                { title: 'Teaching Service Act', thumbnail_path: 'assets/images/documents/doc-img-05.png' }
            ];

        // News Fallback
        const news = (newsData && newsData.data && newsData.data.length > 0)
            ? newsData.data
            : [
                { title: 'NDoE Graduate Teacher Recruitment of 2026', summary: 'The Department of Education announces the 2026 Graduate Teacher Recruitment program.', image_path: 'assets/images/hero/hero-1.jpg', date_published: '2026-02-25' },
                { title: 'Government Allocates K904.5 Million for Education', summary: 'The Government of Papua New Guinea has committed K904.5 million in the 2026 National Budget.', image_path: 'assets/images/hero/hero-2.jpg', date_published: '2026-02-10' },
                { title: 'Strict 2026 Mandate: No Enrollment Fee for Students', summary: 'The Secretary for Education has issued a strict directive regarding enrollment fees.', image_path: 'assets/images/hero/hero-3.jpg', date_published: '2026-02-10' }
            ];

        return `
            <section class="hero" style="position: relative; overflow: hidden; min-height: 80vh; display: flex; align-items: center;">
                <div class="hero-slider">
                    <div class="slide"><img src="assets/images/hero/hero-1.jpg" alt="Hero 1" class="slide-img" loading="eager" fetchpriority="high"></div>
                    <div class="slide"><img src="assets/images/hero/hero-2.jpg" alt="Hero 2" class="slide-img" loading="lazy"></div>
                    <div class="slide"><img src="assets/images/hero/hero-3.jpg" alt="Hero 3" class="slide-img" loading="lazy"></div>
                    <div class="slide"><img src="assets/images/hero/hero-4.jpg" alt="Hero 4" class="slide-img" loading="lazy"></div>
                    <div class="hero-overlay"></div>
                </div>
                <div class="hero-content-container">
                    <div class="hero-content">
                        <h1>The Department of Education</h1>
                        <p>The executive and inspectorial branch of the National Education System, shaping direction for education agencies and providing quality education across Papua New Guinea.</p>
                        <a href="#about" class="btn-primary">Learn More</a>
                    </div>
                </div>
            </section>

            <!-- Dynamic News Ticker -->
            <div class="news-ticker-wrapper">
                <span class="news-ticker-label">📰 LATEST</span>
                <div class="news-ticker-track">
                    ${[...tickerItems, ...tickerItems].map(item => `
                        <span class="news-ticker-item"><strong>${item.label}:</strong> ${item.text}</span>
                        <span class="news-ticker-divider">✦</span>
                    `).join('')}
                </div>
            </div>

            <section class="section-full">
                <h2 class="section-title">Leadership Messages</h2>
                <div class="grid-2">
                    <div class="card glass-panel leader-card">
                        <div class="leader-avatar">
                            <img src="${minister.photo_path}" alt="Minister">
                        </div>
                        <div class="leader-text">
                            <h3>Minister's Message</h3>
                            <p>${minister.name}</p>
                            <a href="javascript:void(0)" onclick="openModal('minister-modal')" class="nav-link" style="color: var(--primary);">Read Message &rarr;</a>
                        </div>
                    </div>
                    <div class="card glass-panel leader-card">
                        <div class="leader-avatar leader-avatar-alt">
                            <img src="${secretary.photo_path}" alt="Secretary">
                        </div>
                        <div class="leader-text">
                            <h3>Secretary's Message</h3>
                            <p>${secretary.name}</p>
                            <a href="javascript:void(0)" onclick="openModal('secretary-modal')" class="nav-link" style="color: var(--accent);">Read Message &rarr;</a>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section-full" style="background: linear-gradient(180deg, rgba(10, 13, 20, 0) 0%, rgba(0, 112, 243, 0.05) 100%); border-bottom: 1px solid var(--glass-border);">
                <div class="section-header">
                    <h2 class="section-title" style="margin-bottom: 0;">DoE Digital Applications</h2>
                    <a href="#app-gallery" class="nav-link view-all-link">View All Apps &rarr;</a>
                </div>
                <div class="grid-4" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 2rem;">
                    ${apps.slice(0, 4).map(app => `
                        <a href="${app.url}" target="_blank" class="card glass-panel app-card" style="text-align: center; padding: 2rem 1rem; text-decoration: none;">
                            <div class="app-icon-placeholder" style="background: ${app.image_path ? 'rgba(255,255,255,0.05)' : (app.icon_color + '15')}; color: ${app.icon_color || '#fff'}; width: 90px; height: 90px; border-radius: 20px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; border: 1px solid ${app.image_path ? 'var(--glass-border)' : (app.icon_color + '30')}; overflow: hidden;">
                                ${app.image_path 
                                    ? `<img src="${DoEAPI.imgUrl(app.image_path)}" alt="${app.title}" style="width:85%; height:85%; object-fit:contain;">`
                                    : (app.icon_emoji || '🔗')
                                }
                            </div>
                            <h3 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: #fff;">${app.title}</h3>
                            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.4;">${app.description}</p>
                        </a>
                    `).join('')}
                </div>
            </section>

            <section class="section-full" style="background: rgba(0,0,0,0.3); border-top: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border);">
                <h2 class="section-title">Notice Board</h2>
                <div class="grid-3 mt-2">
                    ${notices.map(notice => `
                        <div class="card glass-panel ${notice.card_type === 'quick_links' ? 'quick-links-card' : ''}" ${notice.card_type === 'quick_links' ? 'style="border-color: rgba(245, 166, 35, 0.4);"' : ''}>
                            <h3>${notice.title}</h3>
                            ${notice.content}
                            ${notice.pdf_path ? `<a href="${notice.pdf_path}" class="btn-primary" style="display: inline-block; margin-top: 1.5rem; width: 100%; text-align: center;">Download PDF</a>` : ''}
                        </div>
                    `).join('')}
                </div>
            </section>

            <section class="section-full" style="background: rgba(20, 25, 35, 0.4); border-bottom: 1px solid var(--glass-border);">
                <div class="section-header">
                    <h2 class="section-title" style="margin-bottom: 0;">Public Forms</h2>
                    <a href="#forms" class="nav-link view-all-link">View All Forms &rarr;</a>
                </div>
                <div class="grid-3">
                    ${forms.map(form => `
                        <div class="card glass-panel" style="border-left: 4px solid ${form.accent_color};">
                            <h4 style="margin: 0.5rem 0;">${form.title}</h4>
                            <p style="color: var(--text-muted); font-size: 0.9rem;">${form.description}</p>
                            <a href="${form.pdf_path || '#forms'}" class="nav-link" style="color: ${form.accent_color}; font-size: 0.9rem;">Download PDF &darr;</a>
                        </div>
                    `).join('')}
                </div>
            </section>

            <section class="section-full" style="padding-bottom: 2rem;">
                <div class="section-header">
                    <h2 class="section-title" style="margin-bottom: 0;">Published Documents</h2>
                    <a href="#publications" class="nav-link view-all-link">View Publications List &rarr;</a>
                </div>
                <div class="marquee-container">
                    <div class="marquee-track">
                        ${[...docs, ...docs].map(doc => `
                            <a href="${doc.pdf_path || '#'}" target="_blank" class="doc-placeholder" style="display:block; cursor:pointer; padding:0; position:relative; overflow:hidden;">
                                <img src="${doc.thumbnail_path}" alt="${doc.title}" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem;"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>${doc.title}</div>
                            </a>
                        `).join('')}
                    </div>
                </div>
            </section>

            <section class="section-full">
                <div class="section-header">
                    <h2 class="section-title" style="margin-bottom: 0;">Recent Activity & News</h2>
                    <a href="#news" class="nav-link view-all-link">View All News &rarr;</a>
                </div>
                <div class="grid-3">
                    ${news.map(item => `
                        <div class="card glass-panel news-card" style="padding: 0; overflow: hidden;">
                            <div class="news-img-wrapper" style="width:100%; height:200px; overflow:hidden; position:relative;">
                                <img src="${DoEAPI.imgUrl(item.image_path) || 'assets/images/hero/hero-1.jpg'}" alt="${item.title}" style="width:100%; height:100%; object-fit:cover; display:block; transition: transform 0.4s ease;" onerror="this.style.display='none';" loading="lazy">
                                <span class="news-date-badge">${new Date(item.date_published).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                            </div>
                            <div style="padding: 1.5rem;">
                                <h4 style="margin: 0 0 0.8rem 0; font-size: 1.1rem;">${item.title}</h4>
                                <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.2rem;">${item.summary}</p>
                                <a href="#news" class="news-read-more">Read More &rarr;</a>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>

            <!-- Minister's Modal -->
            <div id="minister-modal" class="modal-overlay" onclick="closeModal(event, 'minister-modal')">
                <div class="modal-content-light" onclick="event.stopPropagation()">
                    <div class="modal-body-light">
                        <div style="color: #0056b3; text-align: center; margin-bottom: 2rem; letter-spacing: 0.5px; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(0, 86, 179, 0.2);">
                            <div style="font-size: 1.1rem; font-weight: 400; margin-bottom: 0.3rem;">WELCOME MESSAGE FROM</div>
                            <div style="font-size: 1.4rem; font-weight: 600; margin-bottom: 0.2rem;">${minister.name}</div>
                            <div style="font-size: 1.25rem; font-weight: 500;">${minister.position_title}</div>
                        </div>
                        <div style="display: flow-root;">
                            <img src="${minister.photo_path}" alt="Minister" style="float: left; width: 220px; height: 220px; object-fit: cover; margin: 0 2rem 1rem 0; border: 4px solid ${minister.border_color}; padding: 2px;">
                            <div class="modal-text-content">${minister.message_content}</div>
                            <p style="font-weight: bold; margin-top: 1.5rem; margin-bottom: 0.2rem; font-size: 0.95rem; color: #000;">${minister.name}</p>
                            <p style="font-size: 0.9rem; color: #444;">${minister.position_title}</p>
                        </div>
                    </div>
                    <div class="modal-footer-light">
                        <button class="modal-close-btn" onclick="closeModal(null, 'minister-modal')" title="Close">&times;</button>
                    </div>
                </div>
            </div>

            <!-- Secretary's Modal -->
            <div id="secretary-modal" class="modal-overlay" onclick="closeModal(event, 'secretary-modal')">
                <div class="modal-content-light" onclick="event.stopPropagation()">
                    <div class="modal-body-light">
                        <div style="color: #0056b3; text-align: center; margin-bottom: 2rem; letter-spacing: 0.5px; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(0, 86, 179, 0.2);">
                            <div style="font-size: 1.1rem; font-weight: 400; margin-bottom: 0.3rem;">WELCOME MESSAGE FROM</div>
                            <div style="font-size: 1.4rem; font-weight: 600; margin-bottom: 0.2rem;">${secretary.name}</div>
                            <div style="font-size: 1.25rem; font-weight: 500;">${secretary.position_title}</div>
                        </div>
                        <div style="display: flow-root;">
                            <img src="${secretary.photo_path}" alt="Secretary" style="float: left; width: 220px; height: 220px; object-fit: cover; margin: 0 2rem 1rem 0; border: 4px solid ${secretary.border_color}; padding: 2px;">
                            <div class="modal-text-content">${secretary.message_content}</div>
                            <p style="font-weight: bold; margin-top: 1.5rem; margin-bottom: 0.2rem; font-size: 0.95rem; color: #000;">${secretary.name}</p>
                            <p style="font-size: 0.9rem; color: #444;">${secretary.position_title}</p>
                        </div>
                    </div>
                    <div class="modal-footer-light">
                        <button class="modal-close-btn" onclick="closeModal(null, 'secretary-modal')" title="Close">&times;</button>
                    </div>
                </div>
            </div>
        `;
    }
};
