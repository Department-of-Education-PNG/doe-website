window.NewsComponent = {
    render: async () => {
        return `
            <div style="min-height: 300px; padding: 4rem 1.5rem; display:flex; flex-direction:column; align-items:center; justify-content:center; background: linear-gradient(135deg, rgba(59, 165, 224, 0.6), rgba(14, 32, 64, 0.8), rgba(255, 194, 51, 0.3)), url('assets/images/other-tabs-header-banner/banner-bg.png') center/cover no-repeat; border-bottom: 1px solid var(--glass-border);">
                <div>
                    <h1 style="font-size: 3.5rem; text-align: center; margin-bottom: 0;">News & Events</h1>
                    <p style="text-align: center; color: var(--text-muted); font-size: 1.2rem;">Press Releases and Latest Updates</p>
                </div>
            </div>

            <section class="section-full">
                <div class="news-layout">
                    <!-- Main News Column -->
                    <div class="news-main-col">
                        
                        <!-- News Item 1 -->
                        <div class="card glass-panel news-article-card">
                            <div class="news-article-img">
                                <img src="assets/images/hero/hero-1.jpg" alt="Teacher Recruitment">
                                <span class="news-date-badge">25 Feb 2026</span>
                            </div>
                            <div class="news-article-body">
                                <h3>NDoE Graduate Teacher Recruitment of 2026</h3>
                                <p style="color: var(--text-muted); line-height: 1.7;">The Department of Education has officially opened applications for the Graduate Teacher Recruitment for the 2026 academic year. All eligible graduates from recognized teacher training institutions across Papua New Guinea are encouraged to apply through the official portal.</p>
                                <a href="#" class="news-read-more">Read Full Story &rarr;</a>
                            </div>
                        </div>

                        <!-- News Item 2 -->
                        <div class="card glass-panel news-article-card">
                            <div class="news-article-img">
                                <img src="assets/images/hero/hero-2.jpg" alt="Budget Allocation">
                                <span class="news-date-badge">10 Feb 2026</span>
                            </div>
                            <div class="news-article-body">
                                <h3>Government Allocates K904.5 Million for Education</h3>
                                <p style="color: var(--text-muted); line-height: 1.7;">The Government of Papua New Guinea has officially allocated K904.5 million in the 2026 National Budget to support education infrastructure, teacher salaries, and the Government Tuition Fee Free Subsidy policy across all provinces.</p>
                                <a href="#" class="news-read-more">Read Full Story &rarr;</a>
                            </div>
                        </div>
                        
                        <!-- News Item 3 -->
                        <div class="card glass-panel news-article-card">
                            <div class="news-article-img">
                                <img src="assets/images/hero/hero-3.jpg" alt="No Enrollment Fee">
                                <span class="news-date-badge">10 Feb 2026</span>
                            </div>
                            <div class="news-article-body">
                                <h3>Strict 2026 Mandate: No Enrollment Fee for Students</h3>
                                <p style="color: var(--text-muted); line-height: 1.7;">In adherence to the new Government directives, public schools are strictly mandated not to charge project or enrollment fees for 2026. The Secretary for Education has warned principals that any violation will result in disciplinary action.</p>
                                <a href="#" class="news-read-more">Read Full Story &rarr;</a>
                            </div>
                        </div>

                        <!-- News Item 4 -->
                        <div class="card glass-panel news-article-card">
                            <div class="news-article-img">
                                <img src="assets/images/hero/hero-4.jpg" alt="Curriculum Reform">
                                <span class="news-date-badge">28 Jan 2026</span>
                            </div>
                            <div class="news-article-body">
                                <h3>National Curriculum Reform: 21st Century Learning</h3>
                                <p style="color: var(--text-muted); line-height: 1.7;">The Department of Education is rolling out a comprehensive curriculum reform to integrate digital literacy, critical thinking, and problem-solving into the national education framework starting from elementary school level.</p>
                                <a href="#" class="news-read-more">Read Full Story &rarr;</a>
                            </div>
                        </div>

                    </div>

                    <!-- Sidebar: Related Education News -->
                    <aside class="news-sidebar">
                        <div class="glass-panel" style="padding: 1.5rem; border-radius: 16px;">
                            <h3 style="margin-bottom: 1.5rem; color: var(--accent); font-size: 1.2rem; border-bottom: 2px solid var(--accent); padding-bottom: 0.8rem;">🌏 Education Around the World</h3>
                            
                            <div class="sidebar-news-item">
                                <img src="assets/images/hero/hero-2.jpg" alt="UNESCO Report" class="sidebar-news-thumb">
                                <div>
                                    <h4>UNESCO: Pacific Education Goals on Track</h4>
                                    <span class="sidebar-date">22 Feb 2026</span>
                                </div>
                            </div>

                            <div class="sidebar-news-item">
                                <img src="assets/images/hero/hero-3.jpg" alt="Australia Aid" class="sidebar-news-thumb">
                                <div>
                                    <h4>Australia Pledges A$50M for PNG Literacy</h4>
                                    <span class="sidebar-date">18 Feb 2026</span>
                                </div>
                            </div>

                            <div class="sidebar-news-item">
                                <img src="assets/images/hero/hero-4.jpg" alt="Digital Learning" class="sidebar-news-thumb">
                                <div>
                                    <h4>Digital Learning Expands Across Asia-Pacific</h4>
                                    <span class="sidebar-date">12 Feb 2026</span>
                                </div>
                            </div>

                            <div class="sidebar-news-item">
                                <img src="assets/images/hero/hero-1.jpg" alt="World Bank" class="sidebar-news-thumb">
                                <div>
                                    <h4>World Bank: Education Key to PNG Growth</h4>
                                    <span class="sidebar-date">05 Feb 2026</span>
                                </div>
                            </div>

                            <div class="sidebar-news-item">
                                <img src="assets/images/hero/hero-2.jpg" alt="STEM" class="sidebar-news-thumb">
                                <div>
                                    <h4>Pacific Islands Focus on STEM Education</h4>
                                    <span class="sidebar-date">30 Jan 2026</span>
                                </div>
                            </div>
                        </div>

                        <div class="glass-panel" style="padding: 1.5rem; border-radius: 16px; margin-top: 2rem;">
                            <h3 style="margin-bottom: 1.5rem; color: var(--primary); font-size: 1.2rem; border-bottom: 2px solid var(--primary); padding-bottom: 0.8rem;">📢 Upcoming Events</h3>
                            
                            <div class="sidebar-event-item">
                                <div class="event-date-box">
                                    <span class="event-month">MAR</span>
                                    <span class="event-day">15</span>
                                </div>
                                <div>
                                    <h4>National Teacher Conference 2026</h4>
                                    <p style="color: var(--text-muted); font-size: 0.8rem;">Port Moresby, NCD</p>
                                </div>
                            </div>

                            <div class="sidebar-event-item">
                                <div class="event-date-box">
                                    <span class="event-month">APR</span>
                                    <span class="event-day">02</span>
                                </div>
                                <div>
                                    <h4>Provincial Education Summit</h4>
                                    <p style="color: var(--text-muted); font-size: 0.8rem;">Lae, Morobe Province</p>
                                </div>
                            </div>

                            <div class="sidebar-event-item">
                                <div class="event-date-box">
                                    <span class="event-month">APR</span>
                                    <span class="event-day">20</span>
                                </div>
                                <div>
                                    <h4>STEM Innovation Fair</h4>
                                    <p style="color: var(--text-muted); font-size: 0.8rem;">UPNG Campus, NCD</p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        `;
    }
};
