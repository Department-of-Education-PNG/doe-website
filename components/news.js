window.NewsComponent = {
    render: async () => {
        // Fetch news and events in parallel
        const [newsData, eventsData] = await Promise.all([
            DoEAPI.get('news.php'),
            DoEAPI.get('events.php?status=upcoming')
        ]);

        // --- Data fallback ---
        let articles = (newsData && newsData.data && newsData.data.length > 0) ? newsData.data : [
            { title: 'Graduate Teacher Recruitment 2026', summary: 'Applications for the 2026 academic year are now open for all eligible graduates.', date_published: '2026-02-25', image_path: 'assets/images/hero/hero-1.jpg' },
            { title: 'K904.5 Million Education Budget', summary: 'The Government of PNG has allocated a record budget for education in 2026.', date_published: '2026-02-10', image_path: 'assets/images/hero/hero-2.jpg' },
            { title: 'No Enrollment Fee Mandate', summary: 'Public schools are strictly reminded to adhere to the no-fee enrollment policy.', date_published: '2026-02-10', image_path: 'assets/images/hero/hero-3.jpg' }
        ];

        let events = (eventsData && eventsData.data && eventsData.data.length > 0) ? eventsData.data : [
            { title: 'National Teacher Conference', event_date: '2026-03-15', location: 'Port Moresby' },
            { title: 'STEM Innovation Fair', event_date: '2026-04-20', location: 'UPNG Campus' }
        ];

        const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        const getEventMonth = (dateStr) => new Date(dateStr).toLocaleString('en-US', { month: 'short' }).toUpperCase();
        const getEventDay = (dateStr) => new Date(dateStr).getDate();

        return `
            <section class="internal-hero reveal-up">
                <div class="hero-content-container">
                    <div class="hero-content">
                        <h1 class="reveal-up">News & Events</h1>
                        <p class="reveal-up hero-p" style="color: #d4e5f7;">Latest updates and important announcements from the Department.</p>
                    </div>
                </div>
            </section>

            <section class="section-full reveal-up">
                <div class="news-container">
                    <h2 class="news-section-title">Latest News & Announcements</h2>
                    <div class="news-layout">
                    <!-- Main News Column -->
                    <div class="news-main-col">
                        ${articles.map(article => `
                            <div class="horizontal-news-card card glass-panel reveal-up">
                                <div class="news-article-img">
                                    <img src="${DoEAPI.imgUrl(article.image_path) || 'assets/images/hero/hero-1.jpg'}" alt="${article.title}" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                                    <span class="news-date-badge">
                                        ${formatDate(article.date_published)}
                                    </span>
                                </div>
                                <div class="news-article-body">
                                    <h3>${article.title}</h3>
                                    <p>${article.summary}</p>
                                    <a href="#news-detail/${article.slug || ''}" class="read-more-link">
                                        Read Full Report
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                    </a>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Sidebar -->
                    <aside class="news-sidebar">
                        <div class="card glass-panel reveal-up sidebar-card sidebar-accent">
                            <h3 class="sidebar-title">
                                <div class="sidebar-dot"></div>
                                Global Education
                            </h3>
                            <div class="sidebar-items">
                                ${[
                                    { title: 'UNESCO: Pacific Goals', date: '22 Feb 2026' },
                                    { title: 'Australia Literacy Pledge', date: '18 Feb 2026' },
                                    { title: 'Digital Expansion in Asia', date: '12 Feb 2026' }
                                ].map(item => `
                                    <div class="sidebar-item">
                                        <h4>${item.title}</h4>
                                        <span class="sidebar-date">${item.date}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="card glass-panel reveal-up sidebar-card sidebar-primary">
                            <h3 class="sidebar-title">
                                <div class="sidebar-dot"></div>
                                Upcoming Events
                            </h3>
                            <div class="sidebar-items">
                                ${events.map(event => `
                                    <div class="event-item">
                                        <div class="event-date-box">
                                            <div class="event-month">${getEventMonth(event.event_date)}</div>
                                            <div class="event-day">${getEventDay(event.event_date)}</div>
                                        </div>
                                        <div class="event-info">
                                            <h4>${event.title}</h4>
                                            <p>📍 ${event.location}</p>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </aside>
                </div> <!-- End news-layout -->
            </div> <!-- End news-container -->
        </section>
        `;
    }
};
