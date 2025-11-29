// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('show'));
}

// Smooth scroll for same-page anchors
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      navLinks && navLinks.classList.remove('show');
    }
  });
});

// Simple intersection fade-in
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.card, .fish-card, .menu-item, .form, .hero-content, .text-block, .image-block').forEach(el => {
  el.classList.add('pre-in');
  observer.observe(el);
});

// minimal CSS hook
const style = document.createElement('style');
style.textContent = `
.pre-in { opacity: 0; transform: translateY(16px); transition: all 0.6s ease; }
.in-view { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(style);
