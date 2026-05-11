window.AppGalleryComponent = {
    render: async () => {
        const apiData = await DoEAPI.get('app-links.php');

        // Comprehensive categorized apps if API returns nothing (Merging remote & local data)
        const defaultApps = [
            // New Apps Launched
            { title: 'Grade 11 Online Selection', category: 'New Apps Launched', description: 'National Grade 11 Online Selection Portal', icon_emoji: '🎓', url: 'http://apps.education.gov.pg:8081/ords/f?p=103', icon_color: '#f5a623' },
            { title: 'MyTask', category: 'New Apps Launched', description: 'Official Task Tracking & Management System', icon_emoji: '📋', url: 'https://mytask.education.gov.pg', icon_color: '#16a085' },
            { title: 'TQMS', category: 'New Apps Launched', description: 'Teacher Query Management System (TQMS)', icon_emoji: '💬', url: 'https://tqms.education.gov.pg', icon_color: '#f1c40f' },
            
            // NDoE Apps
            { title: 'Outlook Webmail', category: 'NDoE Apps', description: 'Official Email Service for NDoE Staff', icon_emoji: '📧', url: 'https://mail.education.gov.pg/owa/', icon_color: '#0078d4' },
            { title: 'NDoE Intranet', category: 'NDoE Apps', description: 'Internal Resource Portal for Employees', icon_emoji: '🏢', url: '#', icon_color: '#3498db' },
            { title: 'HRM System', category: 'NDoE Apps', description: 'NDoE Human Resource Management System', icon_emoji: '👔', url: 'https://metricserp.net/png-education-hrms/', icon_color: '#34495e' },
            { title: 'PCMS', category: 'NDoE Apps', description: 'Procurement & Contracts Management System', icon_emoji: '📝', url: 'http://apps.education.gov.pg:8081/ords/f?p=PCMS', icon_color: '#7f8c8d' },
            { title: 'NASSA', category: 'NDoE Apps', description: 'NASSA Guide Application & Standards', icon_emoji: '🛡️', url: 'https://education.gov.pg/nassaguides/', icon_color: '#2980b9' },

            // Teacher Self-Service Apps
            { title: 'MyPaySlip', category: 'Teacher Self-Service Apps', description: 'View and Download Electronic Payslips', icon_emoji: '💰', url: 'http://apps.education.gov.pg:8081/ords/f?p=144', icon_color: '#2dca73' },
            { title: 'Teacher Management Info', category: 'Teacher Self-Service Apps', description: 'Update personnel and registration details', icon_emoji: '👥', url: 'http://apps.education.gov.pg:8081/ords/f?p=125', icon_color: '#e74c3c' },
            { title: 'MyLeave', category: 'Teacher Self-Service Apps', description: 'Personal Leave Management for Education Staff', icon_emoji: '⛱️', url: 'http://apps.education.gov.pg:8081/ords/f?p=128', icon_color: '#27ae60' },
            { title: 'Teacher Registration', category: 'Teacher Self-Service Apps', description: 'Official Teacher Registration & Certification', icon_emoji: '📜', url: 'http://apps.education.gov.pg:8081/ords/f?p=120', icon_color: '#1abc9c' },
            { title: 'MSD Application', category: 'Teacher Self-Service Apps', description: 'Measurement Services Division Resource Portal', icon_emoji: '📝', url: '#', icon_color: '#9b59b6' },

            // School Administration Systems
            { title: 'EMIS System', category: 'School Administration Systems', description: 'Education Management Information System', icon_emoji: '📊', url: 'http://apps.education.gov.pg:8080/ords/f?p=2024:LOGIN_DESKTOP', icon_color: '#6c5ce7' },
            { title: 'School Census Online', category: 'School Administration Systems', description: 'Annual School Census Data Entry', icon_emoji: '📋', url: 'https://www.education.gov.pg/doeapps/eschoolcensus/', icon_color: '#00b894' },
            { title: 'Teachers ID-NID', category: 'School Administration Systems', description: 'Teacher ID & NID Registration Tracking', icon_emoji: '🆔', url: 'https://gfb742e44b55c34-doeapps.adb.ap-sydney-1.oraclecloudapps.com/ords/r/emis/doenid/login', icon_color: '#2c3e50' },
            { title: 'MyPNGSchool', category: 'School Administration Systems', description: 'PNG School Management Tool for Schools', icon_emoji: '🏫', url: 'http://mypng.school/', icon_color: '#8e44ad' },
            { title: 'eNRC: Rating', category: 'School Administration Systems', description: 'National Rating & Evaluation System', icon_emoji: '⭐', url: 'http://apps.education.gov.pg:8081/ords/f?p=102', icon_color: '#e67e22' },
            { title: 'My Projects', category: 'School Administration Systems', description: 'Infrastructure Project Monitoring System', icon_emoji: '🏗️', url: 'https://myprojects.education.gov.pg/', icon_color: '#c0392b' },
            { title: 'MyAcquittal', category: 'School Administration Systems', description: 'Official Acquittal Submission & Management', icon_emoji: '📉', url: 'http://apps.education.gov.pg:8081/ords/f?p=133', icon_color: '#d35400' }
        ];

        const apps = (apiData && apiData.data && apiData.data.length > 0) ? apiData.data : defaultApps;

        // Group apps by category preserving a defined order
        const categoryOrder = ['New Apps Launched', 'NDoE Apps', 'Teacher Self-Service Apps', 'School Administration Systems'];
        const categoryMeta = {
            'New Apps Launched':          { icon: '🚀', accent: '#f5a623', badge: 'NEW' },
            'NDoE Apps':                  { icon: '🏛️', accent: '#0078d4', badge: null },
            'Teacher Self-Service Apps':  { icon: '👩‍🏫', accent: '#2dca73', badge: null },
            'School Administration Systems': { icon: '🏫', accent: '#6c5ce7', badge: null }
        };

        const grouped = {};
        // Initialise in order
        categoryOrder.forEach(c => grouped[c] = []);
        apps.forEach(app => {
            const cat = app.category || 'NDoE Apps';
            if (!grouped[cat]) grouped[cat] = [];
            grouped[cat].push(app);
        });

        const categorySections = categoryOrder
            .filter(cat => grouped[cat] && grouped[cat].length > 0)
            .map(cat => {
                const meta = categoryMeta[cat] || { icon: '📱', accent: '#3498db', badge: null };
                const appsHtml = grouped[cat].map(app => {
                    const title = app.title || app.name || 'Application';
                    const desc  = app.description || '';
                    const color = app.icon_color || app.color_hex || meta.accent;
                    const emoji = app.icon_emoji || app.icon_text || '📱';
                    return `
                        <a href="${app.url}" target="${app.url === '#' ? '_self' : '_blank'}" class="card glass-panel app-gallery-card" style="padding: 1.8rem; display: flex; align-items: flex-start; gap: 1.2rem; text-decoration: none; border: 1px solid rgba(255,255,255,0.06);">
                            <div class="app-icon-circle" style="background: ${app.image_path ? 'rgba(255,255,255,0.05)' : (color + '22')}; color: ${color}; border: 1px solid ${color}33; width: 70px; height: 70px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 2rem; flex-shrink: 0; overflow: hidden;">
                                ${app.image_path
                                    ? `<img src="${DoEAPI.imgUrl(app.image_path)}" alt="${title}" style="width:85%; height:85%; object-fit:contain;">`
                                    : emoji
                                }
                            </div>
                            <div style="flex-grow: 1; padding-top: 0.3rem;">
                                <h3 style="margin: 0 0 0.4rem; font-size: 1.1rem; color: #fff; line-height: 1.3;">${title}</h3>
                                <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5; margin: 0;">${desc}</p>
                            </div>
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; opacity:0.6; margin-top:0.3rem;"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </a>
                    `;
                }).join('');

                return `
                    <div class="app-category-section reveal-up" style="margin-bottom: 3.5rem;">
                        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                            <div style="width: 48px; height: 48px; border-radius: 14px; background: ${meta.accent}22; border: 1px solid ${meta.accent}44; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; flex-shrink: 0;">${meta.icon}</div>
                            <div>
                                <div style="display: flex; align-items: center; gap: 0.75rem;">
                                    <h2 style="margin: 0; font-size: 1.5rem; color: #fff; font-weight: 700;">${cat}</h2>
                                    ${meta.badge ? `<span style="background: ${meta.accent}; color: #fff; padding: 0.2rem 0.7rem; border-radius: 50px; font-size: 0.7rem; font-weight: 800; letter-spacing: 1px;">${meta.badge}</span>` : ''}
                                </div>
                                <p style="margin: 0.2rem 0 0; font-size: 0.85rem; color: var(--text-muted);">${grouped[cat].length} application${grouped[cat].length > 1 ? 's' : ''}</p>
                            </div>
                            <div style="flex-grow:1; height: 1px; background: linear-gradient(to right, ${meta.accent}44, transparent); margin-left: 1rem;"></div>
                        </div>
                        <div class="grid-3" style="gap: 1.2rem;">
                            ${appsHtml}
                        </div>
                    </div>
                `;
            }).join('');

        return `
            <style>
                .app-gallery-card { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
                .app-gallery-card:hover { background: rgba(255,255,255,0.06) !important; border-color: rgba(255,255,255,0.18) !important; transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.3); }
                .app-gallery-card:hover .app-icon-circle { transform: scale(1.08); }
                .app-icon-circle { transition: transform 0.3s ease; }
            </style>

            <div style="min-height: 320px; padding: 8rem 2rem 4rem; display:flex; flex-direction:column; align-items:center; justify-content:center; background: linear-gradient(135deg, rgba(0, 112, 243, 0.5), rgba(10, 13, 20, 0.9), rgba(245, 166, 35, 0.2)), url('assets/images/other-tabs-header-banner/banner-bg.png') center/cover no-repeat; border-bottom: 1px solid var(--glass-border); position: relative; text-align: center;">
                <span style="background: var(--primary); color: #fff; padding: 0.4rem 1.2rem; border-radius: 50px; font-size: 0.75rem; font-weight: 700; letter-spacing: 1.5px; margin-bottom: 1.2rem; display: inline-block;">DIGITAL PLATFORMS</span>
                <h1 style="font-size: clamp(2rem, 5vw, 3.5rem); margin-bottom: 0.8rem; background: linear-gradient(to right, #fff, var(--text-muted)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; font-weight: 900;">DOE Applications Portal</h1>
                <p style="color: var(--text-muted); font-size: 1.1rem; max-width: 600px; margin: 0 auto; line-height: 1.6;">Official directory of NDoE digital platforms, teacher services, and school management systems.</p>
            </div>

            <section class="section-full" style="padding: var(--section-spacing) 0;">
                <div class="container">
                    ${categorySections}
                </div>
            </section>
        `;
    }
};
