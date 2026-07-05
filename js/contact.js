document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic Validation
      let isValid = true;
      const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          showError(input, 'This field is required');
        } else {
          removeError(input);
          
          if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
              isValid = false;
              showError(input, 'Please enter a valid email address');
            }
          }
          
          if (input.name === 'phone') {
             const phoneRegex = /^[0-9+\-\s]{10,15}$/;
             if (!phoneRegex.test(input.value)) {
               isValid = false;
               showError(input, 'Please enter a valid phone number');
             }
          }
        }
      });

      if (isValid) {
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
          // Success State
          contactForm.innerHTML = `
            <div class="success-message reveal fade-up active" style="text-align: center; padding: 3rem 0;">
              <i class="fas fa-check-circle" style="font-size: 4rem; color: var(--secondary); margin-bottom: 1rem;"></i>
              <h3>Message Sent Successfully!</h3>
              <p>Thank you for reaching out. Our team will get back to you shortly.</p>
            </div>
          `;
        }, 1500);
      }
    });

    function showError(input, message) {
      const formGroup = input.parentElement;
      formGroup.classList.add('error');
      
      let errorMsg = formGroup.querySelector('.error-text');
      if (!errorMsg) {
        errorMsg = document.createElement('span');
        errorMsg.classList.add('error-text');
        formGroup.appendChild(errorMsg);
      }
      errorMsg.innerText = message;
    }

    function removeError(input) {
      const formGroup = input.parentElement;
      formGroup.classList.remove('error');
      const errorMsg = formGroup.querySelector('.error-text');
      if (errorMsg) {
        errorMsg.remove();
      }
    }
    
    // Remove error on input change
    const allInputs = contactForm.querySelectorAll('input, textarea');
    allInputs.forEach(input => {
      input.addEventListener('input', () => {
        removeError(input);
      });
    });
  }
});
