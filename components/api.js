/**
 * Frontend API Helper
 * Used by all components to fetch dynamic content from the PHP backend.
 * Falls back to showing empty state if the API is unavailable.
 */
window.DoEAPI = {
    base: 'api',

    async get(endpoint) {
        try {
            const response = await fetch(`${this.base}/${endpoint}`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
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
    }
};
