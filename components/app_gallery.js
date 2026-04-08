window.AppGalleryComponent = {
    render: async () => {
        // Fetch all digital application links
        const apiData = await DoEAPI.get('app-links.php');
        
        const apps = (apiData && apiData.data && apiData.data.length > 0)
            ? apiData.data
            : [
                { name: "Outlook Email", description: "Official Email Service for NDoE Staff", icon_text: "📧", url: "https://mail.education.gov.pg/owa/", color_hex: "#0078d4" },
                { name: "MyPaySlip", description: "View and Download Electronic Payslips", icon_text: "💰", url: "http://apps.education.gov.pg:8081/ords/f?p=144", color_hex: "#2dca73" },
                { name: "Grade 11 Online", description: "National Grade 11 Online Selection Portal", icon_text: "🎓", url: "http://apps.education.gov.pg:8081/ords/f?p=103", color_hex: "#f5a623" },
                { name: "Teacher Management System", description: "Teacher Information & Records Management", icon_text: "👥", url: "http://apps.education.gov.pg:8081/ords/f?p=125", color_hex: "#e74c3c" },
                { name: "e-School Census", description: "Online School Data Collection & Census", icon_text: "📊", url: "https://www.education.gov.pg/doeapps/eschoolcensus/", color_hex: "#9b59b6" },
                { name: "EMIS", description: "National Education Management Information System", icon_text: "📁", url: "http://apps.education.gov.pg:8080/ords/f?p=2024:LOGIN_DESKTOP:10435020109091", color_hex: "#3498db" },
                { name: "MyTask", description: "Official Task Tracking & Management System", icon_text: "📋", url: "https://mytask.education.gov.pg", color_hex: "#16a085" },
                { name: "Teachers ID-NID", description: "Teacher ID & NID Registration Tracking", icon_text: "🆔", url: "https://gfb742e44b55c34-doeapps.adb.ap-sydney-1.oraclecloudapps.com/ords/r/emis/doenid/login", color_hex: "#2c3e50" },
                { name: "MyAcquittal", description: "Official Acquittal Submission & Management", icon_text: "📉", url: "http://apps.education.gov.pg:8081/ords/f?p=133", color_hex: "#d35400" },
                { name: "MyLeave", description: "Personal Leave Management for Education Staff", icon_text: "⛱️", url: "http://apps.education.gov.pg:8081/ords/f?p=128", color_hex: "#27ae60" },
                { name: "TQMS", description: "Teacher Query Management System (TQMS)", icon_text: "💬", url: "https://tqms.education.gov.pg", color_hex: "#f1c40f" },
                { name: "MyPNGSchool", description: "PNG School Management Tool for Schools", icon_text: "🏫", url: "http://mypng.school/", color_hex: "#8e44ad" },
                { name: "eNRC: Rating", description: "National Rating & Evaluation System", icon_text: "⭐", url: "http://apps.education.gov.pg:8081/ords/f?p=102", color_hex: "#e67e22" },
                { name: "HRM System", description: "NDoE Human Resource Management System", icon_text: "👔", url: "https://metricserp.net/png-education-hrms/", color_hex: "#34495e" },
                { name: "Teacher Registration", description: "Official Teacher Registration & Certification", icon_text: "📜", url: "http://apps.education.gov.pg:8081/ords/f?p=120", color_hex: "#1abc9c" },
                { name: "PCMS", description: "Procurement & Contracts Management System", icon_text: "📝", url: "http://apps.education.gov.pg:8081/ords/f?p=PCMS", color_hex: "#7f8c8d" },
                { name: "My Projects", description: "Infrastructure Project Monitoring System", icon_text: "🏗️", url: "https://myprojects.education.gov.pg/", color_hex: "#c0392b" },
                { name: "NASSA", description: "NASSA Guide Application & Standards", icon_text: "🛡️", url: "https://education.gov.pg/nassaguides/", color_hex: "#2980b9" }
            ];

        return `
            <div style="min-height: 350px; padding: 4rem 1.5rem; display:flex; flex-direction:column; align-items:center; justify-content:center; background: linear-gradient(135deg, rgba(0, 112, 243, 0.6), rgba(10, 13, 20, 0.8), rgba(245, 166, 35, 0.3)), url('assets/images/other-tabs-header-banner/banner-bg.png') center/cover no-repeat; border-bottom: 1px solid var(--glass-border); position: relative;">
                <div style="text-align: center;">
                    <h1 style="font-size: 3.5rem; margin-bottom: 0.5rem; background: linear-gradient(to right, #fff, var(--text-muted)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">DOE Digital Applications</h1>
                    <p style="color: var(--text-muted); font-size: 1.2rem; max-width: 700px; margin: 0 auto;">Full directory of official Department of Education management systems and digital platforms.</p>
                </div>
            </div>

            <section class="section-full">
                <style>
                    .app-gallery-card {
                        border: 1px solid rgba(255,255,255,0.05);
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    }
                    .app-gallery-card:hover {
                        background: rgba(255, 255, 255, 0.05);
                        border-color: rgba(255, 255, 255, 0.2);
                        transform: translateY(-5px) scale(1.02);
                    }
                    .app-icon-circle {
                        transition: transform 0.3s ease;
                    }
                    .app-gallery-card:hover .app-icon-circle {
                        transform: scale(1.1);
                        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
                    }
                </style>
                <div class="grid-3" style="gap: 1.5rem;">
                    ${apps.map(app => {
                        const title = app.title || app.name;
                        const description = app.description || '';
                        const color = app.image_path ? '#fff' : (app.icon_color || app.color_hex || '#3498db');
                        const emoji = app.icon_emoji || app.icon_text || '📱';
                        
                        return `
                        <a href="${app.url}" target="_blank" class="card glass-panel app-gallery-card" style="padding: 1.5rem; display: flex; align-items: flex-start; gap: 1.5rem; text-decoration: none;">
                            <div class="app-icon-circle" style="background: ${app.image_path ? 'rgba(255,255,255,0.05)' : (color + '15')}; color: ${color}; border: 1px solid ${app.image_path ? 'var(--glass-border)' : (color + '20')}; width: 80px; height: 80px; border-radius: 18px; display: flex; align-items: center; justify-content:center; font-size: 2.2rem; flex-shrink: 0; overflow: hidden; box-shadow: ${app.image_path ? '0 8px 24px rgba(0,0,0,0.15)' : 'none'};">
                                ${app.image_path 
                                    ? `<img src="${DoEAPI.imgUrl(app.image_path)}" alt="${title}" style="width:85%; height:85%; object-fit:contain;">`
                                    : emoji
                                }
                            </div>
                            <div style="flex-grow: 1; padding-top: 0.5rem;">
                                <h3 style="margin-bottom: 0.5rem; font-size: 1.25rem; color: #fff;">${title}</h3>
                                <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin: 0;">${description}</p>
                            </div>
                        </a>
                    `}).join('')}
                </div>
            </section>
        `;
    }
};
