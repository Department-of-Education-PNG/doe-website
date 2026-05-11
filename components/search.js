/**
 * Internal Site Search Engine — Dynamic Version
 * Fetches latest content index from API on load
 */
window.SiteSearch = (() => {
    let searchIndex = [];
    let isInitialized = false;

    /**
     * Fetch the latest searchable content from the database
     */
    async function loadIndex() {
        try {
            // Fetch dynamic index from API
            const response = await fetch('api/search_data.php');
            const result = await response.json();
            
            if (result && result.data) {
                searchIndex = result.data;
                isInitialized = true;
                console.log('🔍 Search index loaded:', searchIndex.length, 'items');
            } else {
                throw new Error('Invalid search data response');
            }
        } catch (e) {
            console.error('❌ Search index load failed:', e);
            // Fallback for extreme cases (if API fails or offline)
            searchIndex = [
                { title: 'Home', description: 'Department of Education homepage.', url: '#home', category: 'Page', icon: '🏠' },
                { title: 'About Us', description: 'Learn about the Department mission.', url: '#about', category: 'Page', icon: '🏛️' },
                { title: 'News & Events', description: 'Latest updates and press releases.', url: '#news', category: 'Page', icon: '📰' },
                { title: 'Contact Us', description: 'Get in touch with the Department.', url: '#contact', category: 'Page', icon: '📞' }
            ];
        }
    }

    /**
     * Search implementation with scoring logic
     */
    function search(query) {
        if (!query || query.trim().length < 2) return [];
        const terms = query.toLowerCase().split(/\s+/);
        
        return searchIndex.map(item => {
            const titleLower = (item.title || '').toLowerCase();
            const descLower = (item.description || '').toLowerCase();
            const catLower = (item.category || '').toLowerCase();
            let score = 0;

            for (const term of terms) {
                if (titleLower === term) score += 100;
                else if (titleLower.startsWith(term)) score += 50;
                else if (titleLower.includes(term)) score += 30;
                
                if (catLower.includes(term)) score += 20;
                if (descLower.includes(term)) score += 10;
            }

            return { ...item, score };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8);
    }

    function highlightMatch(text, query) {
        if (!query) return text;
        const terms = query.split(/\s+/).filter(t => t.length >= 2);
        let result = text;
        for (const term of terms) {
            const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            result = result.replace(regex, '<mark style="background: rgba(59,165,224,0.3); color: #fff; padding: 0 2px; border-radius: 3px;">$1</mark>');
        }
        return result;
    }

    function renderResults(results, query) {
        const container = document.getElementById('search-results');
        if (!container) return;

        if (results.length === 0 && query.length >= 2) {
            container.innerHTML = `
                <div class="search-no-results">
                    <span style="font-size: 2rem;">🔍</span>
                    <p>No results found for "<strong>${query}</strong>"</p>
                    <p style="font-size: 0.85rem; margin-top: 0.5rem; color: var(--text-muted);">Try different keywords or check your spelling.</p>
                </div>
            `;
            return;
        }

        if (results.length === 0) {
            container.innerHTML = '<div class="search-placeholder-text">Start typing to find pages, news articles, forms, and more...</div>';
            return;
        }

        container.innerHTML = results.map(item => `
            <a href="${item.url}" class="search-result-item" onclick="SiteSearch.close()">
                <div class="search-result-icon">${item.icon || '🔗'}</div>
                <div class="search-result-text">
                    <h4 style="margin:0; font-size: 1.1rem; color: #fff;">${highlightMatch(item.title, query)}</h4>
                    <p style="margin:0.3rem 0; font-size: 0.85rem; color: var(--text-muted); line-height: 1.4;">${highlightMatch(item.description, query)}</p>
                    <span class="search-result-tag" style="font-size: 0.7rem; text-transform: uppercase; background: rgba(59,165,224,0.2); color: var(--primary); padding: 2px 8px; border-radius: 4px; display: inline-block; margin-top: 4px;">${item.category}</span>
                </div>
            </a>
        `).join('');
    }

    function open() {
        const overlay = document.getElementById('search-overlay');
        const input = document.getElementById('site-search-input');
        if (overlay) {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            setTimeout(() => input && input.focus(), 300);
            
            // Re-fetch index to ensure it's always current
            loadIndex();
        }
    }

    function close() {
        const overlay = document.getElementById('search-overlay');
        const input = document.getElementById('site-search-input');
        const results = document.getElementById('search-results');
        if (overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            if (input) input.value = '';
            if (results) results.innerHTML = '<div class="search-placeholder-text">Start typing to find pages, news articles, forms, and more...</div>';
        }
    }

    function init() {
        const toggleBtns = document.querySelectorAll('.search-toggle');
        const closeBtn = document.getElementById('search-close-btn');
        const input = document.getElementById('site-search-input');

        toggleBtns.forEach(btn => btn.addEventListener('click', open));
        if (closeBtn) closeBtn.addEventListener('click', close);

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') close();
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                open();
            }
        });

        // Live Search
        if (input) {
            input.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                const results = search(query);
                renderResults(results, query);
            });
        }

        // Initial Index Load
        loadIndex();
    }

    // Auto-init
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    return { open, close, search, refresh: loadIndex };
})();
