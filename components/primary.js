window.PrimaryComponent = {
    render: async () => {
        return `
            <div class="subpage-header" style="background: linear-gradient(135deg, rgba(20, 50, 95, 0.95) 0%, rgba(14, 32, 64, 0.8) 100%), url('assets/images/primary-banner/prim-banner.png') center/cover; padding: 10rem 2rem 6rem; text-align: center; position: relative; overflow: hidden;">
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at center, var(--primary-glow) 0%, transparent 70%); opacity: 0.3; pointer-events: none;"></div>
                <div class="container" style="max-width: 1200px; margin: 0 auto; position: relative; z-index: 1;">
                    <h1 style="font-size: clamp(2.5rem, 8vw, 4rem); font-weight: 800; margin-bottom: 1.5rem; letter-spacing: -1.5px; line-height: 1.1;">Primary Education</h1>
                    <div style="width: 80px; height: 4px; background: var(--accent); margin: 0 auto 2rem; border-radius: 2px;"></div>
                    <p style="font-size: 1.25rem; color: var(--text-muted); max-width: 800px; margin: 0 auto; line-height: 1.6;">Bridging early learning to advanced secondary education for the next generation of Papua New Guineans.</p>
                </div>
            </div>

            <section class="section-full">
                <div class="grid-2" style="align-items: center; gap: 5rem;">
                    <div class="content-text">
                        <h2 style="font-size: 2rem; color: var(--primary); margin-bottom: 1.5rem;">Six Years of Growth (Grades 3 - 8)</h2>
                        <p style="font-size: 1.15rem; line-height: 1.8; color: var(--text-muted); margin-bottom: 1.5rem;">
                            Primary Education in Papua New Guinea begins at <span style="color: var(--text-main); font-weight: 600;">Grade 3</span> and finishes at <span style="color: var(--text-main); font-weight: 600;">Grade 8</span>, catering to children aged 9 to 14 years.
                        </p>
                        <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-muted); margin-bottom: 1.5rem;">
                            The system is divided into two key stages designed to support developmental milestones:
                            <ul style="margin-left: 1.5rem; margin-top: 1rem; color: var(--text-muted); font-size: 1.1rem;">
                                <li style="margin-bottom: 0.8rem;"><strong style="color: var(--text-main);">Lower Primary (Grades 3 - 5):</strong> Focusing on strengthening foundational literacy, numeracy, and social integration.</li>
                                <li><strong style="color: var(--text-main);">Upper Primary (Grades 6 - 8):</strong> Preparing students for the rigors of secondary education with a broader academic scope.</li>
                            </ul>
                        </p>
                        <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-muted); margin-top: 1.5rem;">
                            Since 2012, our mandate ensures that all children completing Grade 6 can be accommodated in Grade 7, with a target of achieving a 70% retention rate from Grades 1 to 6.
                        </p>
                    </div>
                    <div style="position: relative;">
                        <div class="glass-panel" style="padding: 1rem; border-radius: 24px; position: relative; z-index: 2;">
                            <img src="assets/images/hero/hero-2.jpg" alt="Primary School Students" style="width: 100%; height: 500px; object-fit: cover; border-radius: 16px; display: block;" onerror="this.src='https://images.unsplash.com/photo-1497633762265-9a177c809852?auto=format&fit=crop&q=80&w=800'">
                        </div>
                        <div style="position: absolute; top: -30px; left: -30px; width: 150px; height: 150px; background: var(--primary-glow); filter: blur(60px); opacity: 0.5; z-index: 1;"></div>
                        <div style="position: absolute; bottom: -40px; right: -40px; width: 200px; height: 200px; background: rgba(231, 76, 60, 0.2); filter: blur(80px); opacity: 0.3; z-index: 1;"></div>
                    </div>
                </div>
            </section>

            <section class="section-full" style="background: rgba(255, 255, 255, 0.02); border-top: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border);">
                <div style="max-width: 900px; margin: 0 auto; text-align: center;">
                    <h2 class="section-title" style="margin-bottom: 1.5rem;">Standard Based Curriculum (SBC)</h2>
                    <p style="font-size: 1.15rem; line-height: 1.8; color: var(--text-muted);">
                        The Department of Education is committed to establishing sufficient primary school classes to achieve access and retention targets. Our goals ensure every child completes three years of basic relevant education, starting from the Elementary Prep Grade.
                    </p>
                </div>
            </section>

            <section class="section-full">
                <h2 class="section-title">Subjects & Syllabus (SBC)</h2>
                <p style="text-align: center; color: var(--text-muted); margin-bottom: 4rem; max-width: 700px; margin-left: auto; margin-right: auto;">
                    Access the official Syllabus and Teachers Guides for both Junior and Senior Primary levels.
                </p>

                <div class="glass-panel" style="overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
                    <div style="overflow-x: auto;">
                        <table class="glass-table" style="margin-top: 0; min-width: 900px;">
                            <thead>
                                <tr style="background: rgba(59, 165, 224, 0.15);">
                                    <th style="padding: 1.5rem; color: var(--primary); font-weight: 800;">Subject</th>
                                    <th colspan="2" style="padding: 1.5rem; color: var(--accent); font-weight: 800; text-align: center; border-right: 1px solid var(--glass-border);">Junior Primary (Grades 3-5)</th>
                                    <th colspan="2" style="padding: 1.5rem; color: #2ecc71; font-weight: 800; text-align: center;">Senior Primary (Grades 6-8)</th>
                                </tr>
                                <tr style="background: rgba(255, 255, 255, 0.05); font-size: 0.8rem;">
                                    <th style="padding: 1rem; border-top: 1px solid var(--glass-border);"></th>
                                    <th style="padding: 1rem; border-top: 1px solid var(--glass-border); text-align: center;">Students Syllabus</th>
                                    <th style="padding: 1rem; border-top: 1px solid var(--glass-border); text-align: center; border-right: 1px solid var(--glass-border);">Teacher Guides</th>
                                    <th style="padding: 1rem; border-top: 1px solid var(--glass-border); text-align: center;">Students Syllabus</th>
                                    <th style="padding: 1rem; border-top: 1px solid var(--glass-border); text-align: center;">Teacher Guides</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Arts -->
                                <tr style="border-top: 1px solid var(--glass-border);">
                                    <td style="padding: 1.5rem; font-weight: 600;">Arts</td>
                                    <td style="text-align: center;">Grade 3, 4, 5 Arts</td>
                                    <td style="text-align: center; border-right: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    <td style="text-align: center;">Grade 6, 7, 8 Arts</td>
                                    <td style="text-align: center;"><a href="#" class="btn-table">PDF &darr;</a></td>
                                </tr>
                                <!-- English -->
                                <tr style="border-top: 1px solid var(--glass-border);">
                                    <td style="padding: 1.5rem; font-weight: 600;">English</td>
                                    <td style="text-align: center;">Grade 3, 4, 5 English</td>
                                    <td style="text-align: center; border-right: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    <td style="text-align: center;">Grade 6, 7, 8 English</td>
                                    <td style="text-align: center;"><a href="#" class="btn-table">PDF &darr;</a></td>
                                </tr>
                                <!-- Maths -->
                                <tr style="border-top: 1px solid var(--glass-border);">
                                    <td style="padding: 1.5rem; font-weight: 600;">Maths</td>
                                    <td style="text-align: center;">Grade 3, 4, 5 Maths</td>
                                    <td style="text-align: center; border-right: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    <td style="text-align: center;">Grade 6, 7, 8 Maths</td>
                                    <td style="text-align: center;"><a href="#" class="btn-table">PDF &darr;</a></td>
                                </tr>
                                <!-- Health / PE -->
                                <tr style="border-top: 1px solid var(--glass-border);">
                                    <td style="padding: 1.5rem; font-weight: 600;">Health & Physical Ed</td>
                                    <td style="text-align: center;">Grade 3, 4, 5 Health</td>
                                    <td style="text-align: center; border-right: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    <td style="text-align: center;">Grade 6, 7, 8 Health - PE</td>
                                    <td style="text-align: center;"><a href="#" class="btn-table">PDF &darr;</a></td>
                                </tr>
                                <!-- Science / Making a Living -->
                                <tr style="border-top: 1px solid var(--glass-border);">
                                    <td style="padding: 1.5rem; font-weight: 600;">Science / Lifestyle</td>
                                    <td style="text-align: center;">Grade 3, 4, 5 Science</td>
                                    <td style="text-align: center; border-right: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    <td style="text-align: center;">Grade 6, 7, 8 Making a Living</td>
                                    <td style="text-align: center;"><a href="#" class="btn-table">PDF &darr;</a></td>
                                </tr>
                                <!-- Social Science / Science -->
                                <tr style="border-top: 1px solid var(--glass-border);">
                                    <td style="padding: 1.5rem; font-weight: 600;">Social Science / Science</td>
                                    <td style="text-align: center;">Grade 3, 4, 5 Social Science</td>
                                    <td style="text-align: center; border-right: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    <td style="text-align: center;">Grade 6, 7, 8 Science</td>
                                    <td style="text-align: center;"><a href="#" class="btn-table">PDF &darr;</a></td>
                                </tr>
                                <!-- PE / Social Science -->
                                <tr style="border-top: 1px solid var(--glass-border);">
                                    <td style="padding: 1.5rem; font-weight: 600;">PE / Social Science</td>
                                    <td style="text-align: center;">Grade 3, 4, 5 Physical Ed</td>
                                    <td style="text-align: center; border-right: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    <td style="text-align: center;">Grade 6, 7, 8 Social Science</td>
                                    <td style="text-align: center;"><a href="#" class="btn-table">PDF &darr;</a></td>
                                </tr>
                                <!-- CCVE -->
                                <tr style="border-top: 1px solid var(--glass-border);">
                                    <td style="padding: 1.5rem; font-weight: 600;">Citizenship & Christian Values</td>
                                    <td style="text-align: center;">Grade 3-5 (CCVE)</td>
                                    <td style="text-align: center; border-right: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    <td style="text-align: center;">Grade 6, 7, 8 (CCVE)</td>
                                    <td style="text-align: center;"><a href="#" class="btn-table">PDF &darr;</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section class="section-full" style="background: linear-gradient(135deg, rgba(59, 165, 224, 0.1) 0%, rgba(20, 50, 95, 0.05) 100%);">
                <div class="grid-2" style="align-items: center;">
                    <div style="padding: 2rem;">
                        <h2 style="font-size: 2rem; color: var(--accent); margin-bottom: 1.5rem;">Targeting 2026 Goals</h2>
                        <div class="glass-panel" style="padding: 2rem; margin-bottom: 2rem;">
                            <h4 style="color: #fff; margin-bottom: 1rem;">RETENTION RATE</h4>
                            <p style="color: var(--text-muted); line-height: 1.6;">Our objective is to reach a 70% retention rate from Grades 1 to 6, ensuring that every child who starts their education stay in the system until they complete basic schooling.</p>
                        </div>
                        <div class="glass-panel" style="padding: 2rem;">
                            <h4 style="color: #fff; margin-bottom: 1rem;">UNIVERSAL ACCOMMODATION</h4>
                            <p style="color: var(--text-muted); line-height: 1.6;">We have expanded infrastructure so that every child completing Grade 6 can now be accommodated in Grade 7 for their upper primary years.</p>
                        </div>
                    </div>
                    <div>
                        <div style="background: rgba(255, 255, 255, 0.03); padding: 3rem; border-radius: 40px; border: 1px solid var(--glass-border); text-align: center;">
                            <div style="font-size: 4rem; margin-bottom: 1.5rem;">🎯</div>
                            <h3 style="color: #fff; font-size: 2rem; margin-bottom: 1rem;">Basic Relevant Education</h3>
                            <p style="color: var(--text-muted); font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem;">"The government's goal is that every child completes three years of basic relevant education, supported by the Standard Based Curriculum."</p>
                            <a href="#about" class="btn-primary">View National Education Plan</a>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
};
