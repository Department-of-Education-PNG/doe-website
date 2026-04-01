window.ElementaryComponent = {
    render: async () => {
        return `
            <div class="subpage-header" style="background: linear-gradient(135deg, rgba(14, 32, 64, 0.95) 0%, rgba(14, 32, 64, 0.8) 100%), url('assets/images/elementory-banner/elem-imgs.png') center/cover; padding: 10rem 2rem 6rem; text-align: center; position: relative; overflow: hidden;">
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at center, var(--primary-glow) 0%, transparent 70%); opacity: 0.3; pointer-events: none;"></div>
                <div class="container" style="max-width: 1200px; margin: 0 auto; position: relative; z-index: 1;">
                    <h1 style="font-size: clamp(2.5rem, 8vw, 4rem); font-weight: 800; margin-bottom: 1.5rem; letter-spacing: -1.5px; line-height: 1.1;">Elementary Education</h1>
                    <div style="width: 80px; height: 4px; background: var(--accent); margin: 0 auto 2rem; border-radius: 2px;"></div>
                    <p style="font-size: 1.25rem; color: var(--text-muted); max-width: 800px; margin: 0 auto; line-height: 1.6;">The foundation of lifelong learning, cultural identity, and character building in Papua New Guinea.</p>
                </div>
            </div>

            <section class="section-full">
                <div class="grid-2" style="align-items: center; gap: 5rem;">
                    <div class="content-text">
                        <h2 style="font-size: 2rem; color: var(--primary); margin-bottom: 1.5rem;">The First Stage of Formal Education</h2>
                        <p style="font-size: 1.15rem; line-height: 1.8; color: var(--text-muted); margin-bottom: 1.5rem;">
                            Elementary Education is the essential first step in a child's academic journey. It consists of three critical years: 
                            <span style="color: var(--text-main); font-weight: 600;">Elementary Preparatory Grade</span>, 
                            <span style="color: var(--text-main); font-weight: 600;">Elementary Grade 1</span>, and 
                            <span style="color: var(--text-main); font-weight: 600;">Elementary Grade 2</span>.
                        </p>
                        <p style="font-size: 1.15rem; line-height: 1.8; color: var(--text-muted); margin-bottom: 2rem;">
                            Conducted in the language of the child's community, these years prepare students for entry into <span style="color: var(--accent);">Primary School at Grade 3</span>. This community-based approach ensures that the transition to formal schooling is natural, supportive, and grounded in local heritage.
                        </p>
                        <div class="glass-panel" style="padding: 2.5rem; border-left: 4px solid var(--accent); position: relative; background: rgba(255, 255, 255, 0.03);">
                            <svg style="position: absolute; top: 1.5rem; right: 1.5rem; width: 40px; height: 40px; opacity: 0.1; fill: var(--accent);" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9.01704C7.91247 16 7.01704 16.8954 7.01704 18V21H14.017ZM14.017 21H17.017V18C17.017 15.2386 14.7784 13 12.017 13H9.01704C6.25562 13 4.01704 15.2386 4.01704 18V21H14.017ZM12.017 11C13.6739 11 15.017 9.65685 15.017 8C15.017 6.34315 13.6739 5 12.017 5C10.3602 5 9.01704 6.34315 9.01704 8C9.01704 9.65685 10.3602 11 12.017 11ZM12.017 3C14.7784 3 17.017 5.23858 17.017 8C17.017 10.7614 14.7784 13 12.017 13C9.25562 13 7.01704 10.7614 7.01704 8C7.01704 5.23858 9.25562 3 12.017 3Z"/></svg>
                            <h4 style="color: var(--text-main); margin-bottom: 1rem; font-size: 1.2rem;">Building Life Skills</h4>
                            <p style="color: var(--text-muted); font-size: 1rem; margin: 0; line-height: 1.6;">
                                Beyond academics, children develop literacy and numeracy skills alongside discipline, personal health, and respect for others—values that last a lifetime.
                            </p>
                        </div>
                    </div>
                    <div style="position: relative;">
                        <div class="glass-panel" style="padding: 1rem; border-radius: 24px; position: relative; z-index: 2;">
                            <img src="assets/images/elementory-imgs/elem-img.png" alt="Elementary Learning" style="width: 100%; height: 500px; object-fit: cover; border-radius: 16px; display: block;" onerror="this.src='https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800'">
                        </div>
                        <div style="position: absolute; top: -30px; right: -30px; width: 150px; height: 150px; background: var(--primary-glow); filter: blur(60px); opacity: 0.5; z-index: 1;"></div>
                        <div style="position: absolute; bottom: -40px; left: -40px; width: 200px; height: 200px; background: rgba(245, 166, 35, 0.2); filter: blur(80px); opacity: 0.4; z-index: 1;"></div>
                    </div>
                </div>
            </section>

            <section class="section-full" style="padding-top: 0;">
                <div class="grid-3">
                    <div class="card glass-panel" style="text-align: center; border-bottom: 4px solid var(--primary);">
                        <div style="font-size: 2.5rem; margin-bottom: 1rem;">🇵🇳</div>
                        <h3 style="color: #fff;">Cultural Pride</h3>
                        <p style="color: var(--text-muted); font-size: 0.95rem;">Learning in community languages promotes our uniquely PNG values and way of life.</p>
                    </div>
                    <div class="card glass-panel" style="text-align: center; border-bottom: 4px solid var(--accent);">
                        <div style="font-size: 2.5rem; margin-bottom: 1rem;">🤝</div>
                        <h3 style="color: #fff;">Community Based</h3>
                        <p style="color: var(--text-muted); font-size: 0.95rem;">Supported by families and communities, making education cost-effective and accessible.</p>
                    </div>
                    <div class="card glass-panel" style="text-align: center; border-bottom: 4px solid #2ecc71;">
                        <div style="font-size: 2.5rem; margin-bottom: 1rem;">🌟</div>
                        <h3 style="color: #fff;">Future Ready</h3>
                        <p style="color: var(--text-muted); font-size: 0.95rem;">Early childhood education gives children the confidence to encourage a lifetime of learning.</p>
                    </div>
                </div>
            </section>

            <div style="background: linear-gradient(to right, transparent, rgba(59, 165, 224, 0.1), transparent); height: 1px; width: 100%; max-width: 1400px; margin: 0 auto;"></div>

            <section class="section-full">
                <div style="max-width: 1000px; margin: 0 auto;">
                    <h2 class="section-title" style="margin-bottom: 1.5rem;">Syllabus & Teacher's Guides</h2>
                    <p style="text-align: center; color: var(--text-muted); margin-bottom: 4rem; max-width: 700px; margin-left: auto; margin-right: auto;">
                        Click on the subjects below to access official curriculum documents and instructional guides for each elementary grade.
                    </p>

                    <div class="glass-panel" style="overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
                        <div style="overflow-x: auto;">
                            <table class="glass-table" style="margin-top: 0; min-width: 700px;">
                                <thead>
                                    <tr style="background: rgba(59, 165, 224, 0.15);">
                                        <th style="padding: 1.5rem; color: var(--primary); font-weight: 800;">Grade / Stage</th>
                                        <th style="padding: 1.5rem; color: var(--primary); font-weight: 800;">Subject Area</th>
                                        <th style="padding: 1.5rem; color: var(--primary); font-weight: 800; text-align: center;">Syllabus</th>
                                        <th style="padding: 1.5rem; color: var(--primary); font-weight: 800; text-align: center;">Teacher's Guide</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- Elementary Prep -->
                                    <tr style="border-top: 1px solid var(--glass-border);">
                                        <td rowspan="5" style="padding: 2rem 1.5rem; background: rgba(255,255,255,0.02); border-right: 1px solid var(--glass-border); vertical-align: middle;">
                                            <div style="font-weight: 800; color: #fff; font-size: 1.1rem;">ELEMENTARY PREP</div>
                                            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.4rem;">Foundation Year</div>
                                        </td>
                                        <td style="padding: 1.2rem 1.5rem;">English</td>
                                        <td style="text-align: center;"><a href="#" class="btn-table">PDF &darr;</a></td>
                                        <td style="text-align: center;"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 1.2rem 1.5rem; border-top: 1px solid var(--glass-border);">Language</td>
                                        <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                        <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 1.2rem 1.5rem; border-top: 1px solid var(--glass-border);">Mathematics</td>
                                        <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                        <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 1.2rem 1.5rem; border-top: 1px solid var(--glass-border);">Community & Culture</td>
                                        <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                        <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    </tr>
                                    <tr style="border-bottom: 2px solid var(--primary);">
                                        <td style="padding: 1.2rem 1.5rem; border-top: 1px solid var(--glass-border);">Citizenship & Christian Life</td>
                                        <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                        <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    </tr>

                                    <!-- Grade 1 -->
                                    <tr style="border-top: 1px solid var(--glass-border);">
                                        <td rowspan="5" style="padding: 2rem 1.5rem; background: rgba(255,255,255,0.02); border-right: 1px solid var(--glass-border); vertical-align: middle;">
                                            <div style="font-weight: 800; color: #fff; font-size: 1.1rem;">GRADE 1</div>
                                            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.4rem;">Elementary Year 2</div>
                                        </td>
                                        <td style="padding: 1.2rem 1.5rem;">English</td>
                                        <td style="text-align: center;"><a href="#" class="btn-table">PDF &darr;</a></td>
                                        <td style="text-align: center;"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 1.2rem 1.5rem; border-top: 1px solid var(--glass-border);">Language</td>
                                        <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                        <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 1.2rem 1.5rem; border-top: 1px solid var(--glass-border);">Mathematics</td>
                                        <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                        <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 1.2rem 1.5rem; border-top: 1px solid var(--glass-border);">Community & Culture</td>
                                        <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                        <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    </tr>
                                    <tr style="border-bottom: 2px solid var(--primary);">
                                        <td style="padding: 1.2rem 1.5rem; border-top: 1px solid var(--glass-border);">Citizenship & Christian Life</td>
                                        <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                        <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    </tr>

                                    <!-- Grade 2 -->
                                    <tr style="border-top: 1px solid var(--glass-border);">
                                        <td rowspan="5" style="padding: 2rem 1.5rem; background: rgba(255,255,255,0.02); border-right: 1px solid var(--glass-border); vertical-align: middle;">
                                            <div style="font-weight: 800; color: #fff; font-size: 1.1rem;">GRADE 2</div>
                                            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.4rem;">Elementary Year 3</div>
                                        </td>
                                        <td style="padding: 1.2rem 1.5rem;">English</td>
                                        <td style="text-align: center;"><a href="#" class="btn-table">PDF &darr;</a></td>
                                        <td style="text-align: center;"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 1.2rem 1.5rem; border-top: 1px solid var(--glass-border);">Language</td>
                                        <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                        <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 1.2rem 1.5rem; border-top: 1px solid var(--glass-border);">Mathematics</td>
                                        <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                        <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 1.2rem 1.5rem; border-top: 1px solid var(--glass-border);">Community & Culture</td>
                                        <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                        <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 1.2rem 1.5rem; border-top: 1px solid var(--glass-border);">Citizenship & Christian Life</td>
                                        <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                        <td style="text-align: center; border-top: 1px solid var(--glass-border);"><a href="#" class="btn-table">PDF &darr;</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section-full" style="background: rgba(59, 165, 224, 0.05); text-align: center; border-top: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border);">
                <div class="container" style="max-width: 800px; margin: 0 auto;">
                    <h2 style="font-size: 2rem; color: #fff; margin-bottom: 1.5rem;">Government Goal</h2>
                    <p style="font-size: 1.2rem; line-height: 1.8; color: var(--text-muted);">
                        "The government's goal is that every six-year-old child enters the <span style="color: var(--primary); font-weight: 700;">Elementary Preparatory Grade</span> by 2012 and completes three years of basic relevant education."
                    </p>
                    <div style="margin-top: 3rem; display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;">
                        <a href="#contact" class="btn-primary">Inquire About Enrollment</a>
                        <a href="#publications" class="nav-link" style="padding: 0.8rem 0;">Download Education Policy &rarr;</a>
                    </div>
                </div>
            </section>
        `;
    }
};
