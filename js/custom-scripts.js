// Custom JavaScript to replace Webflow functionality
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const hamburger = document.querySelector('.navbar_hamburger');
  const navLinks = document.querySelector('.navbar_links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }
  
  // Button hover effects
  const buttons = document.querySelectorAll('.button, .button-solid, .newsletter_submit-btn');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      const gradient = this.querySelector('.button_gradient');
      if (gradient) {
        gradient.style.opacity = '1';
      }
    });
    
    button.addEventListener('mouseleave', function() {
      const gradient = this.querySelector('.button_gradient');
      if (gradient) {
        gradient.style.opacity = '0';
      }
    });
  });
  
  // FAQ accordion functionality
  const faqItems = document.querySelectorAll('.faq_question-wrap');
  faqItems.forEach(item => {
    item.addEventListener('click', function() {
      this.classList.toggle('active');
      const answer = this.nextElementSibling;
      answer.classList.toggle('active');
    });
  });
  
  // Form submission handling for contact form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      
      // Show success message (in a real implementation, you would send this to a server)
      const successMessage = document.querySelector('.success-message');
      const errorMessage = document.querySelector('.error-message');
      
      // Hide any existing messages
      if (successMessage) successMessage.style.display = 'none';
      if (errorMessage) errorMessage.style.display = 'none';
      
      // Simulate form submission
      setTimeout(() => {
        // Randomly show success or error for demonstration
        if (Math.random() > 0.5) {
          if (successMessage) {
            successMessage.style.display = 'block';
            contactForm.reset();
          }
        } else {
          if (errorMessage) {
            errorMessage.style.display = 'block';
          }
        }
      }, 1000);
    });
  }
  
  // Newsletter form submission handling
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(newsletterForm);
      const email = formData.get('email');
      
      // Show success message (in a real implementation, you would send this to a server)
      const successMessage = document.querySelector('.success-message');
      const errorMessage = document.querySelector('.error-message');
      
      // Hide any existing messages
      if (successMessage) successMessage.style.display = 'none';
      if (errorMessage) errorMessage.style.display = 'none';
      
      // Simulate form submission
      setTimeout(() => {
        // Randomly show success or error for demonstration
        if (Math.random() > 0.5) {
          if (successMessage) {
            successMessage.style.display = 'block';
            newsletterForm.reset();
          }
        } else {
          if (errorMessage) {
            errorMessage.style.display = 'block';
          }
        }
      }, 1000);
    });
  }
  
  // Video play functionality
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    // Try to play the video
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise.then(() => {
        // Video played successfully
        console.log('Video playing');
      }).catch(error => {
        // Autoplay was prevented, handle accordingly
        console.log('Autoplay prevented:', error);
      });
    }
  });
  
  // Work item hover effects
  const workItems = document.querySelectorAll('.work-list_block');
  workItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      const mainImage = this.querySelector('.work-list_image-main');
      if (mainImage) {
        mainImage.style.transform = 'scale(1.05)';
      }
      
      const hoverPill = this.querySelector('.hover_pill');
      if (hoverPill) {
        hoverPill.style.opacity = '1';
      }
    });
    
    item.addEventListener('mouseleave', function() {
      const mainImage = this.querySelector('.work-list_image-main');
      if (mainImage) {
        mainImage.style.transform = 'scale(1)';
      }
      
      const hoverPill = this.querySelector('.hover_pill');
      if (hoverPill) {
        hoverPill.style.opacity = '0';
      }
    });
  });
  
  // Blog list item hover effects
  const blogItems = document.querySelectorAll('.blog-list_block');
  blogItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Navbar link active state
  const navLinksList = document.querySelectorAll('.navbar_link');
  const currentPage = window.location.pathname;
  
  navLinksList.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (href === '/' && currentPage === '/index.html')) {
      link.classList.add('w--current');
    } else {
      link.classList.remove('w--current');
    }
  });
  
  // Footer link active state
  const footerLinks = document.querySelectorAll('.footer_link');
  footerLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (href === '/' && currentPage === '/index.html')) {
      link.classList.add('w--current');
    } else {
      link.classList.remove('w--current');
    }
  });
});

// Animation functions for scroll effects
function initScrollAnimations() {
  // Check if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    // Create observer for fade-in animations
    const fadeInObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
          fadeInObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
      fadeInObserver.observe(el);
    });
  }
}

// Initialize scroll animations when page loads
window.addEventListener('load', initScrollAnimations);

// Custom animation for header text
function animateHeaderText() {
  const headers = document.querySelectorAll('.home-header_heading');
  headers.forEach((header, index) => {
    // Add delay for each header
    setTimeout(() => {
      header.style.opacity = '1';
      header.style.transform = 'translateY(0)';
    }, index * 200);
  });
}

// Call header animation on page load
window.addEventListener('load', animateHeaderText);

// Parallax effect for header images
function initParallax() {
  window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.home-header_img-wrap');
    
    parallaxElements.forEach((el, index) => {
      const speed = 0.5;
      const yPos = -(scrollPosition * speed * (index / 10));
      el.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// Initialize parallax effect
window.addEventListener('load', initParallax);