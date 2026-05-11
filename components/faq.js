/**
 * FAQ Component
 * Renders a dynamic, category-based FAQ section with a premium accordion interface.
 */
window.FAQComponent = {
    render: async function() {
        return `
            <section class="internal-hero reveal-up">
                <div class="hero-content-container">
                    <div class="hero-content">
                        <h1 class="reveal-up">Help & Support Center</h1>
                        <p class="reveal-up">Frequently Asked Questions — Your guide to education services, policies, and common inquiries in Papua New Guinea.</p>
                    </div>
                </div>
            </section>

            <section class="section-full" style="padding-top: 5rem;">
                <div class="container-1250">
                    <div class="faq-container" id="faq-content-target">
                        <div class="loading-state" style="text-align: center; padding: 5rem;">
                            <div class="spin" style="width: 50px; height: 50px; border: 3px solid var(--primary); border-top-color: transparent; border-radius: 50%; margin: 0 auto 1.5rem auto; animation: spin 0.8s linear infinite;"></div>
                            <p style="color: var(--text-muted); font-weight: 500;">Accessing FAQ Database...</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section-full" style="background: rgba(255,255,255,0.02); border-top: 1px solid var(--glass-border); padding: 5rem 0;">
                <div class="container-1250" style="text-align: center;">
                    <div class="glass-panel" style="max-width: 800px; margin: 0 auto; padding: 4rem 2rem;">
                        <h2 style="margin-bottom: 1rem; font-size: 2.5rem;">Still have questions?</h2>
                        <p style="color: var(--text-muted); max-width: 600px; margin: 0 auto 2.5rem auto; font-size: 1.1rem;">
                            Our dedicated support team is ready to assist you. Contact the Department of Education for specific queries or technical assistance.
                        </p>
                        <a href="#contact" class="btn-primary" style="padding: 1.2rem 3rem; border-radius: 50px; font-weight: 700; font-size: 1rem; display: inline-flex; align-items: center; gap: 10px;">
                            <i data-lucide="mail"></i> Get in Touch
                        </a>
                    </div>
                </div>
            </section>
        `;
    },

    afterRender: async function() {
        const target = document.getElementById('faq-content-target');
        
        try {
            const resp = await fetch('api/faq.php');
            const result = await resp.json();

            if (!result.success || !result.data || result.data.length === 0) {
                target.innerHTML = `
                    <div class="glass-panel" style="text-align: center; padding: 4rem;">
                        <i data-lucide="help-circle" style="width: 64px; height: 64px; color: var(--primary); margin-bottom: 1.5rem; opacity: 0.5;"></i>
                        <h3>No FAQs Found</h3>
                        <p style="color: var(--text-muted);">We couldn't find any frequently asked questions at the moment. Please check back later or contact us directly.</p>
                    </div>
                `;
                if (window.lucide) window.lucide.createIcons();
                return;
            }

            // Group by category
            const grouped = result.data.reduce((acc, faq) => {
                const cat = faq.category || 'General';
                if (!acc[cat]) acc[cat] = [];
                acc[cat].push(faq);
                return acc;
            }, {});

            let html = '';
            for (const [category, faqs] of Object.entries(grouped)) {
                html += `
                    <div class="faq-group reveal-up">
                        <h2 class="faq-category-title">${category}</h2>
                        <div class="faq-list">
                            ${faqs.map(faq => `
                                <div class="faq-item" id="faq-item-${faq.id}">
                                    <div class="faq-question" onclick="window.FAQComponent.toggleAccordion(${faq.id})">
                                        <h3>${faq.question}</h3>
                                        <div class="faq-icon">
                                            <i data-lucide="chevron-down" style="width: 18px; height: 18px; color: #fff;"></i>
                                        </div>
                                    </div>
                                    <div class="faq-answer">
                                        <div class="faq-answer-content">
                                            <p>${faq.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            target.innerHTML = html;
            if (window.lucide) window.lucide.createIcons();

            // Re-init reveal animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add('active');
                });
            }, { threshold: 0.1 });
            document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));

        } catch (error) {
            console.error('FAQ Load Error:', error);
            target.innerHTML = `
                <div class="glass-panel error" style="text-align: center; padding: 3rem;">
                    <p>Failed to load FAQ content. Please try again later.</p>
                    <button class="btn-primary" onclick="location.reload()">Retry</button>
                </div>
            `;
        }
    },

    toggleAccordion: function(id) {
        const item = document.getElementById(`faq-item-${id}`);
        const isActive = item.classList.contains('active');
        
        // Optional: Close others
        // document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
        
        if (isActive) {
            item.classList.remove('active');
        } else {
            item.classList.add('active');
        }
    }
};
