window.FormDetailComponent = {
    render: async (fullPath) => {
        const formId = fullPath.split('/')[1] || '';
        if (!formId) {
            return `<div class="section-full" style="text-align:center; padding: 10vh 2rem;">
                <h2 style="color:var(--text-muted);">Form ID missing.</h2>
                <a href="#forms" class="btn-primary" style="margin-top:1.5rem;">Back to Forms</a>
            </div>`;
        }

        // Fetch the individual form from the API
        const form = await DoEAPI.get(`forms.php?id=${formId}`);
        
        if (!form || !form.id) {
            return `<div class="section-full" style="text-align:center; padding: 10vh 2rem;">
                <h2 style="color:var(--text-muted); font-size: 3rem;">📄</h2>
                <h2 style="color:#fff; margin-bottom:1rem;">Form Not Found</h2>
                <p style="color:var(--text-muted);">The requested document could not be located in our registry.</p>
                <a href="#forms" class="btn-primary" style="margin-top:2rem;">Back to Forms</a>
            </div>`;
        }

        const title = form.title || "Form Details";
        const instructions = form.description || "Standard submission procedures apply. Fill fields clearly in block letters.";
        const pdfLink = DoEAPI.imgUrl(form.pdf_path);

        return `
            <div style="min-height: 300px; padding: 4rem 1.5rem; display:flex; flex-direction:column; align-items:center; justify-content:center; background: linear-gradient(135deg, rgba(0, 112, 243, 0.6), rgba(10, 13, 20, 0.8), rgba(245, 166, 35, 0.3)), url('assets/images/other-tabs-header-banner/banner-bg.png') center/cover no-repeat; border-bottom: 1px solid var(--glass-border);">
                <div style="text-align: center;">
                    <span style="display: block; color: var(--primary); font-weight: bold; margin-bottom: 0.5rem;"><a href="#forms" style="color: var(--primary); text-decoration: none;">&larr; Back to All Forms</a></span>
                    <h1 style="font-size: 2.8rem; margin-bottom: 0; max-width: 900px; padding: 0 2rem; background: linear-gradient(to right, #fff, #bce0ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${title}</h1>
                </div>
            </div>

            <section class="section-full">
                <div class="card glass-panel" style="max-width: 800px; margin: 0 auto; padding: 3rem;">
                    <h2 style="margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem;">Instructions & Guidelines</h2>
                    <div style="color: var(--text-muted); margin-bottom: 2rem; line-height: 1.8;">
                        ${instructions}
                    </div>
                    
                    <div style="background: rgba(0,0,0,0.3); padding: 2rem; border-radius: 12px; border: 1px dashed var(--glass-border); text-align: center;">
                        <h3 style="margin-bottom: 1rem;">${title}</h3>
                        <p style="color: var(--text-muted); margin-bottom: 1.5rem; font-size: 0.9rem;">By clicking download, you acknowledge that you have read and understood the instructions strictly outlined above.</p>
                        ${pdfLink 
                            ? `<a href="${pdfLink}" target="_blank" class="btn-primary" style="display: inline-block; padding: 0.8rem 2rem; font-size: 1.1rem;">Acknowledge & Download PDF</a>`
                            : `<div style="padding: 1rem; color: var(--accent); font-weight: 600;">Document asset temporarily unavailable. Please contact the Department.</div>`
                        }
                    </div>
                </div>
            </section>
        `;
    }
};
