window.ContactComponent = {
    render: async () => {
        return `
            <div style="min-height: 300px; padding: 4rem 1.5rem; display:flex; flex-direction:column; align-items:center; justify-content:center; background: linear-gradient(135deg, rgba(59, 165, 224, 0.6), rgba(14, 32, 64, 0.8), rgba(255, 194, 51, 0.3)), url('assets/images/other-tabs-header-banner/banner-bg.png') center/cover no-repeat; border-bottom: 1px solid var(--glass-border);">
                <div>
                    <h1 style="font-size: 3.5rem; text-align: center; margin-bottom: 0;">Contact Us</h1>
                    <p style="text-align: center; color: var(--text-muted); font-size: 1.2rem;">Get in touch with the Department of Education</p>
                </div>
            </div>

            <section class="section-full">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2.5rem; max-width: 1400px; margin: 0 auto;">
                    
                    <!-- Google Map Column -->
                    <div class="card glass-panel" style="padding: 0; overflow: hidden; height: 100%; min-height: 500px;">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.733512217036!2d147.1866367!3d-9.429285099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x696fed3a129d3c5b%3A0xe543c79a4db2e18b!2sMinistry%20of%20Education%20-%20Papua%20New%20Guinea!5e0!3m2!1sen!2spg!4v1711500000000!5m2!1sen!2spg" 
                            width="100%" 
                            height="100%" 
                            style="border:0;" 
                            allowfullscreen="" 
                            loading="lazy" 
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>

                    <!-- Contact Form Column -->
                    <div class="card glass-panel" style="padding: 2.5rem;">
                        <div style="margin-bottom: 2rem;">
                            <h2 style="font-size: 1.8rem; margin: 0; color: #fff;">Contact us</h2>
                            <div style="width: 40px; height: 3px; background: #2ecc71; margin-top: 0.5rem;"></div>
                        </div>

                        <form id="contact-form" onsubmit="event.preventDefault(); alert('Message sent functionality pending backend integration.');">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
                                <div>
                                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.9rem;">First Name <span style="color: #e74c3c;">*</span></label>
                                    <input type="text" placeholder="First Name" required style="width: 100%; padding: 0.8rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; color: #fff; outline: none;">
                                </div>
                                <div>
                                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.9rem;">Last Name <span style="color: #e74c3c;">*</span></label>
                                    <input type="text" placeholder="Last Name" required style="width: 100%; padding: 0.8rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; color: #fff; outline: none;">
                                </div>
                            </div>

                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
                                <div>
                                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.9rem;">Email <span style="color: #e74c3c;">*</span></label>
                                    <input type="email" placeholder="Email address" required style="width: 100%; padding: 0.8rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; color: #fff; outline: none;">
                                </div>
                                <div>
                                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.9rem;">Mobile <span style="color: #e74c3c;">*</span></label>
                                    <input type="tel" placeholder="Telephone Number" required style="width: 100%; padding: 0.8rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; color: #fff; outline: none;">
                                </div>
                            </div>

                            <div style="margin-bottom: 2rem;">
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; font-size: 0.9rem;">Comments</label>
                                <textarea rows="6" placeholder="Type comments" style="width: 100%; padding: 0.8rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; color: #fff; outline: none; font-family: inherit; resize: none;"></textarea>
                            </div>

                            <button type="submit" class="btn-primary" style="padding: 1rem 2rem; border-radius: 4px; border: none; cursor: pointer; transition: 0.3s; font-weight: 600; width: 220px;">Send your message</button>
                        </form>
                    </div>

                    <!-- Contact Info Column -->
                    <div class="card glass-panel" style="padding: 2.5rem;">
                        <div style="margin-bottom: 3rem;">
                            <h2 style="font-size: 1.8rem; margin: 0; color: #fff;">Get in touch</h2>
                            <div style="width: 40px; height: 3px; background: #2ecc71; margin-top: 0.5rem;"></div>
                        </div>

                        <div style="display: flex; gap: 1.5rem; margin-bottom: 2.5rem;">
                            <div style="width: 50px; height: 50px; border-radius: 50%; background: rgba(243, 156, 18, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <span style="font-size: 1.5rem; color: #f39c12;">📍</span>
                            </div>
                            <div style="color: var(--text-muted); font-size: 1.05rem; line-height: 1.7;">
                                <h4 style="color: #fff; margin-bottom: 0.2rem; font-size: 1.1rem;">Department of Education</h4>
                                <p>P.O Box 446</p>
                                <p>Waigani</p>
                                <p>National Capital District</p>
                                <p>Papua New Guinea</p>
                            </div>
                        </div>

                        <div style="display: flex; gap: 1.5rem; margin-bottom: 2.5rem;">
                            <div style="width: 50px; height: 50px; border-radius: 50%; background: rgba(231, 76, 60, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <span style="font-size: 1.5rem; color: #e74c3c;">✉️</span>
                            </div>
                            <div style="color: var(--text-muted); font-size: 1.05rem;">
                                <p style="margin-bottom: 0.8rem;">For General Enquiries send your email to:</p>
                                <p><a href="mailto:enquiries@education.gov.pg" style="color: #fff; font-weight: 600;">enquiries@education.gov.pg</a></p>
                                <p style="margin: 1rem 0 0.8rem;">For Payroll Enquiries, send your email to:</p>
                                <p><a href="mailto:payenquiry@education.gov.pg" style="color: #fff; font-weight: 600;">payenquiry@education.gov.pg</a></p>
                            </div>
                        </div>

                        <div style="display: flex; gap: 1.5rem;">
                            <div style="width: 50px; height: 50px; border-radius: 50%; background: rgba(52, 152, 219, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <span style="font-size: 1.5rem; color: #3498db;">📱</span>
                            </div>
                            <div style="color: var(--text-muted); font-size: 1.05rem;">
                                <p style="margin-bottom: 0.5rem;">Main Phone Line :</p>
                                <p style="color: #fff; font-weight: 600; margin-bottom: 1rem;">+675 328 8800</p>
                                <p style="margin-bottom: 0.5rem;">Teaching Service Commission Phone :</p>
                                <p style="color: #fff; font-weight: 600;">+675 328 8890</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <section class="section-full" style="background: rgba(14, 32, 64, 0.4); border-top: 1px solid var(--glass-border); padding-top: 5rem; padding-bottom: 5rem;">
                <div style="max-width: 1400px; margin: 0 auto;">
                    <div style="margin-bottom: 3rem;">
                        <h2 style="font-size: 2rem; margin: 0; color: #fff;">Divisions Contact Details</h2>
                        <div style="width: 60px; height: 3px; background: #3ba5e0; margin-top: 0.5rem;"></div>
                        <p style="color: var(--text-muted); margin-top: 1rem; font-size: 1.1rem;">Direct and extension numbers for all department divisions.</p>
                    </div>

                    <div class="card glass-panel" style="overflow-x: auto; border-radius: 20px; padding: 1rem;">
                        <table style="width: 100%; border-collapse: separate; border-spacing: 0; color: #fff; text-align: left;">
                            <thead>
                                <tr>
                                    <th style="padding: 1.5rem; border-bottom: 2px solid rgba(255,255,255,0.1); color: #3ba5e0; font-weight: 700; font-size: 1.1rem;">Divisions</th>
                                    <th style="padding: 1.5rem; border-bottom: 2px solid rgba(255,255,255,0.1); color: #3ba5e0; font-weight: 700; font-size: 1.1rem;">Direct Numbers</th>
                                    <th style="padding: 1.5rem; border-bottom: 2px solid rgba(255,255,255,0.1); color: #3ba5e0; font-weight: 700; font-size: 1.1rem;">Extension Numbers</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="background: rgba(255,255,255,0.02); transition: 0.3s;" onmouseover="this.style.background='rgba(59, 165, 224, 0.08)'" onmouseout="this.style.background='rgba(255,255,255,0.02)'">
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Curriculum Development</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05); font-mono: monospace;">328 8882</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05); font-mono: monospace;">832</td>
                                </tr>
                                <tr style="transition: 0.3s;" onmouseover="this.style.background='rgba(59, 165, 224, 0.08)'" onmouseout="this.style.background='transparent'">
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Measurement Services</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">328 8876</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">728</td>
                                </tr>
                                <tr style="background: rgba(255,255,255,0.02); transition: 0.3s;" onmouseover="this.style.background='rgba(59, 165, 224, 0.08)'" onmouseout="this.style.background='rgba(255,255,255,0.02)'">
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">NCDES</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">328 8887</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">1126</td>
                                </tr>
                                <tr style="transition: 0.3s;" onmouseover="this.style.background='rgba(59, 165, 224, 0.08)'" onmouseout="this.style.background='transparent'">
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">GES</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">328 8872</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">625</td>
                                </tr>
                                <tr style="background: rgba(255,255,255,0.02); transition: 0.3s;" onmouseover="this.style.background='rgba(59, 165, 224, 0.08)'" onmouseout="this.style.background='rgba(255,255,255,0.02)'">
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Guidance & Counseling</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">328 8886</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">1084</td>
                                </tr>
                                <tr style="transition: 0.3s;" onmouseover="this.style.background='rgba(59, 165, 224, 0.08)'" onmouseout="this.style.background='transparent'">
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Teacher Education</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">328 8864</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">540</td>
                                </tr>
                                <tr style="background: rgba(255,255,255,0.02); transition: 0.3s;" onmouseover="this.style.background='rgba(59, 165, 224, 0.08)'" onmouseout="this.style.background='rgba(255,255,255,0.02)'">
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Standards</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">328 8884</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">840</td>
                                </tr>
                                <tr style="transition: 0.3s;" onmouseover="this.style.background='rgba(59, 165, 224, 0.08)'" onmouseout="this.style.background='transparent'">
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">e-Learning</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">328 8878</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">753</td>
                                </tr>
                                <tr style="background: rgba(255,255,255,0.02); transition: 0.3s;" onmouseover="this.style.background='rgba(59, 165, 224, 0.08)'" onmouseout="this.style.background='rgba(255,255,255,0.02)'">
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">TVET Inspections</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">328 8852</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">345</td>
                                </tr>
                                <tr style="transition: 0.3s;" onmouseover="this.style.background='rgba(59, 165, 224, 0.08)'" onmouseout="this.style.background='transparent'">
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Finance</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">328 8862</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">470</td>
                                </tr>
                                <tr style="background: rgba(255,255,255,0.02); transition: 0.3s;" onmouseover="this.style.background='rgba(59, 165, 224, 0.08)'" onmouseout="this.style.background='rgba(255,255,255,0.02)'">
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Procurement</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">328 8860</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">178</td>
                                </tr>
                                <tr style="transition: 0.3s;" onmouseover="this.style.background='rgba(59, 165, 224, 0.08)'" onmouseout="this.style.background='transparent'">
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Payroll</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">328 8858</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">415</td>
                                </tr>
                                <tr style="background: rgba(255,255,255,0.02); transition: 0.3s;" onmouseover="this.style.background='rgba(59, 165, 224, 0.08)'" onmouseout="this.style.background='rgba(255,255,255,0.02)'">
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">HROD</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">328 8856</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">380</td>
                                </tr>
                                <tr style="transition: 0.3s;" onmouseover="this.style.background='rgba(59, 165, 224, 0.08)'" onmouseout="this.style.background='transparent'">
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Administration</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">328 8850</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">159</td>
                                </tr>
                                <tr style="background: rgba(255,255,255,0.02); transition: 0.3s;" onmouseover="this.style.background='rgba(59, 165, 224, 0.08)'" onmouseout="this.style.background='rgba(255,255,255,0.02)'">
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">ICT</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">328 8866</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">550</td>
                                </tr>
                                <tr style="transition: 0.3s;" onmouseover="this.style.background='rgba(59, 165, 224, 0.08)'" onmouseout="this.style.background='transparent'">
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Policy & Planning</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">328 8880</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">206</td>
                                </tr>
                                <tr style="background: rgba(255,255,255,0.02); transition: 0.3s;" onmouseover="this.style.background='rgba(59, 165, 224, 0.08)'" onmouseout="this.style.background='rgba(255,255,255,0.02)'">
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Research & Evaluation</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">328 8868</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">580</td>
                                </tr>
                                <tr style="transition: 0.3s;" onmouseover="this.style.background='rgba(59, 165, 224, 0.08)'" onmouseout="this.style.background='transparent'">
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Media & Communication</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">328 8834</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">210</td>
                                </tr>
                                <tr style="background: rgba(255,255,255,0.02); transition: 0.3s;" onmouseover="this.style.background='rgba(59, 165, 224, 0.08)'" onmouseout="this.style.background='rgba(255,255,255,0.02)'">
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">TVET Curriculum</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">328 8848</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">304</td>
                                </tr>
                                <tr style="transition: 0.3s;" onmouseover="this.style.background='rgba(59, 165, 224, 0.08)'" onmouseout="this.style.background='transparent'">
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">GTFS</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">328 8874</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">685</td>
                                </tr>
                                <tr style="background: rgba(255,255,255,0.02); transition: 0.3s;" onmouseover="this.style.background='rgba(59, 165, 224, 0.08)'" onmouseout="this.style.background='rgba(255,255,255,0.02)'">
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">PMU</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">328 8870</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">610</td>
                                </tr>
                                <tr style="transition: 0.3s;" onmouseover="this.style.background='rgba(59, 165, 224, 0.08)'" onmouseout="this.style.background='transparent'">
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">TVET School Operations</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">328 8854</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">350</td>
                                </tr>
                                <tr style="background: rgba(255,255,255,0.02); transition: 0.3s;" onmouseover="this.style.background='rgba(59, 165, 224, 0.08)'" onmouseout="this.style.background='rgba(255,255,255,0.02)'">
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">Internal Audit</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">328 8846</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">250</td>
                                </tr>
                                <tr style="transition: 0.3s;" onmouseover="this.style.background='rgba(59, 165, 224, 0.08)'" onmouseout="this.style.background='transparent'">
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">UNESCO</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">328 8843</td>
                                    <td style="padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">241</td>
                                </tr>
                                <tr style="background: rgba(255,255,255,0.02); transition: 0.3s;" onmouseover="this.style.background='rgba(59, 165, 224, 0.08)'" onmouseout="this.style.background='rgba(255,255,255,0.02)'">
                                    <td style="padding: 1.2rem 1.5rem;">Legal Services</td>
                                    <td style="padding: 1.2rem 1.5rem;">328 8832</td>
                                    <td style="padding: 1.2rem 1.5rem;">132</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <section class="section-full" style="background: rgba(14, 32, 64, 0.2); border-top: 1px solid var(--glass-border); padding-top: 5rem; padding-bottom: 5rem;">
                <div style="max-width: 1400px; margin: 0 auto;">
                    <div style="margin-bottom: 3rem;">
                        <h2 style="font-size: 2rem; margin: 0; color: #fff;">Provincial Division of Education Contacts</h2>
                        <div style="width: 60px; height: 3px; background: #ffc233; margin-top: 0.5rem;"></div>
                        <p style="color: var(--text-muted); margin-top: 1rem; font-size: 1.1rem;">Direct contact numbers for educational offices across all provinces and regions.</p>
                    </div>

                    <div class="card glass-panel" style="overflow-x: auto; border-radius: 20px; padding: 1.5rem;">
                        <table style="width: 100%; border-collapse: separate; border-spacing: 0; color: #fff; text-align: left; table-layout: fixed;">
                            <thead>
                                <tr>
                                    <th style="padding: 1.5rem; border-bottom: 3px solid rgba(59, 165, 224, 0.3); color: #fff; font-weight: 800; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; width: 25%;">SOUTHERN REGION</th>
                                    <th style="padding: 1.5rem; border-bottom: 3px solid rgba(59, 165, 224, 0.3); color: #fff; font-weight: 800; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; width: 25%;">HIGHLANDS REGION</th>
                                    <th style="padding: 1.5rem; border-bottom: 3px solid rgba(59, 165, 224, 0.3); color: #fff; font-weight: 800; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; width: 25%;">NGI REGION</th>
                                    <th style="padding: 1.5rem; border-bottom: 3px solid rgba(59, 165, 224, 0.3); color: #fff; font-weight: 800; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; width: 25%;">MOMASE REGION</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="vertical-align: top;">
                                    <td style="padding: 1.5rem; border-right: 1px solid rgba(255,255,255,0.05);">
                                        <div style="margin-bottom: 1.5rem;">
                                            <p style="font-weight: 600; color: #3ba5e0; margin-bottom: 0.3rem;">Western Province</p>
                                            <p style="color: var(--text-muted); font-size: 0.9rem;">Ph: 645 9071</p>
                                        </div>
                                    </td>
                                    <td style="padding: 1.5rem; border-right: 1px solid rgba(255,255,255,0.05);">
                                        <div style="margin-bottom: 1.5rem;">
                                            <p style="font-weight: 600; color: #3ba5e0; margin-bottom: 0.3rem;">Southern Highlands</p>
                                            <p style="color: var(--text-muted); font-size: 0.9rem;">Ph: 549 1811</p>
                                        </div>
                                    </td>
                                    <td style="padding: 1.5rem; border-right: 1px solid rgba(255,255,255,0.05);">
                                        <div style="margin-bottom: 1.5rem;">
                                            <p style="font-weight: 600; color: #3ba5e0; margin-bottom: 0.3rem;">East New Britain</p>
                                            <p style="color: var(--text-muted); font-size: 0.9rem;">Ph: 983 4049</p>
                                        </div>
                                    </td>
                                    <td style="padding: 1.5rem;">
                                        <div style="margin-bottom: 1.5rem;">
                                            <p style="font-weight: 600; color: #3ba5e0; margin-bottom: 0.3rem;">Sandaun Province</p>
                                            <p style="color: var(--text-muted); font-size: 0.9rem;">Ph: 457 1100</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr style="vertical-align: top;">
                                    <td style="padding: 1.5rem; border-right: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.02);">
                                        <div style="margin-bottom: 1.5rem;">
                                            <p style="font-weight: 600; color: #3ba5e0; margin-bottom: 0.3rem;">Gulf Province</p>
                                            <p style="color: var(--text-muted); font-size: 0.9rem;">Ph: 648 1079</p>
                                        </div>
                                    </td>
                                    <td style="padding: 1.5rem; border-right: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.02);">
                                        <div style="margin-bottom: 1.5rem;">
                                            <p style="font-weight: 600; color: #3ba5e0; margin-bottom: 0.3rem;">Eastern Highlands</p>
                                            <p style="color: var(--text-muted); font-size: 0.9rem;">Ph: 532 2242</p>
                                        </div>
                                    </td>
                                    <td style="padding: 1.5rem; border-right: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.02);">
                                        <div style="margin-bottom: 1.5rem;">
                                            <p style="font-weight: 600; color: #3ba5e0; margin-bottom: 0.3rem;">West New Britain</p>
                                            <p style="color: var(--text-muted); font-size: 0.9rem;">Ph: 983 4049</p>
                                        </div>
                                    </td>
                                    <td style="padding: 1.5rem; background: rgba(255,255,255,0.02);">
                                        <div style="margin-bottom: 1.5rem;">
                                            <p style="font-weight: 600; color: #3ba5e0; margin-bottom: 0.3rem;">East Sepik Province</p>
                                            <p style="color: var(--text-muted); font-size: 0.9rem;">Ph: 7222 9115</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr style="vertical-align: top;">
                                    <td style="padding: 1.5rem; border-right: 1px solid rgba(255,255,255,0.05);">
                                        <div style="margin-bottom: 1.5rem;">
                                            <p style="font-weight: 600; color: #3ba5e0; margin-bottom: 0.3rem;">Central Province</p>
                                            <p style="color: var(--text-muted); font-size: 0.9rem;">Ph: 321 4118</p>
                                        </div>
                                    </td>
                                    <td style="padding: 1.5rem; border-right: 1px solid rgba(255,255,255,0.05);">
                                        <div style="margin-bottom: 1.5rem;">
                                            <p style="font-weight: 600; color: #3ba5e0; margin-bottom: 0.3rem;">Simbu Province</p>
                                            <p style="color: var(--text-muted); font-size: 0.9rem;">Ph: 7222 8007</p>
                                        </div>
                                    </td>
                                    <td style="padding: 1.5rem; border-right: 1px solid rgba(255,255,255,0.05);">
                                        <div style="margin-bottom: 1.5rem;">
                                            <p style="font-weight: 600; color: #3ba5e0; margin-bottom: 0.3rem;">New Ireland Province</p>
                                            <p style="color: var(--text-muted); font-size: 0.9rem;">Ph: 984 2555</p>
                                        </div>
                                    </td>
                                    <td style="padding: 1.5rem;">
                                        <div style="margin-bottom: 1.5rem;">
                                            <p style="font-weight: 600; color: #3ba5e0; margin-bottom: 0.3rem;">Madang Province</p>
                                            <p style="color: var(--text-muted); font-size: 0.9rem;">Ph: 422 1652</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr style="vertical-align: top;">
                                    <td style="padding: 1.5rem; border-right: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.02);">
                                        <div style="margin-bottom: 1.5rem;">
                                            <p style="font-weight: 600; color: #3ba5e0; margin-bottom: 0.3rem;">Milne Bay Province</p>
                                            <p style="color: var(--text-muted); font-size: 0.9rem;">Ph: 641 130</p>
                                        </div>
                                    </td>
                                    <td style="padding: 1.5rem; border-right: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.02);">
                                        <div style="margin-bottom: 1.5rem;">
                                            <p style="font-weight: 600; color: #3ba5e0; margin-bottom: 0.3rem;">Western Highlands</p>
                                            <p style="color: var(--text-muted); font-size: 0.9rem;">Ph: 542 1145</p>
                                        </div>
                                    </td>
                                    <td style="padding: 1.5rem; border-right: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.02);">
                                        <div style="margin-bottom: 1.5rem;">
                                            <p style="font-weight: 600; color: #3ba5e0; margin-bottom: 0.3rem;">AROB</p>
                                            <p style="color: var(--text-muted); font-size: 0.9rem;">Ph: 973 9361</p>
                                        </div>
                                    </td>
                                    <td style="padding: 1.5rem; background: rgba(255,255,255,0.02);">
                                        <div style="margin-bottom: 1.5rem;">
                                            <p style="font-weight: 600; color: #3ba5e0; margin-bottom: 0.3rem;">Morobe Province</p>
                                            <p style="color: var(--text-muted); font-size: 0.9rem;">Ph: 473 1661</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr style="vertical-align: top;">
                                    <td style="padding: 1.5rem; border-right: 1px solid rgba(255,255,255,0.05);">
                                        <div style="margin-bottom: 1.5rem;">
                                            <p style="font-weight: 600; color: #3ba5e0; margin-bottom: 0.3rem;">Oro Province</p>
                                            <p style="color: var(--text-muted); font-size: 0.9rem;">Ph: 329 7350</p>
                                        </div>
                                    </td>
                                    <td style="padding: 1.5rem; border-right: 1px solid rgba(255,255,255,0.05);">
                                        <div style="margin-bottom: 1.5rem;">
                                            <p style="font-weight: 600; color: #3ba5e0; margin-bottom: 0.3rem;">Enga Province</p>
                                            <p style="color: var(--text-muted); font-size: 0.9rem;">Ph: 7222 9049</p>
                                        </div>
                                    </td>
                                    <td style="padding: 1.5rem; border-right: 1px solid rgba(255,255,255,0.05);">
                                        <div style="margin-bottom: 1.5rem;">
                                            <p style="font-weight: 600; color: #3ba5e0; margin-bottom: 0.3rem;">Manus Province</p>
                                            <p style="color: var(--text-muted); font-size: 0.9rem;">Ph: 970 9038</p>
                                        </div>
                                    </td>
                                    <td style="padding: 1.5rem;">
                                        <!-- Keep column width consistent -->
                                    </td>
                                </tr>
                                <tr style="vertical-align: top;">
                                    <td style="padding: 1.5rem; border-right: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.02);">
                                        <div style="margin-bottom: 1.5rem;">
                                            <p style="font-weight: 600; color: #3ba5e0; margin-bottom: 0.3rem;">NCD</p>
                                            <p style="color: var(--text-muted); font-size: 0.9rem;">Ph: 301 3362</p>
                                        </div>
                                    </td>
                                    <td style="padding: 1.5rem; border-right: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.02);">
                                        <div style="margin-bottom: 1.5rem;">
                                            <p style="font-weight: 600; color: #3ba5e0; margin-bottom: 0.3rem;">Lake Murray District</p>
                                            <p style="color: var(--text-muted); font-size: 0.9rem;">Ph: 548 1294</p>
                                        </div>
                                    </td>
                                    <td style="padding: 1.5rem; border-right: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.02);">
                                    </td>
                                    <td style="padding: 1.5rem; background: rgba(255,255,255,0.02);">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        `;
    }
};


