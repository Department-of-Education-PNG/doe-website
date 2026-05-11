/**
 * Calendars & Term Dates Component
 * Dynamic version: Fetches PDF calendars from the Publications API.
 */
window.CalendarsComponent = {
    async render() {
        // Initial layout with a container for dynamic content
        return `
            <section class="internal-hero">
                <div class="container">
                    <div class="hero-content-container">
                        <h1>Calendars & Term Dates</h1>
                        <p>Official school calendars, holiday schedules, and divisional term dates.</p>
                    </div>
                </div>
                <div class="hero-wave">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V46.29C80.7,71.4,192.32,80.05,321.39,56.44Z" class="shape-fill"></path>
                    </svg>
                </div>
            </section>

            <section class="section-full">
                <div class="container">
                    <div id="calendars-container">
                        <div class="grid-2">
                            ${this.renderSkeletons()}
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    renderSkeletons() {
        let html = '';
        for(let i=0; i<4; i++) {
            html += `
                <div class="glass-panel p-4 h-100 skeleton-wrapper">
                    <div class="skeleton mb-3" style="width: 30%; height: 20px;"></div>
                    <div class="skeleton mb-2" style="width: 80%; height: 30px;"></div>
                    <div class="skeleton mb-4" style="width: 100%; height: 60px;"></div>
                    <div class="d-flex gap-3">
                        <div class="skeleton" style="flex: 1; height: 45px; border-radius: 30px;"></div>
                        <div class="skeleton" style="flex: 1; height: 45px; border-radius: 30px;"></div>
                    </div>
                </div>
            `;
        }
        return html;
    },

    async afterRender() {
        const container = document.getElementById('calendars-container');
        if (!container) return;

        // Fetch all publications and filter for any calendar-related categories
        // This ensures visibility even if the backend 'Calendars' aggregate query is out of sync
        const response = await window.DoEAPI.get('publications.php');
        
        const calendars = (response && response.data) 
            ? response.data.filter(d => d.category && d.category.toLowerCase().includes('calendar'))
            : [];

        if (calendars.length === 0) {
            container.innerHTML = `
                <div class="empty-state glass-panel p-5 text-center">
                    <div class="icon-circle mx-auto mb-4" style="width: 80px; height: 80px; background: rgba(59, 165, 224, 0.1);">
                        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="var(--primary)" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    </div>
                    <h3>No Calendars Found</h3>
                    <p class="text-muted">Currently there are no dynamic calendars uploaded for the current year.</p>
                </div>
            `;
            return;
        }

        let html = '<div class="grid-2">';

        calendars.forEach(item => {
            const pdfUrl = window.DoEAPI.imgUrl(item.pdf_path);
            const thumbUrl = item.thumbnail_path ? window.DoEAPI.imgUrl(item.thumbnail_path) : null;
            
            if (!thumbUrl) {
                console.warn(`[Calendars] Missing thumbnail for: ${item.title}`, item);
            }
            
            const category = item.category || 'Calendars';
            
            html += `
                <div class="resource-card glass-panel reveal-up" style="display: flex; flex-direction: column; height: 100%; min-height: 480px; overflow: hidden; position: relative;">
                    <div class="resource-thumb" style="height: 200px; width: 100%; position: relative; background: rgba(0,0,0,0.3); overflow: hidden;">
                        <span class="resource-badge" style="position: absolute; top: 1rem; left: 1rem; background: var(--accent); color: #fff; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.75rem; font-weight: 700; z-index: 1;">${category}</span>
                        <div class="resource-year-badge" style="position: absolute; top: 1rem; right: 1rem; background: var(--primary); color: #fff; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.75rem; font-weight: 700;">${item.year || new Date().getFullYear()}</div>
                        ${thumbUrl ? 
                            `<img src="${thumbUrl}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover;">` : 
                            `<div class="resource-placeholder" style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: linear-gradient(135deg, rgba(59,165,224,0.15), rgba(245,166,35,0.1)); color: var(--primary);">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.5;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                <span style="font-size: 1.5rem; font-weight: 800; opacity: 0.3; letter-spacing: 2px;">${item.year || '2026'}</span>
                             </div>`
                        }
                    </div>
                    
                    <div class="resource-content" style="padding: 2rem; display: flex; flex-direction: column; flex: 1;">
                        <div class="resource-type" style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: var(--accent); margin-bottom: 0.75rem;">${item.category || 'Official Calendar'}</div>
                        <h3 style="margin-bottom: 1rem; font-size: 1.4rem; line-height: 1.3; color: #fff;">${item.title}</h3>
                        <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 2rem; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                            ${item.description || 'Official academic calendar and term dates released by the Department of Education.'}
                        </p>
                        
                        <div style="margin-top: auto; display: flex; gap: 1rem;">
                            <a href="${pdfUrl}" target="_blank" class="btn-secondary" style="flex: 1;">
                                ${item.pdf_path && item.pdf_path.toLowerCase().endsWith('.pdf') ? 'View PDF' : 'View Full Image'}
                            </a>
                            <a href="${pdfUrl}${pdfUrl.includes('?') ? '&' : '?'}download=1" download class="btn-primary" style="flex: 1;">Download</a>
                        </div>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        container.innerHTML = html;

        // Re-run animation observer for the new cards
        if (window.lucide) window.lucide.createIcons();
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('active');
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
    }
};
