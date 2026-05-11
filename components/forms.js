window.FormsComponent = {
    render: async () => {
        // Fetch forms from API
        const apiData = await DoEAPI.get('forms.php');
        const allForms = (apiData && apiData.data) ? apiData.data : [];

        // If no forms exist at all
        if (allForms.length === 0) {
            return `
                <div style="min-height: 300px; padding: 6rem 1.5rem 4rem; display:flex; flex-direction:column; align-items:center; justify-content:center; background: linear-gradient(135deg, rgba(0, 112, 243, 0.6), rgba(10, 13, 20, 0.8), rgba(245, 166, 35, 0.3)), url('assets/images/other-tabs-header-banner/banner-bg.png') center/cover no-repeat; border-bottom: 1px solid var(--glass-border);">
                    <h1 style="font-size: 3.5rem; text-align: center; margin-bottom: 0;">Public Forms & Legislation</h1>
                </div>
                <section class="section-full" style="padding: 10rem 0; text-align: center;">
                    <div class="glass-panel" style="display: inline-block; padding: 3rem 5rem;">
                        <i data-lucide="file-text" style="width: 48px; height: 48px; color: var(--text-muted); margin-bottom: 1rem;"></i>
                        <h2 style="color: var(--text-muted);">No forms available</h2>
                        <p>Please check back later for official documents and legislation.</p>
                    </div>
                </section>
            `;
        }

        // Group forms by category
        const categories = {};
        allForms.forEach(form => {
            const cat = form.category || 'General';
            if (!categories[cat]) categories[cat] = [];
            categories[cat].push(form);
        });

        const categoryOrder = Object.keys(categories).sort();

        return `
            <div style="min-height: 300px; padding: 6rem 1.5rem 4rem; display:flex; flex-direction:column; align-items:center; justify-content:center; background: linear-gradient(135deg, rgba(0, 112, 243, 0.6), rgba(10, 13, 20, 0.8), rgba(245, 166, 35, 0.3)), url('assets/images/other-tabs-header-banner/banner-bg.png') center/cover no-repeat; border-bottom: 1px solid var(--glass-border);">
                <div>
                    <h1 style="font-size: 3.5rem; text-align: center; margin-bottom: 0;">Public Forms & Legislation</h1>
                    <p style="text-align: center; color: var(--text-muted); font-size: 1.2rem;">Official documents, applications, and acts for teachers and the public</p>
                </div>
            </div>

            <section class="section-full" style="padding: var(--section-spacing) 0;">
                ${categoryOrder.map(catName => {
                    const forms = categories[catName];
                    const accentColor = forms[0].accent_color || 'var(--primary)';
                    const displayTitle = catName.charAt(0).toUpperCase() + catName.slice(1);
                    
                    return `
                        <!-- ${displayTitle} Table -->
                        <div class="table-scroll-wrap glass-panel" style="margin-bottom: 3rem; padding: var(--card-padding);">
                            <h2 style="color: ${accentColor}; margin-bottom: 1.5rem;">${displayTitle} ${catName.toLowerCase().includes('form') ? '' : 'Forms'}</h2>
                            <div class="table-inner">
                                <table class="glass-table">
                                    <thead>
                                        <tr>
                                            <th>Document Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${forms.map(form => `
                                            <tr>
                                                <td style="font-weight: 500;">${form.title}</td>
                                                <td>
                                                    ${form.pdf_path
                                                        ? `<a href="${DoEAPI.imgUrl(form.pdf_path)}" target="_blank" class="btn-table">Download PDF</a>`
                                                        : `<span style="font-size:0.8rem; padding:0.3rem 0.8rem; border-radius:6px; background:rgba(255,255,255,0.06); color:var(--text-muted); border:1px solid rgba(255,255,255,0.1);">Coming Soon</span>`
                                                    }
                                                    ${form.description ? `<p style="font-size:0.8rem; color:var(--text-muted); margin-top:0.4rem; font-weight:normal;">${form.description}</p>` : ''}
                                                </td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    `;
                }).join('')}
            </section>
        `;
    }
};

