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
        let fullPath = window.location.hash.slice(1) || 'home';
        let basePath = fullPath.split('/')[0];
        
        // Find the route component, default to home if not found
        const component = this.routes[basePath] || this.routes['home'];
        
        // Add fade out effect
        this.appContent.style.opacity = '0';
        
        setTimeout(async () => {
            // Render the component passing the full path for dynamic behavior
            const html = await component.render(fullPath);
            this.appContent.innerHTML = html;
            
            // Allow time for DOM to update, then fade in
            requestAnimationFrame(() => {
                this.appContent.style.opacity = '1';
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // Initialize component specifics
                if(component.afterRender) {
                    component.afterRender();
                }
            });
        }, 300); // 300ms matches the transition

        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            let linkHash = link.getAttribute('href');
            if(linkHash === `#${basePath}` || linkHash === `#${fullPath}`) {
                link.classList.add('active');
            }
        });
    }
}

// Ensure components are loaded to window globally, then initialize router
document.addEventListener('DOMContentLoaded', () => {
    // Add fading transition style to `#app-content` via JS to be safe
    document.getElementById('app-content').style.transition = 'opacity 0.3s ease';

    const router = new Router();
    
    // Register routes mapped to components
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
    if(window.ElementaryComponent) router.addRoute('elementary', window.ElementaryComponent);
    if(window.PrimaryComponent) router.addRoute('primary', window.PrimaryComponent);
    if(window.SecondaryComponent) router.addRoute('secondary', window.SecondaryComponent);
    if(window.TextbooksComponent) router.addRoute('textbooks', window.TextbooksComponent);
});
