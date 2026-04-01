window.GalleryComponent = {
    render: async () => {
        return `
            <div class="subpage-header" style="background: linear-gradient(135deg, rgba(14, 32, 64, 0.95) 0%, rgba(14, 32, 64, 0.8) 100%), url('assets/images/other-tabs-header-banner/banner-bg.png') center/cover; padding: 10rem 2rem 6rem; text-align: center; position: relative; overflow: hidden;">
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at center, var(--primary-glow) 0%, transparent 70%); opacity: 0.3; pointer-events: none;"></div>
                <div class="container" style="max-width: 1200px; margin: 0 auto; position: relative; z-index: 1;">
                    <h1 style="font-size: clamp(2.5rem, 8vw, 4rem); font-weight: 800; margin-bottom: 1.5rem; letter-spacing: -1.5px; line-height: 1.1;">Event Gallery</h1>
                    <div style="width: 80px; height: 4px; background: var(--accent); margin: 0 auto 2rem; border-radius: 2px;"></div>
                    <p style="font-size: 1.25rem; color: var(--text-muted); max-width: 800px; margin: 0 auto; line-height: 1.6;">Capturing the moments that define our educational journey across Papua New Guinea.</p>
                </div>
            </div>

            <section class="section-full">
                <div class="gallery-container" style="padding: 2rem 0;">
                    <!-- Filter Tabs -->
                    <div style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 4rem; flex-wrap: wrap;">
                        <button class="gallery-filter-btn active" style="padding: 0.8rem 2rem; border-radius: 50px; border: 1px solid var(--primary); background: var(--primary); color: #fff; font-weight: 700; box-shadow: 0 10px 20px rgba(59, 165, 224, 0.2);">All Events</button>
                        <button class="gallery-filter-btn" style="padding: 0.8rem 2rem; border-radius: 50px; border: 1px solid var(--glass-border); background: rgba(255, 255, 255, 0.05); color: var(--text-muted); font-weight: 600; backdrop-filter: blur(10px);">Cultural Events</button>
                        <button class="gallery-filter-btn" style="padding: 0.8rem 2rem; border-radius: 50px; border: 1px solid var(--glass-border); background: rgba(255, 255, 255, 0.05); color: var(--text-muted); font-weight: 600; backdrop-filter: blur(10px);">Examinations</button>
                        <button class="gallery-filter-btn" style="padding: 0.8rem 2rem; border-radius: 50px; border: 1px solid var(--glass-border); background: rgba(255, 255, 255, 0.05); color: var(--text-muted); font-weight: 600; backdrop-filter: blur(10px);">Inaugurations</button>
                    </div>

                    <div class="grid-3" style="gap: 2rem;">
                        <!-- Gallery Item 1 -->
                        <div class="gallery-card glass-panel" style="padding: 0; overflow: hidden; border-radius: 20px; group: hover transition: translateY(-10px);">
                            <div style="overflow: hidden; height: 300px; position: relative;">
                                <img src="assets/images/about/Students_promoting_their_cultural_heritage.jpg" alt="Cultural Heritage" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;">
                                <div style="position: absolute; bottom: 0; left: 0; width: 100%; height: 50%; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); display: flex; align-items: flex-end; padding: 1.5rem;">
                                    <span style="color: #fff; font-size: 0.8rem; background: var(--accent); padding: 0.3rem 0.8rem; border-radius: 20px; font-weight: 700; color: #111;">CULTURAL</span>
                                </div>
                            </div>
                            <div style="padding: 1.5rem;">
                                <h4 style="color: #fff; margin-bottom: 0.5rem;">Cultural Heritage Day</h4>
                                <p style="color: var(--text-muted); font-size: 0.9rem; margin: 0;">Students celebrating the diverse cultures of PNG.</p>
                            </div>
                        </div>

                        <!-- Gallery Item 2 -->
                        <div class="gallery-card glass-panel" style="padding: 0; overflow: hidden; border-radius: 20px;">
                            <div style="overflow: hidden; height: 300px; position: relative;">
                                <img src="assets/images/bottom-imgs/Students sitting a national examination.jpg" alt="National Examination" style="width: 100%; height: 100%; object-fit: cover;">
                                <div style="position: absolute; bottom: 0; left: 0; width: 100%; height: 50%; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); display: flex; align-items: flex-end; padding: 1.5rem;">
                                    <span style="color: #fff; font-size: 0.8rem; background: var(--primary); padding: 0.3rem 0.8rem; border-radius: 20px; font-weight: 700;">ACADEMIC</span>
                                </div>
                            </div>
                            <div style="padding: 1.5rem;">
                                <h4 style="color: #fff; margin-bottom: 0.5rem;">National Examinations 2023</h4>
                                <p style="color: var(--text-muted); font-size: 0.9rem; margin: 0;">Grade 12 students focusing on their final papers.</p>
                            </div>
                        </div>

                        <!-- Gallery Item 3 -->
                        <div class="gallery-card glass-panel" style="padding: 0; overflow: hidden; border-radius: 20px;">
                            <div style="overflow: hidden; height: 300px; position: relative;">
                                <img src="assets/images/bottom-imgs/Students in a classroom.jpg" alt="Classroom Interaction" style="width: 100%; height: 100%; object-fit: cover;">
                                <div style="position: absolute; bottom: 0; left: 0; width: 100%; height: 50%; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); display: flex; align-items: flex-end; padding: 1.5rem;">
                                    <span style="color: #fff; font-size: 0.8rem; background: #2ecc71; padding: 0.3rem 0.8rem; border-radius: 20px; font-weight: 700;">LEARNING</span>
                                </div>
                            </div>
                            <div style="padding: 1.5rem;">
                                <h4 style="color: #fff; margin-bottom: 0.5rem;">Digital Classroom Initiative</h4>
                                <p style="color: var(--text-muted); font-size: 0.9rem; margin: 0;">Modern learning environments in urban centers.</p>
                            </div>
                        </div>

                        <!-- Gallery Item 4 -->
                        <div class="gallery-card glass-panel" style="padding: 0; overflow: hidden; border-radius: 20px;">
                            <div style="overflow: hidden; height: 300px; position: relative;">
                                <img src="assets/images/bottom-imgs/Teacher.jpg" alt="Teaching" style="width: 100%; height: 100%; object-fit: cover;">
                                <div style="position: absolute; bottom: 0; left: 0; width: 100%; height: 50%; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); display: flex; align-items: flex-end; padding: 1.5rem;">
                                    <span style="color: #fff; font-size: 0.8rem; background: #9b59b6; padding: 0.3rem 0.8rem; border-radius: 20px; font-weight: 700;">LEADERSHIP</span>
                                </div>
                            </div>
                            <div style="padding: 1.5rem;">
                                <h4 style="color: #fff; margin-bottom: 0.5rem;">Teacher's Professional Development</h4>
                                <p style="color: var(--text-muted); font-size: 0.9rem; margin: 0;">Empowering educators to deliver the SBC curriculum.</p>
                            </div>
                        </div>

                        <!-- Gallery Item 5 -->
                        <div class="gallery-card glass-panel" style="padding: 0; overflow: hidden; border-radius: 20px;">
                            <div style="overflow: hidden; height: 300px; position: relative;">
                                <img src="assets/images/elementory-imgs/elem-img.png" alt="Elementary" style="width: 100%; height: 100%; object-fit: cover;">
                                <div style="position: absolute; bottom: 0; left: 0; width: 100%; height: 50%; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); display: flex; align-items: flex-end; padding: 1.5rem;">
                                    <span style="color: #fff; font-size: 0.8rem; background: #e67e22; padding: 0.3rem 0.8rem; border-radius: 20px; font-weight: 700;">EARLY YEARS</span>
                                </div>
                            </div>
                            <div style="padding: 1.5rem;">
                                <h4 style="color: #fff; margin-bottom: 0.5rem;">Elementary Prep Graduation</h4>
                                <p style="color: var(--text-muted); font-size: 0.9rem; margin: 0;">The first milestone in the formal education system.</p>
                            </div>
                        </div>

                        <!-- Gallery Item 6 -->
                        <div class="gallery-card glass-panel" style="padding: 0; overflow: hidden; border-radius: 20px;">
                            <div style="overflow: hidden; height: 300px; position: relative;">
                                <img src="assets/images/primary-imgs/prim-img.png" alt="Primary" style="width: 100%; height: 100%; object-fit: cover;">
                                <div style="position: absolute; bottom: 0; left: 0; width: 100%; height: 50%; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); display: flex; align-items: flex-end; padding: 1.5rem;">
                                    <span style="color: #fff; font-size: 0.8rem; background: var(--primary); padding: 0.3rem 0.8rem; border-radius: 20px; font-weight: 700;">PRIMARY</span>
                                </div>
                            </div>
                            <div style="padding: 1.5rem;">
                                <h4 style="color: #fff; margin-bottom: 0.5rem;">Junior Primary Integration</h4>
                                <p style="color: var(--text-muted) size: 0.9rem; margin: 0;">Transitioning from community-based learning to SBC.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
};
