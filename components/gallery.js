window.GalleryComponent = {
    render: async () => {
        // Mock Gallery Data structure with multiple images per category
        const albums = [
            {
                id: 'cultural',
                title: 'Cultural Heritage Day',
                description: 'Celebrating the vibrant diversity of Papua New Guinea\'s traditional cultures and customs.',
                cover: 'assets/images/about/Students_promoting_their_cultural_heritage.jpg',
                tag: 'CULTURAL',
                tagColor: 'var(--accent)',
                images: [
                    'assets/images/about/Students_promoting_their_cultural_heritage.jpg',
                    'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800'
                ]
            },
            {
                id: 'academic',
                title: 'National Examinations 2023',
                description: 'Moments from the Grade 10 and 12 national examinations across various provinces.',
                cover: 'assets/images/bottom-imgs/Students sitting a national examination.jpg',
                tag: 'ACADEMIC',
                tagColor: 'var(--primary)',
                images: [
                    'assets/images/bottom-imgs/Students sitting a national examination.jpg',
                    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800'
                ]
            },
            {
                id: 'learning',
                title: 'Digital Classroom Initiative',
                description: 'Modernizing learning through technology integration in Primary and Secondary schools.',
                cover: 'assets/images/bottom-imgs/Students in a classroom.jpg',
                tag: 'LEARNING',
                tagColor: '#2ecc71',
                images: [
                    'assets/images/bottom-imgs/Students in a classroom.jpg',
                    'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800'
                ]
            },
            {
                id: 'leadership',
                title: 'Teacher\'s Professional Development',
                description: 'Training sessions for educators to master the Standard Based Curriculum (SBC).',
                cover: 'assets/images/bottom-imgs/Teacher.jpg',
                tag: 'LEADERSHIP',
                tagColor: '#9b59b6',
                images: [
                    'assets/images/bottom-imgs/Teacher.jpg',
                    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1454165833069-111d81790b39?auto=format&fit=crop&q=80&w=800'
                ]
            }
        ];

        // Store data globally for afterRender access
        window._galleryAlbums = albums;

        return `
            <div class="subpage-header" style="background: linear-gradient(135deg, rgba(14, 32, 64, 0.95) 0%, rgba(14, 32, 64, 0.8) 100%), url('assets/images/other-tabs-header-banner/banner-bg.png') center/cover; padding: 10rem 2rem 6rem; text-align: center; position: relative; overflow: hidden;">
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at center, var(--primary-glow) 0%, transparent 70%); opacity: 0.3; pointer-events: none;"></div>
                <div class="container" style="max-width: 1200px; margin: 0 auto; position: relative; z-index: 1;">
                    <h1 style="font-size: clamp(2.5rem, 8vw, 4rem); font-weight: 800; margin-bottom: 1.5rem; letter-spacing: -1.5px; line-height: 1.1;">Event Gallery</h1>
                    <div style="width: 80px; height: 4px; background: var(--accent); margin: 0 auto 2rem; border-radius: 2px;"></div>
                    <p style="font-size: 1.25rem; color: var(--text-muted); max-width: 800px; margin: 0 auto; line-height: 1.6;">Explore our categorized events and educational achievements across the nation.</p>
                </div>
            </div>

            <section class="section-full">
                <div class="gallery-container" style="padding: 2rem 0;">
                    <div class="grid-3" style="gap: 2rem;">
                        ${albums.map((album, index) => `
                            <!-- Category Card ${index + 1} -->
                            <div class="gallery-card glass-panel" data-album-id="${album.id}" style="padding: 0; overflow: hidden; border-radius: 20px; cursor: pointer;">
                                <div style="overflow: hidden; height: 300px; position: relative;">
                                    <img src="${album.cover}" alt="${album.title}" style="width: 100%; height: 100%; object-fit: cover;">
                                    <div style="position: absolute; top: 1.5rem; left: 1.5rem;">
                                        <span style="color: #fff; font-size: 0.8rem; background: ${album.tagColor}; padding: 0.3rem 0.8rem; border-radius: 20px; font-weight: 700; ${album.tagColor === 'var(--accent)' ? 'color: #111;' : ''}">${album.tag}</span>
                                    </div>
                                    <div style="position: absolute; bottom: 0; left: 0; width: 100%; height: 60%; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); display: flex; align-items: flex-end; padding: 1.5rem;">
                                        <div style="color: #fff; font-size: 0.9rem; font-weight: 600;">View Album (${album.images.length} photos)</div>
                                    </div>
                                </div>
                                <div style="padding: 1.5rem;">
                                    <h4 style="color: #fff; margin-bottom: 0.5rem; font-size: 1.3rem;">${album.title}</h4>
                                    <p style="color: var(--text-muted); font-size: 0.95rem; margin: 0; line-height: 1.5;">${album.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    },

    afterRender: () => {
        const modal = document.getElementById('gallery-modal');
        const modalGrid = document.getElementById('gallery-modal-grid');
        const albumTitle = document.getElementById('gallery-album-title');
        const albumDesc = document.getElementById('gallery-album-desc');
        
        const detailModal = document.getElementById('detail-modal');
        const detailImg = document.getElementById('detail-modal-img');

        const categoryCards = document.querySelectorAll('.gallery-card');

        categoryCards.forEach(card => {
            card.addEventListener('click', function() {
                const albumId = this.getAttribute('data-album-id');
                const album = window._galleryAlbums.find(a => a.id === albumId);
                
                if (album) {
                    // Setup Album View
                    albumTitle.innerText = album.title;
                    albumDesc.innerText = album.description;
                    
                    // Inject Images
                    modalGrid.innerHTML = album.images.map(imgSrc => `
                        <div class="modal-img-card">
                            <img src="${imgSrc}" alt="Event Photo" style="width: 100%; height: 200px; object-fit: cover; display: block;">
                        </div>
                    `).join('');

                    modal.style.display = "block";
                    document.body.style.overflow = "hidden"; // Prevent background scroll

                    // Add click listeners for individual images in the album
                    const imgCards = modalGrid.querySelectorAll('.modal-img-card');
                    imgCards.forEach(imgCard => {
                        imgCard.addEventListener('click', (e) => {
                            e.stopPropagation();
                            const clickedImg = imgCard.querySelector('img');
                            detailImg.src = clickedImg.src;
                            detailModal.style.display = "block";
                        });
                    });
                }
            });
        });

        // Close Album Modal
        const closeBtn = document.getElementById('gallery-modal-close');
        if(closeBtn) {
            closeBtn.onclick = () => {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        }

        // Close Detail Modal
        const detailClose = document.getElementById('detail-modal-close');
        if(detailClose) {
            detailClose.onclick = () => {
                detailModal.style.display = "none";
            }
        }

        // Click outside to close
        modal.onclick = (e) => {
            if (e.target === modal || e.target.classList.contains('gallery-modal-inner')) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        }

        detailModal.onclick = (e) => {
            if (e.target === detailModal) {
                detailModal.style.display = "none";
            }
        }
    }
};
