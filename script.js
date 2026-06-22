/* ============================================================
   FootTrap Soccer Consulting — script.js
   ============================================================ */

// ---------- Current year in footer ----------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------- Mobile nav toggle ----------
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.getElementById('mobileMenu');

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    navToggle.textContent = isOpen ? '\u2715' : '\u2630'; // ✕ or ☰
  });

  // Close menu when a mobile link is clicked
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.textContent = '\u2630';
    });
  });
}

// ---------- Close mobile menu on outside click ----------
document.addEventListener('click', (e) => {
  if (
    mobileMenu &&
    mobileMenu.classList.contains('open') &&
    !mobileMenu.contains(e.target) &&
    !navToggle.contains(e.target)
  ) {
    mobileMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.textContent = '\u2630';
  }
});

// ---------- Smooth scroll offset for fixed header ----------
// Adjusts anchor scroll position so fixed header doesn't cover content
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const headerHeight = document.querySelector('header').offsetHeight;
    const targetPos = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
    window.scrollTo({ top: targetPos, behavior: 'smooth' });
  });
});

// ---------- Active nav highlight on scroll ----------
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-links li a, .mobile-link');

const observerOptions = {
  root: null,
  rootMargin: '-40% 0px -55% 0px',
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle(
          'nav-active',
          link.getAttribute('href') === `#${id}`
        );
      });
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// ---------- Placeholder reminder in console ----------
console.log(
  '%c[FootTrap] Remember to replace all [PLACEHOLDER] values before going live!',
  'color: #C8542C; font-weight: bold; font-size: 14px;'
);
