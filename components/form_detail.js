window.FormDetailComponent = {
    render: async (fullPath) => {
        const formId = fullPath.split('/')[1] || '';
        
        let title = "Form Details & Instructions";
        let instructions = "Please read the following instructions carefully before completing the form.";
        let formName = "Requested Form";

        // Dynamic content based on the form selected
        if (formId === 'edb012') {
            title = "Teacher Record of Appointment (EDB012)";
            formName = "EDB012 - Record of Appointment";
            instructions = `
                <ul style="color: var(--text-muted); padding-left: 1.5rem; margin-bottom: 2rem; line-height: 1.8;">
                    <li><strong>Eligibility:</strong> This form must only be filled by teachers who have received their official posting confirmation from the Provincial Education Board (PEB).</li>
                    <li><strong>Signatures required:</strong> Ensure the Head Teacher, Board of Management Chairperson, and the teacher sign in their respective sections.</li>
                    <li><strong>Submission:</strong> The completed EDB012 form must be submitted within 2 weeks of taking up the teaching position to avoid payroll delays.</li>
                    <li><strong>Supporting Documents:</strong> Attach a copy of your teaching certificate and PEB posting letter.</li>
                </ul>
            `;
        } else if (formId === 'resumption') {
            title = "Resumption Of Duty Summary Sheet";
            formName = "Resumption Of Duty Summary Sheet";
            instructions = `
                <ul style="color: var(--text-muted); padding-left: 1.5rem; margin-bottom: 2rem; line-height: 1.8;">
                    <li><strong>Timing:</strong> Must be completed on the very first day of the academic school year.</li>
                    <li><strong>Responsibility:</strong> The Head Teacher is responsible for accurately logging the resumption of all staff members on this summary sheet.</li>
                    <li><strong>Absences:</strong> If a teacher is absent on the first day, do not mark them present. A separate late resumption form must be filed once they arrive.</li>
                    <li><strong>Submission:</strong> Submit the summary to the Provincial Education Advisor strictly by the end of Week 1.</li>
                </ul>
            `;
        } else if (formId === 'tsc37') {
            title = "Provincial Suspension Authority (TSC37)";
            formName = "TSC37 - Suspension Authority";
            instructions = `
                <ul style="color: var(--text-muted); padding-left: 1.5rem; margin-bottom: 2rem; line-height: 1.8;">
                    <li><strong>Usage:</strong> This form is to be used by the Provincial Education Advisor (PEA) when authorizing the suspension of a teaching staff member.</li>
                    <li><strong>Evidence:</strong> Strict evidentiary requirements must be met before executing this form. Legal counsel should be sought for severe cases.</li>
                    <li><strong>Notification:</strong> The suspended teacher holds the right to receive a copy of this form immediately upon execution.</li>
                </ul>
            `;
        } else if (formId === 'results-statement') {
            title = "Application of Statement Of Results";
            formName = "Application of Statement Of Results";
            instructions = `
                <ul style="color: var(--text-muted); padding-left: 1.5rem; margin-bottom: 2rem; line-height: 1.8;">
                    <li><strong>Processing Fee:</strong> A statutory processing fee must be paid into the NDoE Trust Account before submitting this application.</li>
                    <li><strong>Identification:</strong> Applicants must attach a valid ID (NID, Passport, or School ID from the year of graduation).</li>
                    <li><strong>Turnaround Time:</strong> Please allow 5-10 business days for the Measurement Services Division to process the statement.</li>
                </ul>
            `;
        } else {
            // Fallback for unknown IDs
            instructions = `<p style="color: var(--text-muted); margin-bottom: 2rem;">Standard submission procedures apply. Fill fields clearly in block letters.</p>`;
        }

        return `
            <div style="height: 250px; display:flex; align-items:center; justify-content:center; background: linear-gradient(135deg, rgba(80, 200, 120, 0.1), transparent); border-bottom: 1px solid var(--glass-border);">
                <div>
                    <span style="display: block; text-align: center; color: var(--primary); font-weight: bold; margin-bottom: 0.5rem;"><a href="#forms" style="color: var(--primary);">&larr; Back to All Forms</a></span>
                    <h1 style="font-size: 2.8rem; text-align: center; margin-bottom: 0; max-width: 900px; padding: 0 2rem;">${title}</h1>
                </div>
            </div>

            <section class="section-full">
                <div class="card glass-panel" style="max-width: 800px; margin: 0 auto; padding: 3rem;">
                    <h2 style="margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem;">Instructions & Guidelines</h2>
                    ${instructions}
                    
                    <div style="background: rgba(0,0,0,0.3); padding: 2rem; border-radius: 12px; border: 1px dashed var(--glass-border); text-align: center;">
                        <h3 style="margin-bottom: 1rem;">${formName}</h3>
                        <p style="color: var(--text-muted); margin-bottom: 1.5rem; font-size: 0.9rem;">By clicking download, you acknowledge that you have read and understood the instructions strictly outlined above.</p>
                        <a href="#" class="btn-primary" style="display: inline-block; padding: 0.8rem 2rem; font-size: 1.1rem;">Acknowledge & Download PDF</a>
                    </div>
                </div>
            </section>
        `;
    }
};
