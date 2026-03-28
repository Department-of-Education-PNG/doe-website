window.TextbooksComponent = {
    render: async () => {
        return `
            <div class="subpage-header" style="background: linear-gradient(135deg, rgba(20, 50, 95, 0.9) 0%, rgba(14, 32, 64, 0.7) 100%), url('assets/images/other-tabs-header-banner/banner-bg.png') center/cover; padding: 10rem 2rem 6rem; text-align: center; position: relative; overflow: hidden;">
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at center, var(--primary-glow) 0%, transparent 70%); opacity: 0.3; pointer-events: none;"></div>
                <div class="container" style="max-width: 1200px; margin: 0 auto; position: relative; z-index: 1;">
                    <h1 style="font-size: clamp(2.5rem, 8vw, 4rem); font-weight: 800; margin-bottom: 1.5rem; letter-spacing: -1.5px; line-height: 1.1;">Textbooks & Manuals</h1>
                    <div style="width: 80px; height: 4px; background: var(--accent); margin: 0 auto 2rem; border-radius: 2px;"></div>
                    <p style="font-size: 1.25rem; color: var(--text-muted); max-width: 800px; margin: 0 auto; line-height: 1.6;">Official resources ensuring no child is left behind in quality education across Papua New Guinea.</p>
                </div>
            </div>

            <section class="section-full">
                <div class="grid-2" style="align-items: center; gap: 5rem;">
                    <div style="position: relative;">
                        <div class="glass-panel" style="padding: 1rem; border-radius: 24px; position: relative; z-index: 2;">
                            <img src="assets/images/hero/hero-5.jpg" alt="National Textbooks" style="width: 100%; height: 500px; object-fit: cover; border-radius: 16px; display: block;" onerror="this.src='https://images.unsplash.com/photo-1491849591647-d597aa4aabc1?auto=format&fit=crop&q=80&w=800'">
                        </div>
                        <div style="position: absolute; top: -30px; left: -30px; width: 150px; height: 150px; background: var(--primary-glow); filter: blur(60px); opacity: 0.5; z-index: 1;"></div>
                        <div style="position: absolute; bottom: -40px; right: -40px; width: 220px; height: 220px; background: rgba(59, 165, 224, 0.2); filter: blur(80px); opacity: 0.4; z-index: 1;"></div>
                    </div>
                    <div class="content-text">
                        <h2 style="font-size: 2rem; color: var(--primary); margin-bottom: 1.5rem;">The National Textbook</h2>
                        <p style="font-size: 1.15rem; line-height: 1.8; color: var(--text-muted); margin-bottom: 1.5rem;">
                            The National Textbook provides a wealth of activities and ideas designed to allow students to learn either with a teacher or as <span style="color: var(--text-main); font-weight: 600;">independent learners</span>.
                        </p>
                        <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-muted); margin-bottom: 2rem;">
                            These resources are more than just books; they are learning tools that help students master complex concepts. We encourage all students to practice daily, both in the classroom and at home, to solidify their understanding.
                        </p>
                        
                        <div class="glass-panel" style="padding: 2.5rem; border-left: 4px solid var(--accent);">
                            <h3 style="color: #fff; margin-bottom: 1rem;">Teacher's Manual</h3>
                            <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.6; margin: 0;">
                                Specifically produced for primary school teachers, these manuals offer guidance on planning and teaching standard lessons that align perfectly with the National Textbook and Content Standards.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section-full" style="background: rgba(255, 255, 255, 0.02); text-align: center; border-top: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border);">
                <div class="container" style="max-width: 900px; margin: 0 auto;">
                    <h2 style="font-size: 2.2rem; margin-bottom: 1.5rem; color: #fff;">"No Child Left Behind"</h2>
                    <p style="font-size: 1.2rem; line-height: 1.8; color: var(--text-muted);">
                        Our textbooks and manuals are the official resources for all primary schools throughout Papua New Guinea. They ensure that every student receives a consistent, high-quality education regardless of their location.
                    </p>
                </div>
            </section>

            <section class="section-full">
                <h2 class="section-title">Textbooks & Teacher Manuals</h2>
                <div class="glass-panel" style="overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
                    <div style="overflow-x: auto;">
                        <table class="glass-table" style="margin-top: 0; min-width: 800px;">
                            <thead>
                                <tr style="background: rgba(59, 165, 224, 0.15);">
                                    <th style="padding: 1.5rem; color: var(--primary); font-weight: 800; width: 25%;">Grade Level</th>
                                    <th style="padding: 1.5rem; color: var(--primary); font-weight: 800; width: 25%;">Subject</th>
                                    <th style="padding: 1.5rem; color: var(--primary); font-weight: 800; text-align: center;">National Textbook</th>
                                    <th style="padding: 1.5rem; color: var(--primary); font-weight: 800; text-align: center;">Teacher's Manual</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Grade 1 & 2 -->
                                <tr style="border-top: 1px solid var(--glass-border);">
                                    <td rowspan="2" style="padding: 2rem 1.5rem; vertical-align: middle; background: rgba(255,255,255,0.02); border-right: 1px solid var(--glass-border);">
                                        <div style="font-weight: 800; color: #fff; font-size: 1.1rem;">GRADE 1 & 2</div>
                                    </td>
                                    <td style="padding: 1.5rem; font-weight: 600;">Mathematics (Gr 1)</td>
                                    <td style="text-align: center;"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    <td style="text-align: center;"><a href="#" class="btn-table" style="border-color: var(--accent); color: var(--accent);">PDF &darr;</a></td>
                                </tr>
                                <tr>
                                    <td style="padding: 1.5rem; font-weight: 600; border-top: 1px solid var(--glass-border);">Mathematics (Gr 2)</td>
                                    <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table" style="border-color: var(--accent); color: var(--accent);">PDF &darr;</a></td>
                                </tr>

                                <!-- Grade 3 -->
                                <tr style="border-top: 2px solid var(--primary);">
                                    <td rowspan="2" style="padding: 2rem 1.5rem; vertical-align: middle; background: rgba(255,255,255,0.02); border-right: 1px solid var(--glass-border);">
                                        <div style="font-weight: 800; color: #fff; font-size: 1.1rem;">GRADE 3</div>
                                    </td>
                                    <td style="padding: 1.5rem; font-weight: 600;">Mathematics</td>
                                    <td style="text-align: center;"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    <td style="text-align: center;"><a href="#" class="btn-table" style="border-color: var(--accent); color: var(--accent);">PDF &darr;</a></td>
                                </tr>
                                <tr>
                                    <td style="padding: 1.5rem; font-weight: 600; border-top: 1px solid var(--glass-border);">Science</td>
                                    <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table" style="border-color: var(--accent); color: var(--accent);">PDF &darr;</a></td>
                                </tr>

                                <!-- Grade 4 -->
                                <tr style="border-top: 2px solid var(--primary);">
                                    <td rowspan="2" style="padding: 2rem 1.5rem; vertical-align: middle; background: rgba(255,255,255,0.02); border-right: 1px solid var(--glass-border);">
                                        <div style="font-weight: 800; color: #fff; font-size: 1.1rem;">GRADE 4</div>
                                    </td>
                                    <td style="padding: 1.5rem; font-weight: 600;">Mathematics</td>
                                    <td style="text-align: center;"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    <td style="text-align: center;"><a href="#" class="btn-table" style="border-color: var(--accent); color: var(--accent);">PDF &darr;</a></td>
                                </tr>
                                <tr>
                                    <td style="padding: 1.5rem; font-weight: 600; border-top: 1px solid var(--glass-border);">Science</td>
                                    <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table" style="border-color: var(--accent); color: var(--accent);">PDF &darr;</a></td>
                                </tr>

                                <!-- Grade 5 -->
                                <tr style="border-top: 2px solid var(--primary);">
                                    <td rowspan="2" style="padding: 2rem 1.5rem; vertical-align: middle; background: rgba(255,255,255,0.02); border-right: 1px solid var(--glass-border);">
                                        <div style="font-weight: 800; color: #fff; font-size: 1.1rem;">GRADE 5</div>
                                    </td>
                                    <td style="padding: 1.5rem; font-weight: 600;">Mathematics</td>
                                    <td style="text-align: center;"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    <td style="text-align: center;"><a href="#" class="btn-table" style="border-color: var(--accent); color: var(--accent);">PDF &darr;</a></td>
                                </tr>
                                <tr>
                                    <td style="padding: 1.5rem; font-weight: 600; border-top: 1px solid var(--glass-border);">Science</td>
                                    <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table" style="border-color: var(--accent); color: var(--accent);">PDF &darr;</a></td>
                                </tr>

                                <!-- Grade 6 -->
                                <tr style="border-top: 2px solid var(--primary);">
                                    <td rowspan="2" style="padding: 2rem 1.5rem; vertical-align: middle; background: rgba(255,255,255,0.02); border-right: 1px solid var(--glass-border);">
                                        <div style="font-weight: 800; color: #fff; font-size: 1.1rem;">GRADE 6</div>
                                    </td>
                                    <td style="padding: 1.5rem; font-weight: 600;">Mathematics</td>
                                    <td style="text-align: center;"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    <td style="text-align: center;"><a href="#" class="btn-table" style="border-color: var(--accent); color: var(--accent);">PDF &darr;</a></td>
                                </tr>
                                <tr>
                                    <td style="padding: 1.5rem; font-weight: 600; border-top: 1px solid var(--glass-border);">Science</td>
                                    <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table" style="border-color: var(--accent); color: var(--accent);">PDF &darr;</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        `;
    }
};
