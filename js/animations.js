document.addEventListener('DOMContentLoaded', () => {
  /* ========== SCROLL REVEAL ANIMATIONS ========== */
  const reveals = document.querySelectorAll('.reveal');

  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });

  /* ========== ANIMATED COUNTERS ========== */
  const counters = document.querySelectorAll('.counter');
  
  const counterOptions = {
    threshold: 0.5
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const endValue = parseInt(target.getAttribute('data-target'));
        const duration = 2000; // ms
        const increment = endValue / (duration / 16); // 60fps
        let currentValue = 0;

        const updateCounter = () => {
          currentValue += increment;
          if (currentValue < endValue) {
            target.innerText = Math.ceil(currentValue);
            requestAnimationFrame(updateCounter);
          } else {
            target.innerText = endValue;
          }
        };
        
        updateCounter();
        observer.unobserve(target);
      }
    });
  }, counterOptions);

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });

  /* ========== PARALLAX EFFECT ========== */
  const parallaxElements = document.querySelectorAll('.parallax');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    parallaxElements.forEach(el => {
      const speed = el.getAttribute('data-speed') || 0.5;
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });
});
