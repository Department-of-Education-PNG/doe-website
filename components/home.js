window.HomeComponent = {
    render: async () => {
        return `
            <section class="hero" style="position: relative; overflow: hidden; min-height: 80vh; display: flex; align-items: center;">
                
                <!-- Background Image Slider -->
                <div class="hero-slider">
                    <div class="slide">
                        <img src="assets/images/hero/hero-1.jpg" alt="Hero Background 1" class="slide-img">
                    </div>
                    <div class="slide">
                        <img src="assets/images/hero/hero-2.jpg" alt="Hero Background 2" class="slide-img">
                    </div>
                    <div class="slide">
                        <img src="assets/images/hero/hero-3.jpg" alt="Hero Background 3" class="slide-img">
                    </div>
                    <div class="slide">
                        <img src="assets/images/hero/hero-4.jpg" alt="Hero Background 4" class="slide-img">
                    </div>
                    <!-- Dark Gradient Overlay for text readability -->
                    <div class="hero-overlay"></div>
                </div>

                <div class="hero-content-container">
                    <div class="hero-content">
                        <h1>The Department of Education</h1>
                        <p>The executive and inspectorial branch of the National Education System, shaping direction for education agencies and providing quality education across Papua New Guinea.</p>
                        <a href="#about" class="btn-primary">Learn More</a>
                    </div>
                </div>
            </section>

            <!-- News Ticker -->
            <div class="news-ticker-wrapper">
                <span class="news-ticker-label">📰 LATEST</span>
                <div class="news-ticker-track">
                    <span class="news-ticker-item"><strong>NEW:</strong> NDoE Graduate Teacher Recruitment of 2026 now open for applications</span>
                    <span class="news-ticker-divider">✦</span>
                    <span class="news-ticker-item"><strong>BUDGET:</strong> Government allocates K904.5 million for education in 2026</span>
                    <span class="news-ticker-divider">✦</span>
                    <span class="news-ticker-item"><strong>POLICY:</strong> Strict mandate issued — No enrollment fee for 2026 students</span>
                    <span class="news-ticker-divider">✦</span>
                    <span class="news-ticker-item"><strong>REFORM:</strong> National curriculum reform integrates 21st century digital skills</span>
                    <span class="news-ticker-divider">✦</span>
                    <span class="news-ticker-item"><strong>EVENT:</strong> National Teacher Conference 2026 — March 15, Port Moresby</span>
                    <span class="news-ticker-divider">✦</span>
                    <!-- Duplicate for seamless loop -->
                    <span class="news-ticker-item"><strong>NEW:</strong> NDoE Graduate Teacher Recruitment of 2026 now open for applications</span>
                    <span class="news-ticker-divider">✦</span>
                    <span class="news-ticker-item"><strong>BUDGET:</strong> Government allocates K904.5 million for education in 2026</span>
                    <span class="news-ticker-divider">✦</span>
                    <span class="news-ticker-item"><strong>POLICY:</strong> Strict mandate issued — No enrollment fee for 2026 students</span>
                    <span class="news-ticker-divider">✦</span>
                    <span class="news-ticker-item"><strong>REFORM:</strong> National curriculum reform integrates 21st century digital skills</span>
                    <span class="news-ticker-divider">✦</span>
                    <span class="news-ticker-item"><strong>EVENT:</strong> National Teacher Conference 2026 — March 15, Port Moresby</span>
                    <span class="news-ticker-divider">✦</span>
                </div>
            </div>

            <section class="section-full">
                <h2 class="section-title">Leadership Messages</h2>
                <div class="grid-2">
                    <div class="card glass-panel leader-card">
                        <div class="leader-avatar">
                            <img src="assets/images/leaders/minister.png" alt="Minister">
                        </div>
                        <div class="leader-text">
                            <h3>Minister's Message</h3>
                            <p>Read the latest update from the Minister of Education regarding our progress and future vision.</p>
                            <a href="javascript:void(0)" onclick="openModal('minister-modal')" class="nav-link" style="color: var(--primary);">Read Message &rarr;</a>
                        </div>
                    </div>
                    <div class="card glass-panel leader-card">
                        <div class="leader-avatar leader-avatar-alt">
                            <img src="assets/images/leaders/secretary.png" alt="Secretary">
                        </div>
                        <div class="leader-text">
                            <h3>Secretary's Message</h3>
                            <p>Insights and directives from the Secretary for Education on Achieving Quality Education and Training.</p>
                            <a href="javascript:void(0)" onclick="openModal('secretary-modal')" class="nav-link" style="color: var(--accent);">Read Message &rarr;</a>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section-full" style="background: linear-gradient(180deg, rgba(10, 13, 20, 0) 0%, rgba(0, 112, 243, 0.05) 100%); border-bottom: 1px solid var(--glass-border);">
                <div class="section-header">
                    <h2 class="section-title" style="margin-bottom: 0;">DoE Digital Applications</h2>
                    <a href="#app-gallery" class="nav-link view-all-link">App Gallery &rarr;</a>
                </div>
                <div class="grid-4" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 2rem;">
                    
                    <a href="https://mail.education.gov.pg/owa/" target="_blank" class="card glass-panel app-card" style="text-align: center; padding: 2rem 1rem; text-decoration: none;">
                        <div class="app-icon-placeholder" style="background: #0078d415; color: #0078d4; width: 80px; height: 80px; border-radius: 20px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; border: 1px solid #0078d430;">📧</div>
                        <h3 style="font-size: 1.1rem; margin-bottom: 0.5rem; color: #fff;">Outlook Email</h3>
                        <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">Staff Webmail Portal</p>
                    </a>

                    <a href="http://apps.education.gov.pg:8081/ords/f?p=144" target="_blank" class="card glass-panel app-card" style="text-align: center; padding: 2rem 1rem; text-decoration: none;">
                        <div class="app-icon-placeholder" style="background: #2dca7315; color: #2dca73; width: 80px; height: 80px; border-radius: 20px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; border: 1px solid #2dca7330;">💰</div>
                        <h3 style="font-size: 1.1rem; margin-bottom: 0.5rem; color: #fff;">MyPaySlip</h3>
                        <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">Teacher Payroll System</p>
                    </a>

                    <a href="http://apps.education.gov.pg:8081/ords/f?p=103" target="_blank" class="card glass-panel app-card" style="text-align: center; padding: 2rem 1rem; text-decoration: none;">
                        <div class="app-icon-placeholder" style="background: #f5a62315; color: #f5a623; width: 80px; height: 80px; border-radius: 20px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; border: 1px solid #f5a62330;">🎓</div>
                        <h3 style="font-size: 1.1rem; margin-bottom: 0.5rem; color: #fff;">Grade 11 Selection</h3>
                        <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">Online Selection Portal</p>
                    </a>

                    <a href="http://apps.education.gov.pg:8081/ords/f?p=125" target="_blank" class="card glass-panel app-card" style="text-align: center; padding: 2rem 1rem; text-decoration: none;">
                        <div class="app-icon-placeholder" style="background: #e74c3c15; color: #e74c3c; width: 80px; height: 80px; border-radius: 20px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; border: 1px solid #e74c3c30;">👥</div>
                        <h3 style="font-size: 1.1rem; margin-bottom: 0.5rem; color: #fff;">Info Management</h3>
                        <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">Teacher Management System</p>
                    </a>

                </div>
            </section>

            <style>
                .app-card {
                    overflow: hidden;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .app-card:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(255, 255, 255, 0.2);
                    transform: translateY(-8px);
                }
                .app-icon-placeholder {
                    transition: transform 0.4s ease, box-shadow 0.4s ease;
                }
                .app-card:hover .app-icon-placeholder {
                    transform: scale(1.1) rotate(5deg);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                }
            </style>

            <section class="section-full" style="background: rgba(0,0,0,0.3); border-top: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border);">
                <h2 class="section-title">Notice Board</h2>
                <div class="grid-3 mt-2">
                    <div class="card glass-panel">
                        <h3>2026 TERM & EXAMINATION DATES</h3>
                        <ul style="list-style: none; color: var(--text-muted);">
                            <li style="margin-bottom: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem;"><strong>Jan 19, 2026:</strong> Teachers Resume Duties</li>
                            <li style="margin-bottom: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem;"><strong>Jan 26, 2026:</strong> Students Resume Classes</li>
                            <li style="margin-bottom: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem;"><strong>Jan 18, 2027:</strong> Teachers Resume (2027)</li>
                            <li style="margin-bottom: 0.5rem;"><strong>Jan 25, 2027:</strong> Students Resume (2027)</li>
                        </ul>
                        <a href="#" class="btn-primary" style="display: inline-block; margin-top: 1.5rem; width: 100%; text-align: center;">Download Secretary's Circular</a>
                    </div>
                    <div class="card glass-panel">
                        <h3>National Education Plan</h3>
                        <p style="color: var(--text-muted); margin-bottom: 1rem;">View or download the National Education Plan 2020 - 2029.</p>
                        <p style="color: var(--text-muted); font-size: 0.9rem;">The PBD is responsible for providing leadership and guidance in national policy reviews and formulation to enhance synergy.</p>
                        <a href="#" class="nav-link" style="margin-top: 1rem; display: inline-block; color: var(--primary);">View Plan &rarr;</a>
                    </div>
                    <div class="card glass-panel quick-links-card" style="border-color: rgba(245, 166, 35, 0.4);">
                        <h3 style="color: var(--text-main); text-align: center; margin-bottom: 1.5rem;">Quick Links & Portals</h3>
                        <div style="display: flex; flex-direction: column; gap: 0.8rem; align-items: center;">
                            <a href="#" class="quick-link">DoE Portal</a>
                            <a href="#" class="quick-link">PNG LEAP</a>
                            <a href="#" class="quick-link">2026 School Census Form</a>
                            <a href="#" class="quick-link">Government Tuition Fee Subsidy</a>
                            <a href="#" class="quick-link">Teacher Query (TQMS)</a>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section-full" style="background: rgba(20, 25, 35, 0.4); border-bottom: 1px solid var(--glass-border);">
                <div class="section-header">
                    <h2 class="section-title" style="margin-bottom: 0;">Public Forms</h2>
                    <a href="#forms" class="nav-link view-all-link">View All Forms &rarr;</a>
                </div>
                <div class="grid-3">
                    <div class="card glass-panel" style="border-left: 4px solid var(--primary);">
                        <h4 style="margin: 0.5rem 0;">School Registration Form</h4>
                        <p style="color: var(--text-muted); font-size: 0.9rem;">Official application form for new school registration and annual renewal.</p>
                        <a href="#forms" class="nav-link" style="color: var(--primary); font-size: 0.9rem;">Download PDF &darr;</a>
                    </div>
                    <div class="card glass-panel" style="border-left: 4px solid var(--accent);">
                        <h4 style="margin: 0.5rem 0;">Teacher Leave Application</h4>
                        <p style="color: var(--text-muted); font-size: 0.9rem;">Submit requests for medical, recreational, or study leave via the TSC.</p>
                        <a href="#forms" class="nav-link" style="color: var(--accent); font-size: 0.9rem;">Download PDF &darr;</a>
                    </div>
                    <div class="card glass-panel">
                        <h4 style="margin: 0.5rem 0;">Student Transfer Form</h4>
                        <p style="color: var(--text-muted); font-size: 0.9rem;">Required documentation for transferring students between provincial schools.</p>
                        <a href="#forms" class="nav-link" style="font-size: 0.9rem;">Download PDF &darr;</a>
                    </div>
                </div>
            </section>

            <section class="section-full" style="padding-bottom: 2rem;">
                <div class="section-header">
                    <h2 class="section-title" style="margin-bottom: 0;">Published Documents</h2>
                    <a href="#publications" class="nav-link view-all-link">View Publications List &rarr;</a>
                </div>
                <div class="marquee-container">
                    <div class="marquee-track">
                        <!-- Set 1 -->
                        <a href="#" target="_blank" class="doc-placeholder" style="display:block; cursor:pointer; padding:0; position:relative; overflow:hidden;">
                            <img src="assets/images/documents/doc-img-01.png" alt="NEP 2020-2029" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem;"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>National Education Plan</div>
                        </a>
                        <a href="#" target="_blank" class="doc-placeholder" style="display:block; cursor:pointer; padding:0; position:relative; overflow:hidden;">
                            <img src="assets/images/documents/doc-img-02.png" alt="Annual Report 2025" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem;"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>Annual Report 2025</div>
                        </a>
                        <a href="#" target="_blank" class="doc-placeholder" style="display:block; cursor:pointer; padding:0; position:relative; overflow:hidden;">
                            <img src="assets/images/documents/doc-img-03.png" alt="Education Act" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem;"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>Education Act 1983</div>
                        </a>
                        <a href="#" target="_blank" class="doc-placeholder" style="display:block; cursor:pointer; padding:0; position:relative; overflow:hidden;">
                            <img src="assets/images/documents/doc-img-04.png" alt="GFEP Manual" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem;"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>GFEP 2026 Manual</div>
                        </a>
                        <a href="#" target="_blank" class="doc-placeholder" style="display:block; cursor:pointer; padding:0; position:relative; overflow:hidden;">
                            <img src="assets/images/documents/doc-img-05.png" alt="Teaching Act" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem;"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>Teaching Service Act</div>
                        </a>
                        
                        <!-- Duplicate Set for Seamless Loop -->
                        <a href="#" target="_blank" class="doc-placeholder" style="display:block; cursor:pointer; padding:0; position:relative; overflow:hidden;">
                            <img src="assets/images/documents/doc-img-01.png" alt="NEP 2020-2029" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem;"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>National Education Plan</div>
                        </a>
                        <a href="#" target="_blank" class="doc-placeholder" style="display:block; cursor:pointer; padding:0; position:relative; overflow:hidden;">
                            <img src="assets/images/documents/doc-img-02.png" alt="Annual Report 2025" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem;"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>Annual Report 2025</div>
                        </a>
                        <a href="#" target="_blank" class="doc-placeholder" style="display:block; cursor:pointer; padding:0; position:relative; overflow:hidden;">
                            <img src="assets/images/documents/doc-img-03.png" alt="Education Act" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem;"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>Education Act 1983</div>
                        </a>
                        <a href="#" target="_blank" class="doc-placeholder" style="display:block; cursor:pointer; padding:0; position:relative; overflow:hidden;">
                            <img src="assets/images/documents/doc-img-04.png" alt="GFEP Manual" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem;"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>GFEP 2026 Manual</div>
                        </a>
                        <a href="#" target="_blank" class="doc-placeholder" style="display:block; cursor:pointer; padding:0; position:relative; overflow:hidden;">
                            <img src="assets/images/documents/doc-img-05.png" alt="Teaching Act" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem;"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>Teaching Service Act</div>
                        </a>
                    </div>
                </div>
            </section>

            <section class="section-full">
                <div class="section-header">
                    <h2 class="section-title" style="margin-bottom: 0;">Recent Activity & News</h2>
                    <a href="#news" class="nav-link view-all-link">View All News &rarr;</a>
                </div>
                <div class="grid-3">
                    <div class="card glass-panel news-card" style="padding: 0; overflow: hidden;">
                        <div class="news-img-wrapper" style="width:100%; height:200px; overflow:hidden; position:relative;">
                            <img src="assets/images/hero/hero-1.jpg" alt="Teacher Recruitment" style="width:100%; height:100%; object-fit:cover; display:block; transition: transform 0.4s ease;" onerror="this.style.display='none';">
                            <span class="news-date-badge">25 Feb 2026</span>
                        </div>
                        <div style="padding: 1.5rem;">
                            <h4 style="margin: 0 0 0.8rem 0; font-size: 1.1rem;">NDoE Graduate Teacher Recruitment of 2026</h4>
                            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.2rem;">The Department of Education announces the 2026 Graduate Teacher Recruitment program for all eligible graduates across Papua New Guinea.</p>
                            <a href="#news" class="news-read-more">Read More &rarr;</a>
                        </div>
                    </div>
                    <div class="card glass-panel news-card" style="padding: 0; overflow: hidden;">
                        <div class="news-img-wrapper" style="width:100%; height:200px; overflow:hidden; position:relative;">
                            <img src="assets/images/hero/hero-2.jpg" alt="Budget Allocation" style="width:100%; height:100%; object-fit:cover; display:block; transition: transform 0.4s ease;" onerror="this.style.display='none';">
                            <span class="news-date-badge">10 Feb 2026</span>
                        </div>
                        <div style="padding: 1.5rem;">
                            <h4 style="margin: 0 0 0.8rem 0; font-size: 1.1rem;">Government Allocates K904.5 Million for Education</h4>
                            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.2rem;">The Government of Papua New Guinea has committed K904.5 million in the 2026 National Budget to support education across all levels.</p>
                            <a href="#news" class="news-read-more">Read More &rarr;</a>
                        </div>
                    </div>
                    <div class="card glass-panel news-card" style="padding: 0; overflow: hidden;">
                        <div class="news-img-wrapper" style="width:100%; height:200px; overflow:hidden; position:relative;">
                            <img src="assets/images/hero/hero-3.jpg" alt="No Enrollment Fee" style="width:100%; height:100%; object-fit:cover; display:block; transition: transform 0.4s ease;" onerror="this.style.display='none';">
                            <span class="news-date-badge">10 Feb 2026</span>
                        </div>
                        <div style="padding: 1.5rem;">
                            <h4 style="margin: 0 0 0.8rem 0; font-size: 1.1rem;">Strict 2026 Mandate: No Enrollment Fee for Students</h4>
                            <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.2rem;">The Secretary for Education has issued a strict directive that no school shall charge enrollment fees under the Government's Tuition Fee Free policy.</p>
                            <a href="#news" class="news-read-more">Read More &rarr;</a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Minister's Modal -->
            <div id="minister-modal" class="modal-overlay" onclick="closeModal(event, 'minister-modal')">
                <div class="modal-content-light" onclick="event.stopPropagation()">
                    
                    <div class="modal-body-light">
                        <div style="color: #0056b3; text-align: center; margin-bottom: 2rem; letter-spacing: 0.5px; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(0, 86, 179, 0.2);">
                            <div style="font-size: 1.1rem; font-weight: 400; margin-bottom: 0.3rem;">WELCOME MESSAGE FROM</div>
                            <div style="font-size: 1.4rem; font-weight: 600; margin-bottom: 0.2rem;">HON. LUCAS DAWA DEKENA, MP</div>
                            <div style="font-size: 1.25rem; font-weight: 500;">MINISTER FOR EDUCATION</div>
                        </div>
                        
                        <div style="display: flow-root;">
                            <img src="assets/images/leaders/minister.png" alt="Minister" style="float: left; width: 220px; height: 220px; object-fit: cover; margin: 0 2rem 1rem 0; border: 4px solid #4a90e2; padding: 2px;">
                            
                            <p style="margin-bottom: 1rem; font-size: 0.95rem; line-height: 1.6;">I welcome you to the new-look website for the National Department of Education.</p>
                            <p style="margin-bottom: 1rem; font-size: 0.95rem; line-height: 1.6;">Education is one of the major strategies for promoting socio-economic development in PNG since independence.</p>
                            <p style="margin-bottom: 1rem; font-size: 0.95rem; line-height: 1.6;">The Department of Education is the executive branch of the National Education System and is responsible for overseeing and coordinating the development and operations of the system.</p>
                            <p style="margin-bottom: 1rem; font-size: 0.95rem; line-height: 1.6;">Our vision for education in Papua New Guinea is to provide an education system that is affordable for parents and Government, that appreciates Christian and traditional values, and that prepares literate, skilled and healthy citizens, each educated and trained to their fullest potential, to contribute to the economic and social development of the country.</p>
                            <p style="margin-bottom: 1rem; font-size: 0.95rem; line-height: 1.6;">To achieve this we will provide 13 years of quality, relevant and affordable education for every child, regardless of his or her circumstance; include early childhood learning and Citizenship and Christian Values Education as well as 21st century skills such as problem-solving, self-direction and critical thinking. We believe that with this approach to education, PNG’s citizens will be better equipped to make a positive contribution to our communities while being able to stand tall in the international arena.</p>
                            <p style="margin-bottom: 1rem; font-size: 0.95rem; line-height: 1.6;">I recommend this website to students, teachers, parents and the wider community who have interests in education.</p>
                            <p style="margin-bottom: 2rem; font-size: 0.95rem;">Happy browsing!</p>
                            
                            <p style="font-weight: bold; margin-bottom: 0.2rem; font-size: 0.95rem; color: #000;">Honorable Lucas Dekena, MP</p>
                            <p style="font-size: 0.9rem; color: #444;">Minister of Education</p>
                        </div>
                    </div>
                    
                    <!-- Bottom Footer With Close Button -->
                    <div class="modal-footer-light">
                        <button class="modal-close-btn" onclick="closeModal(null, 'minister-modal')" title="Close">&times;</button>
                    </div>
                </div>
            </div>

            <!-- Secretary's Modal -->
            <div id="secretary-modal" class="modal-overlay" onclick="closeModal(event, 'secretary-modal')">
                <div class="modal-content-light" onclick="event.stopPropagation()">
                    
                    <div class="modal-body-light">
                        <div style="color: #0056b3; text-align: center; margin-bottom: 2rem; letter-spacing: 0.5px; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(0, 86, 179, 0.2);">
                            <div style="font-size: 1.1rem; font-weight: 400; margin-bottom: 0.3rem;">WELCOME MESSAGE FROM</div>
                            <div style="font-size: 1.4rem; font-weight: 600; margin-bottom: 0.2rem;">DR. UKE KOMBRA, PhD, OBE</div>
                            <div style="font-size: 1.25rem; font-weight: 500;">SECRETARY FOR EDUCATION</div>
                        </div>
                        
                        <div style="display: flow-root;">
                            <img src="assets/images/leaders/secretary.png" alt="Secretary" style="float: left; width: 220px; height: 220px; object-fit: cover; margin: 0 2rem 1rem 0; border: 4px solid #f5a623; padding: 2px;">
                            
                            <p style="margin-bottom: 1rem; font-size: 0.95rem; line-height: 1.6;">HELLO, thank you for taking time to visit the Department of Education's new-look website.</p>
                            <p style="margin-bottom: 1rem; font-size: 0.95rem; line-height: 1.6;">We have redeveloped our website so it is more modern but simple and user-friendly for our visitors to easily access and find information and data about important policies and programs and announcements, news and events about what is happening in the National Education System.</p>
                            <p style="margin-bottom: 1rem; font-size: 0.95rem; line-height: 1.6;">Our mobile version (soon to be released) will enable users to easily access the website using their mobile phones. With such an approach we hope and aim to inform and connect with you, students, teachers, parents and everyone else on a real time basis.</p>
                            <p style="margin-bottom: 1rem; font-size: 0.95rem; line-height: 1.6;">We will strive to improve our site and seek your feedbacks, suggestions and recommendations so the website meets everyone's needs and gives updates on a daily basis. So, we count on your involvement and cooperation.</p>
                            <p style="margin-bottom: 1rem; font-size: 0.95rem; line-height: 1.6;">We hope you enjoy our new-look website and the content – WELCOME!</p>
                            <p style="margin-bottom: 2rem; font-size: 0.95rem;">Thank you.</p>
                            
                            <p style="font-weight: bold; margin-bottom: 0.2rem; font-size: 0.95rem; color: #000;">Dr Uke Kombra, PhD, OBE</p>
                            <p style="font-size: 0.9rem; color: #444;">Secretary for Education</p>
                        </div>
                    </div>

                    <div class="modal-footer-light">
                        <button class="modal-close-btn" onclick="closeModal(null, 'secretary-modal')" title="Close">&times;</button>
                    </div>
                </div>
            </div>
        `;
    }
};
