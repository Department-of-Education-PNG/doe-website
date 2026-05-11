window.ContactComponent = {
    render: async () => {
        return `
            <section class="internal-hero reveal-up">
                <div class="hero-content-container">
                    <div class="hero-content">
                        <h1 class="reveal-up">Contact Us</h1>
                        <p class="reveal-up">Get in touch with the Department of Education</p>
                    </div>
                </div>
            </section>

            <section class="section-full" style="padding: var(--section-spacing) 0;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(450px, 1fr)); gap: var(--grid-gap); max-width: 1400px; margin: 0 auto; padding: 0 2rem;">
                    
                    <!-- Contact Form Column -->
                    <div class="card glass-panel" style="padding: var(--card-padding);">
                        <div style="margin-bottom: 2rem;">
                            <h2 style="font-size: 1.8rem; margin: 0; color: #fff;">Contact us</h2>
                            <div style="width: 40px; height: 3px; background: #2ecc71; margin-top: 0.5rem;"></div>
                        </div>

                        <form id="contact-form">
                            <div class="grid-2" style="margin-bottom: 1.5rem;">
                                <div class="form-group">
                                    <label class="form-label">First Name <span>*</span></label>
                                    <input type="text" name="first_name" placeholder="First Name" required class="form-input">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Last Name <span>*</span></label>
                                    <input type="text" name="last_name" placeholder="Last Name" required class="form-input">
                                </div>
                            </div>

                            <div class="grid-2" style="margin-bottom: 1.5rem;">
                                <div class="form-group">
                                    <label class="form-label">Email <span>*</span></label>
                                    <input type="email" name="email" placeholder="Email address" required class="form-input">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Mobile <span>*</span></label>
                                    <input type="tel" name="phone" placeholder="Telephone Number" required class="form-input">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="form-label">Subject <span>*</span></label>
                                <input type="text" name="subject" placeholder="Subject" required class="form-input">
                            </div>

                            <div class="form-group" style="margin-bottom: 2.5rem;">
                                <label class="form-label">Comments <span>*</span></label>
                                <textarea name="message" placeholder="Type comments" required class="form-textarea"></textarea>
                            </div>

                            <button type="submit" id="submit-btn" class="btn-primary" style="width: 100%; max-width: 280px; display: flex; align-items: center; justify-content: center; gap: 0.75rem;">
                                <i data-lucide="send"></i>
                                <span>Send your message</span>
                            </button>
                        </form>
                    </div>

                    <!-- Contact Info Column -->
                    <div class="card glass-panel" style="padding: var(--card-padding);">
                        <div style="margin-bottom: 2rem;">
                            <h2 style="font-size: 1.8rem; margin: 0; color: #fff;">Get in touch</h2>
                            <div style="width: 40px; height: 3px; background: #2ecc71; margin-top: 0.5rem;"></div>
                        </div>

                        <div style="display: flex; flex-direction: column; gap: 2rem;">
                            <div style="display: flex; gap: 1.5rem; align-items: flex-start;">
                                <div style="width: 54px; height: 54px; border-radius: 14px; background: rgba(59, 165, 224, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1px solid rgba(59, 165, 224, 0.2);">
                                    <i data-lucide="map-pin" style="color: var(--primary); width: 24px; height: 24px;"></i>
                                </div>
                                <div>
                                    <h4 style="color: #fff; margin-bottom: 0.5rem; font-size: 1.2rem;">Location</h4>
                                    <div style="color: var(--text-muted); font-size: 1.05rem; line-height: 1.6;">
                                        <p style="color: #fff; font-weight: 500; margin-bottom: 0.2rem;">Department of Education</p>
                                        <p>P.O Box 446, Waigani</p>
                                        <p>National Capital District</p>
                                        <p>Papua New Guinea</p>
                                    </div>
                                </div>
                            </div>

                            <div style="display: flex; gap: 1.5rem; align-items: flex-start;">
                                <div style="width: 54px; height: 54px; border-radius: 14px; background: rgba(46, 204, 113, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1px solid rgba(46, 204, 113, 0.2);">
                                    <i data-lucide="mail" style="color: #2ecc71; width: 24px; height: 24px;"></i>
                                </div>
                                <div>
                                    <h4 style="color: #fff; margin-bottom: 0.5rem; font-size: 1.2rem;">Email Support</h4>
                                    <div style="color: var(--text-muted); font-size: 1.05rem; line-height: 1.6;">
                                        <p style="margin-bottom: 0.8rem;">General Enquiries:</p>
                                        <p style="margin-bottom: 1.2rem;"><a href="mailto:enquiries@education.gov.pg" style="color: var(--primary); font-weight: 600; text-decoration: none;">enquiries@education.gov.pg</a></p>
                                        <p style="margin-bottom: 0.8rem;">Payroll Enquiries:</p>
                                        <p><a href="mailto:payenquiry@education.gov.pg" style="color: var(--primary); font-weight: 600; text-decoration: none;">payenquiry@education.gov.pg</a></p>
                                    </div>
                                </div>
                            </div>

                            <div style="display: flex; gap: 1.5rem; align-items: flex-start;">
                                <div style="width: 54px; height: 54px; border-radius: 14px; background: rgba(255, 194, 51, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1px solid rgba(255, 194, 51, 0.2);">
                                    <i data-lucide="phone" style="color: var(--accent); width: 24px; height: 24px;"></i>
                                </div>
                                <div>
                                    <h4 style="color: #fff; margin-bottom: 0.5rem; font-size: 1.2rem;">Phone Lines</h4>
                                    <div style="color: var(--text-muted); font-size: 1.05rem; line-height: 1.6;">
                                        <div style="margin-bottom: 1rem;">
                                            <p style="font-size: 0.9rem; margin-bottom: 0.2rem;">Main Office:</p>
                                            <p style="color: #fff; font-weight: 600; font-size: 1.1rem;">+675 328 8800</p>
                                        </div>
                                        <div>
                                            <p style="font-size: 0.9rem; margin-bottom: 0.2rem;">TSC Hotline:</p>
                                            <p style="color: #fff; font-weight: 600; font-size: 1.1rem;">+675 328 8890</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Google Map (Full width under cards) -->
                <div style="max-width: 1400px; margin: var(--grid-gap) auto 0; padding: 0 2rem;">
                    <div class="card glass-panel" style="padding: 0; overflow: hidden; min-height: 500px; border-radius: 24px;">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.733512217036!2d147.1866367!3d-9.429285099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x696fed3a129d3c5b%3A0xe543c79a4db2e18b!2sMinistry%20of%20Education%20-%20Papua%20New%20Guinea!5e0!3m2!1sen!2spg!4v1711500000000!5m2!1sen!2spg" 
                            style="width: 100%; height: 500px; border:0; display: block;" 
                            allowfullscreen="" 
                            loading="lazy" 
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </section>
            <section class="section-full" style="border-top: 1px solid var(--glass-border); padding: var(--section-spacing) 0;">
                <div style="max-width: 1400px; margin: 0 auto;">
                    <div style="margin-bottom: var(--header-margin);">
                        <h2 style="font-size: 2rem; margin: 0; color: #fff;">Divisions Contact Details</h2>
                        <div style="width: 60px; height: 3px; background: #3ba5e0; margin-top: 0.5rem;"></div>
                        <p style="color: var(--text-muted); margin-top: 1rem; font-size: 1.1rem;">Direct and extension numbers for all department divisions.</p>
                    </div>

                    <div class="table-scroll-wrap glass-panel" style="border-radius: 20px; padding: 1rem;">
                        <div class="table-inner">
                        <table class="glass-table" style="min-width: 600px;">
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
                        </div><!-- /table-inner -->
                    </div><!-- /table-scroll-wrap -->
                </div>
            </section>
            <section class="section-full" style="border-top: 1px solid var(--glass-border); padding: var(--section-spacing) 0;">
                <div style="max-width: 1400px; margin: 0 auto;">
                    <div style="margin-bottom: 3rem;">
                        <h2 style="font-size: 2rem; margin: 0; color: #fff;">Provincial Division of Education Contacts</h2>
                        <div style="width: 60px; height: 3px; background: #ffc233; margin-top: 0.5rem;"></div>
                        <p style="color: var(--text-muted); margin-top: 1rem; font-size: 1.1rem;">Direct contact numbers for educational offices across all provinces and regions.</p>
                    </div>

                    <div class="table-scroll-wrap glass-panel" style="border-radius: 20px; padding: 1.5rem;">
                        <div class="table-inner">
                        <table class="glass-table" style="min-width: 700px; table-layout: fixed;">
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
                        </div><!-- /table-inner -->
                    </div><!-- /table-scroll-wrap -->
                </div>
            </section>
        `;
    },
    afterRender: async () => {
        // Initialize Lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
        }

        const form = document.querySelector('#contact-form');
        const submitBtn = document.querySelector('#submit-btn');

        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const originalBtnText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-2 spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> <span>Sending...</span>';
                lucide.createIcons();

                const formData = new FormData(form);
                const data = {
                    name: `${formData.get('first_name')} ${formData.get('last_name')}`,
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    subject: formData.get('subject'),
                    message: formData.get('message')
                };

                try {
                    const response = await fetch('api/contact.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });

                    const result = await response.json();

                    if (result.success) {
                        form.reset();
                        const status = result.email_sent ? 'and notification sent.' : 'but there was an issue sending the email notification.';
                        window.showToast(`✅ Thank you! Your message has been received ${status}`);
                    } else {
                        window.showToast('❌ Error: ' + (result.error || 'Something went wrong.'), 'error');
                    }
                } catch (error) {
                    console.error('Contact submit error:', error);
                    window.showToast('❌ Connection failed. Please check your internet.', 'error');
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                    lucide.createIcons();
                }
            });
        }
    }
};


