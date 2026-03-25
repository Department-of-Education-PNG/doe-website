window.ProgramsComponent = {
    render: async () => {
        return `
            <div style="height: 300px; display:flex; align-items:center; justify-content:center; background: linear-gradient(135deg, rgba(245, 166, 35, 0.2), transparent); border-bottom: 1px solid var(--glass-border);">
                <div>
                    <h1 style="font-size: 3.5rem; text-align: center; margin-bottom: 0;">Programs & Services</h1>
                    <p style="text-align: center; color: var(--text-muted); font-size: 1.2rem;">Activities, e-Participations, and Consultations</p>
                </div>
            </div>

            <section class="section-full">
                <div class="grid-3">
                    <div class="card glass-panel" style="text-align: center; padding: 3rem 2rem;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">🎯</div>
                        <h3>Activities</h3>
                        <p style="color: var(--text-muted);">Latest programmatic updates and ongoing educational activities across the nation.</p>
                        <a href="#" class="btn-primary" style="margin-top: 1.5rem; display: inline-block;">View Activities</a>
                    </div>
                    <div class="card glass-panel" style="text-align: center; padding: 3rem 2rem;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">💻</div>
                        <h3>e-Participations</h3>
                        <p style="color: var(--text-muted);">Digital platforms enabling stakeholders to participate effectively in educational initiatives.</p>
                        <a href="#" class="btn-primary" style="margin-top: 1.5rem; display: inline-block;">Access Digital Portal</a>
                    </div>
                    <div class="card glass-panel" style="text-align: center; padding: 3rem 2rem;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">📝</div>
                        <h3>Consultation Papers</h3>
                        <p style="color: var(--text-muted);">Active and archived policy consultation documents available for public feedback.</p>
                        <a href="#" class="btn-primary" style="margin-top: 1.5rem; display: inline-block;">Download Papers</a>
                    </div>
                </div>
            </section>
        `;
    }
};
