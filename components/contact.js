window.ContactComponent = {
    render: async () => {
        return `
            <div style="height: 300px; display:flex; align-items:center; justify-content:center; background: linear-gradient(135deg, rgba(255, 100, 100, 0.2), transparent); border-bottom: 1px solid var(--glass-border);">
                <div>
                    <h1 style="font-size: 3.5rem; text-align: center; margin-bottom: 0;">Contact Us</h1>
                    <p style="text-align: center; color: var(--text-muted); font-size: 1.2rem;">Get in touch with the Department of Education</p>
                </div>
            </div>

            <section class="section-full">
                <div class="grid-2">
                    <div class="card glass-panel">
                        <h2 style="color: var(--primary); margin-bottom: 2rem;">Headquarters</h2>
                        
                        <div style="display: flex; gap: 1rem; align-items: flex-start; margin-bottom: 1.5rem;">
                            <div style="font-size: 1.5rem; color: var(--accent);">📍</div>
                            <div>
                                <h4 style="margin: 0 0 0.5rem 0;">Address</h4>
                                <p style="color: var(--text-muted); margin: 0;">P.O Box 446 Waigani</p>
                                <p style="color: var(--text-muted); margin: 0;">National Capital District</p>
                                <p style="color: var(--text-muted); margin: 0;">Papua New Guinea</p>
                            </div>
                        </div>

                        <div style="display: flex; gap: 1rem; align-items: flex-start; margin-bottom: 1.5rem;">
                            <div style="font-size: 1.5rem; color: var(--accent);">✉️</div>
                            <div>
                                <h4 style="margin: 0 0 0.5rem 0;">Email</h4>
                                <a href="mailto:enquiries@education.gov.pg" style="color: var(--text-muted);">enquiries@education.gov.pg</a>
                            </div>
                        </div>

                        <div style="display: flex; gap: 1rem; align-items: flex-start;">
                            <div style="font-size: 1.5rem; color: var(--accent);">📞</div>
                            <div>
                                <h4 style="margin: 0 0 0.5rem 0;">Phone</h4>
                                <a href="tel:+6753288800" style="color: var(--text-muted);">+675 328 8800</a>
                            </div>
                        </div>
                    </div>

                    <div class="card glass-panel">
                        <h3 style="margin-bottom: 1.5rem;">Send a Message</h3>
                        <form onsubmit="event.preventDefault(); alert('Message sent functionality pending backend integration.');">
                            <div style="margin-bottom: 1rem;">
                                <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted);">Name</label>
                                <input type="text" style="width: 100%; padding: 0.8rem; background: rgba(0,0,0,0.3); border: 1px solid var(--glass-border); border-radius: 8px; color: var(--text-main);" placeholder="Your Name" required>
                            </div>
                            <div style="margin-bottom: 1rem;">
                                <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted);">Email</label>
                                <input type="email" style="width: 100%; padding: 0.8rem; background: rgba(0,0,0,0.3); border: 1px solid var(--glass-border); border-radius: 8px; color: var(--text-main);" placeholder="Your Email" required>
                            </div>
                            <div style="margin-bottom: 1.5rem;">
                                <label style="display: block; margin-bottom: 0.5rem; color: var(--text-muted);">Message</label>
                                <textarea rows="5" style="width: 100%; padding: 0.8rem; background: rgba(0,0,0,0.3); border: 1px solid var(--glass-border); border-radius: 8px; color: var(--text-main); font-family: inherit;" placeholder="How can we help?" required></textarea>
                            </div>
                            <button type="submit" class="btn-primary" style="width: 100%; border: none; cursor: pointer; font-size: 1rem;">Send Message</button>
                        </form>
                    </div>
                </div>
            </section>
        `;
    }
};
