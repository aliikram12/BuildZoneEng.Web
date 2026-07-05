document.addEventListener('DOMContentLoaded', () => {
  /* ========== GALLERY DATA ========== */
  // 64 images exist in Data/Pictures/ numbered from '1 (1).jpeg' to '1 (64).jpeg'
  const galleryData = [];
  const categories = ['pre-engineered', 'porta-cabins', 'steel-fabrication', 'office-containers'];
  
  for (let i = 1; i <= 64; i++) {
    // Randomly assign a category for demo purposes so filtering works
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    galleryData.push({
      id: i,
      src: `Data/Pictures/1 (${i}).jpeg`,
      category: randomCategory,
      title: `Project ${i}`,
      desc: `High quality ${randomCategory.replace('-', ' ')} solution.`
    });
  }

  /* ========== GALLERY RENDERING & MASONRY ========== */
  const galleryGrid = document.getElementById('gallery-grid');
  
  if (galleryGrid) {
    // Render all images ONCE
    const renderGallery = (data) => {
      galleryGrid.innerHTML = '';
      data.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.classList.add('gallery-item', item.category, 'reveal', 'fade-up');
        itemEl.setAttribute('data-category', item.category);
        itemEl.innerHTML = `
          <div class="gallery-inner">
            <img src="${item.src}" alt="${item.title}" loading="lazy">
            <div class="gallery-overlay">
              <div class="gallery-info">
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
                <button class="btn btn-primary lightbox-trigger" data-src="${item.src}">View Image</button>
              </div>
            </div>
          </div>
        `;
        galleryGrid.appendChild(itemEl);
      });
      
      // Trigger initial reveal animation
      setTimeout(() => {
        const reveals = galleryGrid.querySelectorAll('.reveal');
        reveals.forEach(r => r.classList.add('active'));
      }, 100);

      attachLightboxEvents();
    };

    renderGallery(galleryData);

    /* ========== CATEGORY FILTERING ========== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        const allItems = galleryGrid.querySelectorAll('.gallery-item');
        
        allItems.forEach(item => {
          if (filterValue === 'all') {
            item.style.display = 'block';
            setTimeout(() => item.style.opacity = '1', 50);
          } else {
            if (item.getAttribute('data-category') === filterValue) {
              item.style.display = 'block';
              setTimeout(() => item.style.opacity = '1', 50);
            } else {
              item.style.opacity = '0';
              setTimeout(() => item.style.display = 'none', 300);
            }
          }
        });
      });
    });
  }

  /* ========== LIGHTBOX ========== */
  let lightbox = document.getElementById('lightbox');
  let lightboxImg = document.getElementById('lightbox-img');
  let lightboxClose = document.getElementById('lightbox-close');

  function attachLightboxEvents() {
    const triggers = document.querySelectorAll('.lightbox-trigger');
    
    // Create lightbox if it doesn't exist on this page but we have triggers
    if (triggers.length > 0 && !lightbox) {
      lightbox = document.createElement('div');
      lightbox.id = 'lightbox';
      lightbox.classList.add('lightbox');
      lightbox.innerHTML = `
        <span id="lightbox-close" class="lightbox-close"><i class="fas fa-times"></i></span>
        <div class="lightbox-content">
          <img id="lightbox-img" src="" alt="Enlarged Image">
        </div>
      `;
      document.body.appendChild(lightbox);
      
      lightboxImg = document.getElementById('lightbox-img');
      lightboxClose = document.getElementById('lightbox-close');

      lightboxClose.addEventListener('click', closeLightbox);
      lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) closeLightbox();
      });
    }

    triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const src = trigger.getAttribute('data-src');
        openLightbox(src);
      });
    });
  }

  function openLightbox(src) {
    if(!lightbox) return;
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  function closeLightbox() {
    if(!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});
