window.AboutComponent = {
    render: async () => {
        return `
            <div style="height: 300px; display:flex; align-items:center; justify-content:center; background: linear-gradient(135deg, rgba(0, 112, 243, 0.2), transparent); border-bottom: 1px solid var(--glass-border);">
                <div>
                    <h1 style="font-size: 3.5rem; text-align: center; margin-bottom: 0;">About Us</h1>
                    <p style="text-align: center; color: var(--text-muted); font-size: 1.2rem;">Our Mandate & Leadership</p>
                </div>
            </div>

            <section class="section-full">
                <div class="card glass-panel" style="padding: 3rem;">
                    <h2 style="color: var(--primary);">DEPARTMENT OF EDUCATION</h2>
                    <p style="font-size: 1.1rem; color: var(--text-muted);">
                        The Department of Education leads the delivery of education services to children, young people and adults both directly through government schools and indirectly through the regulation and funding of permitted private schools. We implement the PNG Government policy on early childhood, general school education and vocational training.
                    </p>
                    <br>
                    <h3>Core Functions</h3>
                    <ul style="list-style-type: none; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; color: var(--text-muted);">
                        <li>✓ Curriculum and Examinations</li>
                        <li>✓ Education Standards</li>
                        <li>✓ National Education Policies & Plans</li>
                        <li>✓ National Institutions – National Schools of Excellence</li>
                        <li>✓ Teacher Management (TSC) – Payroll – DoE</li>
                        <li>✓ Government Tuition Fee Policy</li>
                    </ul>
                </div>
            </section>

            <section class="section-full">
                <div class="grid-2">
                    <div class="card glass-panel">
                        <h3>Our Mandate</h3>
                        <p style="color: var(--text-muted);">
                            The Department of Education is the executive and inspectorial branch of the National Education System. It derives its powers from the Education Act 1983 (amended 1995) and any other law relating to education matters. DoE is also subjected to Section 42 of the Organic Law on Provincial Governments and Local level Governments.
                        </p>
                    </div>
                    <div class="card glass-panel" style="border-left: 4px solid var(--accent);">
                        <h3>Minister for Education</h3>
                        <p style="color: var(--text-muted);">
                            The Minister is the political head responsible for the overall management of education through the Ministry of Education, which comprises the National Department of Education (NDoE), the Office of Libraries and Archives (OLA) and the Teaching Service Commission (TSC). The Minister has responsibility for control of the curriculum, standards, examinations, and minimum entry age.
                        </p>
                    </div>
                    <div class="card glass-panel">
                        <h3>National Department of Education</h3>
                        <p style="color: var(--text-muted);">
                            Under the Organic Law, the NDoE determines national policies and standards and supports their implementation by the provinces. The NDoE is responsible for: teacher in-service, inspection and registration; the national curriculum; curriculum materials; and examinations.
                        </p>
                    </div>
                    <div class="card glass-panel">
                        <h3>Teaching Service Commission</h3>
                        <p style="color: var(--text-muted);">
                            The Teaching Service Commission (TSC), established by an Act of Parliament, acts as the agent of the state for the employment of teachers. It oversees teachers’ terms and conditions of service, salaries and welfare. It supports rights of teachers.
                        </p>
                    </div>
                </div>
            </section>
        `;
    }
};
