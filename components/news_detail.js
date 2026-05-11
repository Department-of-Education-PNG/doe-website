window.NewsDetailComponent = {
    render: async (fullPath) => {
        const slug = fullPath.split('/')[1] || '';
        
        if (!slug) {
            return `<div class="section-full" style="text-align:center; padding: 10vh 2rem;">
                <h2 style="color:var(--text-muted);">Article slug missing.</h2>
                <a href="#news" class="btn-primary" style="margin-top:1.5rem;">Back to News</a>
            </div>`;
        }

        // Fetch the article by slug
        const response = await DoEAPI.get(`news.php?slug=${slug}`);
        
        if (!response || !response.id) {
            return `<div class="section-full" style="text-align:center; padding: 10vh 2rem;">
                <h2 style="color:var(--text-muted); font-size: 3rem;">📄</h2>
                <h2 style="color:#fff; margin-bottom:1rem;">Article Not Found</h2>
                <p style="color:var(--text-muted);">The news story you are looking for might have been moved or archived.</p>
                <a href="#news" class="btn-primary" style="margin-top:2rem;">Back to News</a>
            </div>`;
        }

        const article = response;
        
        // Track view
        if (DoEAPI.trackView) DoEAPI.trackView('news', article.id);

        const publishDate = new Date(article.date_published).toLocaleDateString('en-GB', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });

        return `
            <!-- Article Hero -->
            <div style="min-height: 400px; padding: 6rem 1.5rem 4rem; display:flex; flex-direction:column; align-items:center; justify-content:center; background: linear-gradient(135deg, rgba(14, 32, 64, 0.9), rgba(59, 165, 224, 0.4)), url('${DoEAPI.imgUrl(article.image_path) || 'assets/images/hero/hero-1.jpg'}') center/cover no-repeat; border-bottom: 1px solid var(--glass-border); position: relative;">
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(14, 32, 64, 0.6); z-index: 1;"></div>
                <div style="position: relative; z-index: 2; max-width: 1000px; width: 100%; text-align: center;">
                    <span style="display: inline-block; background: var(--primary); color: #fff; padding: 0.3rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 600; margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 1px;">Official News</span>
                    <h1 style="font-size: clamp(1.8rem, 5vw, 3.5rem); line-height: 1.2; margin-bottom: 1.5rem; text-shadow: 0 2px 10px rgba(0,0,0,0.3);">${article.title}</h1>
                    <div style="display: flex; align-items: center; justify-content: center; gap: 2rem; color: rgba(255,255,255,0.8); font-size: 0.95rem;">
                        <span style="display: flex; align-items: center; gap: 0.5rem;">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            ${publishDate}
                        </span>
                        <span style="display: flex; align-items: center; gap: 0.5rem;">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            DoE Media Unit
                        </span>
                    </div>
                </div>
            </div>

            <section class="section-full" style="padding: var(--section-spacing) 0;">
                <div class="article-grid" style="display: grid; grid-template-columns: 1fr clamp(0px, 350px, 30vw); gap: var(--grid-gap); max-width: 1400px; margin: 0 auto;">
                    
                    <!-- Main Content -->
                    <article class="glass-panel" style="padding: var(--card-padding); border-radius: 24px;">
                        <div style="margin-bottom: 3rem; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.3); border: 1px solid var(--glass-border);">
                            <img src="${DoEAPI.imgUrl(article.image_path) || 'assets/images/hero/hero-1.jpg'}" alt="${article.title}" style="width: 100%; display: block;">
                        </div>

                        <div class="article-rich-content" style="font-size: 1.15rem; line-height: 1.9; color: rgba(255,255,255,0.9);">
                            ${(article.content || '').replace(/on\w+\s*=/gi, 'data-blocked=')}
                        </div>

                        <div style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--glass-border); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                            <a href="#news" class="nav-link" style="display: flex; align-items: center; gap: 0.5rem; color: var(--primary); font-weight: 600;">
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                                Back to All News
                                </a>
                            <div style="display: flex; gap: 1rem;">
                                <!-- Facebook -->
                                <button class="search-toggle" style="width: 40px; height: 40px;" title="Share on Facebook" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href), '_blank')">
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                </button>
                                <!-- WhatsApp -->
                                <button class="search-toggle" style="width: 40px; height: 40px;" title="Share on WhatsApp" onclick="window.open('https://api.whatsapp.com/send?text=' + encodeURIComponent(window.location.href), '_blank')">
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                                </button>
                                <!-- LinkedIn -->
                                <button class="search-toggle" style="width: 40px; height: 40px;" title="Share on LinkedIn" onclick="window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(window.location.href), '_blank')">
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                                </button>
                                <!-- Print -->
                                <button class="search-toggle" style="width: 40px; height: 40px;" title="Print Article" onclick="window.print()">
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                                </button>
                            </div>
                        </div>
                    </article>

                    <!-- Sidebar -->
                    <aside class="article-sidebar">
                        <div class="glass-panel" style="padding: var(--card-padding); border-radius: 20px; position: sticky; top: 100px;">
                            <h3 style="color: var(--accent); margin-bottom: 2rem; font-size: 1.3rem; display: flex; align-items: center; gap: 0.8rem;">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg>
                                More Recent Stories
                            </h3>
                            
                            <div id="more-news-container">
                                <div style="display:flex; justify-content:center; padding: 2rem;">
                                    <div style="width:20px; height:20px; border:2px solid var(--primary); border-top-color:transparent; border-radius:50%; animation:spin 0.8s linear infinite;"></div>
                                </div>
                            </div>

                            <div style="margin-top: 3rem; background: rgba(59, 165, 224, 0.1); padding: 2rem; border-radius: 16px; border: 1px solid rgba(59, 165, 224, 0.2); text-align: center;">
                                <h4 style="margin-bottom: 1rem;">Media Inquiries</h4>
                                <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem;">For official press statements or interview requests, please contact our media team.</p>
                                <a href="#contact" class="btn-primary" style="padding: 0.6rem 1.2rem; font-size: 0.9rem; width: 100%;">Contact Media Unit</a>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        `;
    },

    afterRender: async () => {
        // Initial icon creation for the main content
        const initLucide = () => {
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        };

        initLucide();
        // Fallback delay to ensure DOM state is ready
        setTimeout(initLucide, 100);
        
        // Load more news for the sidebar
        try {
            const sidebarData = await DoEAPI.get('news.php?limit=4');
            const container = document.getElementById('more-news-container');
            if (!container || !sidebarData || !sidebarData.data) {
                if(container) container.innerHTML = '<p style="color:var(--text-muted); font-size:0.9rem;">No other recent stories.</p>';
                return;
            }

            const currentSlug = window.location.hash.split('/')[1];
            const otherNews = sidebarData.data.filter(n => n.slug !== currentSlug).slice(0, 3);

            if (otherNews.length === 0) {
                container.innerHTML = '<p style="color:var(--text-muted); font-size:0.9rem;">No other recent stories.</p>';
                return;
            }

            container.innerHTML = otherNews.map(n => `
                <a href="#news-detail/${n.slug}" style="display: flex; gap: 1rem; margin-bottom: 1.8rem; text-decoration: none; group;">
                    <div style="width: 80px; height: 60px; border-radius: 8px; overflow: hidden; flex-shrink: 0; border: 1px solid var(--glass-border);">
                        <img src="${DoEAPI.imgUrl(n.image_path) || 'assets/images/hero/hero-1.jpg'}" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <div>
                        <h4 style="font-size: 0.95rem; margin-bottom: 0.3rem; line-height: 1.4; color: #fff; transition: color 0.3s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='#fff'">${n.title}</h4>
                        <span style="font-size: 0.75rem; color: var(--text-muted);">${new Date(n.date_published).toLocaleDateString('en-GB')}</span>
                    </div>
                </a>
            `).join('');

            // Call again after sidebar is loaded
            initLucide();

        } catch (e) {
            console.error('Failed to load sidebar news:', e);
            const container = document.getElementById('more-news-container');
            if(container) container.innerHTML = '<p style="color:var(--text-muted); font-size:0.9rem;">Unable to load recent stories.</p>';
        }
    }
};
