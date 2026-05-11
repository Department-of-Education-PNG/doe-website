window.HomeComponent = {
    render: async () => {
        // Fetch all dynamic data in parallel
        const [tickerData, leadersData, appsData, noticesData, formsData, docsData, newsData, slidersData] = await Promise.all([
            DoEAPI.get('ticker.php'),
            DoEAPI.get('leaders.php'),
            DoEAPI.get('app-links.php'),
            DoEAPI.get('notices.php'),
            DoEAPI.get('forms.php'),
            DoEAPI.get('publications.php'),
            DoEAPI.get('news.php?featured=1'),
            DoEAPI.get('sliders.php')
        ]);

        // --- Data Processing & Fallbacks ---

        // Sliders Fallback
        const sliders = (slidersData && slidersData.data && slidersData.data.length > 0)
            ? slidersData.data
            : [
                { image_path: 'assets/images/hero/hero-1.jpg' },
                { image_path: 'assets/images/hero/hero-2.jpg' },
                { image_path: 'assets/images/hero/hero-3.jpg' },
                { image_path: 'assets/images/hero/hero-4.jpg' }
            ];

        // Ticker Fallback
        const tickerItems = (tickerData && tickerData.data && tickerData.data.length > 0)
            ? tickerData.data
            : [
                { label: 'NEW', text: 'NDoE Graduate Teacher Recruitment of 2026 now open for applications' },
                { label: 'BUDGET', text: 'Government allocates K904.5 million for education in 2026' },
                { label: 'POLICY', text: 'Strict mandate issued — No enrollment fee for 2026 students' }
            ];

        // Leaders — no fallback, only show what admin has entered
        const leaders = (leadersData && leadersData.data) ? leadersData.data.filter(l => l.name && l.message_content) : [];
        const minister  = leaders.find(l => l.role === 'minister')  || null;
        const secretary = leaders.find(l => l.role === 'secretary') || null;
        const hasLeaders = minister || secretary;

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
            <section class="hero" style="position: relative; overflow: hidden; min-height: 90vh; display: flex; align-items: center;">
                <div class="hero-slider">
                    ${sliders.map((s, idx) => `
                        <div class="slide"><img src="${DoEAPI.imgUrl(s.image_path)}" alt="Hero Slide" class="slide-img" ${idx === 0 ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'}></div>
                    `).join('')}
                    <div class="hero-overlay" style="background: radial-gradient(circle at 20% 50%, rgba(14, 32, 64, 0.95) 0%, rgba(14, 32, 64, 0.4) 100%);"></div>
                </div>
                <div class="hero-content-container">
                    <div class="hero-content">
                        <span class="badge reveal-up" style="background: var(--primary); color: #fff; padding: 0.5rem 1rem; border-radius: 50px; font-size: 0.8rem; font-weight: 600; margin-bottom: 1.5rem; display: inline-block; letter-spacing: 1px;">OFFICIAL PORTAL</span>
                        <h1 class="reveal-up">The National Department <br><span style="color: var(--primary-light);">of Education</span></h1>
                        <p class="reveal-up hero-p" style="margin-left: 0; margin-bottom: 2.5rem; color: #d4e5f7;">Providing quality education for all in Papua New Guinea through innovative direction and inclusive leadership.</p>
                        <div class="hero-btns reveal-up" style="display: flex; gap: 1rem;">
                            <a href="#about" class="btn-primary" style="padding: 1rem 2.5rem;">Discover Our Mission</a>
                            <a href="#publications" class="btn-secondary" style="padding: 1rem 2.5rem; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); border-radius: 12px; font-weight: 600; display: inline-block;">Browse Documents</a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Dynamic News Ticker -->
            <div class="news-ticker-wrapper" style="background: rgba(8, 20, 38, 0.95); border-bottom: 1px solid var(--glass-border); backdrop-filter: blur(10px); z-index: 100;">
                <span class="news-ticker-label" style="background: var(--primary); color: #fff; font-weight: 800; padding: 0.6rem 1.5rem;">NEWS</span>
                <div class="news-ticker-track">
                    ${[...tickerItems, ...tickerItems].map(item => `
                        <span class="news-ticker-item" style="color: #fff; font-size: 0.95rem;"><strong>${item.label}:</strong> ${item.text}</span>
                        <span class="news-ticker-divider" style="color: var(--primary); opacity: 0.6;">✦</span>
                    `).join('')}
                </div>
            </div>

            ${hasLeaders ? `
            <section class="section-full reveal-up" style="padding: var(--section-spacing) 0;">
                <div style="text-align: center; width: 100%; margin-bottom: 3rem;"><h2 class="section-title" style="margin-bottom: 0;">Leadership Messages</h2></div>
                <div class="grid-2" style="gap: var(--grid-gap);">
                    ${minister ? `
                    <div class="card glass-panel leader-card" style="padding: var(--card-padding); display: flex; align-items: flex-start; gap: 2.5rem; position: relative; overflow: hidden;">
                        <div style="position: absolute; top: 0; right: 0; padding: 1rem; opacity: 0.1; font-size: 5rem;">"</div>
                        <div class="leader-avatar" style="flex-shrink: 0; width: 140px; height: 140px; border-radius: 50%; border: 3px solid var(--primary); padding: 5px; background: rgba(255,255,255,0.05);">
                            <img src="${DoEAPI.imgUrl(minister.photo_path)}" alt="Minister" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" onerror="this.src='assets/images/leaders/minister.png'">
                        </div>
                        <div class="leader-text">
                            <h3 style="color: #fff; margin-bottom: 0.5rem;">Minister's Message</h3>
                            <p style="color: var(--primary-light); font-weight: 600; font-size: 0.95rem; margin-bottom: 1rem; letter-spacing: 0.5px;">${minister.name}</p>
                            <p class="section-p" style="margin-left: 0; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.5rem;">
                                ${minister.message_content.replace(/<[^>]*>/g, '').substring(0, 120)}...
                            </p>
                            <a href="javascript:void(0)" onclick="openModal('minister-modal')" class="nav-link" style="color: var(--primary); font-weight: 700; display: inline-flex; align-items: center; gap: 0.5rem;">Read Full Message &rarr;</a>
                        </div>
                    </div>` : ''}

                    ${secretary ? `
                    <div class="card glass-panel leader-card" style="padding: var(--card-padding); display: flex; align-items: flex-start; gap: 2.5rem; position: relative; overflow: hidden;">
                        <div style="position: absolute; top: 0; right: 0; padding: 1rem; opacity: 0.1; font-size: 5rem;">"</div>
                        <div class="leader-avatar" style="flex-shrink: 0; width: 140px; height: 140px; border-radius: 50%; border: 3px solid var(--accent); padding: 5px; background: rgba(255,255,255,0.05);">
                            <img src="${DoEAPI.imgUrl(secretary.photo_path)}" alt="Secretary" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" onerror="this.src='assets/images/leaders/secretary.png'">
                        </div>
                        <div class="leader-text">
                            <h3 style="color: #fff; margin-bottom: 0.5rem;">Secretary's Message</h3>
                            <p style="color: var(--accent); font-weight: 600; font-size: 0.95rem; margin-bottom: 1rem; letter-spacing: 0.5px;">${secretary.name}</p>
                            <p class="section-p" style="margin-left: 0; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.5rem;">
                                ${secretary.message_content.replace(/<[^>]*>/g, '').substring(0, 120)}...
                            </p>
                            <a href="javascript:void(0)" onclick="openModal('secretary-modal')" class="nav-link" style="color: var(--accent); font-weight: 700; display: inline-flex; align-items: center; gap: 0.5rem;">Read Full Message &rarr;</a>
                        </div>
                    </div>` : ''}
                </div>
            </section>` : ''}

            <section class="section-full reveal-up" style="border-top: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border); padding: var(--section-spacing) 0;">
                <div class="section-header" style="margin-bottom: var(--header-margin);">
                    <h2 class="section-title" style="margin-bottom: 0px; text-align: left;">DoE Digital Applications</h2>
                    <a href="#app-gallery" class="nav-link view-all-link" style="display: flex; align-items: center; gap: 0.5rem; color: var(--primary);">Explore All Portals &rarr;</a>
                </div>
                <div class="grid-4" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--grid-gap);">
                    ${apps.slice(0, 4).map(app => `
                        <a href="${app.url}" target="_blank" class="card glass-panel app-card" style="text-align: left; padding: 2.5rem; text-decoration: none; position: relative; overflow: hidden; border-radius: 24px;">
                            <div style="position: absolute; top: -20px; right: -20px; width: 100px; height: 100px; background: ${app.icon_color}08; border-radius: 50%;"></div>
                            <div class="app-icon-placeholder" style="background: ${app.image_path ? 'var(--bg-deeper)' : (app.icon_color + '15')}; color: ${app.icon_color || '#fff'}; width: 70px; height: 70px; border-radius: 18px; margin-bottom: 2rem; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; border: 1px solid ${(app.icon_color || '#3ba5e0') + '30'}; box-shadow: 0 10px 20px -5px ${(app.icon_color || '#3ba5e0') + '40'};">
                                ${app.image_path
                ? `<img src="${DoEAPI.imgUrl(app.image_path)}" alt="${app.title}" style="width:80%; height:80%; object-fit:contain;">`
                : (app.icon_emoji || '🔗')
            }
                            </div>
                             <h3 style="margin-bottom: 0.75rem; color: #fff; font-weight: 700;">${app.title}</h3>
                            <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 0;">${app.description}</p>
                            <div style="margin-top: 1.5rem; width: 30px; height: 2px; background: ${app.icon_color || 'var(--primary)'}; opacity: 0.5; transition: width 0.3s ease;"></div>
                        </a>
                    `).join('')}
                </div>
            </section>

            <section class="section-full reveal-up" style="padding: var(--section-spacing) 0; border-bottom: 1px solid var(--glass-border);">
                 <div class="text-left" style="margin-bottom: var(--header-margin);">
                    <h2 class="section-title" style="margin-bottom: 1rem;">Official Notice Board</h2>
                    <p class="section-p" style="margin-left: 0; color: var(--text-muted);">Keep updated with the latest Departmental announcements and schedules.</p>
                </div>
                <div class="grid-3">
                    ${notices.map(notice => `
                        <div class="card glass-panel ${notice.card_type === 'quick_links' ? 'quick-links-card' : ''}" style="padding: 1.8rem; display: flex; flex-direction: column; height: 100%; border-top: 4px solid ${notice.card_type === 'dates' ? 'var(--primary)' : notice.card_type === 'plan' ? 'var(--accent)' : 'var(--primary-light)'};">
                            <h3 style="font-size: 1.2rem; line-height: 1.4; margin-bottom: 1rem; color: #fff;">${notice.title}</h3>
                            <div class="notice-content" style="flex-grow: 1; font-size: 0.95rem;">${notice.content}</div>
                            ${notice.pdf_path ? `<a href="${DoEAPI.imgUrl(notice.pdf_path)}" class="btn-primary" style="display: flex; align-items: center; justify-content: center; gap: 0.6rem; margin-top: 1.5rem; width: 100%; padding: 0.8rem;" download>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                Download Official PDF
                            </a>` : ''}
                        </div>
                    `).join('')}
                </div>
            </section>

            <section class="section-full reveal-up" style="padding: var(--section-spacing) 0; border-bottom: 1px solid var(--glass-border);">
                <div class="section-header" style="margin-bottom: 4rem;">
                    <div>
                        <h2 class="section-title" style="margin-bottom: 0.5rem; text-align: left;">Public Resources & Forms</h2>
                        <p style="color: var(--text-muted);">Access and download official administrative documentation.</p>
                    </div>
                    <a href="#forms" class="btn-secondary" style="display:flex; align-items:center; gap:0.6rem; background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); padding: 0.8rem 1.5rem; border-radius: 12px; font-weight: 600;">
                        View Document Database
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </a>
                </div>
                <div class="grid-3" style="gap: var(--grid-gap);">
                    ${forms.map(form => `
                        <div class="card glass-panel" style="padding: 1.8rem; border-left: 5px solid ${form.accent_color || 'var(--primary)'}; background: rgba(14, 32, 64, 0.6);">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                                <span></span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${form.accent_color || 'var(--primary)'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.6;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            </div>
                            <h4 style="margin: 0 0 0.75rem 0; font-size: 1.15rem; color: #fff;">${form.title}</h4>
                            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.2rem; line-height: 1.5;">${form.description}</p>
                            <a href="${form.pdf_path ? DoEAPI.imgUrl(form.pdf_path) : '#forms'}" class="nav-link" style="color: ${form.accent_color || 'var(--primary)'}; font-size: 0.95rem; font-weight: 700; display:flex; align-items:center; gap:0.6rem;">
                                Download Files
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            </a>
                        </div>
                    `).join('')}
                </div>
            </section>

            <section class="section-full reveal-up" style="padding: var(--section-spacing) 0;">
                <div class="section-header" style="margin-bottom: var(--header-margin);">
                    <h2 class="section-title" style="margin-bottom: 0px; text-align: left;">Published Documents & Reports</h2>
                    <a href="#publications" class="nav-link view-all-link" style="display: flex; align-items: center; gap: 0.5rem; color: var(--accent);">Resource Archive &rarr;</a>
                </div>
                <div class="marquee-container" style="border-radius: 20px; overflow: hidden; background: rgba(255,255,255,0.02); padding: 2rem 0; border: 1px solid var(--glass-border);">
                    <div class="marquee-track">
                        ${[...docs, ...docs].map(doc => `
                            <a href="${doc.pdf_path ? DoEAPI.imgUrl(doc.pdf_path) : '#'}" target="_blank" class="doc-placeholder" style="display:block; cursor:pointer; padding:0; position:relative; overflow:hidden; border-radius: 12px; margin: 0 1rem; border: 1px solid var(--glass-border); transition: transform 0.3s ease;">
                                <img src="${DoEAPI.imgUrl(doc.thumbnail_path) || 'assets/images/documents/placeholder.png'}" alt="${doc.title}" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem; background: var(--bg-card);"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>${doc.title}</div>
                            </a>
                        `).join('')}
                    </div>
                </div>
            </section>

            <section class="section-full reveal-up" style="padding: var(--section-spacing) 0 0 0;">
                <div class="section-header" style="margin-bottom: 4rem;">
                    <h2 class="section-title" style="margin-bottom: 0px; text-align: left;">Latest News & Updates</h2>
                    <a href="#news" class="btn-primary" style="padding: 0.8rem 1.8rem; border-radius: 12px; font-weight: 600;">Media Center &rarr;</a>
                </div>
                <div class="grid-3">
                    ${news.map(item => `
                        <div class="card glass-panel news-card" style="padding: 0; overflow: hidden; display: flex; flex-direction: column; height: 100%; border-radius: 20px;">
                            <div class="news-img-wrapper" style="width:100%; height:240px; overflow:hidden; position:relative;">
                                <img src="${DoEAPI.imgUrl(item.image_path) || 'assets/images/hero/hero-1.jpg'}" alt="${item.title}" style="width:100%; height:100%; object-fit:cover; display:block; transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);" onerror="this.src='assets/images/hero/hero-1.jpg';" loading="lazy">
                                <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(14, 32, 64, 0.6), transparent);"></div>
                                <span class="news-date-badge">${new Date(item.date_published).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                            </div>
                            <div style="padding: 1.5rem; flex-grow: 1; display: flex; flex-direction: column;">
                                <h4 style="margin: 0 0 1rem 0; font-size: 1.25rem; color: #fff; line-height: 1.4; font-weight: 700;">${item.title}</h4>
                                <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem; flex-grow: 1;">${item.summary}</p>
                                <a href="#news-detail/${item.slug}" class="news-read-more" style="display:flex; align-items:center; gap:0.6rem; color: var(--primary); font-weight: 700; font-size: 0.95rem; text-decoration: none; border-top: 1px solid var(--glass-border); padding-top: 1.2rem;">
                                    Read Article
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transition: transform 0.3s ease;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                </a>
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
                            <div style="font-size: 1.4rem; font-weight: 600; margin-bottom: 0.2rem;">${minister ? minister.name : 'The Minister'}</div>
                            <div style="font-size: 1.25rem; font-weight: 500;">${minister ? minister.position_title : 'MINISTER FOR EDUCATION'}</div>
                        </div>
                        <div style="display: flow-root;">
                            ${minister ? `
                                <img src="${DoEAPI.imgUrl(minister.photo_path)}" alt="Minister" style="float: left; width: 220px; height: 220px; object-fit: cover; margin: 0 2rem 1rem 0; border: 4px solid ${minister.border_color}; padding: 2px;" onerror="this.src='assets/images/leaders/minister.png'">
                                <div class="modal-text-content">${minister.message_content}</div>
                                <p style="font-weight: bold; margin-top: 1.5rem; margin-bottom: 0.2rem; font-size: 0.95rem; color: #000;">${minister.name}</p>
                                <p style="font-size: 0.9rem; color: #444;">${minister.position_title}</p>
                            ` : '<p>Loading message...</p>'}
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
                            <div style="font-size: 1.4rem; font-weight: 600; margin-bottom: 0.2rem;">${secretary ? secretary.name : 'The Secretary'}</div>
                            <div style="font-size: 1.25rem; font-weight: 500;">${secretary ? secretary.position_title : 'SECRETARY FOR EDUCATION'}</div>
                        </div>
                        <div style="display: flow-root;">
                            ${secretary ? `
                                <img src="${DoEAPI.imgUrl(secretary.photo_path)}" alt="Secretary" style="float: left; width: 220px; height: 220px; object-fit: cover; margin: 0 2rem 1rem 0; border: 4px solid ${secretary.border_color}; padding: 2px;" onerror="this.src='assets/images/leaders/secretary.png'">
                                <div class="modal-text-content">${secretary.message_content}</div>
                                <p style="font-weight: bold; margin-top: 1.5rem; margin-bottom: 0.2rem; font-size: 0.95rem; color: #000;">${secretary.name}</p>
                                <p style="font-size: 0.9rem; color: #444;">${secretary.position_title}</p>
                            ` : '<p>Loading message...</p>'}
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
