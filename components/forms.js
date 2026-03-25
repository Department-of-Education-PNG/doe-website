window.FormsComponent = {
    render: async () => {
        return `
            <div style="height: 300px; display:flex; align-items:center; justify-content:center; background: linear-gradient(135deg, rgba(20, 200, 255, 0.2), transparent); border-bottom: 1px solid var(--glass-border);">
                <div>
                    <h1 style="font-size: 3.5rem; text-align: center; margin-bottom: 0;">Public Forms & Legislation</h1>
                    <p style="text-align: center; color: var(--text-muted); font-size: 1.2rem;">Official documents, applications, and acts for teachers and the public</p>
                </div>
            </div>

            <section class="section-full">
                <!-- Education Forms Table -->
                <div class="card glass-panel" style="margin-bottom: 3rem; padding: 2rem;">
                    <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Education Forms</h2>
                    <div style="overflow-x: auto;">
                        <table class="glass-table">
                            <thead>
                                <tr>
                                    <th>Form Name</th>
                                    <th>Category</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Appeal to PEB against a Posting</td>
                                    <td>Appeals</td>
                                    <td><a href="#" class="btn-table">Download PDF</a></td>
                                </tr>
                                <tr>
                                    <td>Teacher Record of Appointment (EDB012)</td>
                                    <td>Appointments</td>
                                    <td><a href="#form-detail/edb012" class="btn-table btn-detail">View Instructions</a></td>
                                </tr>
                                <tr>
                                    <td>Teacher Query (EDB021)</td>
                                    <td>Query</td>
                                    <td><a href="#" class="btn-table">Download PDF</a></td>
                                </tr>
                                <tr>
                                    <td>Change To Method of Pay (EDB022)</td>
                                    <td>Payroll</td>
                                    <td><a href="#" class="btn-table">Download PDF</a></td>
                                </tr>
                                <tr>
                                    <td>Release To Teach In Another Province</td>
                                    <td>Transfers</td>
                                    <td><a href="#" class="btn-table">Download PDF</a></td>
                                </tr>
                                <tr>
                                    <td>Teacher Query Provincial Release Authority</td>
                                    <td>Query / Release</td>
                                    <td><a href="#" class="btn-table">Download PDF</a></td>
                                </tr>
                                <tr>
                                    <td>Teacher Query School Release Authority</td>
                                    <td>Query / Release</td>
                                    <td><a href="#" class="btn-table">Download PDF</a></td>
                                </tr>
                                <tr>
                                    <td>Appeal To TSC Against Appointment (TSC6)</td>
                                    <td>Appeals</td>
                                    <td><a href="#" class="btn-table">Download PDF</a></td>
                                </tr>
                                <tr>
                                    <td>Provincial Suspension Authority (TSC37)</td>
                                    <td>Disciplinary</td>
                                    <td><a href="#form-detail/tsc37" class="btn-table btn-detail">View Instructions</a></td>
                                </tr>
                                <tr>
                                    <td>Retirement Resignation Furlough Leave Without Pay (TSC38)</td>
                                    <td>Leave / Exit</td>
                                    <td><a href="#" class="btn-table">Download PDF</a></td>
                                </tr>
                                <tr>
                                    <td>Resumption Of Duty Summary Sheet</td>
                                    <td>Resumption</td>
                                    <td><a href="#form-detail/resumption" class="btn-table btn-detail">View Instructions</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- General Forms Table -->
                <div class="card glass-panel" style="margin-bottom: 3rem; padding: 2rem;">
                    <h2 style="color: var(--accent); margin-bottom: 1.5rem;">General Forms</h2>
                    <div style="overflow-x: auto;">
                        <table class="glass-table">
                            <thead>
                                <tr>
                                    <th>Form Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Oath Of Loyalty And Services</td>
                                    <td><a href="#" class="btn-table">Download PDF</a></td>
                                </tr>
                                <tr>
                                    <td>Statuory Declaration</td>
                                    <td><a href="#" class="btn-table">Download PDF</a></td>
                                </tr>
                                <tr>
                                    <td>Application of Statement Of Results</td>
                                    <td><a href="#form-detail/results-statement" class="btn-table btn-detail">View Instructions</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Personnel Forms Table -->
                <div class="card glass-panel" style="margin-bottom: 3rem; padding: 2rem;">
                    <h2 style="color: #a0aec0; margin-bottom: 1.5rem;">Personnel Forms</h2>
                    <div style="overflow-x: auto;">
                        <table class="glass-table">
                            <thead>
                                <tr>
                                    <th>Form Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Application for Annual Leave (IREC9.1)</td>
                                    <td><a href="#" class="btn-table">Download PDF</a></td>
                                </tr>
                                <tr>
                                    <td>Application for Absence Leave (IREC9.2)</td>
                                    <td><a href="#" class="btn-table">Download PDF</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Legislation Table -->
                <div class="card glass-panel" style="margin-bottom: 3rem; padding: 2rem;">
                    <h2 style="color: #50c878; margin-bottom: 1.5rem;">Legislation</h2>
                    <div style="overflow-x: auto;">
                        <table class="glass-table">
                            <thead>
                                <tr>
                                    <th>Act / Regulation Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>Education Act 1983</td><td><a href="#" class="btn-table">PDF Format</a></td></tr>
                                <tr><td>Education (International Education Agency Schools) Regulation 1985</td><td><a href="#" class="btn-table">PDF Format</a></td></tr>
                                <tr><td>Education (Boards of Studies) Regulation 1986</td><td><a href="#" class="btn-table">PDF Format</a></td></tr>
                                <tr><td>Education Regulation 1983</td><td><a href="#" class="btn-table">PDF Format</a></td></tr>
                                <tr><td>National Library and Archives Act 1993</td><td><a href="#" class="btn-table">PDF Format</a></td></tr>
                                <tr><td>National Library and Archives (Board) Regulation 1998</td><td><a href="#" class="btn-table">PDF Format</a></td></tr>
                                <tr><td>Public Services Conciliation and Arbitration Act 1969</td><td><a href="#" class="btn-table">View Document</a></td></tr>
                                <tr><td>Public Services Conciliation and Arbitration Regulation 1971</td><td><a href="#" class="btn-table">PDF Format</a></td></tr>
                                <tr><td>Teaching Service Act 1988</td><td><a href="#" class="btn-table">View Document</a></td></tr>
                                <tr><td>Teaching Service Conciliation and Arbitration Act 1971</td><td><a href="#" class="btn-table">PDF Format</a></td></tr>
                                <tr><td>Teaching Service Conciliation and Arbitration Regulation 1974</td><td><a href="#" class="btn-table">PDF Format</a></td></tr>
                                <tr><td>Teaching Service (Auxiliary Members) Act 1973</td><td><a href="#" class="btn-table">PDF Format</a></td></tr>
                                <tr><td>Teaching Service (Auxiliary Members) Regulation 1985</td><td><a href="#" class="btn-table">PDF Format</a></td></tr>
                                <tr><td>Teaching Service (Auxiliary Members) Regulation 1973</td><td><a href="#" class="btn-table">PDF Format</a></td></tr>
                                <tr><td>Teaching Service Regulation 1994</td><td><a href="#" class="btn-table">PDF Format</a></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        `;
    }
};
