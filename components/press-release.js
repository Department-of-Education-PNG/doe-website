window.PressReleaseComponent = {
    render: async () => {
        const releases = [
            {
                id: 1,
                date: 'March 15, 2024',
                title: 'Announcement of 2024 National Examinations Schedule',
                summary: 'The Department of Education officially releases the schedule for the upcoming Grade 10 and Grade 12 National Examinations for the 2024 academic year.',
                image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
                pdfUrl: '#'
            },
            {
                id: 2,
                date: 'February 22, 2024',
                title: 'Launching of Standard Based Curriculum (SBC) Digital Resources',
                summary: 'New digital platforms for teachers and students were launched today to support the implementation of the Standard Based Curriculum across all provinces.',
                image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
                pdfUrl: '#'
            },
            {
                id: 3,
                date: 'January 10, 2024',
                title: 'Ministerial Statement on Teacher Salary and Housing Adjustments',
                summary: 'The Minister for Education provides an update on the progress of the teacher salary re-classification and the newly proposed housing allowance for rural educators.',
                image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
                pdfUrl: '#'
            },
            {
                id: 4,
                date: 'December 05, 2023',
                title: '2023 National Education Infrastructure Report Released',
                summary: 'The comprehensive report detailing the status of school infrastructure and the maintenance requirements for the 2024-2028 modernization program.',
                image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800',
                pdfUrl: '#'
            }
        ];

        return `
            <div class="subpage-header" style="background: linear-gradient(135deg, rgba(14, 32, 64, 0.95) 0%, rgba(14, 32, 64, 0.8) 100%), url('assets/images/other-tabs-header-banner/banner-bg.png') center/cover; padding: 10rem 2rem 6rem; text-align: center; position: relative; overflow: hidden;">
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at center, var(--primary-glow) 0%, transparent 70%); opacity: 0.3; pointer-events: none;"></div>
                <div class="container" style="max-width: 1200px; margin: 0 auto; position: relative; z-index: 1;">
                    <h1 style="font-size: clamp(2.5rem, 8vw, 4rem); font-weight: 800; margin-bottom: 1.5rem; letter-spacing: -1.5px; line-height: 1.1;">Press Releases</h1>
                    <div style="width: 80px; height: 4px; background: var(--accent); margin: 0 auto 2rem; border-radius: 2px;"></div>
                    <p style="font-size: 1.25rem; color: var(--text-muted); max-width: 800px; margin: 0 auto; line-height: 1.6;">Official statements, announcements, and reports from the Department of Education.</p>
                </div>
            </div>

            <section class="section-full">
                <div class="container" style="max-width: 1000px; margin: 0 auto;">
                    <!-- Filter and Search -->
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4rem; flex-wrap: wrap; gap: 2rem;">
                        <h3 style="font-size: 1.8rem; font-weight: 700; color: #fff;">Latest Releases</h3>
                        <div class="glass-panel" style="display: flex; align-items: center; padding: 0.5rem 1.5rem; border-radius: 30px;">
                            <input type="text" placeholder="Filter announcements..." style="background: transparent; border: none; color: #fff; outline: none; padding: 0.5rem; width: 250px;">
                            <span style="opacity: 0.5;">🔍</span>
                        </div>
                    </div>

                    <!-- Press Release List -->
                    <div class="press-list" style="display: flex; flex-direction: column; gap: 2rem;">
                        ${releases.map(release => `
                            <div class="glass-panel press-card" style="display: grid; grid-template-columns: 250px 1fr; gap: 2rem; padding: 1.5rem; border-radius: 24px; transition: transform 0.3s ease; border: 1px solid var(--glass-border);">
                                <div style="height: 180px; border-radius: 16px; overflow: hidden;">
                                    <img src="${release.image}" alt="${release.title}" style="width: 100%; height: 100%; object-fit: cover;">
                                </div>
                                <div style="display: flex; flex-direction: column; justify-content: center;">
                                    <span style="color: var(--accent); font-weight: 700; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 0.5rem;">${release.date}</span>
                                    <h4 style="font-size: 1.4rem; color: #fff; margin-bottom: 1rem; line-height: 1.3;">${release.title}</h4>
                                    <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.6; margin-bottom: 1.5rem;">${release.summary}</p>
                                    <div style="display: flex; gap: 1rem;">
                                        <a href="${release.pdfUrl}" class="btn-primary" style="padding: 0.6rem 1.5rem; font-size: 0.9rem; border-radius: 12px; display: inline-flex; align-items: center; gap: 0.5rem;">
                                            <span>📄</span> Read Statement
                                        </a>
                                        <button class="nav-link" style="padding: 0.6rem 1.5rem; font-size: 0.9rem; opacity: 0.8;">Share</button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div style="text-align: center; margin-top: 5rem;">
                        <button class="nav-link" style="font-size: 1.1rem; font-weight: 600; text-decoration: underline;">Load older statements</button>
                    </div>
                </div>
            </section>
        `;
    }
};
