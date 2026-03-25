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
                        <div class="doc-placeholder" style="padding:0; position:relative; overflow:hidden;">
                            <img src="assets/images/documents/doc-1.jpg" alt="NEP 2020-2029" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem;"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>National Education Plan</div>
                        </div>
                        <div class="doc-placeholder" style="padding:0; position:relative; overflow:hidden;">
                            <img src="assets/images/documents/doc-2.jpg" alt="Annual Report 2025" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem;"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>Annual Report 2025</div>
                        </div>
                        <div class="doc-placeholder" style="padding:0; position:relative; overflow:hidden;">
                            <img src="assets/images/documents/doc-3.jpg" alt="Education Act" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem;"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>Education Act 1983</div>
                        </div>
                        <div class="doc-placeholder" style="padding:0; position:relative; overflow:hidden;">
                            <img src="assets/images/documents/doc-4.jpg" alt="GFEP Manual" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem;"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>GFEP 2026 Manual</div>
                        </div>
                        <div class="doc-placeholder" style="padding:0; position:relative; overflow:hidden;">
                            <img src="assets/images/documents/doc-5.jpg" alt="Teaching Act" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem;"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>Teaching Service Act</div>
                        </div>
                        
                        <!-- Duplicate Set for Seamless Loop -->
                        <div class="doc-placeholder" style="padding:0; position:relative; overflow:hidden;">
                            <img src="assets/images/documents/doc-1.jpg" alt="NEP 2020-2029" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem;"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>National Education Plan</div>
                        </div>
                        <div class="doc-placeholder" style="padding:0; position:relative; overflow:hidden;">
                            <img src="assets/images/documents/doc-2.jpg" alt="Annual Report 2025" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem;"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>Annual Report 2025</div>
                        </div>
                        <div class="doc-placeholder" style="padding:0; position:relative; overflow:hidden;">
                            <img src="assets/images/documents/doc-3.jpg" alt="Education Act" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem;"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>Education Act 1983</div>
                        </div>
                        <div class="doc-placeholder" style="padding:0; position:relative; overflow:hidden;">
                            <img src="assets/images/documents/doc-4.jpg" alt="GFEP Manual" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem;"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>GFEP 2026 Manual</div>
                        </div>
                        <div class="doc-placeholder" style="padding:0; position:relative; overflow:hidden;">
                            <img src="assets/images/documents/doc-5.jpg" alt="Teaching Act" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem;"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>Teaching Service Act</div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section-full">
                <div class="section-header">
                    <h2 class="section-title" style="margin-bottom: 0;">Recent Activity & News</h2>
                    <a href="#news" class="nav-link view-all-link">View All News &rarr;</a>
                </div>
                <div class="grid-3">
                    <div class="card glass-panel news-card">
                        <span style="font-size: 0.8rem; color: var(--primary); font-weight: bold;">25-02-2026</span>
                        <h4 style="margin: 0.5rem 0;">NDoE Graduate Teacher Recruitment of 2026</h4>
                        <a href="#" class="nav-link">Read more &rarr;</a>
                    </div>
                    <div class="card glass-panel news-card">
                        <span style="font-size: 0.8rem; color: var(--primary); font-weight: bold;">10-02-2026</span>
                        <h4 style="margin: 0.5rem 0;">Government Allocates K904.5 Million</h4>
                        <a href="#" class="nav-link">Read more &rarr;</a>
                    </div>
                    <div class="card glass-panel news-card">
                        <span style="font-size: 0.8rem; color: var(--primary); font-weight: bold;">10-02-2026</span>
                        <h4 style="margin: 0.5rem 0;">Strict 2026 Mandate: No Enrollment Fee</h4>
                        <a href="#" class="nav-link">Read more &rarr;</a>
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
                            <div style="font-size: 1.1rem; font-weight: 400; margin-bottom: 0.3rem;">MESSAGE FROM THE SECRETARY</div>
                            <div style="font-size: 1.4rem; font-weight: 600; margin-bottom: 0.2rem;">DEPARTMENT OF EDUCATION</div>
                        </div>
                        
                        <div style="display: flow-root;">
                            <img src="assets/images/leaders/secretary.png" alt="Secretary" style="float: left; width: 220px; height: 220px; object-fit: cover; margin: 0 2rem 1rem 0; border: 4px solid #f5a623; padding: 2px;">
                            <p style="margin-bottom: 1rem; font-size: 0.95rem; line-height: 1.6;">[The Secretary's full message will go here. Please provide the text to update.]</p>
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
