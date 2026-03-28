window.CareersComponent = {
    render: async () => {
        return `
            <div style="min-height: 300px; padding: 4rem 1.5rem; display:flex; flex-direction:column; align-items:center; justify-content:center; background: linear-gradient(135deg, rgba(0, 112, 243, 0.6), rgba(10, 13, 20, 0.8), rgba(245, 166, 35, 0.3)), url('assets/images/other-tabs-header-banner/banner-bg.png') center/cover no-repeat; border-bottom: 1px solid var(--glass-border);">
                <div>
                    <h1 style="font-size: 3.5rem; text-align: center; margin-bottom: 0;">Careers</h1>
                    <p style="text-align: center; color: var(--text-muted); font-size: 1.2rem;">Join Our Mission to Educate Papua New Guinea</p>
                </div>
            </div>

            <section class="section-full">
                <div class="grid-2">
                    <div class="card glass-panel">
                        <div style="font-size: 2.5rem; margin-bottom: 1rem;">💼</div>
                        <h3>Job Opportunities</h3>
                        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Explore our graduate employment portal, teaching vacancies, and administrative roles within the NDoE.</p>
                        <a href="#" class="btn-primary" style="display: inline-block;">Browse Openings</a>
                    </div>
                    <div class="card glass-panel">
                        <div style="font-size: 2.5rem; margin-bottom: 1rem;">🎓</div>
                        <h3>Scholarships</h3>
                        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Find information about government-sponsored scholarships and education grants for furthering your studies.</p>
                        <a href="#" class="btn-primary" style="display: inline-block;">View Scholarships</a>
                    </div>
                </div>
            </section>
        `;
    }
};
