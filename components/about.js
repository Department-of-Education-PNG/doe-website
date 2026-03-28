window.AboutComponent = {
    render: async () => {
        return `
            <div style="min-height: 300px; padding: 4rem 1.5rem; display:flex; flex-direction:column; align-items:center; justify-content:center; background: linear-gradient(135deg, rgba(0, 112, 243, 0.6), rgba(10, 13, 20, 0.8), rgba(245, 166, 35, 0.3)), url('assets/images/other-tabs-header-banner/banner-bg.png') center/cover no-repeat; border-bottom: 1px solid var(--glass-border);">
                <div>
                    <h1 style="font-size: 3.5rem; text-align: center; margin-bottom: 0;">About Us</h1>
                    <p style="text-align: center; color: var(--text-muted); font-size: 1.2rem;">Our Mandate & Leadership</p>
                </div>
            </div>

            <section id="mission-vision" class="section-full">
                <div class="grid-2" style="align-items: flex-start; gap: 4rem;">
                    <div>
                        <h2 style="color: var(--primary); font-size: 2.8rem; margin-bottom: 2rem;">DEPARTMENT OF EDUCATION</h2>
                        <p style="font-size: 1.15rem; color: var(--text-muted); line-height: 1.8; margin-bottom: 2.5rem;">
                            The Department of Education leads the delivery of education services to children, young people and adults both directly through government schools and indirectly through the regulation and funding of permitted private schools. We implement the PNG Government policy on early childhood, general school education and vocational training.
                        </p>
                        
                        <div style="background: rgba(255, 255, 255, 0.03); padding: 2.5rem; border-radius: 20px; border: 1px solid var(--glass-border);">
                            <h3 style="color: var(--accent); margin-bottom: 1.5rem; font-size: 1.5rem;">Core Functions</h3>
                            <div style="display: grid; grid-template-columns: 1fr; gap: 1rem; color: var(--text-muted);">
                                <div style="display: flex; align-items: center; gap: 10px; font-weight: 500;"><span style="color: var(--accent);">✓</span> Curriculum and Examinations</div>
                                <div style="display: flex; align-items: center; gap: 10px; font-weight: 500;"><span style="color: var(--accent);">✓</span> Education Standards</div>
                                <div style="display: flex; align-items: center; gap: 10px; font-weight: 500;"><span style="color: var(--accent);">✓</span> National Education Policies & Plans</div>
                                <div style="display: flex; align-items: center; gap: 10px; font-weight: 500;"><span style="color: var(--accent);">✓</span> National Institutions – National Schools of Excellence</div>
                                <div style="display: flex; align-items: center; gap: 10px; font-weight: 500;"><span style="color: var(--accent);">✓</span> Teacher Management (TSC) – Payroll – DoE</div>
                                <div style="display: flex; align-items: center; gap: 10px; font-weight: 500;"><span style="color: var(--accent);">✓</span> Government Tuition Fee Policy</div>
                            </div>
                        </div>
                    </div>

                    <div class="img-wrapper" style="border-radius: 24px; box-shadow: 0 20px 60px rgba(0,0,0,0.5); border: 1px solid var(--glass-border);">
                        <img src="assets/images/about/Students_promoting_their_cultural_heritage.jpg" alt="About DoE PNG" style="width: 100%; height: 650px; object-fit: cover;" onerror="this.src='https://placehold.co/800x1200/0a0d14/ffffff?text=Department+of+Education+PNG'">
                    </div>
                </div>
            </section>

            <section class="section-full" style="padding-top: 0;">
                <div class="grid-2" style="gap: 2rem;">
                    <div class="card glass-panel" style="border-left: 4px solid var(--primary);">
                        <h3 style="color: var(--primary);">Our Mandate</h3>
                        <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">
                            The Department of Education is the executive and inspectorial branch of the National Education System. It derives its powers from the Education Act 1983 (amended 1995) and any other law relating to education matters. DoE is also subjected to Section 42 of the Organic Law on Provincial Governments and Local level Governments.
                        </p>
                    </div>
                    <div class="card glass-panel" style="border-left: 4px solid var(--accent);">
                        <h3 style="color: var(--accent);">Department Head</h3>
                        <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">
                            The head of the Department of Education is the Secretary for Education. The Secretary also chairs the National Education Board. The Secretary is the chief executive of the National Education System and is responsible under the Minister for the provision of administrative services to the National Education Board and for determining the qualifications and standards required for registration of teachers, inspection of schools, and certification of teachers.
                        </p>
                    </div>
                </div>
            </section>

            <section class="section-full" style="background: rgba(10, 13, 20, 0.4); border-top: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border);">
                <h2 class="section-title" style="margin-bottom: 3.5rem;">The Ministry of Education</h2>
                <div class="grid-3">
                    <div class="card glass-panel">
                        <div style="font-size: 2rem; margin-bottom: 1rem;">🏛️</div>
                        <h3 style="color: #fff;">Minister for Education</h3>
                        <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">
                            The political head responsible for the overall management of education through the Ministry, which comprises the NDoE, OLA and TSC. The Minister has responsibility for control of the curriculum, including content, standards, examinations, minimum entry age, teaching days, and language of instruction.
                        </p>
                    </div>
                    <div class="card glass-panel">
                        <div style="font-size: 2rem; margin-bottom: 1rem;">🏢</div>
                        <h3 style="color: #fff;">National Dept. (NDoE)</h3>
                        <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">
                            Determines national policies and supports provincial implementation via planning, research, and training. Responsible for teacher registration, curriculum materials, national high schools, FODE centres, and the disbursement of school funds.
                        </p>
                    </div>
                    <div class="card glass-panel">
                        <div style="font-size: 2rem; margin-bottom: 1rem;">📚</div>
                        <h3 style="color: #fff;">Libraries & Archives (OLA)</h3>
                        <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">
                            Comprises the National Library Service, National Archives, and Corporate Services. Co-ordinates the planning of libraries and archives nationwide, with a primary objective to preserve all documents on Papua New Guinea life and society.
                        </p>
                    </div>
                    <div class="card glass-panel">
                        <div style="font-size: 2rem; margin-bottom: 1rem;">🤝</div>
                        <h3 style="color: #fff;">Teaching Service Commission</h3>
                        <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">
                            Acts as the agent of the state for the employment of teachers. Oversees terms and conditions of service, salaries, and welfare, while supporting the fundamental rights of teachers across the country.
                        </p>
                    </div>
                    <div class="card glass-panel">
                        <div style="font-size: 2rem; margin-bottom: 1rem;">⚖️</div>
                        <h3 style="color: #fff;">National Education Board</h3>
                        <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">
                            The highest decision-making body, overseeing the system functioning and NEP implementation. Advises the minister in consultation with TSC and provincial boards. The Secretary for Education serves as the statutory chairman.
                        </p>
                    </div>
                </div>
            </section>

            <section class="section-full">
                <h2 class="section-title">Regional & Community Governance</h2>
                <div style="display: flex; flex-direction: column; gap: 2.5rem;">
                    
                    <div class="card glass-panel governance-card">
                        <h3 style="color: var(--primary); font-size: 1.3rem; margin: 0;">Provincial Governments</h3>
                        <p style="color: var(--text-muted); margin: 0; font-size: 0.95rem; line-height: 1.7;">
                            Responsible for establishing, building and maintaining schools. Provinces deploy teachers and employ provincial education officers. Education Function Grants must be spent on operating costs and maintenance, with at least half allocated to district minimum priority activities.
                        </p>
                    </div>

                    <div class="card glass-panel governance-card">
                        <h3 style="color: var(--primary); font-size: 1.3rem; margin: 0;">Education Boards (PEB/LLG)</h3>
                        <div style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7;">
                            The <strong>Provincial Education Board (PEB)</strong> is the highest decision-making body in a province, chaired by the Provincial Education Adviser. <strong>District Boards</strong> include district stakeholders as members. <strong>Local-Level Government (LLG)</strong> funds and maintains elementary/primary schools while helping with provincial plan consistency.
                        </div>
                    </div>

                    <div class="card glass-panel governance-card">
                        <h3 style="color: var(--accent); font-size: 1.3rem; margin: 0;">Education Agencies</h3>
                        <p style="color: var(--text-muted); margin: 0; font-size: 0.95rem; line-height: 1.7;">
                            Key partners including faith-based and private agencies. They establish and conduct member schools with varied student entry criteria. Agencies impose common fees on parents to cover operations, learning materials, and staff payments. Each agency has an education secretary for communication.
                        </p>
                    </div>

                    <div class="card glass-panel governance-card">
                        <h3 style="color: var(--primary); font-size: 1.3rem; margin: 0;">School Boards (BOM/BOG)</h3>
                        <p style="color: var(--text-muted); margin: 0; font-size: 0.95rem; line-height: 1.7;">
                            Governing boards include **Boards of Management (BOM)** for elementary/primary and **Boards of Governors (BOG)** for secondary/post-primary schools. They have financial, management, and disciplinary powers. Communities share responsibility for infrastructure and teacher housing.
                        </p>
                    </div>

                </div>
            </section>
            
            <section class="section-full">
                <h2 class="section-title">Organizational Structure</h2>
                <div class="body genealogy-body genealogy-scroll">
                    <div class="genealogy-tree">
                        <ul>
                            <li>
                                <a href="javascript:void(0);">
                                    <div class="member-view-box">
                                        <div class="member-image">
                                            <div class="member-details">
                                                <h3>MINISTER</h3>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <ul class="active main-ul">
                                    <li>
                                        <a href="javascript:void(0);">
                                            <div class="member-view-box">
                                                <div class="member-image">
                                                    <div class="member-details">
                                                        <h3 align="center">DIRECTOR GENERAL<br>
                                                        Office of Libraries & Archives<br>
                                                        </h3>
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
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <ul>
                                                            <li><a href="javascript:void(0);"><div class="member-view-box"><div class="member-image"><div class="member-details"><h3>AS<br>Policy & Quality Assurance</h3></div></div></div></a></li>
                                                            <li><a href="javascript:void(0);"><div class="member-view-box"><div class="member-image"><div class="member-details"><h3>AS<br>Finance & Administration</h3></div></div></div></a></li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);">
                                                            <div class="member-view-box">
                                                                <div class="member-image">
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
            <section style="background: rgba(255, 255, 255, 0.03); border-top: 1px solid var(--glass-border); padding: 4rem 0; width: 100%;">
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
