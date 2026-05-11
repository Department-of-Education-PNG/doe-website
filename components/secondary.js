window.SecondaryComponent = {
    render: async () => {
        return `
            <div class="subpage-header reveal-up">
                <div class="subpage-header-inner">
                    <h1 class="reveal-up">Secondary Education</h1>
                    <p class="reveal-up">Empowering students to reach their full potential and prepare for higher learning or the workforce.</p>
                </div>
            </div>

            <section class="section-full" style="padding: var(--section-spacing) 0;">
                <div class="grid-2" style="align-items: center; gap: var(--grid-gap);">
                    <div class="content-text">
                        <h2 style="font-size: 2rem; color: var(--primary); margin-bottom: 1.5rem;">Pathways to Excellence (Grades 9 - 12)</h2>
                        <p style="font-size: 1.15rem; line-height: 1.8; color: var(--text-muted); margin-bottom: 1.5rem;">
                            Secondary Education is the formal stage of progression after Upper Primary, encompassing <span style="color: var(--text-main); font-weight: 600;">Grades 9 to 12</span>.
                        </p>
                        <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-muted); margin-bottom: 1.5rem;">
                            Students navigate through two distinct levels of secondary schooling:
                            <ul style="margin-left: 1.5rem; margin-top: 1rem; color: var(--text-muted); font-size: 1.1rem;">
                                <li style="margin-bottom: 1rem;"><strong style="color: var(--text-main);">Lower Secondary (Grades 9 & 10):</strong> Attained at Secondary Schools or Provincial High Schools, focusing on foundational secondary disciplines.</li>
                                <li><strong style="color: var(--text-main);">Upper Secondary (Grades 11 & 12):</strong> Specialized education attained at Secondary Schools or National High Schools (NHS), leading to tertiary placement.</li>
                            </ul>
                        </p>
                    </div>
                    <div style="position: relative;">
                        <div class="glass-panel" style="padding: 1rem; border-radius: 24px; position: relative; z-index: 2;">
                            <img src="assets/images/secondary-imgs/sec-img.png" alt="Secondary Education" style="width: 100%; height: 500px; object-fit: cover; border-radius: 16px; display: block;" onerror="this.src='https://images.unsplash.com/photo-1523050853061-8c48f21287e0?auto=format&fit=crop&q=80&w=800'">
                        </div>
                        <div style="position: absolute; top: -30px; right: -30px; width: 150px; height: 150px; background: var(--primary-glow); filter: blur(60px); opacity: 0.5; z-index: 1;"></div>
                        <div style="position: absolute; bottom: -40px; left: -40px; width: 200px; height: 200px; background: rgba(59, 165, 224, 0.2); filter: blur(80px); opacity: 0.4; z-index: 1;"></div>
                    </div>
                </div>
            </section>

            <section class="section-full" style="border-top: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border); padding: var(--section-spacing) 0;">
                <div class="grid-2">
                    <div class="card glass-panel" style="border-left: 4px solid var(--primary);">
                        <h3 style="color: #fff; display: flex; align-items: center; gap: 0.5rem;"><span style="font-size: 1.5rem;">📜</span> School Certificate</h3>
                        <p style="color: var(--text-muted); margin-bottom: 1rem;">Awarded upon the successful completion of the External Examination at the end of Grade 10.</p>
                        <span style="background: var(--primary); color: #fff; font-size: 0.8rem; padding: 0.3rem 0.8rem; border-radius: 20px; font-weight: 700;">LOWER SECONDARY</span>
                    </div>
                    <div class="card glass-panel" style="border-left: 4px solid var(--accent);">
                        <h3 style="color: #fff; display: flex; align-items: center; gap: 0.5rem;"><span style="font-size: 1.5rem;">🎓</span> Higher School Certificate</h3>
                        <p style="color: var(--text-muted); margin-bottom: 1rem;">Awarded upon the successful completion of the External Examination at the end of Grade 12.</p>
                        <span style="background: var(--accent); color: #111; font-size: 0.8rem; padding: 0.3rem 0.8rem; border-radius: 20px; font-weight: 700;">UPPER SECONDARY</span>
                    </div>
                </div>
            </section>

            <section class="section-full" style="padding: var(--section-spacing) 0;">
                <div class="section-header">
                    <h2>Standard Based Curriculum (SBC)</h2>
                    <p class="section-p" style="color: var(--text-muted); margin: 0; font-size: 1.1rem;">
                        The Department of Education continuously updates the secondary curriculum to ensure high academic standards and industry relevance.
                    </p>
                </div>

                <div class="table-scroll-wrap glass-panel" style="box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
                    <div class="table-inner">
                        <table class="glass-table" style="min-width: 1000px;">
                            <thead>
                                <tr style="background: rgba(59, 165, 224, 0.15);">
                                    <th style="padding: 1.5rem; color: var(--primary); font-weight: 800;">Subject Area</th>
                                    <th style="padding: 1.5rem; color: var(--primary); font-weight: 800; text-align: left;">Syllabus Documents</th>
                                    <th style="padding: 1.5rem; color: var(--primary); font-weight: 800; text-align: left;">Teacher's Instructional Guides</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Agriculture -->
                                <tr style="border-top: 1px solid var(--glass-border);">
                                    <td style="padding: 1.5rem; font-weight: 600; vertical-align: top;">Agriculture</td>
                                    <td style="padding: 1.2rem 1.5rem; color: var(--text-muted); font-size: 0.95rem;">
                                        • Grade 9 and 10 <br>
                                        • Grade 11 and 12
                                    </td>
                                    <td style="padding: 1.2rem 1.5rem;">
                                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                            <a href="#" class="btn-table">Grade 9 &darr;</a>
                                            <a href="#" class="btn-table">Grade 10 &darr;</a>
                                            <a href="#" class="btn-table" style="border-color: var(--accent); color: var(--accent);">Grade 11 &darr;</a>
                                            <a href="#" class="btn-table" style="border-color: var(--accent); color: var(--accent);">Grade 12 &darr;</a>
                                        </div>
                                    </td>
                                </tr>
                                <!-- Arts -->
                                <tr style="border-top: 1px solid var(--glass-border);">
                                    <td style="padding: 1.5rem; font-weight: 600; vertical-align: top;">Arts</td>
                                    <td style="padding: 1.2rem 1.5rem; color: var(--text-muted); font-size: 0.95rem;">
                                        • Grade 9 and 10 <br>
                                        • Grade 11 and 12
                                    </td>
                                    <td style="padding: 1.2rem 1.5rem;">
                                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                            <a href="#" class="btn-table">Grade 9 &darr;</a>
                                            <a href="#" class="btn-table">Grade 10 &darr;</a>
                                            <a href="#" class="btn-table" style="border-color: var(--accent); color: var(--accent);">Grade 11 &darr;</a>
                                            <a href="#" class="btn-table" style="border-color: var(--accent); color: var(--accent);">Grade 12 &darr;</a>
                                        </div>
                                    </td>
                                </tr>
                                <!-- Business Studies -->
                                <tr style="border-top: 1px solid var(--glass-border);">
                                    <td style="padding: 1.5rem; font-weight: 600; vertical-align: top;">Business Studies</td>
                                    <td style="padding: 1.2rem 1.5rem; color: var(--text-muted); font-size: 0.95rem;">
                                        • Grade 9 and 10 <br>
                                        • Grade 11 and 12
                                    </td>
                                    <td style="padding: 1.2rem 1.5rem;">
                                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                            <a href="#" class="btn-table">Grade 9 &darr;</a>
                                            <a href="#" class="btn-table">Grade 10 &darr;</a>
                                            <a href="#" class="btn-table" style="border-color: var(--accent); color: var(--accent);">Grade 11 &darr;</a>
                                            <a href="#" class="btn-table" style="border-color: var(--accent); color: var(--accent);">Grade 12 &darr;</a>
                                        </div>
                                    </td>
                                </tr>
                                <!-- CSD -->
                                <tr style="border-top: 1px solid var(--glass-border);">
                                    <td style="padding: 1.5rem; font-weight: 600; vertical-align: top;">Character Development (CSD)</td>
                                    <td style="padding: 1.2rem 1.5rem; color: var(--text-muted); font-size: 0.95rem;">
                                        • Grade 9 and 10 <br>
                                        • Grade 11 and 12
                                    </td>
                                    <td style="padding: 1.2rem 1.5rem;">
                                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                            <a href="#" class="btn-table">Grade 9 &darr;</a>
                                            <a href="#" class="btn-table">Grade 10 &darr;</a>
                                            <a href="#" class="btn-table" style="border-color: var(--accent); color: var(--accent);">Grade 11 &darr;</a>
                                            <a href="#" class="btn-table" style="border-color: var(--accent); color: var(--accent);">Grade 12 &darr;</a>
                                        </div>
                                    </td>
                                </tr>
                                <!-- CCVE -->
                                <tr style="border-top: 1px solid var(--glass-border);">
                                    <td style="padding: 1.5rem; font-weight: 600; vertical-align: top;">Christian Values (CCVE)</td>
                                    <td style="padding: 1.2rem 1.5rem; color: var(--text-muted); font-size: 0.95rem;">
                                        • Grades 7, 8, 9, 10, 11, 12
                                    </td>
                                    <td style="padding: 1.2rem 1.5rem;">
                                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                            <a href="#" class="btn-table">Gr 7 & 8 &darr;</a>
                                            <a href="#" class="btn-table">Gr 9 & 10 &darr;</a>
                                            <a href="#" class="btn-table" style="border-color: var(--accent); color: var(--accent);">Gr 11 & 12 &darr;</a>
                                        </div>
                                    </td>
                                </tr>
                                <!-- Mathematics -->
                                <tr style="border-top: 1px solid var(--glass-border);">
                                    <td style="padding: 1.5rem; font-weight: 600; vertical-align: top;">Mathematics</td>
                                    <td style="padding: 1.2rem 1.5rem; color: var(--text-muted); font-size: 0.95rem;">
                                        • Grade 9 and 10 <br>
                                        • Grade 11 and 12 (General)<br>
                                        • Grade 11 and 12 (Advanced)
                                    </td>
                                    <td style="padding: 1.2rem 1.5rem;">
                                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                            <a href="#" class="btn-table">Grade 9 &darr;</a>
                                            <a href="#" class="btn-table">Grade 10 &darr;</a>
                                            <a href="#" class="btn-table" style="border-color: var(--accent); color: var(--accent);">G-Maths &darr;</a>
                                            <a href="#" class="btn-table" style="border-color: var(--accent); color: var(--accent);">A-Maths &darr;</a>
                                        </div>
                                    </td>
                                </tr>
                                <!-- Science -->
                                <tr style="border-top: 1px solid var(--glass-border);">
                                    <td style="padding: 1.5rem; font-weight: 600; vertical-align: top;">Science</td>
                                    <td style="padding: 1.2rem 1.5rem; color: var(--text-muted); font-size: 0.95rem;">
                                        • Grade 9 and 10 Science <br>
                                        • Gr 11-12 Physics, Chemistry, Biology, Geology
                                    </td>
                                    <td style="padding: 1.2rem 1.5rem;">
                                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                            <a href="#" class="btn-table">L-Secondary &darr;</a>
                                            <a href="#" class="btn-table" style="border-color: var(--accent); color: var(--accent);">Physics &darr;</a>
                                            <a href="#" class="btn-table" style="border-color: var(--accent); color: var(--accent);">Chemistry &darr;</a>
                                            <a href="#" class="btn-table" style="border-color: var(--accent); color: var(--accent);">Biology &darr;</a>
                                            <a href="#" class="btn-table" style="border-color: var(--accent); color: var(--accent);">Geology &darr;</a>
                                        </div>
                                    </td>
                                </tr>
                                <!-- Social Science -->
                                <tr style="border-top: 1px solid var(--glass-border);">
                                    <td style="padding: 1.5rem; font-weight: 600; vertical-align: top;">Social Science</td>
                                    <td style="padding: 1.2rem 1.5rem; color: var(--text-muted); font-size: 0.95rem;">
                                        • Grade 9 and 10 Social Science <br>
                                        • Gr 11-12 Economics, History, Geography, Environment, Political Science
                                    </td>
                                    <td style="padding: 1.2rem 1.5rem;">
                                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                            <a href="#" class="btn-table">L-Secondary &darr;</a>
                                            <a href="#" class="btn-table" style="border-color: var(--accent); color: var(--accent);">Economics &darr;</a>
                                            <a href="#" class="btn-table" style="border-color: var(--accent); color: var(--accent);">History &darr;</a>
                                            <a href="#" class="btn-table" style="border-color: var(--accent); color: var(--accent);">Geography &darr;</a>
                                            <a href="#" class="btn-table" style="border-color: var(--accent); color: var(--accent);">Environment &darr;</a>
                                            <a href="#" class="btn-table" style="border-color: var(--accent); color: var(--accent);">Pol Sci &darr;</a>
                                        </div>
                                    </td>
                                </tr>
                                <!-- Industrial Arts -->
                                <tr style="border-top: 1px solid var(--glass-border);">
                                    <td style="padding: 1.5rem; font-weight: 600; vertical-align: top;">Industrial Arts</td>
                                    <td style="padding: 1.2rem 1.5rem; color: var(--text-muted); font-size: 0.95rem;">
                                        • Gr 9-10 (Communication, Computer, Construction, Food, Textile Technologies) <br>
                                        • Gr 11-12 (Syllabus for all specializations)
                                    </td>
                                    <td style="padding: 1.2rem 1.5rem;">
                                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                            <a href="#" class="btn-table">L-Secondary &darr;</a>
                                            <a href="#" class="btn-table" style="border-color: var(--accent); color: var(--accent);">U-Secondary &darr;</a>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section class="section-full" style="border-top: 1px solid rgba(231, 76, 60, 0.1); padding: var(--section-spacing) 0;">
                <div class="table-scroll-wrap glass-panel" style="padding: var(--card-padding); border-color: rgba(231, 76, 60, 0.2);">
                    <h3 style="color: var(--accent-red); margin-bottom: 2rem;">Secretary's Advice: Ongoing OBC Syllabuses</h3>
                    <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.8; margin-bottom: 1.5rem;">
                        Per Secretary’s advice, the following <span style="color: #fff; font-weight: 600;">Outcome Based Curriculum (OBC)</span> syllabuses and teacher guides are to remain in effect until the Curriculum Development Division (CDD) completes the transition to stand-alone subjects under the new structure.
                    </p>
                    <div class="table-inner">
                        <table class="glass-table" style="margin-top: 0; min-width: 600px;">
                            <thead>
                                <tr style="background: rgba(231, 76, 60, 0.1);">
                                    <th style="padding: 1rem; color: #fff;">OBC Documents (Upper Secondary)</th>
                                    <th style="padding: 1rem; color: #fff; text-align: center;">Download Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="padding: 1rem;">Grade 11 and 12 Economics</td>
                                    <td style="text-align: center;"><a href="#" class="btn-table" style="border-color: var(--accent-red); color: var(--accent-red);">PDF &darr;</a></td>
                                </tr>
                                <tr>
                                    <td style="padding: 1rem; border-top: 1px solid var(--glass-border);">Grade 11 and 12 History</td>
                                    <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table" style="border-color: var(--accent-red); color: var(--accent-red);">PDF &darr;</a></td>
                                </tr>
                                <tr>
                                    <td style="padding: 1rem; border-top: 1px solid var(--glass-border);">Grade 11 and 12 Geography</td>
                                    <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table" style="border-color: var(--accent-red); color: var(--accent-red);">PDF &darr;</a></td>
                                </tr>
                                <tr>
                                    <td style="padding: 1rem; border-top: 1px solid var(--glass-border);">Grade 11 and 12 Legal Studies</td>
                                    <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table" style="border-color: var(--accent-red); color: var(--accent-red);">PDF &darr;</a></td>
                                </tr>
                                <tr>
                                    <td style="padding: 1rem; border-top: 1px solid var(--glass-border);">Grade 11 and 12 Accounting</td>
                                    <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table" style="border-color: var(--accent-red); color: var(--accent-red);">PDF &darr;</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        `;
    }
};
