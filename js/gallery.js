document.addEventListener('DOMContentLoaded', () => {
  /* ========== GALLERY DATA ========== */
  const galleryData = [];
  const categories = ['pre-engineered', 'porta-cabins', 'steel-fabrication', 'office-containers'];
  
  for (let i = 1; i <= 64; i++) {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    galleryData.push({
      id: i,
      src: `Data/Pictures/1 (${i}).jpeg`,
      category: randomCategory,
      title: `Project ${i}`,
      desc: `High quality ${randomCategory.replace('-', ' ')} solution.`
    });
  }

  /* ========== STATE & ELEMENTS ========== */
  const galleryGrid = document.getElementById('gallery-grid');
  let currentFilteredData = [...galleryData];
  let lightboxIndex = 0;

  if (galleryGrid) {
    /* ========== RENDER GALLERY ========== */
    const renderGallery = (data) => {
      galleryGrid.innerHTML = '';
      data.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.classList.add('gallery-item', 'fade-in-item');
        itemEl.setAttribute('data-category', item.category);
        itemEl.setAttribute('data-id', item.id);
        itemEl.setAttribute('data-index', index);
        
        itemEl.innerHTML = `
          <div class="gallery-inner">
            <img src="${item.src}" alt="${item.title}" loading="lazy">
            <div class="gallery-overlay">
              <div class="gallery-info">
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
                <button class="btn btn-primary lightbox-trigger" data-index="${index}">View Image</button>
              </div>
            </div>
          </div>
        `;
        galleryGrid.appendChild(itemEl);
      });

      // Trigger animation slightly after DOM insertion
      setTimeout(() => {
        const items = galleryGrid.querySelectorAll('.gallery-item');
        items.forEach(el => el.classList.add('show'));
      }, 50);

      attachLightboxEvents();
    };

    renderGallery(galleryData);

    /* ========== CATEGORY FILTERING ========== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Active State
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        const allItems = galleryGrid.querySelectorAll('.gallery-item');

        // Smooth Filtering Logic
        allItems.forEach(item => {
          item.classList.remove('show');
        });

        setTimeout(() => {
          if (filterValue === 'all') {
            currentFilteredData = [...galleryData];
          } else {
            currentFilteredData = galleryData.filter(d => d.category === filterValue);
          }
          
          // Re-render only filtered to maintain grid integrity and indices
          renderGallery(currentFilteredData);
        }, 300); // Wait for fade out
      });
    });
  }

  /* ========== PREMIUM LIGHTBOX ========== */
  let lightbox = document.getElementById('lightbox');
  let lightboxImg, lightboxClose, lightboxPrev, lightboxNext;

  function initLightbox() {
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.id = 'lightbox';
      lightbox.classList.add('lightbox');
      lightbox.innerHTML = `
        <div class="lightbox-overlay"></div>
        <div class="lightbox-toolbar">
          <span id="lightbox-close" class="lightbox-close"><i class="fas fa-times"></i></span>
        </div>
        <div class="lightbox-nav">
          <span id="lightbox-prev" class="lightbox-btn"><i class="fas fa-chevron-left"></i></span>
          <span id="lightbox-next" class="lightbox-btn"><i class="fas fa-chevron-right"></i></span>
        </div>
        <div class="lightbox-content">
          <img id="lightbox-img" src="" alt="Enlarged Image">
        </div>
      `;
      document.body.appendChild(lightbox);
      
      lightboxImg = document.getElementById('lightbox-img');
      lightboxClose = document.getElementById('lightbox-close');
      lightboxPrev = document.getElementById('lightbox-prev');
      lightboxNext = document.getElementById('lightbox-next');
      const overlay = lightbox.querySelector('.lightbox-overlay');

      lightboxClose.addEventListener('click', closeLightbox);
      overlay.addEventListener('click', closeLightbox);
      lightboxPrev.addEventListener('click', showPrevImage);
      lightboxNext.addEventListener('click', showNextImage);

      // Keyboard Navigation
      document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
      });

      // Touch Swipe Support
      let touchStartX = 0;
      let touchEndX = 0;

      lightbox.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
      });

      lightbox.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      });

      function handleSwipe() {
        if (!lightbox.classList.contains('active')) return;
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) showNextImage(); // Swipe left
        if (touchEndX > touchStartX + swipeThreshold) showPrevImage(); // Swipe right
      }
    }
  }

  function attachLightboxEvents() {
    const triggers = document.querySelectorAll('.lightbox-trigger');
    if (triggers.length > 0) initLightbox();

    triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const index = parseInt(trigger.getAttribute('data-index'));
        openLightbox(index);
      });
    });
  }

  function openLightbox(index) {
    if (!lightbox) return;
    lightboxIndex = index;
    updateLightboxImage();
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
    setTimeout(() => {
      lightboxImg.src = '';
      lightboxImg.classList.remove('zoom-in-active');
    }, 400); // wait for fade out
  }

  function showPrevImage() {
    if (lightboxIndex > 0) {
      lightboxIndex--;
    } else {
      lightboxIndex = currentFilteredData.length - 1; // loop around
    }
    updateLightboxImage();
  }

  function showNextImage() {
    if (lightboxIndex < currentFilteredData.length - 1) {
      lightboxIndex++;
    } else {
      lightboxIndex = 0; // loop around
    }
    updateLightboxImage();
  }

  function updateLightboxImage() {
    lightboxImg.classList.remove('zoom-in-active');
    // slight delay for smooth image transition
    setTimeout(() => {
      lightboxImg.src = currentFilteredData[lightboxIndex].src;
      lightboxImg.classList.add('zoom-in-active');
    }, 150);
  }
});
