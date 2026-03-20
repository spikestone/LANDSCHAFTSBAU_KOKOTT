document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      window.scrollTo({ top: document.querySelector(this.hash).offsetTop - 80, behavior: 'smooth' });
    });
  });
});