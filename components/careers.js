window.CareersComponent = {
    render: async () => {
        // Fetch jobs and scholarships in parallel
        const [jobsData, scholarshipsData] = await Promise.all([
            DoEAPI.get('jobs.php'),
            DoEAPI.get('scholarships.php')
        ]);

        // Process and categorize
        const allJobs = (jobsData && jobsData.data) ? jobsData.data : [];
        const legacyScholarships = (scholarshipsData && scholarshipsData.data) ? scholarshipsData.data : [];

        // Latest Job Openings (section 'job' or undefined/default)
        const jobs = allJobs.filter(j => !j.section || j.section === 'job');

        // Featured Scholarships (section 'scholarship' combined with legacy)
        const scholarshipListings = allJobs.filter(j => j.section === 'scholarship');
        const scholarships = [...scholarshipListings, ...legacyScholarships];


        return `
            <section class="internal-hero reveal-up">
                <div class="hero-content-container">
                    <div class="hero-content">
                        <h1 class="reveal-up">Careers & Scholarships</h1>
                        <p class="reveal-up hero-p" style="color: #d4e5f7;">Join Our Mission or Advance Your Education</p>
                    </div>
                </div>
            </section>

            <section class="section-full" style="padding: var(--section-spacing) 0;">
                <div class="container" style="max-width: 1200px; margin: 0 auto;">
                    
                    <!-- Jobs Section -->
                    <div style="margin-bottom: var(--header-margin);">
                        <h2 class="section-title text-left" style="color: var(--primary); margin-bottom: 2rem; border-left: 5px solid var(--primary); padding-left: 1rem; display: flex; align-items: center; gap: 0.8rem;">
                            <i data-lucide="briefcase" style="width: 28px; height: 28px;"></i>
                            Latest Job Openings
                        </h2>
                        <div class="grid-3" style="gap: var(--grid-gap);">
                            ${jobs.length > 0 ? jobs.map(job => `
                                <div class="card glass-panel" style="padding: var(--card-padding); height: 100%; display: flex; flex-direction: column;">
                                    <h3 style="margin-bottom: 0.5rem; color: #fff;">${job.title}</h3>
                                    <div style="color: var(--accent); font-weight: 600; font-size: 0.9rem; margin-bottom: 1rem;">${job.location || 'N/A'} &bull; ${job.job_type || 'Full-time'}</div>
                                    <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.5; flex-grow: 1;">Deadline for application: ${job.closing_date || 'Ongoing'}</p>
                                    ${job.pdf_path
                ? `<a href="${DoEAPI.imgUrl(job.pdf_path)}" target="_blank" class="btn-primary" style="margin-top: 1.5rem; display: inline-block; text-align: center;" onclick="DoEAPI.trackView && DoEAPI.trackView('jobs', ${job.id})">Download Vacancy</a>`
                : `<a href="#contact" class="btn-primary" style="margin-top: 1.5rem; display: inline-block; text-align: center;">Apply Now</a>`
            }
                                </div>
                            `).join('') : `
                                <div class="card glass-panel full-width" style="padding: 2rem; text-align: center; color: var(--text-muted);">
                                    <p>There are no current job openings. Please check back later.</p>
                                </div>
                            `}
                        </div>
                    </div>

                    <!-- Scholarships Section -->
                    <div>
                        <h2 class="section-title text-left" style="color: var(--accent); margin-bottom: 2rem; border-left: 5px solid var(--accent); padding-left: 1rem; display: flex; align-items: center; gap: 0.8rem;">
                            <i data-lucide="graduation-cap" style="width: 28px; height: 28px;"></i>
                            Featured Scholarships
                        </h2>
                        <div class="grid-3" style="gap: 1.5rem;">
                            ${scholarships.length > 0 ? scholarships.map(sch => {
                const schLink = sch.external_link || sch.apply_url || sch.link || sch.pdf_path || null;
                const schBtn = schLink
                    ? `<a href="${(DoEAPI.imgUrl && schLink.includes('uploads/')) ? DoEAPI.imgUrl(schLink) : schLink}" target="_blank" class="btn-primary" style="margin-top: 1.5rem; display: inline-block; text-align: center; border-color: var(--accent); color: var(--accent);">Apply Now</a>`
                    : `<a href="#contact" class="btn-primary" style="margin-top: 1.5rem; display: inline-block; text-align: center; background: transparent; border: 1px solid rgba(255,255,255,0.15); color: var(--text-muted);">Enquire Now</a>`;
                return `
                                <div class="card glass-panel" style="padding: 1.8rem; height: 100%; display: flex; flex-direction: column;">
                                    <h3 style="margin-bottom: 0.5rem; color: #fff;">${sch.title}</h3>
                                    <div style="color: var(--primary); font-weight: 600; font-size: 0.9rem; margin-bottom: 1rem;">Provider: ${sch.provider || sch.location || 'NDoE'}</div>
                                    <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.5; flex-grow: 1;">Closing Date: ${sch.deadline || sch.closing_date || 'TBA'}</p>
                                    ${schBtn}
                                </div>`;
            }).join('') : `
                                <div class="card glass-panel full-width" style="padding: 2rem; text-align: center; color: var(--text-muted);">
                                    <p>No featured scholarships are currently available.</p>
                                </div>
                            `}
                        </div>
                    </div>

                </div>
            </section>
        `;
    }
};

