/* ============================================================
   VAF — COMMON JS
   Shared header/footer, nav toggle, SVG icons, utilities
   ============================================================ */

/* ---------- SVG Icon Library ---------- */
const ICONS = {
  health: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-4.35-9.5-8.5C1 9.5 2.5 6 6 6c1.8 0 3 1 3 1s1.2-1 3-1c3.5 0 5 3.5 3.5 6.5C19 16.65 12 21 12 21z"/><path d="M8 12h2l1-2 1.5 4 1-2h2.5" fill="none" stroke="#fff" stroke-width="1.2"/></svg>',
  education: '<svg viewBox="0 0 24 24"><path d="M12 3L1 9l11 6 9-4.9V17h2V9L12 3z"/><path d="M5 13v4c0 1.1 3.1 3 7 3s7-1.9 7-3v-4l-7 3.8L5 13z"/></svg>',
  environment: '<svg viewBox="0 0 24 24"><path d="M17 8C8 10 5.9 16.2 5 21h2c.5-2.5 1.5-4.5 3-6 4-.5 7-2.5 8-6-1 .5-2 1-3 1 2-1 3-3 3-5-1.5 1.5-3.5 2-5.5 2.5C13 3 10 4 9 7c-1 3 0 5 0 5s3-3 8-4z"/></svg>',
  development: '<svg viewBox="0 0 24 24"><circle cx="9" cy="7" r="3"/><circle cx="16" cy="9" r="2.5"/><path d="M2 20c0-3.3 3.1-5 7-5s7 1.7 7 5v1H2v-1z"/><path d="M15 15c3 0 6 1.5 6 4.5V21h-4"/></svg>',
  volunteers: '<svg viewBox="0 0 24 24" fill="#0277BD"><circle cx="9" cy="7" r="3"/><circle cx="16" cy="9" r="2.5"/><path d="M2 20c0-3.3 3.1-5 7-5s7 1.7 7 5v1H2z"/><path d="M15 15c3 0 6 1.5 6 4.5V21h-4"/></svg>',
  lives: '<svg viewBox="0 0 24 24" fill="#4C957A"><path d="M12 21s-7-4.35-9.5-8.5C1 9.5 2.5 6 6 6c1.8 0 3 1 3 1s1.2-1 3-1c3.5 0 5 3.5 3.5 6.5C19 16.65 12 21 12 21z"/></svg>',
  campaigns: '<svg viewBox="0 0 24 24" fill="#F08F1E"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4" stroke="#fff" stroke-width="1.5" fill="none"/></svg>',
  partners: '<svg viewBox="0 0 24 24" fill="#0C467B"><path d="M12 4c-1 2-3 3-5 3l1 6 4 4 4-4 1-6c-2 0-4-1-5-3z"/><path d="M8 13l4 4 4-4" stroke="#fff" stroke-width="1.2" fill="none"/></svg>',
  compassion: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-4.35-9.5-8.5C1 9.5 2.5 6 6 6c1.8 0 3 1 3 1s1.2-1 3-1c3.5 0 5 3.5 3.5 6.5C19 16.65 12 21 12 21z"/></svg>',
  collaboration: '<svg viewBox="0 0 24 24"><circle cx="9" cy="7" r="3"/><circle cx="16" cy="9" r="2.5"/><path d="M2 20c0-3.3 3.1-5 7-5s7 1.7 7 5v1H2z"/></svg>',
  integrity: '<svg viewBox="0 0 24 24"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z"/><path d="M9 12l2 2 4-4" stroke="#fff" stroke-width="1.5" fill="none"/></svg>',
  sustainability: '<svg viewBox="0 0 24 24"><path d="M17 8C8 10 5.9 16.2 5 21h2c.5-2.5 1.5-4.5 3-6 4-.5 7-2.5 8-6-1 .5-2 1-3 1 2-1 3-3 3-5-1.5 1.5-3.5 2-5.5 2.5C13 3 10 4 9 7c-1 3 0 5 0 5s3-3 8-4z"/></svg>',
  transformation: '<svg viewBox="0 0 24 24"><path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 16.6 5.7 21l2.3-7-6-4.6h7.6z"/></svg>',
  mission: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="#fff" stroke-width="1.5"/><circle cx="12" cy="12" r="5" fill="none" stroke="#fff" stroke-width="1.5"/><circle cx="12" cy="12" r="1.5"/></svg>',
  vision: '<svg viewBox="0 0 24 24"><path d="M12 5C6 5 2 12 2 12s4 7 10 7 10-7 10-7-4-7-10-7z" fill="none" stroke="#fff" stroke-width="1.5"/><circle cx="12" cy="12" r="3"/></svg>'
};

function icon(name) { return ICONS[name] || ''; }

/* ---------- Header / Footer templates ---------- */
const NAV_LINKS = [
  { href: 'index.html',    label: 'Home' },
  { href: 'about.html',    label: 'About' },
  { href: 'approach.html', label: 'Approach' },
  { href: 'gallery.html',  label: 'Gallery' },
  { href: 'events.html',   label: 'Events' },
  { href: 'donate.html',   label: 'Donate', donate: true },
  { href: 'contact.html',  label: 'Contact' }
];

function renderHeader(current) {
  const links = NAV_LINKS.map(l => {
    const active = l.href === current ? ' active' : '';
    const cls = l.donate ? `nav-donate${active}` : active.trim();
    return `<a href="${l.href}"${cls ? ` class="${cls}"` : ''}>${l.label}</a>`;
  }).join('');

  return `
  <header class="site-header">
    <div class="nav-row container">
      <a href="index.html" class="logo-wrap">
        <img src="images/logo.png" alt="VAF Logo">
        <div class="logo-name">
          <span class="logo-lockup">
            <span class="logo-line logo-line-top">VECTOR</span>
            <span class="logo-line logo-line-middle"><span>For</span><span>Advancement</span><span>Foundation</span></span>
          </span>
          <small>Compassion. Action. Transformation.</small>
        </div>
      </a>
      <nav class="main-nav" id="mainNav">${links}</nav>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle menu"><span></span><span></span><span></span></button>
    </div>
  </header>`;
}

function renderFooter() {
  const links = NAV_LINKS.map(l => `<a href="${l.href}">${l.label}</a>`).join('');
  return `
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-logo">
        <a href="index.html" class="logo-wrap">
          <img src="images/logo.png" alt="VAF" style="width:44px;height:44px;object-fit:contain;">
          <div class="logo-name">Vector for Advancement Foundation<small>VAF</small></div>
        </a>
      </div>
      <div class="footer-links"><h4>Pages</h4>${links}</div>
      <div class="footer-meta">
        <h4>Registered NGO</h4>
        <p>Registration number, 80G/12A details, and bank information will appear here on the live site.</p>
        <p style="margin-top:0.8rem;">&copy; 2026 Vector for Advancement Foundation.</p>
      </div>
    </div>
    <div class="footer-bottom">Compassion &bull; Action &bull; Transformation</div>
  </footer>`;
}

/* ---------- Inject header/footer + init nav ---------- */
function initLayout(currentPage) {
  const headerMount = document.getElementById('header');
  const footerMount = document.getElementById('footer');
  if (headerMount) headerMount.innerHTML = renderHeader(currentPage);
  if (footerMount) footerMount.innerHTML = renderFooter();

  // Nav toggle (must run AFTER header injected)
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => mainNav.classList.toggle('open'));
    mainNav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => mainNav.classList.remove('open'))
    );
  }

}

/* ---------- Data loader helper ---------- */
async function loadJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load ${path}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

/* ---------- Date formatter ---------- */
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

/* ---------- HTML escaper (data may come from a form later) ---------- */
function esc(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ---------- Indian number formatting ---------- */
function formatINR(num) {
  return num.toLocaleString('en-IN');
}
