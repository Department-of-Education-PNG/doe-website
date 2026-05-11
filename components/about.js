window.AboutComponent = {
    render: async () => {
        return `
            <section class="internal-hero reveal-up">
                <div class="hero-content-container">
                    <div class="hero-content">
                        <h1 class="reveal-up">About Us</h1>
                        <p class="reveal-up hero-p" style="color: #d4e5f7;">Empowering the future of Papua New Guinea through quality education and inclusive learning.</p>
                    </div>
                </div>
            </section>

            <section id="mission-vision" class="section-full reveal-up" style="padding: var(--section-spacing) 0; border-bottom: 1px solid var(--glass-border);">
                <div class="grid-2" style="align-items: flex-start; gap: var(--grid-gap);">
                    <div class="text-left">
                        <h2 class="section-title" style="margin-bottom: 2rem;">Department of Education</h2>
                        <p class="section-p" style="color: var(--text-muted); line-height: 1.8; margin-bottom: 3rem;">
                            The Department of Education leads the delivery of education services across Papua New Guinea, directly managing government schools and regulating the private sector. We are committed to implementing national policies that promote quality education for all citizens.
                        </p>
                        
                        <div class="card glass-panel" style="padding: var(--card-padding); border-radius: 32px; border: 1px solid var(--glass-border); background: var(--bg-card);">
                            <h3 style="color: var(--accent); margin-bottom: 2rem; font-size: 1.6rem; font-weight: 700; display: flex; align-items: center; gap: 1rem;">
                                <div style="width: 12px; height: 12px; border-radius: 50%; background: var(--accent);"></div>
                                Core Departmental Functions
                            </h3>
                            <div style="display: grid; grid-template-columns: 1fr; gap: 1.2rem; color: var(--text-muted);">
                                ${[
                                    'Curriculum Development & Examinations',
                                    'Maintaining Educational Standards',
                                    'National Education Policies & Strategic Planning',
                                    'National Schools of Excellence Management',
                                    'Teacher Management & Payroll Systems',
                                    'Government Tuition Fee (GTF) Policy Oversight'
                                ].map(item => `
                                    <div style="display: flex; align-items: center; gap: 1rem; font-weight: 600; font-size: 1rem;">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        ${item}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                     <div class="img-wrapper" style="border-radius: 32px; overflow: hidden; box-shadow: 0 30px 60px -12px rgba(0,0,0,0.6); border: 1px solid var(--glass-border);">
                        <img src="assets/images/about/Students_promoting_their_cultural_heritage.jpg" alt="DoE PNG Students" class="responsive-img-height" style="width: 100%; height: 750px; object-fit: cover; transition: transform 0.6s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" onerror="this.src='https://placehold.co/800x1200/0a0d14/ffffff?text=Department+of+Education+PNG'">
                    </div>
                </div>
            </section>

            <section class="section-full reveal-up" style="padding: var(--section-spacing) 0; border-bottom: 1px solid var(--glass-border);">
                <div class="grid-2" style="gap: var(--grid-gap); align-items: stretch;">
                    <div class="card glass-panel" style="padding: var(--card-padding); border-left: 5px solid var(--primary); background: var(--bg-deeper); display: flex; flex-direction: column; height: 100%;">
                        <h3 style="color: var(--primary); margin-bottom: 1.5rem; font-weight: 700; font-size: 1.25rem;">Institutional Mandate</h3>
                        <p class="section-p" style="color: var(--text-muted); line-height: 1.8; margin: 0; flex-grow: 1; font-size: 0.95rem;">
                            The Department of Education serves as the executive branch of the National Education System, deriving authority from the Education Act 1983. We ensure compliance with national standards while facilitating provincial administrative service delivery.
                        </p>
                    </div>
                    <div class="card glass-panel" style="padding: var(--card-padding); border-left: 5px solid var(--accent); background: var(--bg-deeper); display: flex; flex-direction: column; height: 100%;">
                        <h3 style="color: var(--accent); margin-bottom: 1.5rem; font-weight: 700; font-size: 1.25rem;">Executive Leadership</h3>
                        <p class="section-p" style="color: var(--text-muted); line-height: 1.8; margin: 0; flex-grow: 1; font-size: 0.95rem;">
                            The Secretary for Education leads the Department as the chief executive. Responsibilities include chairing the National Education Board and determining the qualification standards required for teacher registration and institutional certification.
                        </p>
                    </div>
                </div>
            </section>

            <section class="section-full reveal-up" style="padding: var(--section-spacing) 0; border-bottom: 1px solid var(--glass-border);">
                <div class="section-header text-left" style="margin-bottom: var(--header-margin); display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; width: 100%; text-align: left;">
                    <h2 class="section-title" style="margin-bottom: 0.5rem; text-align: left; width: 100%; display: block;">The Ministry of Education</h2>
                    <p class="section-p" style="color: var(--text-muted); margin-left: 0; text-align: left; width: 100%; display: block;">Governing bodies responsible for the National Education System.</p>
                </div>
                <div class="grid-4" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: var(--grid-gap);">
                    ${[
                        { icon: '🏛️', title: 'Minister for Education', text: 'The political head responsible for curriculum control, standards, and examinations.' },
                        { icon: '🏢', title: 'National Dept. (NDoE)', text: 'Determines national policies and supports provincial implementation via research and training.' },
                        { icon: '📚', title: 'Libraries & Archives (OLA)', text: 'Coordinates libraries and archives nationwide, preserving PNG history.' },
                        { icon: '🤝', title: 'Teaching Service Comm.', text: 'The employing agent for teachers, overseeing welfare and employment conditions.' },
                        { icon: '⚖️', title: 'National Education Board', text: 'The highest decision-making body overseeing the system functioning.' },
                        { icon: '🌍', title: 'UNESCO Commission', text: 'Promotes education, science, and culture in partnership with the global community.' }
                    ].map(item => `
                        <div class="card glass-panel flex-col" style="padding: var(--card-padding); border-radius: 20px; transition: all 0.4s ease; background: var(--bg-card); display: flex; flex-direction: column; height: 100%;">
                            <div style="font-size: 2.2rem; margin-bottom: 1.5rem; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));">${item.icon}</div>
                            <h3 style="color: #fff; font-size: 1.25rem; margin-bottom: 1rem; font-weight: 700; line-height: 1.4;">${item.title}</h3>
                            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin: 0; flex-grow: 1;">${item.text}</p>
                        </div>
                    `).join('')}
                </div>
            </section>

            <section class="section-full reveal-up" style="padding: var(--section-spacing) 0;">
                <div class="section-header text-left" style="margin-bottom: var(--header-margin); display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; width: 100%; text-align: left;">
                    <h2 class="section-title" style="margin-bottom: 0px; text-align: left; width: 100%; display: block;">Regional Governance</h2>
                    <p class="section-p" style="color: var(--text-muted); margin-top: 0.5rem; margin-left: 0; text-align: left; width: 100%; display: block;">Structural breakdown of educational oversight across PNG provinces.</p>
                </div>
                <div class="grid-2-to-4" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--grid-gap);">
                    ${[
                        { border: 'var(--primary)', title: 'Provincial Governments', text: 'Responsible for establishing and maintaining schools, deploying teachers, and managing education function grants.' },
                        { border: 'var(--primary)', title: 'Education Boards (PEB/LLG)', text: 'Highest decision-making bodies locally, including Provincial (PEB) and Local-Level Government (LLG) stakeholders.' },
                        { border: 'var(--accent)', title: 'Education Agencies', text: 'Faith-based and private partners that establish member schools and coordinate with the national system.' },
                        { border: 'var(--primary)', title: 'School Boards (BOM/BOG)', text: 'Governing boards for schools with financial, management, and disciplinary powers.' }
                    ].map(item => `
                        <div class="card glass-panel" style="padding: var(--card-padding); display: flex !important; flex-direction: column !important; gap: 1rem; border-left: 8px solid ${item.border}; background: rgba(14, 32, 64, 0.4); border-radius: 20px;">
                            <h3 style="color: #fff; margin-bottom: 0.5rem; font-weight: 800;">${item.title}</h3>
                            <p style="color: var(--text-muted); margin: 0; line-height: 1.7;">${item.text}</p>
                        </div>
                    `).join('')}
                </div>
            </section>

            <section class="section-full reveal-up hierarchy-section" style="padding: var(--section-spacing) 0; border-top: 1px solid var(--glass-border);">
                <div class="section-header" style="align-items: center !important; text-align: center !important;">
                    <h2 class="section-title" style="text-align: center !important;">Organizational Hierarchy</h2>
                    <p class="section-p" style="color: var(--text-muted); margin: 0 auto; text-align: center !important;">Institutional architecture of the Department of Education, Papua New Guinea.</p>
                </div>
                
                <div class="genealogy-scroll">
                    <div class="genealogy-tree">
                        <ul>
                                    <li>
                                        <a href="javascript:void(0);">
                                            <div class="member-view-box">
                                                <div class="member-image">
                                                    <div class="member-details">
                                                        <h3>DIRECTOR GENERAL<br>Office of Libraries & Archives</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="active secretary-li">
                                        <a href="javascript:void(0);">
                                            <div class="member-view-box">
                                                <div class="member-image">
                                                    <div class="member-details">
                                                        <h3>SECRETARY<br>
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <ul>
                                            <li>
                                                <a href="javascript:void(0);">
                                                    <div class="member-view-box">
                                                        <div class="member-image">
                                                            <div class="member-details">
                                                                <h3>Deputy Secretary<br>
                                                                    Schools Directorate
                                                                    </h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                              <ul>
                                                    <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>FAS General Education<br>
                                                                        Services</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <ul>
                                                    <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>AS <br>ECE <br>Management & <br>Coordination</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>AS <br>Primary <br>Education </h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>AS <br>Secondary <br>Ed. Mgmt. & <br>Coordination<br>  </h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>AS <br>National <br>School of <br>Excellence <br></h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>AS <br>School<br> Registration<br> </h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </li>
                                                </ul>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>FAS Teacher Registration <br>& Prof. Dev. </h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <ul>
                                                        <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>AS <br>Teacher. <br>Training & <br>Prof. <br>Development <br></h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        </li>
                                                        <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>AS<br> Teacher <br>Registration<br> </h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>FAS FODE & Inclusive <br> Education </h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <ul>
                                                        <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>AS <br>FODE <br>Program <br>Management & <br>Coordination</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        </li>
                                                        <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>AS <br>FODE <br>Provincial <br>Support <br>Mgt. & <br>Coordination<br> </h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        </li>
                                                        <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>AS <br>FODE <br>Projects & <br> Expansion<br> </h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>FAS Vocational <br>Education Training </h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <ul>
                                                        <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>AS <br>SME <br>Coordination <br></h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        </li>
                                                        <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>AS <br>VET <br>Provincial <br>Operations<br> </h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>FAS NCD Education <br>Services </h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <ul>
                                                        <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>AS <br>School <br>Coordination & <br>Appointments<br> </h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        </li>
                                                        <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>AS <br>Exams, <br>Training <br>& Planning <br> </h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);">
                                                    <div class="member-view-box">
                                                        <div class="member-image">
                                                            <div class="member-details">
                                                                <h3>Deputy Secretary<br>
                                                                    Curriculum & Standards<br>
                                                                    Directorate </h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                                <ul>
                                                    <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>FAS Curriculum <br>Development  </h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <ul>
                                                            <li>
                                                            <a href="javascript:void(0);">
                                                                <div class="member-view-box">
                                                                    <div class="member-image">
                                                                        <div class="member-details">
                                                                            <h3>AS <br>Humanities <br></h3>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                            </li>
                                                            <li>
                                                            <a href="javascript:void(0);">
                                                                <div class="member-view-box">
                                                                    <div class="member-image">
                                                                        <div class="member-details">
                                                                            <h3>AS <br>Science <br></h3>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                            </li>
                                                            <li>
                                                            <a href="javascript:void(0);">
                                                                <div class="member-view-box">
                                                                    <div class="member-image">
                                                                        <div class="member-details">
                                                                            <h3>AS <br>Business & <br> Technology<br> </h3>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                            </li>
                                                            <li>
                                                            <a href="javascript:void(0);">
                                                                <div class="member-view-box">
                                                                    <div class="member-image">
                                                                        <div class="member-details">
                                                                            <h3>AS VET <br>Curriculum<br> </h3>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                            </li>
                                                            <li>
                                                            <a href="javascript:void(0);">
                                                                <div class="member-view-box">
                                                                    <div class="member-image">
                                                                        <div class="member-details">
                                                                            <h3>AS <br>Curriculum & <br>Assessment (x22)<br> </h3>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                            </li>
                                                            <li>
                                                            <a href="javascript:void(0);">
                                                                <div class="member-view-box">
                                                                    <div class="member-image">
                                                                        <div class="member-details">
                                                                            <h3>AS<br> Graphic & <br>Design<br> </h3>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                            </li>
                                                            
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>FAS Measurement <br>Services </h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <ul>
                                                            <li>
                                                            <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>AS <br>Examinations<br> </h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </a>
                                                            </li>
                                                            <li>
                                                            <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>AS <br>Standards & <br> Monitoring<br> </h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </a>
                                                            </li>
                                                            <li>
                                                            <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>AS <br>Certification & <br>Data<br> Management<br> </h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>FAS School <br>Inspections </h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <ul>
                                                            <li>
                                                            <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>AS<br>Momase<br>Region</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </a>
                                                            </li>
                                                            <li>
                                                            <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>AS<br>Western End <br>Highlands<br>Region</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </a>
                                                            </li>
                                                            <li>
                                                            <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>AS<br>Eastern End <br>Highlands<br>Region</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </a>
                                                            </li>
                                                            <li>
                                                            <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>AS<br>NGI Region</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </a>
                                                            </li>
                                                            <li>
                                                            <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>AS<br>Southern<br>Region</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </a>
                                                            </li>
                                                            <li>
                                                            <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>AS<br>VET<br> Inspection</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>FAS Guidance & <br> Counseling </h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <ul>
                                                            <li>
                                                            <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>AS<br>Momase/<br>Highlands<br>Region</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </a>
                                                            </li>
                                                            <li>
                                                            <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>AS<br>Southern/NGI<br>Region</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>FAS E-Learning<br> </h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <ul>
                                                            <li>
                                                            <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>AS<br>Multi-media<br>Productions</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </a>
                                                            </li>
                                                            <li>
                                                            <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>AS<br>E-Curriculum</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);">
                                                    <div class="member-view-box">
                                                        <div class="member-image">
                                                            <div class="member-details">
                                                                <h3>Executive Director<br>Finance & Corporate Service<br>Directorate</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                                <ul>
                                                    <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>FAS Finance <br></h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <ul>
                                                            <li><a href="javascript:void(0);"><div class="member-view-box"><div class="member-image"><div class="member-details"><h3>AS<br>Budget & <br>Planning</h3></div></div></div></a></li>
                                                            <li><a href="javascript:void(0);"><div class="member-view-box"><div class="member-image"><div class="member-details"><h3>Principle<br>Accountant</h3></div></div></div></a></li>
                                                            <li><a href="javascript:void(0);"><div class="member-view-box"><div class="member-image"><div class="member-details"><h3>AS<br>Trust<br>Accounts</h3></div></div></div></a></li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>FAS Payroll <br></h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <ul>
                                                            <li><a href="javascript:void(0);"><div class="member-view-box"><div class="member-image"><div class="member-details"><h3>AS<br>Quality Assurance &<br>Payroll Support</h3></div></div></div></a></li>
                                                            <li><a href="javascript:void(0);"><div class="member-view-box"><div class="member-image"><div class="member-details"><h3>AS<br>Employee<br>Services</h3></div></div></div></a></li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>FAS Procurement & <br> Logistics </h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <ul>
                                                            <li><a href="javascript:void(0);"><div class="member-view-box"><div class="member-image"><div class="member-details"><h3>AS<br>Procurement<br>Goods & Services</h3></div></div></div></a></li>
                                                            <li><a href="javascript:void(0);"><div class="member-view-box"><div class="member-image"><div class="member-details"><h3>AS<br>Works & Special Projects</h3></div></div></div></a></li>
                                                            <li><a href="javascript:void(0);"><div class="member-view-box"><div class="member-image"><div class="member-details"><h3>AS<br>Assets Management</h3></div></div></div></a></li>
                                                            <li><a href="javascript:void(0);"><div class="member-view-box"><div class="member-image"><div class="member-details"><h3>AS<br>Logistics</h3></div></div></div></a></li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>FAS HRM <br></h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <ul>
                                                            <li><a href="javascript:void(0);"><div class="member-view-box"><div class="member-image"><div class="member-details"><h3>AS<br>Org Development & Training</h3></div></div></div></a></li>
                                                            <li><a href="javascript:void(0);"><div class="member-view-box"><div class="member-image"><div class="member-details"><h3>AS<br>Human Resource Admin</h3></div></div></div></a></li>
                                                            <li><a href="javascript:void(0);"><div class="member-view-box"><div class="member-image"><div class="member-details"><h3>AS<br>Support Services</h3></div></div></div></a></li>
                                                            <li><a href="javascript:void(0);"><div class="member-view-box"><div class="member-image"><div class="member-details"><h3>AS<br>Contract Administration</h3></div></div></div></a></li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>FAS Information &<br>Communication Technology</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <ul>
                                                            <li><a href="javascript:void(0);"><div class="member-view-box"><div class="member-image"><div class="member-details"><h3>AS<br>Web & Systems</h3></div></div></div></a></li>
                                                            <li><a href="javascript:void(0);"><div class="member-view-box"><div class="member-image"><div class="member-details"><h3>AS<br>ICT Infrastructure</h3></div></div></div></a></li>
                                                            <li><a href="javascript:void(0);"><div class="member-view-box"><div class="member-image"><div class="member-details"><h3>AS<br>ICT Support</h3></div></div></div></a></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);">
                                                    <div class="member-view-box">
                                                        <div class="member-image">
                                                            <div class="member-details">
                                                                <h3>Deputy Secretary<br>Policy & Provincial Support<br>Directorate</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                                <ul>
                                                    <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>FAS<br>School Interventions & Innovations</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <ul>
                                                            <li><a href="javascript:void(0);"><div class="member-view-box"><div class="member-image"><div class="member-details"><h3>AS<br>WASH & School Self Reliance</h3></div></div></div></a></li>
                                                            <li><a href="javascript:void(0);"><div class="member-view-box"><div class="member-image"><div class="member-details"><h3>AS<br>National Literacy & OOSCI</h3></div></div></div></a></li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>FAS<br>School Grant</h3>
                                                                    <div class="member-details">
                                                                        <h3>FAS<br>Project Management</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <ul>
                                                             <li><a href="javascript:void(0);"><div class="member-view-box"><div class="member-image"><div class="member-details"><h3>AS<br>Aid Coordination</h3></div></div></div></a></li>
                                                             <li><a href="javascript:void(0);"><div class="member-view-box"><div class="member-image"><div class="member-details"><h3>AS<br>Education Projects Admin</h3></div></div></div></a></li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>FAS<br>Policy & Planning</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <ul>
                                                             <li><a href="javascript:void(0);"><div class="member-view-box"><div class="member-image"><div class="member-details"><h3>AS<br>SLIP & Strategic Planning</h3></div></div></div></a></li>
                                                             <li><a href="javascript:void(0);"><div class="member-view-box"><div class="member-image"><div class="member-details"><h3>AS<br>Policy Devel & Review</h3></div></div></div></a></li>
                                                             <li><a href="javascript:void(0);"><div class="member-view-box"><div class="member-image"><div class="member-details"><h3>AS<br>Media & Communication</h3></div></div></div></a></li>
                                                             <li><a href="javascript:void(0);"><div class="member-view-box"><div class="member-image"><div class="member-details"><h3>AS<br>NEB & Provincial Services</h3></div></div></div></a></li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
                                                                    <div class="member-details">
                                                                        <h3>FAS<br>Research & Evaluation</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <ul>
                                                             <li><a href="javascript:void(0);"><div class="member-view-box"><div class="member-image"><div class="member-details"><h3>AS<br>Monitoring & Evaluation</h3></div></div></div></a></li>
                                                             <li><a href="javascript:void(0);"><div class="member-view-box"><div class="member-image"><div class="member-details"><h3>AS<br>EMIS (Applications)</h3></div></div></div></a></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);">
                                                    <div class="member-view-box"><div class="member-image"><div class="member-details"><h3>Director Legal <br>Services</h3></div></div></div>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);">
                                                    <div class="member-view-box"><div class="member-image"><div class="member-details"><h3>Director Administration <br>Services</h3></div></div></div>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);">
                                                    <div class="member-view-box"><div class="member-image"><div class="member-details"><h3>Chief Internal <br>Auditor</h3></div></div></div>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);">
                                                    <div class="member-view-box"><div class="member-image"><div class="member-details"><h3>Director Quality<br>Assurance Unit</h3></div></div></div>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            <div class="member-view-box">
                                                <div class="member-image">
                                                    <div class="member-details">
                                                        <h3>National Commission <br>of UNESCO</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            <div class="member-view-box">
                                                <div class="member-image">
                                                    <div class="member-details">
                                                        <h3>CHAIRMAN<br>Teaching Service Commission</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            <div class="member-view-box">
                                                <div class="member-image">
                                                    <div class="member-details">
                                                        <h3>NATIONAL EDUCATION BOARD</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>

                <style>
                    .genealogy-scroll {
                        overflow-x: auto;
                        overflow-y: hidden;
                        padding: 3rem 0 5rem 0;
                        text-align: center;
                    }
                    .genealogy-scroll::-webkit-scrollbar {
                        height: 8px;
                    }
                    .genealogy-scroll::-webkit-scrollbar-track {
                        background: rgba(255, 255, 255, 0.05);
                        border-radius: 4px;
                    }
                    .genealogy-scroll::-webkit-scrollbar-thumb {
                        background: var(--accent);
                        border-radius: 4px;
                    }
                    .genealogy-tree {
                        display: inline-block;
                        min-width: 100%;
                    }
                    .genealogy-tree ul {
                        padding-top: 20px;
                        position: relative;
                        transition: all 0.5s;
                        display: flex;
                        justify-content: center;
                        padding-left: 0;
                    }
                    .genealogy-tree li {
                        float: left;
                        text-align: center;
                        list-style-type: none;
                        position: relative;
                        padding: 20px 5px 0 5px;
                        transition: all 0.5s;
                    }
                    .genealogy-tree li::before, .genealogy-tree li::after{
                        content: '';
                        position: absolute; top: 0; right: 50%;
                        border-top: 2px solid rgba(255, 255, 255, 0.2);
                        width: 50%; height: 20px;
                    }
                    .genealogy-tree li::after{
                        right: auto; left: 50%;
                        border-left: 2px solid rgba(255, 255, 255, 0.2);
                    }
                    .genealogy-tree li:only-child::after, .genealogy-tree li:only-child::before {
                        display: none;
                    }
                    .genealogy-tree li:only-child{ padding-top: 0;}
                    .genealogy-tree li:first-child::before, .genealogy-tree li:last-child::after{
                        border: 0 none;
                    }
                    .genealogy-tree li:last-child::before{
                        border-right: 2px solid rgba(255, 255, 255, 0.2);
                        border-radius: 0 5px 0 0;
                    }
                    .genealogy-tree li:first-child::after{
                        border-radius: 5px 0 0 0;
                    }
                    .genealogy-tree ul ul::before{
                        content: '';
                        position: absolute; top: 0; left: 50%;
                        border-left: 2px solid rgba(255, 255, 255, 0.2);
                        width: 0; height: 20px;
                    }
                    .genealogy-tree li a {
                        text-decoration: none;
                        color: var(--text);
                        display: inline-block;
                        border-radius: 12px;
                        transition: all 0.3s ease;
                    }
                    .genealogy-tree li a:hover .member-view-box {
                        background: rgba(255, 255, 255, 0.1);
                        border-color: var(--accent);
                        transform: translateY(-5px);
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                    }
                    .member-view-box {
                        padding: 1.5rem 1rem;
                        min-width: 160px;
                        max-width: 200px;
                        background: rgba(10, 13, 20, 0.7);
                        backdrop-filter: blur(10px);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 12px;
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                        margin: 0 auto;
                        white-space: normal;
                        transition: all 0.3s ease;
                    }
                    .member-details h3 {
                        font-size: 0.85rem;
                        color: #fff;
                        margin: 0;
                        line-height: 1.4;
                        font-weight: 500;
                    }
                    /* Custom highlighting for top level blocks */
                    .genealogy-tree > ul > li > a .member-view-box {
                        border-top: 4px solid var(--primary);
                        min-width: 220px;
                    }
                    .secretary-li > a .member-view-box {
                        border-top: 4px solid var(--accent);
                        min-width: 220px;
                    }
                </style>
            </section>

            <!-- Bottom Images Gallery -->
            <section style="border-top: 1px solid var(--glass-border); padding: 4rem 0; width: 100%;">
                <div style="max-width: 1400px; margin: 0 auto; padding: 0 2rem;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
                        <div class="img-wrapper" style="border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1);">
                            <img src="assets/images/bottom-imgs/IMG_0545.jpg" alt="Students and Teacher" style="width: 100%; height: 220px; object-fit: cover; display: block;">
                        </div>
                        <div class="img-wrapper" style="border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1);">
                            <img src="assets/images/bottom-imgs/Students in a classroom.jpg" alt="Students in Classroom" style="width: 100%; height: 220px; object-fit: cover; display: block;">
                        </div>
                        <div class="img-wrapper" style="border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1);">
                            <img src="assets/images/bottom-imgs/Students sitting a national examination.jpg" alt="National Examination" style="width: 100%; height: 220px; object-fit: cover; display: block;">
                        </div>
                        <div class="img-wrapper" style="border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1);">
                            <img src="assets/images/bottom-imgs/Teacher.jpg" alt="Teacher" style="width: 100%; height: 220px; object-fit: cover; display: block;">
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
};
