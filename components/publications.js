window.PublicationsComponent = {
    render: async () => {
        const apiData = await DoEAPI.get('publications.php');
        const allDocs = (apiData && apiData.data) ? apiData.data.filter(d => !String(d.category).includes('Calendar')) : [];

        // Grouping logic
        const categories = {};
        allDocs.forEach(doc => {
            const cat = doc.category || 'General';
            if (!categories[cat]) categories[cat] = [];
            categories[cat].push(doc);
        });

        const sortedCats = Object.keys(categories).sort();

        function renderPubSection(id, title, docs) {
            return `
                <div id="${id}" class="table-scroll-wrap card glass-panel reveal-up" style="padding: 0; overflow: hidden; margin-top: var(--section-spacing); border-radius: 32px; border: 1px solid var(--glass-border);">
                    <div style="background: var(--bg-deeper); padding: 2rem; border-bottom: 1px solid var(--glass-border); display: flex; flex-direction: column; align-items: flex-start; gap: 0.75rem;">
                        <h2 style="margin: 0; color: #fff; font-size: 1.6rem; font-weight: 800;">${title}</h2>
                        <span style="background: var(--primary); color: #fff; padding: 0.4rem 1rem; border-radius: 100px; font-size: 0.75rem; font-weight: 700;">${docs.length} Documents</span>
                    </div>
                    <div class="table-inner">
                        <table class="glass-table" style="min-width: 580px;">
                            <thead>
                                <tr style="background: rgba(255,255,255,0.02); border-bottom: 1px solid var(--glass-border);">
                                    <th style="padding: 1.5rem 2rem; color: var(--text-muted); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px;">Document Name</th>
                                    <th style="padding: 1.5rem 2rem; color: var(--text-muted); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; text-align: center;">Format</th>
                                    <th style="padding: 1.5rem 2rem; color: var(--text-muted); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; text-align: right;">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${docs.map((doc, index) => `
                                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); background: ${index % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)'}; transition: background 0.3s; cursor: pointer;" onmouseover="this.style.background='rgba(59, 165, 224, 0.05)'" onmouseout="this.style.background='${index % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)'}'">
                                    <td style="padding: 1.5rem 2rem; font-weight: 600; font-size: 1.1rem; color: #fff;">
                                        <div style="display: flex; align-items: center; gap: 1rem;">
                                            <div style="width: 40px; height: 40px; background: rgba(59,165,224,0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--primary-light);">
                                                <i data-lucide="file-text" style="width: 20px; height: 20px;"></i>
                                            </div>
                                            ${doc.title}
                                        </div>
                                    </td>
                                    <td style="padding: 1.5rem 2rem; text-align: center;">
                                        <span style="color: var(--text-muted); font-weight: 700; font-size: 0.8rem; background: rgba(255,255,255,0.05); padding: 0.3rem 0.8rem; border-radius: 6px;">PDF</span>
                                    </td>
                                    <td style="padding: 1.5rem 2rem; text-align: right;">
                                        <div style="display: flex; gap: 0.8rem; justify-content: flex-end;">
                                            <a href="${DoEAPI.imgUrl(doc.pdf_path) || '#'}" target="_blank" rel="noopener noreferrer" class="glass-button" style="padding: 0.6rem 1.2rem; font-size: 0.85rem; background: rgba(59, 165, 224, 0.1); color: var(--primary-light); border: 1px solid var(--primary); border-radius: 8px; font-weight: 700; transition: all 0.2s; text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem;">
                                                <i data-lucide="eye" style="width: 14px; height: 14px;"></i> View
                                            </a>
                                            <a href="${DoEAPI.imgUrl(doc.pdf_path) || '#'}" download="${doc.title}.pdf" class="glass-button" style="padding: 0.6rem 1.2rem; font-size: 0.85rem; background: var(--primary); color: #fff; border: 1px solid var(--primary); border-radius: 8px; font-weight: 700; transition: all 0.2s; box-shadow: 0 4px 12px rgba(59, 165, 224, 0.3); text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem;">
                                                <i data-lucide="download" style="width: 14px; height: 14px;"></i> Download
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        }

        // Empty State
        if (allDocs.length === 0) {
            return `
                <section class="internal-hero reveal-up">
                    <div class="hero-content-container">
                        <div class="hero-content">
                            <h1 class="reveal-up">Publications</h1>
                            <p class="reveal-up">Official reports, legislations, and strategic policy documents.</p>
                        </div>
                    </div>
                </section>
                <section class="section-full reveal-up" style="padding: 10rem 0; text-align: center;">
                    <div class="glass-panel" style="display: inline-block; padding: 3rem 5rem;">
                        <i data-lucide="file-text" style="width: 48px; height: 48px; color: var(--text-muted); margin-bottom: 1rem;"></i>
                        <h2 style="color: var(--text-muted);">No publications available</h2>
                        <p>Please check back later for official documents and reports.</p>
                    </div>
                </section>
            `;
        }

        const formatLabel = (cat) => cat.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

        return `
            <section class="internal-hero reveal-up">
                <div class="hero-content-container">
                    <div class="hero-content">
                        <h1 class="reveal-up">Publications</h1>
                        <p class="reveal-up">Access official reports, legislations, and strategic policy documents.</p>
                    </div>
                </div>
            </section>

            <section class="section-full reveal-up" style="padding: var(--section-spacing) 0;">
                <div id="pub-tabs-container" style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: var(--header-margin); background: var(--bg-deeper); padding: 1rem; border-radius: 100px; border: 1px solid var(--glass-border); max-width: 1000px; margin-left: auto; margin-right: auto;">
                    ${sortedCats.map((cat, i) => `
                        <button class="pub-tab-btn ${i === 0 ? 'active-tab' : ''}" 
                                style="border: none; background: ${i === 0 ? 'var(--primary)' : 'transparent'}; color: ${i === 0 ? '#fff' : 'var(--text-muted)'}; padding: 0.8rem 2rem; border-radius: 100px; font-size: 1rem; font-weight: 700; cursor: pointer; transition: all 0.3s ease;" 
                                onclick="document.querySelectorAll('.pub-tab-btn').forEach(b => { b.style.background='transparent'; b.style.color='var(--text-muted)' }); this.style.background='var(--primary)'; this.style.color='#fff'; document.getElementById('cat-${cat}').scrollIntoView({behavior: 'smooth', block: 'start'})">
                            ${formatLabel(cat)}
                        </button>
                    `).join('')}
                </div>

                <div class="section-header" style="text-align: left; margin-bottom: var(--header-margin);">
                    <h2 class="section-title" style="margin-bottom: 0;">Newly Published</h2>
                </div>
                
                <div class="marquee-container" style="margin-top: 1rem; border-radius: 32px; border: 1px solid var(--glass-border); padding: 2rem; background: var(--bg-deeper); overflow: hidden;">
                    <div class="marquee-track" style="display: flex; gap: 2rem;">
                        ${allDocs.slice(0, 8).map(doc => `
                             <div class="glass-panel" style="width: 140px !important; max-width: 140px !important; min-width: 140px !important; height: auto; padding: 0; border-radius: 12px; overflow: hidden; border: 1px solid var(--glass-border); flex-shrink: 0; transition: transform 0.3s ease;">
                                <img src="${DoEAPI.imgUrl(doc.thumbnail_path) || 'https://placehold.co/400x520/0a0d14/3ba5e0/png?text=DoE+Publication'}" alt="${doc.title}" style="width: 100% !important; height: 200px !important; object-fit: cover !important; display: block;">
                                <div style="padding: 0.6rem; background: rgba(0,0,0,0.8);">
                                    <h4 style="font-size: 0.7rem; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #fff; font-weight: 600;">${doc.title}</h4>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                ${sortedCats.map(cat => renderPubSection(`cat-${cat}`, formatLabel(cat), categories[cat])).join('')}
            </section>
        `;
    }
};
