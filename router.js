// SPA Router
class Router {
    constructor() {
        this.routes = {};
        this.appContent = document.getElementById('app-content');
        
        // Listen to hash changes
        window.addEventListener('hashchange', () => this.handleRoute());
        // Handle initial load
        window.addEventListener('load', () => this.handleRoute());
    }

    addRoute(path, component) {
        this.routes[path] = component;
    }

    async handleRoute() {
        // 1. Check for Maintenance Mode
        try {
            const settingsResp = await fetch('api/settings.php?action=get');
            const settings = await settingsResp.json();
            
            if (settings && settings.maintenance_mode === true) {
                this.appContent.innerHTML = `
                    <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; height:70vh; text-align:center; padding:2rem; animation: fadeIn 0.8s ease;">
                        <div style="font-size:5rem; margin-bottom:2rem; filter: drop-shadow(0 0 20px rgba(255,165,0,0.3));">🚧</div>
                        <h1 style="font-family:'Outfit',sans-serif; font-size:2.8rem; margin-bottom:1rem; background:linear-gradient(to right, #fff, #bce0ff); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">Site Maintenance</h1>
                        <p style="color:var(--text-muted); font-size:1.2rem; max-width:500px; line-height:1.6;">We are currently performing scheduled maintenance to improve our services. We'll be back online shortly. Thank you for your patience!</p>
                        <div style="margin-top:3rem; padding:1.5rem 3rem; border:1px solid rgba(255,255,255,0.1); border-radius:32px; background:rgba(255,255,255,0.03); backdrop-filter:blur(10px);">
                            <i data-lucide="building-2" style="width:48px; height:48px; color:rgba(255,255,255,0.3); margin:0 auto; display:block;"></i>
                            <p style="font-size:0.8rem; margin-top:0.8rem; color:rgba(255,255,255,0.4); text-transform:uppercase; letter-spacing:1px;">Official Website</p>
                        </div>
                    </div>
                `;
                this.appContent.style.opacity = '1';
                return; // Stop here
            }
        } catch (e) {
            console.warn("Maintenance check failed, continuing...", e);
        }

        let fullPath = window.location.hash.slice(1) || 'home';
        let basePath = fullPath.split('/')[0];
        
        // Find the route component, default to 404 if not found
        const component = this.routes[basePath];
        if (!component) {
            this.appContent.innerHTML = `
                <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; min-height:80vh; text-align:center; padding:2rem; animation: fadeIn 0.6s ease;">
                    <div style="font-size:7rem; line-height:1; margin-bottom:1.5rem; filter:drop-shadow(0 0 30px rgba(59,165,224,0.3));">🗺️</div>
                    <h1 style="font-family:'Outfit',sans-serif; font-size:clamp(2rem,6vw,4rem); font-weight:900; margin-bottom:0.5rem; background:linear-gradient(to right,#fff,#bce0ff); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">
                        Page Not Found
                    </h1>
                    <p style="color:var(--text-muted); font-size:1.15rem; max-width:480px; line-height:1.7; margin-bottom:2.5rem;">
                        The page <strong style="color:rgba(255,255,255,0.6);">#${basePath}</strong> doesn't exist. It may have been moved or the link is incorrect.
                    </p>
                    <div style="display:flex; flex-wrap:wrap; gap:1rem; justify-content:center; margin-bottom:3rem;">
                        <a href="#home" class="btn-primary" style="padding:0.9rem 2rem; border-radius:40px; font-weight:600;">🏠 Return Home</a>
                        <a href="#news" class="btn-primary" style="padding:0.9rem 2rem; border-radius:40px; font-weight:600; background:transparent; border:1px solid rgba(255,255,255,0.2); color:var(--text-muted);">📰 News</a>
                        <a href="#contact" class="btn-primary" style="padding:0.9rem 2rem; border-radius:40px; font-weight:600; background:transparent; border:1px solid rgba(255,255,255,0.2); color:var(--text-muted);">📞 Contact</a>
                    </div>
                    <div style="padding:1.2rem 2.5rem; border:1px solid rgba(255,255,255,0.08); border-radius:32px; background:rgba(255,255,255,0.02); backdrop-filter:blur(10px);">
                        <i data-lucide="map" style="width:32px; height:32px; color:rgba(255,255,255,0.2); margin:0 auto 0.5rem; display:block;"></i>
                        <p style="font-size:0.75rem; color:rgba(255,255,255,0.3); text-transform:uppercase; letter-spacing:1px; margin:0;">Papua New Guinea Education</p>
                    </div>
                </div>`;
            this.appContent.style.opacity = '1';
            return;
        }
        
        // Add fade out effect and quick loading indicator if slow
        this.appContent.style.opacity = '0.3';
        
        let loaded = false;
        const loaderTimeout = setTimeout(() => { 
            if(!loaded) this.appContent.innerHTML = `<div style="display:flex; justify-content:center; align-items:center; height:30vh; color:var(--text-muted);">
                <div style="width:24px; height:24px; border:2px solid var(--primary); border-top-color:transparent; border-radius:50%; animation:spin 0.8s linear infinite;"></div>
            </div>`;
        }, 300); // 300ms threshold before showing loader

        // Render the component
        try {
            const html = await component.render(fullPath);
            loaded = true;
            clearTimeout(loaderTimeout);
            
            this.appContent.innerHTML = html;
            this.appContent.style.opacity = '1';
            window.scrollTo({ top: 0 });

            // Initialize component specifics
            if(component.afterRender) {
                component.afterRender();
            }

            if (window.lucide) {
                window.lucide.createIcons();
            }

            // Init reveal-up observer
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, { threshold: 0.1 });
            document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));

        } catch (error) {
            loaded = true;
            clearTimeout(loaderTimeout);
            console.error('Component render failed:', error);
            this.appContent.innerHTML = `<div style="display:flex; flex-direction:column; justify-content:center; align-items:center; height:50vh; color:var(--text-muted); text-align:center; padding:2rem;">
                <div style="font-size:3rem; margin-bottom:1rem;">⚠️</div>
                <h2 style="color:#fff; margin-bottom:0.5rem;">Something went wrong</h2>
                <p>This page could not be loaded. Please try again or navigate to another page.</p>
                <a href="#home" class="btn-primary" style="margin-top:1.5rem;">Return to Home</a>
            </div>`;
            this.appContent.style.opacity = '1';
        }

        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            let linkHash = link.getAttribute('href');
            
            // 1. Direct match
            const isMatch = (linkHash === `#${basePath}` || linkHash === `#${fullPath}`);
            
            // 2. Hierarchical match (for dropdown parents)
            let isChildActive = false;
            const dropdown = link.closest('.dropdown');
            if (dropdown) {
                const childLinks = dropdown.querySelectorAll('.dropdown-item, .sub-item');
                childLinks.forEach(child => {
                    const childHash = child.getAttribute('href');
                    if(childHash === `#${basePath}` || childHash === `#${fullPath}`) {
                        isChildActive = true;
                    }
                });
            }

            if(isMatch || isChildActive) {
                link.classList.add('active');
            }
        });
    }
}

// Ensure components are loaded to window globally, then initialize router
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize settings in the background (Non-blocking)
    if (window.DoEAPI) {
        window.DoEAPI.loadSettings().then(settings => {
            if (settings) {
                // Header Sync
                if (settings.site_title) {
                    const titleEl = document.getElementById('header-title');
                    if (titleEl) titleEl.textContent = settings.site_title;
                }
                if (settings.site_subtitle) {
                    const subEl = document.getElementById('header-subtitle');
                    if (subEl) subEl.textContent = settings.site_subtitle;
                }
                if (settings.site_description) {
                    const metaDesc = document.querySelector('meta[name="description"]');
                    if (metaDesc) metaDesc.setAttribute('content', settings.site_description);
                }
                if (settings.site_logo) {
                    const fullLogoUrl = window.DoEAPI.imgUrl(settings.site_logo);
                    
                    // Header Logo
                    const headerLogo = document.getElementById('header-logo');
                    if (headerLogo) headerLogo.src = fullLogoUrl;

                    // Footer Logo (Independent)
                    const footerLogoKey = settings.footer_logo || settings.site_logo;
                    if (footerLogoKey) {
                        const fullFooterLogoUrl = window.DoEAPI.imgUrl(footerLogoKey);
                        document.querySelectorAll('.footer-logo').forEach(img => img.src = fullFooterLogoUrl);
                    }

                    // Favicon
                    const faviconKey = settings.site_favicon || settings.site_logo;
                    if (faviconKey) {
                        const fullFaviconUrl = window.DoEAPI.imgUrl(faviconKey);
                        const favicon = document.querySelector('link[rel="icon"]');
                        if (favicon) favicon.href = `${fullFaviconUrl}?v=${Date.now()}`;
                    }

                    // SEO Meta Logos
                    const ogImage = document.querySelector('meta[property="og:image"]');
                    if (ogImage) ogImage.setAttribute('content', window.location.origin + '/' + fullLogoUrl);
                    
                    const twitterImage = document.querySelector('meta[property="twitter:image"]');
                    if (twitterImage) twitterImage.setAttribute('content', window.location.origin + '/' + fullLogoUrl);
                }

                const copyEl = document.getElementById('footer-copyright');
                if (settings.site_copyright && copyEl) copyEl.textContent = settings.site_copyright;

                // Social Links
                const whatsappEl = document.getElementById('footer-social-whatsapp');
                const linkedinEl = document.getElementById('footer-social-linkedin');
                const facebookEl = document.getElementById('footer-social-facebook');

                if (whatsappEl) {
                    whatsappEl.style.display = settings.social_whatsapp ? 'flex' : 'none';
                    if (settings.social_whatsapp) whatsappEl.href = settings.social_whatsapp;
                }
                if (linkedinEl) {
                    linkedinEl.style.display = settings.social_linkedin ? 'flex' : 'none';
                    if (settings.social_linkedin) linkedinEl.href = settings.social_linkedin;
                }
                if (facebookEl) {
                    facebookEl.style.display = settings.social_facebook ? 'flex' : 'none';
                    if (settings.social_facebook) facebookEl.href = settings.social_facebook;
                }
            }
        }).catch(err => console.warn('Delayed settings load failed:', err));
    }

    // 2. Setup transition
    const appContainer = document.getElementById('app-content');
    if (appContainer) appContainer.style.transition = 'opacity 0.2s ease';

    // 3. Register routes and start router
    const router = new Router();
    window.router = router;
    
    if(window.HomeComponent) router.addRoute('home', window.HomeComponent);
    if(window.AboutComponent) router.addRoute('about', window.AboutComponent);
    if(window.ProgramsComponent) router.addRoute('programs', window.ProgramsComponent);
    if(window.PublicationsComponent) router.addRoute('publications', window.PublicationsComponent);
    if(window.NewsComponent) router.addRoute('news', window.NewsComponent);
    if(window.CareersComponent) router.addRoute('careers', window.CareersComponent);
    if(window.ContactComponent) router.addRoute('contact', window.ContactComponent);
    if(window.FormsComponent) router.addRoute('forms', window.FormsComponent);
    if(window.FormDetailComponent) router.addRoute('form-detail', window.FormDetailComponent);
    if(window.FormTeacherQueryComponent) router.addRoute('form-teacher-query', window.FormTeacherQueryComponent);
    if(window.AppGalleryComponent) router.addRoute('app-gallery', window.AppGalleryComponent);
    if(window.NewsDetailComponent) router.addRoute('news-detail', window.NewsDetailComponent);
    if(window.ElementaryComponent) router.addRoute('elementary', window.ElementaryComponent);
    if(window.PrimaryComponent) router.addRoute('primary', window.PrimaryComponent);
    if(window.SecondaryComponent) router.addRoute('secondary', window.SecondaryComponent);
    if(window.TextbooksComponent) router.addRoute('textbooks', window.TextbooksComponent);
    if(window.GalleryComponent) router.addRoute('gallery', window.GalleryComponent);
    if(window.PressReleaseComponent) router.addRoute('press-release', window.PressReleaseComponent);
    if(window.FAQComponent) router.addRoute('faq', window.FAQComponent);
    if(window.CalendarsComponent) router.addRoute('calendars', window.CalendarsComponent);
    
    // Legal routes
    if(window.LegalComponent) {
        router.addRoute('privacy', window.LegalComponent);
        router.addRoute('terms', window.LegalComponent);
        router.addRoute('accessibility', window.LegalComponent);
        router.addRoute('rti', window.LegalComponent);
    }
});

/* Global Notification System */
window.showToast = function(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let iconName = 'check-circle';
    if (type === 'error') iconName = 'alert-circle';
    if (type === 'info') iconName = 'info';

    toast.innerHTML = `<i data-lucide="${iconName}"></i><span>${message}</span>`;
    container.appendChild(toast);
    
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 4500);
};
