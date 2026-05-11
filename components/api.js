/**
 * Frontend API Helper
 * Used by all components to fetch dynamic content from the PHP backend.
 * Falls back to showing empty state if the API is unavailable.
 */
window.DoEAPI = {
    base: 'api',
    siteRoot: window.location.origin,

    cdnBase: null, // Set to Cloudinary URL only in production with public DNS

    // Normalise any upload path to a root-relative URL (Clean URLs)
    imgUrl(path) {
        if (!path || path === '#' || path === '/') return '';
        if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) return path;
        
        // Normalize slashes and remove relative markers
        let clean = path.replace(/^(\.\.\/)+/, '').replace(/^\//, '');
        
        // Feature folders - transform "uploads/news/pic.jpg" to "news/pic.jpg"
        const featureMatch = clean.match(/^uploads\/(news|press|events|gallery|publications|textbooks|jobs|scholarships|forms|notices|apps|calendars)\/(.+)$/);
        if (featureMatch) {
            // Special case for masked folders
            if (featureMatch[1] === 'forms') {
                clean = `f${featureMatch[2]}`;
            } else if (featureMatch[1] === 'publications' || featureMatch[1] === 'textbooks') {
                clean = featureMatch[2]; // No prefix
            } else {
                clean = `${featureMatch[1]}/${featureMatch[2]}`;
            }
        } else {
            // Legacy/Default - strip "uploads/images/" or "uploads/documents/"
            clean = clean.replace(/^uploads\/(images|documents)\//, '');
        }

        // Return encoded path
        const finalPath = encodeURI(clean);

        // Use CDN globally (Make sure site is publicly accessible for Cloudinary to fetch)
        if (this.cdnBase) {
            return this.cdnBase + window.location.origin + '/' + finalPath;
        }
        
        return finalPath;
    },

    _cache: {},
    _cacheTime: 300000, // 5 minutes cache

    async get(endpoint) {
        // Simple caching to speed up navigation
        const now = Date.now();
        if (this._cache[endpoint] && (now - this._cache[endpoint].time < this._cacheTime)) {
            return this._cache[endpoint].data;
        }

        try {
            const response = await fetch(`${this.base}/${endpoint}`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            
            // Store in cache
            this._cache[endpoint] = { data: data, time: now };
            return data;
        } catch (e) {
            console.warn(`API unavailable (${endpoint}):`, e.message);
            return null;
        }
    },

    async post(endpoint, data) {
        try {
            const response = await fetch(`${this.base}/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (e) {
            console.warn(`API post failed (${endpoint}):`, e.message);
            return null;
        }
    },
    
    /**
     * Increments the view counter for a specific content item.
     * @param {string} type - 'news', 'jobs', or 'press-releases'
     * @param {number} id - The ID of the item
     */
    async trackView(type, id) {
        if (!id) return;
        const endpoint = type === 'press-releases' ? 'press-releases.php' : `${type}.php`;
        return this.get(`${endpoint}?action=increment_view&id=${id}`);
    },

    // Global settings store
    settings: null,

    /**
     * Loads site settings once and makes them globally accessible.
     */
    async loadSettings() {
        if (this.settings) return this.settings;
        const data = await this.get(`settings.php?v=${Date.now()}`);
        if (data) {
            this.settings = data;
            return data;
        }
        return {};
    }
};
