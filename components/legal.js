/**
 * Legal & Policy Component
 * Renders Privacy Policy, Terms of Use, Accessibility, and RTI.
 */
window.LegalComponent = {
    render(type) {
        const content = this.getContent(type);
        return `
            <div class="legal-page">
                <div class="page-header" style="background: linear-gradient(rgba(10, 13, 20, 0.8), rgba(10, 13, 20, 0.8)), url('assets/images/hero/hero-bg.jpg'); background-size: cover; padding: 4rem 0 3rem;">
                    <div class="container" style="max-width: 900px; margin: 0 auto; padding: 0 1.5rem;">
                        <h1 style="font-size: 3rem; margin-bottom: 1rem;">${content.title}</h1>
                        <p style="color: var(--text-muted); font-size: 1.1rem;">Last Updated: April 2026</p>
                    </div>
                </div>

                <div class="container" style="max-width: 900px; margin: 0 auto; padding: var(--section-spacing) 1.5rem;">
                    <div class="glass-panel" style="padding: var(--card-padding); line-height: 1.8; color: var(--text-muted);">
                        ${content.body}
                    </div>
                    
                    <div style="text-align: center; margin-top: 3rem;">
                        <a href="#home" class="btn-primary">Return Home</a>
                    </div>
                </div>
            </div>
        `;
    },

    getContent(type) {
        const policies = {
            'privacy': {
                title: 'Privacy Policy',
                body: `
                    <h2>1. Introduction</h2>
                    <p>The Department of Education (DoE) Papua New Guinea is committed to protecting the privacy and security of your personal information. This Privacy Policy describes how we collect, use, and handle your information when you use our website and digital services.</p>
                    
                    <h2>2. Information We Collect</h2>
                    <p>We may collect personal information such as your name, email address, and contact details when you voluntarily provide them through our contact forms, scholarship applications, or newsletter sign-ups.</p>
                    
                    <h2>3. How We Use Your Information</h2>
                    <p>Your information is used to:</p>
                    <ul>
                        <li>Process applications for scholarships and job vacancies.</li>
                        <li>Respond to your inquiries and support requests.</li>
                        <li>Improve our website services and user experience.</li>
                        <li>Ensuring compliance with national education regulations.</li>
                    </ul>
                    
                    <h2>4. Data Protection</h2>
                    <p>We implement a variety of security measures to maintain the safety of your personal information. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent, except as required by law.</p>
                    
                    <h2>5. Your Rights</h2>
                    <p>You have the right to request access to the personal information we hold about you and to ask for corrections if any information is inaccurate or out of date.</p>
                `
            },
            'terms': {
                title: 'Terms of Use',
                body: `
                    <h2>1. Acceptance of Terms</h2>
                    <p>By accessing and using the Department of Education website, you accept and agree to be bound by the terms and provision of this agreement.</p>
                    
                    <h2>2. User Conduct</h2>
                    <p>You agree to use this website only for lawful purposes. You are prohibited from posting or transmitting any unlawful, harmful, or offensive material that could constitute a criminal offense or give rise to civil liability.</p>
                    
                    <h2>3. Intellectual Property</h2>
                    <p>All content on this website, including text, graphics, logos, and curriculum materials, is the property of the Department of Education and is protected by copyright laws. Unauthorized reproduction or distribution is strictly prohibited.</p>
                    
                    <h2>4. Limitation of Liability</h2>
                    <p>The Department of Education shall not be liable for any direct or indirect damages resulting from the use or inability to use the services or materials provided on this website.</p>
                    
                    <h2>5. External Links</h2>
                    <p>This website may contain links to external sites that are not operated by the DoE. We have no control over the content and practices of these sites and cannot accept responsibility for their respective privacy policies.</p>
                `
            },
            'accessibility': {
                title: 'Accessibility Statement',
                body: `
                    <h2>Compliance Commitment</h2>
                    <p>The Department of Education is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.</p>
                    
                    <h2>Standards</h2>
                    <p>We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 level AA. These guidelines explain how to make web content more accessible to people with a wide array of disabilities.</p>
                    
                    <h2>Key Features</h2>
                    <ul>
                        <li><strong>High Contrast:</strong> Our design system uses high-contrast colors for better readability.</li>
                        <li><strong>Scalable Text:</strong> Users can resize text to suit their visual needs.</li>
                        <li><strong>Keyboard Navigation:</strong> The site is designed to be fully navigable via keyboard.</li>
                        <li><strong>Alt Text:</strong> We provide descriptive alternative text for all essential images.</li>
                    </ul>
                    
                    <h2>Feedback</h2>
                    <p>We welcome your feedback on the accessibility of the DoE website. Please let us know if you encounter accessibility barriers by contacting us via our <a href="#contact" style="color:var(--primary)">Contact Page</a>.</p>
                `
            },
            'rti': {
                title: 'Right to Information',
                body: `
                    <h2>Overview</h2>
                    <p>The Right to Information (RTI) is a fundamental right that empowers citizens to request and obtain official information from public authorities, promoting transparency and accountability in governance.</p>
                    
                    <h2>How to Request Information</h2>
                    <p>To exercise your right to information regarding the Department of Education, please follow these steps:</p>
                    <ol>
                        <li>Identify the specific information or document you require.</li>
                        <li>Submit a formal request via our <a href="#contact" style="color:var(--primary)">Contact Form</a> or visit the Fincorp Haus headquarters.</li>
                        <li>Provide valid identification and clear contact details for our response.</li>
                    </ol>
                    
                    <h2>Exclusions</h2>
                    <p>While we strive for maximum transparency, certain information may be exempt from disclosure, such as sensitive personnel records, ongoing legal matters, or national security related documentation as per PNG law.</p>
                    
                    <h2>Timeframes</h2>
                    <p>The Department aims to respond to all valid RTI requests within 21 working days. If a request is complex or requires extensive searching, we will notify you of the expected timeline.</p>
                `
            }
        };

        return policies[type] || policies['privacy'];
    }
};
