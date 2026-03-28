window.PublicationsComponent = {
    render: async () => {
        return `
            <div style="min-height: 300px; padding: 4rem 1.5rem; display:flex; flex-direction:column; align-items:center; justify-content:center; background: linear-gradient(135deg, rgba(0, 112, 243, 0.6), rgba(10, 13, 20, 0.8), rgba(245, 166, 35, 0.3)), url('assets/images/other-tabs-header-banner/banner-bg.png') center/cover no-repeat; border-bottom: 1px solid var(--glass-border);">
                <div>
                    <h1 style="font-size: 3.5rem; text-align: center; margin-bottom: 0;">Publications</h1>
                    <p style="text-align: center; color: var(--text-muted); font-size: 1.2rem;">Reports, Legislations, and Policies</p>
                </div>
            </div>

            <section class="section-full">
                <!-- Anchor Tabs Navigation -->
                <style>
                    .pub-tab-btn {
                        background: #337ab7;
                        color: white;
                        border: none;
                        padding: 0.8rem 1.5rem;
                        border-radius: 4px;
                        font-size: 1rem;
                        font-weight: 500;
                        cursor: pointer;
                        transition: all 0.2s ease;
                    }
                    .pub-tab-btn:hover {
                        transform: translateY(-2px);
                        background: #286090;
                        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                    }
                    .pub-tab-btn.active-tab {
                        background: #009e4f !important;
                    }
                </style>
                <div id="pub-tabs-container" style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 3rem; background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 8px; border: 1px solid var(--glass-border);">
                    <button class="pub-tab-btn" onclick="document.querySelectorAll('.pub-tab-btn').forEach(b => b.classList.remove('active-tab')); this.classList.add('active-tab'); document.getElementById('section-reports').scrollIntoView({behavior: 'smooth', block: 'start'})">Annual Reports</button>
                    <button class="pub-tab-btn" onclick="document.querySelectorAll('.pub-tab-btn').forEach(b => b.classList.remove('active-tab')); this.classList.add('active-tab'); document.getElementById('section-legislations').scrollIntoView({behavior: 'smooth', block: 'start'})">Legislations</button>
                    <button class="pub-tab-btn" onclick="document.querySelectorAll('.pub-tab-btn').forEach(b => b.classList.remove('active-tab')); this.classList.add('active-tab'); document.getElementById('section-govplans').scrollIntoView({behavior: 'smooth', block: 'start'})">Government Plans Policies</button>
                    <button class="pub-tab-btn" onclick="document.querySelectorAll('.pub-tab-btn').forEach(b => b.classList.remove('active-tab')); this.classList.add('active-tab'); document.getElementById('section-edupolicies').scrollIntoView({behavior: 'smooth', block: 'start'})">Education Policy</button>
                    <button class="pub-tab-btn" onclick="document.querySelectorAll('.pub-tab-btn').forEach(b => b.classList.remove('active-tab')); this.classList.add('active-tab'); document.getElementById('section-eduplans').scrollIntoView({behavior: 'smooth', block: 'start'})">Education Plans</button>
                </div>

                <div class="section-header" style="margin-top: 2rem;">
                    <h2 class="section-title" style="margin-bottom: 0;">Newly Published Documents</h2>
                </div>
                <div class="marquee-container" style="margin-top: 1rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); padding: 1rem; background: rgba(0,0,0,0.2);">
                    <div class="marquee-track">
                        <!-- Set 1 -->
                        <a href="#" target="_blank" class="doc-placeholder" style="display:block; cursor:pointer; padding:0; position:relative; overflow:hidden; border: 1px solid var(--glass-border);">
                            <img src="assets/images/documents/doc-img-01.png" alt="New Doc 1" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem; text-align: center;"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>New Document 1</div>
                        </a>
                        <a href="#" target="_blank" class="doc-placeholder" style="display:block; cursor:pointer; padding:0; position:relative; overflow:hidden; border: 1px solid var(--glass-border);">
                            <img src="assets/images/documents/doc-img-02.png" alt="New Doc 2" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem; text-align: center;"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>New Document 2</div>
                        </a>
                        <a href="#" target="_blank" class="doc-placeholder" style="display:block; cursor:pointer; padding:0; position:relative; overflow:hidden; border: 1px solid var(--glass-border);">
                            <img src="assets/images/documents/doc-img-03.png" alt="New Doc 3" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem; text-align: center;"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>New Document 3</div>
                        </a>
                        <a href="#" target="_blank" class="doc-placeholder" style="display:block; cursor:pointer; padding:0; position:relative; overflow:hidden; border: 1px solid var(--glass-border);">
                            <img src="assets/images/documents/doc-img-04.png" alt="New Doc 4" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem; text-align: center;"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>New Document 4</div>
                        </a>
                        <a href="#" target="_blank" class="doc-placeholder" style="display:block; cursor:pointer; padding:0; position:relative; overflow:hidden; border: 1px solid var(--glass-border);">
                            <img src="assets/images/documents/doc-img-05.png" alt="New Doc 5" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem; text-align: center;"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>New Document 5</div>
                        </a>
                        
                        <!-- Duplicate Set for Seamless Loop -->
                        <a href="#" target="_blank" class="doc-placeholder" style="display:block; cursor:pointer; padding:0; position:relative; overflow:hidden; border: 1px solid var(--glass-border);">
                            <img src="assets/images/documents/doc-img-01.png" alt="New Doc 1" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem; text-align: center;"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>New Document 1</div>
                        </a>
                        <a href="#" target="_blank" class="doc-placeholder" style="display:block; cursor:pointer; padding:0; position:relative; overflow:hidden; border: 1px solid var(--glass-border);">
                            <img src="assets/images/documents/doc-img-02.png" alt="New Doc 2" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem; text-align: center;"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>New Document 2</div>
                        </a>
                        <a href="#" target="_blank" class="doc-placeholder" style="display:block; cursor:pointer; padding:0; position:relative; overflow:hidden; border: 1px solid var(--glass-border);">
                            <img src="assets/images/documents/doc-img-03.png" alt="New Doc 3" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem; text-align: center;"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>New Document 3</div>
                        </a>
                        <a href="#" target="_blank" class="doc-placeholder" style="display:block; cursor:pointer; padding:0; position:relative; overflow:hidden; border: 1px solid var(--glass-border);">
                            <img src="assets/images/documents/doc-img-04.png" alt="New Doc 4" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem; text-align: center;"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>New Document 4</div>
                        </a>
                        <a href="#" target="_blank" class="doc-placeholder" style="display:block; cursor:pointer; padding:0; position:relative; overflow:hidden; border: 1px solid var(--glass-border);">
                            <img src="assets/images/documents/doc-img-05.png" alt="New Doc 5" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display:none; width:100%; height:100%; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem; text-align: center;"><span style="font-size:2rem; margin-bottom:0.5rem;">📄</span>New Document 5</div>
                        </a>
                    </div>
                </div>
                
                <div id="section-reports" class="card glass-panel" style="padding: 0; overflow: hidden; margin-top: 4rem; scroll-margin-top: 100px;">
                    <div style="background: rgba(0, 0, 0, 0.4); text-align: center; padding: 1.2rem; border-bottom: 1px solid var(--glass-border);">
                        <h2 style="margin: 0; color: #fff; font-size: 1.4rem; font-weight: 500;">Publications - Annual Report</h2>
                    </div>
                    <div style="overflow-x: auto;">
                        <table style="width: 100%; border-collapse: collapse; text-align: center; min-width: 600px;">
                            <tbody>
                                ${[2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015].map((year, index) => `
                                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); background: ${index % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent'}; transition: background 0.3s;">
                                    <td style="padding: 1rem; width: 100px; border-right: 1px solid rgba(255,255,255,0.05);"></td>
                                    <td style="padding: 1rem; text-align: center; font-weight: 500; font-size: 1.05rem; color: #fff; border-right: 1px solid rgba(255,255,255,0.05);">${year} DoE Annual Report</td>
                                    <td style="padding: 1rem; width: 150px; border-right: 1px solid rgba(255,255,255,0.05);">
                                        <a href="#" style="display: inline-block; background: #f0ad4e; color: #fff; padding: 0.4rem 1.2rem; border-radius: 4px; text-decoration: none; font-size: 0.9rem; font-weight: 600; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.2s;">View</a>
                                    </td>
                                    <td style="padding: 1rem; width: 200px;">
                                        <a href="#" style="display: inline-block; background: #5cb85c; color: #fff; padding: 0.4rem 1.2rem; border-radius: 4px; text-decoration: none; font-size: 0.9rem; font-weight: 600; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.2s;">Download</a>
                                    </td>
                                </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div id="section-legislations" class="card glass-panel" style="padding: 0; overflow: hidden; margin-top: 4rem; scroll-margin-top: 100px;">
                    <div style="background: rgba(0, 0, 0, 0.4); text-align: center; padding: 1.2rem; border-bottom: 1px solid var(--glass-border);">
                        <h2 style="margin: 0; color: #fff; font-size: 1.4rem; font-weight: 500;">Publications - Legislations</h2>
                    </div>
                    <div style="overflow-x: auto;">
                        <table style="width: 100%; border-collapse: collapse; text-align: center; min-width: 600px;">
                            <tbody>
                                ${['TSC Act No.12 Of 1988', 'National Library', 'Education Act 1983'].map((title, index) => `
                                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); background: ${index % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent'}; transition: background 0.3s;">
                                    <td style="padding: 1rem; width: 100px; border-right: 1px solid rgba(255,255,255,0.05);"></td>
                                    <td style="padding: 1rem; text-align: center; font-weight: 500; font-size: 1.05rem; color: #fff; border-right: 1px solid rgba(255,255,255,0.05);">${title}</td>
                                    <td style="padding: 1rem; width: 150px; border-right: 1px solid rgba(255,255,255,0.05);">
                                        <a href="#" style="display: inline-block; background: #f0ad4e; color: #fff; padding: 0.4rem 1.2rem; border-radius: 4px; text-decoration: none; font-size: 0.9rem; font-weight: 600; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.2s;">View</a>
                                    </td>
                                    <td style="padding: 1rem; width: 200px;">
                                        <a href="#" style="display: inline-block; background: #5cb85c; color: #fff; padding: 0.4rem 1.2rem; border-radius: 4px; text-decoration: none; font-size: 0.9rem; font-weight: 600; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.2s;">Download</a>
                                    </td>
                                </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div id="section-govplans" class="card glass-panel" style="padding: 0; overflow: hidden; margin-top: 4rem; scroll-margin-top: 100px;">
                    <div style="background: rgba(0, 0, 0, 0.4); text-align: center; padding: 1.2rem; border-bottom: 1px solid var(--glass-border);">
                        <h2 style="margin: 0; color: #fff; font-size: 1.4rem; font-weight: 500;">Publications - Government Plans & Policies</h2>
                    </div>
                    <div style="overflow-x: auto;">
                        <table style="width: 100%; border-collapse: collapse; text-align: center; min-width: 600px;">
                            <tbody>
                                ${['MTDP IV 2023 - 2027', 'Vision 2050_Papua New Guinea', 'MTDP II', 'MTDP III'].map((title, index) => `
                                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); background: ${index % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent'}; transition: background 0.3s;">
                                    <td style="padding: 1rem; width: 100px; border-right: 1px solid rgba(255,255,255,0.05);"></td>
                                    <td style="padding: 1rem; text-align: center; font-weight: 500; font-size: 1.05rem; color: #fff; border-right: 1px solid rgba(255,255,255,0.05);">${title}</td>
                                    <td style="padding: 1rem; width: 150px; border-right: 1px solid rgba(255,255,255,0.05);">
                                        <a href="#" style="display: inline-block; background: #f0ad4e; color: #fff; padding: 0.4rem 1.2rem; border-radius: 4px; text-decoration: none; font-size: 0.9rem; font-weight: 600; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.2s;">View</a>
                                    </td>
                                    <td style="padding: 1rem; width: 200px;">
                                        <a href="#" style="display: inline-block; background: #5cb85c; color: #fff; padding: 0.4rem 1.2rem; border-radius: 4px; text-decoration: none; font-size: 0.9rem; font-weight: 600; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.2s;">Download</a>
                                    </td>
                                </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div id="section-eduplans" class="card glass-panel" style="padding: 0; overflow: hidden; margin-top: 4rem; scroll-margin-top: 100px;">
                    <div style="background: rgba(0, 0, 0, 0.4); text-align: center; padding: 1.2rem; border-bottom: 1px solid var(--glass-border);">
                        <h2 style="margin: 0; color: #fff; font-size: 1.4rem; font-weight: 500;">Publications - Education Plans</h2>
                    </div>
                    <div style="overflow-x: auto; padding: 2rem; text-align: center;">
                        <p style="color: var(--text-muted); font-size: 1.1rem; margin: 0;">Documents and data will be published here soon.</p>
                    </div>
                </div>

                <div id="section-edupolicies" class="card glass-panel" style="padding: 0; overflow: hidden; margin-top: 4rem; scroll-margin-top: 100px;">
                    <div style="background: rgba(0, 0, 0, 0.4); text-align: center; padding: 1.2rem; border-bottom: 1px solid var(--glass-border);">
                        <h2 style="margin: 0; color: #fff; font-size: 1.4rem; font-weight: 500;">Publications - Education Policies</h2>
                    </div>
                    <div style="overflow-x: auto;">
                        <table style="width: 100%; border-collapse: collapse; text-align: center; min-width: 600px;">
                            <tbody>
                                ${[
                                    'National TPD POLICY TRPD Division',
                                    'National TPD Policy Implementation Guideline',
                                    'SLIP Policy FAQs',
                                    'National Teacher Professional Development Policy Implementation Guidelines',
                                    'National Teacher Professional Development Policy',
                                    'IERC School Outreach Guidelines',
                                    "IEP Teacher's Guide: Additional Guidelines And Resources",
                                    "Individual Education Plan (IEP) Teacher's Guide",
                                    'IE Policy Implementation Guide For IERCs 2024-2028',
                                    'IE Policy Implementation Guide For Schools 2024-2028',
                                    'Inclusive Education Policy 2024-2028',
                                    'SLIP Policy Implementation Guidelines',
                                    'GESI In Schools Policy Guidelines',
                                    'WaSH in Schools Infrastructure Manual',
                                    'WaSH in Schools Guideline',
                                    'WaSH in Schools Policy 2024 - 2028',
                                    'SLIP Policy 2024-2029',
                                    'GESI In Schools Policy',
                                    'MPS On GTF Policy 2024',
                                    'Behavior Management Policy',
                                    'WaSH in Schools 2018 - 2023',
                                    'MPS On GTF Policy 2022',
                                    'GTSF Policy_Administrative Guidelines Commodity Component 2021',
                                    'GTFS Policy 2022'
                                ].map((title, index) => `
                                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); background: ${index % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent'}; transition: background 0.3s;">
                                    <td style="padding: 1rem; width: 100px; border-right: 1px solid rgba(255,255,255,0.05);"></td>
                                    <td style="padding: 1rem; text-align: center; font-weight: 500; font-size: 1.05rem; color: #fff; border-right: 1px solid rgba(255,255,255,0.05);">${title}</td>
                                    <td style="padding: 1rem; width: 150px; border-right: 1px solid rgba(255,255,255,0.05);">
                                        <a href="#" style="display: inline-block; background: #f0ad4e; color: #fff; padding: 0.4rem 1.2rem; border-radius: 4px; text-decoration: none; font-size: 0.9rem; font-weight: 600; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.2s;">View</a>
                                    </td>
                                    <td style="padding: 1rem; width: 200px;">
                                        <a href="#" style="display: inline-block; background: #5cb85c; color: #fff; padding: 0.4rem 1.2rem; border-radius: 4px; text-decoration: none; font-size: 0.9rem; font-weight: 600; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.2s;">Download</a>
                                    </td>
                                </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        `;
    }
};
