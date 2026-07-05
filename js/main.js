document.addEventListener('DOMContentLoaded', () => {
  /* ========== PAGE LOADER ========== */
  const loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 500); // Small delay to let animations start smoothly
  }

  /* ========== STICKY HEADER ========== */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.add('scrolled'); // Force scrolled if we always want a background, or remove for transparent
      // For this design, let's make it transparent at top, solid on scroll
      if (window.scrollY < 10) {
          header.classList.remove('scrolled');
      }
    }
  });
  // Trigger once on load in case we're already scrolled
  if (window.scrollY > 50) header.classList.add('scrolled');

  /* ========== MOBILE MENU TOGGLE ========== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    });
  }

  /* ========== BACK TO TOP BUTTON ========== */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ========== BUTTON RIPPLE EFFECT ========== */
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      let x = e.clientX - e.target.getBoundingClientRect().left;
      let y = e.clientY - e.target.getBoundingClientRect().top;
      
      let ripples = document.createElement('span');
      ripples.classList.add('ripple');
      ripples.style.left = x + 'px';
      ripples.style.top = y + 'px';
      this.appendChild(ripples);
      
      setTimeout(() => {
        ripples.remove();
      }, 600);
    });
  });

  /* ========== FAQ ACCORDION ========== */
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const icon = question.querySelector('i');
      
      // Close all other open answers
      faqQuestions.forEach(q => {
        if (q !== question) {
          q.classList.remove('active');
          q.nextElementSibling.style.maxHeight = null;
          const otherIcon = q.querySelector('i');
          if (otherIcon) {
            otherIcon.classList.remove('fa-minus');
            otherIcon.classList.add('fa-chevron-down');
          }
        }
      });
      
      // Toggle current answer
      question.classList.toggle('active');
      
      if (question.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + "px";
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-minus');
      } else {
        answer.style.maxHeight = null;
        icon.classList.remove('fa-minus');
        icon.classList.add('fa-chevron-down');
      }
    });
  });

  /* ========== DYNAMIC COPYRIGHT YEAR ========== */
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
