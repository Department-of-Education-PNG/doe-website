window.AppGalleryComponent = {
    render: async () => {
        const apps = [
            { name: "Outlook Email", desc: "Official Email Service for NDoE Staff", icon: "📧", link: "https://mail.education.gov.pg/owa/", color: "#0078d4" },
            { name: "MyPaySlip", desc: "View and Download Electronic Payslips", icon: "💰", link: "http://apps.education.gov.pg:8081/ords/f?p=144", color: "#2dca73" },
            { name: "Grade 11 Online", desc: "National Grade 11 Online Selection Portal", icon: "🎓", link: "http://apps.education.gov.pg:8081/ords/f?p=103", color: "#f5a623" },
            { name: "Teacher Management System", desc: "Teacher Information & Records Management", icon: "👥", link: "http://apps.education.gov.pg:8081/ords/f?p=125", color: "#e74c3c" },
            { name: "e-School Census", desc: "Online School Data Collection & Census", icon: "📊", link: "https://www.education.gov.pg/doeapps/eschoolcensus/", color: "#9b59b6" },
            { name: "EMIS", desc: "National Education Management Information System", icon: "📁", link: "http://apps.education.gov.pg:8080/ords/f?p=2024:LOGIN_DESKTOP:10435020109091", color: "#3498db" },
            { name: "MyTask", desc: "Official Task Tracking & Management System", icon: "📋", link: "https://mytask.education.gov.pg", color: "#16a085" },
            { name: "Teachers ID-NID", desc: "Teacher ID & NID Registration Tracking", icon: "🆔", link: "https://gfb742e44b55c34-doeapps.adb.ap-sydney-1.oraclecloudapps.com/ords/r/emis/doenid/login", color: "#2c3e50" },
            { name: "MyAcquittal", desc: "Official Acquittal Submission & Management", icon: "📉", link: "http://apps.education.gov.pg:8081/ords/f?p=133", color: "#d35400" },
            { name: "MyLeave", desc: "Personal Leave Management for Education Staff", icon: "⛱️", link: "http://apps.education.gov.pg:8081/ords/f?p=128", color: "#27ae60" },
            { name: "TQMS", desc: "Teacher Query Management System (TQMS)", icon: "💬", link: "https://tqms.education.gov.pg", color: "#f1c40f" },
            { name: "MyPNGSchool", desc: "PNG School Management Tool for Schools", icon: "🏫", link: "http://mypng.school/", color: "#8e44ad" },
            { name: "eNRC: Rating", desc: "National Rating & Evaluation System", icon: "⭐", link: "http://apps.education.gov.pg:8081/ords/f?p=102", color: "#e67e22" },
            { name: "HRM System", desc: "NDoE Human Resource Management System", icon: "👔", link: "https://metricserp.net/png-education-hrms/", color: "#34495e" },
            { name: "Teacher Registration", desc: "Official Teacher Registration & Certification", icon: "📜", link: "http://apps.education.gov.pg:8081/ords/f?p=120", color: "#1abc9c" },
            { name: "PCMS", desc: "Procurement & Contracts Management System", icon: "📝", link: "http://apps.education.gov.pg:8081/ords/f?p=PCMS", color: "#7f8c8d" },
            { name: "My Projects", desc: "Infrastructure Project Monitoring System", icon: "🏗️", link: "https://myprojects.education.gov.pg/", color: "#c0392b" },
            { name: "NASSA", desc: "NASSA Guide Application & Standards", icon: "🛡️", link: "https://education.gov.pg/nassaguides/", color: "#2980b9" }
        ];

        return `
            <div style="min-height: 350px; padding: 4rem 1.5rem; display:flex; flex-direction:column; align-items:center; justify-content:center; background: linear-gradient(135deg, rgba(0, 112, 243, 0.6), rgba(10, 13, 20, 0.8), rgba(245, 166, 35, 0.3)), url('assets/images/other-tabs-header-banner/banner-bg.png') center/cover no-repeat; border-bottom: 1px solid var(--glass-border); position: relative;">
                <div style="text-align: center;">
                    <h1 style="font-size: 3.5rem; margin-bottom: 0.5rem; background: linear-gradient(to right, #fff, var(--text-muted)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">DoE App Gallery</h1>
                    <p style="color: var(--text-muted); font-size: 1.2rem; max-width: 700px; margin: 0 auto;">Access all official Department of Education management systems and digital platforms in one place.</p>
                </div>
            </div>

            <section class="section-full">
                <div class="grid-3" style="gap: 1.5rem;">
                    ${apps.map(app => `
                        <a href="${app.link}" target="_blank" class="card glass-panel app-gallery-card" style="padding: 1.5rem; display: flex; align-items: flex-start; gap: 1rem; text-decoration: none;">
                            <div class="app-icon-circle" style="background: ${app.color}15; color: ${app.color}; border: 1px solid ${app.color}20; width: 60px; height: 60px; border-radius: 14px; display: flex; align-items: center; justify-content:center; font-size: 2rem; flex-shrink: 0;">
                                ${app.icon}
                            </div>
                            <div style="flex-grow: 1;">
                                <h3 style="margin-bottom: 0.3rem; font-size: 1.15rem; color: #fff;">${app.name}</h3>
                                <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.4; margin: 0;">${app.desc}</p>
                            </div>
                        </a>
                    `).join('')}
                </div>
            </section>

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
        `;
    }
};
