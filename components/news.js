window.NewsComponent = {
    render: async () => {
        return `
            <div style="height: 300px; display:flex; align-items:center; justify-content:center; background: linear-gradient(135deg, rgba(80, 200, 120, 0.2), transparent); border-bottom: 1px solid var(--glass-border);">
                <div>
                    <h1 style="font-size: 3.5rem; text-align: center; margin-bottom: 0;">News & Events</h1>
                    <p style="text-align: center; color: var(--text-muted); font-size: 1.2rem;">Press Releases and Latest Updates</p>
                </div>
            </div>

            <section class="section-full">
                <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                    
                    <!-- News Item 1 -->
                    <div class="card glass-panel" style="display: flex; flex-direction: column; gap: 1rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem;">
                            <h3 style="margin: 0;">NDoE Graduate Teacher Recruitment of 2026</h3>
                            <span style="background: rgba(0, 112, 243, 0.2); color: #66b2ff; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.85rem;">25-02-2026</span>
                        </div>
                        <p style="color: var(--text-muted);">The Department of Education has officially opened applications for the Graduate Teacher Recruitment for the 2026 academic year.</p>
                        <a href="#" class="nav-link" style="align-self: flex-start; color: var(--primary);">View Full Story &rarr;</a>
                    </div>

                    <!-- News Item 2 -->
                    <div class="card glass-panel" style="display: flex; flex-direction: column; gap: 1rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem;">
                            <h3 style="margin: 0;">Government Allocates K904.5 Million</h3>
                            <span style="background: rgba(0, 112, 243, 0.2); color: #66b2ff; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.85rem;">10-02-2026</span>
                        </div>
                        <p style="color: var(--text-muted);">The Government of Papua New Guinea has officially allocated significant funding to support educational infrastructure and the GTFS policy.</p>
                        <a href="#" class="nav-link" style="align-self: flex-start; color: var(--primary);">View Full Story &rarr;</a>
                    </div>
                    
                    <!-- News Item 3 -->
                    <div class="card glass-panel" style="display: flex; flex-direction: column; gap: 1rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem;">
                            <h3 style="margin: 0;">Strict 2026 Mandate: No Enrollment Fee</h3>
                            <span style="background: rgba(0, 112, 243, 0.2); color: #66b2ff; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.85rem;">10-02-2026</span>
                        </div>
                        <p style="color: var(--text-muted);">In adherence to the new Government directives, public schools are strictly mandated not to charge project or enrollment fees for 2026.</p>
                        <a href="#" class="nav-link" style="align-self: flex-start; color: var(--primary);">View Full Story &rarr;</a>
                    </div>

                </div>
            </section>
        `;
    }
};
