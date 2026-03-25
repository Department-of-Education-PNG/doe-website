window.PublicationsComponent = {
    render: async () => {
        return `
            <div style="height: 300px; display:flex; align-items:center; justify-content:center; background: linear-gradient(135deg, rgba(0, 210, 255, 0.2), transparent); border-bottom: 1px solid var(--glass-border);">
                <div>
                    <h1 style="font-size: 3.5rem; text-align: center; margin-bottom: 0;">Publications</h1>
                    <p style="text-align: center; color: var(--text-muted); font-size: 1.2rem;">Reports, Legislations, and Policies</p>
                </div>
            </div>

            <section class="section-full">
                <div class="grid-2">
                    <div class="card glass-panel" style="border-left: 4px solid var(--primary);">
                        <span style="font-size: 0.8rem; color: var(--primary);">LATEST POLICY</span>
                        <h3 style="margin-top: 0.5rem;">GFEP 2026: Ministerial Policy Statement</h3>
                        <p style="color: var(--text-muted); margin-bottom: 1rem;">View the official 2026 policy statement detailing strategies for the Government Free Education Policy.</p>
                        <a href="#" class="nav-link" style="color: var(--primary);">Download PDF &rarr;</a>
                    </div>
                    <div class="card glass-panel" style="border-left: 4px solid var(--accent);">
                        <span style="font-size: 0.8rem; color: var(--accent);">REPORT</span>
                        <h3 style="margin-top: 0.5rem;">ACHIEVING SIGNIFICANT MILESTONES</h3>
                        <p style="color: var(--text-muted); margin-bottom: 1rem;">A comprehensive publication highlighting the top accomplishments of the NDoE in recent years.</p>
                        <a href="#" class="nav-link" style="color: var(--accent);">Download PDF &rarr;</a>
                    </div>
                    <div class="card glass-panel">
                        <span style="font-size: 0.8rem; color: var(--text-muted);">ARCHIVE (2025)</span>
                        <h3 style="margin-top: 0.5rem;">2025 MPS On GFEP</h3>
                        <a href="#" class="nav-link">View Document &rarr;</a>
                    </div>
                    <div class="card glass-panel">
                        <span style="font-size: 0.8rem; color: var(--text-muted);">PLANNING</span>
                        <h3 style="margin-top: 0.5rem;">13-Year Universal Ed In PNG</h3>
                        <a href="#" class="nav-link">View Document &rarr;</a>
                    </div>
                </div>
            </section>
        `;
    }
};
