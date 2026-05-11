window.TextbooksComponent = {
    render: async () => {
        // Fetch textbooks from API
        const apiData = await DoEAPI.get('textbooks.php');
        
        let textbooks = (apiData && apiData.data && apiData.data.length > 0)
            ? apiData.data
            : [
                { grade_level: 'GRADE 1 & 2', subject: 'Mathematics (Gr 1)', textbook_pdf: '#', manual_pdf: '#' },
                { grade_level: 'GRADE 1 & 2', subject: 'Mathematics (Gr 2)', textbook_pdf: '#', manual_pdf: '#' },
                { grade_level: 'GRADE 3', subject: 'Mathematics', textbook_pdf: '#', manual_pdf: '#' },
                { grade_level: 'GRADE 3', subject: 'Science', textbook_pdf: '#', manual_pdf: '#' },
                { grade_level: 'GRADE 4', subject: 'Mathematics', textbook_pdf: '#', manual_pdf: '#' },
                { grade_level: 'GRADE 4', subject: 'Science', textbook_pdf: '#', manual_pdf: '#' },
                { grade_level: 'GRADE 5', subject: 'Mathematics', textbook_pdf: '#', manual_pdf: '#' },
                { grade_level: 'GRADE 5', subject: 'Science', textbook_pdf: '#', manual_pdf: '#' },
                { grade_level: 'GRADE 6', subject: 'Mathematics', textbook_pdf: '#', manual_pdf: '#' },
                { grade_level: 'GRADE 6', subject: 'Science', textbook_pdf: '#', manual_pdf: '#' }
            ];

        // Group by grade level for table rendering
        const grouped = textbooks.reduce((acc, current) => {
            if (!acc[current.grade_level]) {
                acc[current.grade_level] = [];
            }
            acc[current.grade_level].push(current);
            return acc;
        }, {});

        return `
            <div class="subpage-header reveal-up">
                <div class="subpage-header-inner">
                    <h1 class="reveal-up">Textbooks & Manuals</h1>
                    <p class="reveal-up">Essential educational resources for teachers and students across Papua New Guinea.</p>
                </div>
            </div>

            <section class="section-full" style="padding: var(--section-spacing) 0;">
                <div class="grid-2" style="align-items: center; gap: var(--grid-gap);">
                    <div style="position: relative;">
                        <div class="glass-panel" style="padding: 1rem; border-radius: 24px; position: relative; z-index: 2;">
                            <img src="assets/images/textbook-imgs/textbooks.png" alt="National Textbooks" style="width: 100%; height: 500px; object-fit: cover; border-radius: 16px; display: block;" onerror="this.src='https://images.unsplash.com/photo-1491849591647-d597aa4aabc1?auto=format&fit=crop&q=80&w=800'">
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
                        
                        <div class="glass-panel" style="padding: var(--card-padding); border-left: 4px solid var(--accent);">
                            <h3 style="color: #fff; margin-bottom: 1rem;">Teacher's Manual</h3>
                            <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.6; margin: 0;">
                                Specifically produced for primary school teachers, these manuals offer guidance on planning and teaching standard lessons that align perfectly with the National Textbook and Content Standards.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section-full" style="padding: var(--section-spacing) 0;">
                <h2 class="section-title">Textbooks & Teacher Manuals</h2>
                <div class="table-scroll-wrap glass-panel" style="box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
                    <div class="table-inner">
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
                                ${Object.entries(grouped).map(([grade, items]) => `
                                    ${items.map((item, index) => `
                                        <tr style="border-top: ${index === 0 ? '2px solid var(--primary)' : '1px solid var(--glass-border)'};">
                                            ${index === 0 ? `
                                            <td rowspan="${items.length}" style="padding: 2rem 1.5rem; vertical-align: middle; background: rgba(255,255,255,0.02); border-right: 1px solid var(--glass-border);">
                                                <div style="font-weight: 800; color: #fff; font-size: 1.1rem;">${grade}</div>
                                            </td>` : ''}
                                            <td style="padding: 1.5rem; font-weight: 600;">${item.subject}</td>
                                            <td style="text-align: center;"><a href="${DoEAPI.imgUrl(item.textbook_pdf) || '#'}" class="btn-table" target="_blank">PDF &darr;</a></td>
                                            <td style="text-align: center;"><a href="${DoEAPI.imgUrl(item.manual_pdf) || '#'}" class="btn-table" style="border-color: var(--accent); color: var(--accent);" target="_blank">PDF &darr;</a></td>
                                        </tr>
                                    `).join('')}
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        `;
    }
};

