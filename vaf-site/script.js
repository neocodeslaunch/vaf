// ===========================
// Mobile nav toggle
// ===========================
const navToggle = document.getElementById('navToggle');
const mainNav   = document.getElementById('mainNav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => mainNav.classList.toggle('open'));
  mainNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mainNav.classList.remove('open'));
  });
}

// ===========================
// Contact form (demo)
// In production: submit to Google Form endpoint or backend email service
// Honeypot field provides basic spam protection
// ===========================
const contactForm = document.getElementById('contactForm');
const formStatus  = document.getElementById('formStatus');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const honeypot = contactForm.querySelector('.honeypot');
    if (honeypot && honeypot.value) { contactForm.reset(); return; }
    formStatus.textContent = 'Thank you! This is a demo — on the live site your message would be sent to the VAF team.';
    contactForm.reset();
  });
}
