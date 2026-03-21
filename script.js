document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.hash);
      if (!target) return;
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    });
  });

  // Hero slider auto-cycle + controls
  const slides = document.querySelectorAll('.hero-slider .slide');
  const prevBtn = document.querySelector('.hero-slider .slide-prev');
  const nextBtn = document.querySelector('.hero-slider .slide-next');
  let currentSlide = 0;
  const totalSlides = slides.length;
  let slideshow = null;

  const goToSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      const inner = slide.querySelector('.slide-inner');
      if (inner) {
        inner.style.opacity = i === index ? '1' : '0.3';
      }
    });
    currentSlide = (index + totalSlides) % totalSlides;
  };

  const nextSlide = () => goToSlide(currentSlide + 1);
  const prevSlideFn = () => goToSlide(currentSlide - 1);

  if (nextBtn && prevBtn && slides.length > 0) {
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlideFn);

    slideshow = setInterval(nextSlide, 6000);

    const slider = document.querySelector('.hero-slider');
    slider.addEventListener('mouseenter', () => clearInterval(slideshow));
    slider.addEventListener('mouseleave', () => slideshow = setInterval(nextSlide, 6000));
  }

  // Scroll reveal animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        if (entry.target.dataset.animate !== 'always') {
          observer.unobserve(entry.target);
        }
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

  // Stichy header shadow on scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 15);
  });
});