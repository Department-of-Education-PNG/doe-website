window.FormTeacherQueryComponent = {
    render: async () => {
        return `
            <div style="min-height: 300px; padding: 4rem 1.5rem; display:flex; flex-direction:column; align-items:center; justify-content:center; background: linear-gradient(135deg, rgba(0, 112, 243, 0.6), rgba(10, 13, 20, 0.8), rgba(245, 166, 35, 0.3)), url('assets/images/other-tabs-header-banner/banner-bg.png') center/cover no-repeat; border-bottom: 1px solid var(--glass-border);">
                <div>
                    <a href="#forms" class="nav-link" style="color: var(--text-muted);">&larr; Back to All Forms</a>
                    <h1 style="font-size: 3rem; text-align: center; margin-top: 1rem; margin-bottom: 0;">Teacher Query (EDB021)</h1>
                    <p style="text-align: center; color: var(--text-muted); font-size: 1.2rem;">Detailed Instructions and Application Process</p>
                </div>
            </div>

            <section class="section-full">
                <div class="grid-2">
                    <div class="card glass-panel" style="border-left: 4px solid var(--primary);">
                        <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Instructions</h2>
                        <ul style="color: var(--text-muted); padding-left: 1.5rem; line-height: 1.8;">
                            <li>Ensure all personal details are filled out accurately in Section A.</li>
                            <li>Your File Number must match the records held by the Teaching Service Commission.</li>
                            <li>State clearly the nature of your query in Section B. If querying pay, attach your recent payslip.</li>
                            <li>The query must be endorsed by the Head Teacher or School Inspector before submission.</li>
                            <li>Processing time is typically 14 working days from the date of receipt by NDoE Headquarters.</li>
                        </ul>
                    </div>
                    
                    <div class="card glass-panel" style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">📄</div>
                        <h3 style="margin-bottom: 1rem;">Ready to apply?</h3>
                        <p style="color: var(--text-muted); margin-bottom: 2rem;">Download the official EDB021 form below. Print, fill out, and submit to your provincial education advisor.</p>
                        <a href="#" class="btn-primary" style="width: 100%; max-width: 300px;">Download PDF Form</a>
                    </div>
                </div>
            </section>
        `;
    }
};
