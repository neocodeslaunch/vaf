/* ============================================================
   VAF — PAGE INITIALISERS
   Each page calls the matching init function.
   Also holds carousel, donation slider, contact form, FAQ logic.
   ============================================================ */

/* ================= HOME ================= */
async function initHome() {
  initLayout('index.html');
  const site = await loadJSON('data/site.json');
  const programs = await loadJSON('data/programs.json');
  const events = await loadJSON('data/events.json');

  if (site) {
    setHTML('heroStats', renderHeroStats(site.stats));
    setHTML('impactStats', renderStats(site.stats));
    setHTML('valuesList', renderValues(site.values));
    setHTML('partnersTrack', renderPartners(site.partners));
    setHTML('featuredCampaign', renderFeaturedCampaign(site.featuredCampaign));
  }
  if (programs) setHTML('programCards', renderProgramCards(programs, 'programs.html'));
  if (events) setHTML('newsRows', renderNewsRows(events, 3));

  initCarousel();
}

/* ================= ABOUT ================= */
async function initAbout() {
  initLayout('about.html');
  const site = await loadJSON('data/site.json');
  if (site) setHTML('teamGrid', renderTeam(site.team));
}

/* ================= PROGRAMS ================= */
async function initPrograms() {
  initLayout('programs.html');
  const programs = await loadJSON('data/programs.json');
  if (programs) setHTML('programDetails', renderProgramDetails(programs));
}

/* ================= GALLERY ================= */
async function initGallery() {
  initLayout('gallery.html');
  const gallery = await loadJSON('data/gallery.json');
  if (gallery) setHTML('galleryGrid', renderGallery(gallery));
}

/* ================= UPDATES ================= */
async function initUpdates() {
  initLayout('updates.html');
  const events = await loadJSON('data/events.json');
  if (events) setHTML('newsGrid', renderNewsCards(events));
}

/* ================= DONATE ================= */
async function initDonate() {
  initLayout('donate.html');
  const site = await loadJSON('data/site.json');
  if (site) {
    initDonationSlider(site.impactTiers, site.org.upiId, site.org.name);
  }
  initFAQ();
}

/* ================= CONTACT ================= */
async function initContact() {
  initLayout('contact.html');
  initContactForm();
}

/* ---------- Helper: set innerHTML if element exists ---------- */
function setHTML(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

/* ============================================================
   PARTNER CAROUSEL — pixel-based (no percentage widths)
   ============================================================ */
function initCarousel() {
  const track = document.getElementById('partnersTrack');
  const prev  = document.getElementById('carPrev');
  const next  = document.getElementById('carNext');
  const dotsWrap = document.getElementById('carDots');
  if (!track) return;

  const GAP = 20; // must match CSS gap on .carousel-track
  let index = 0;
  let timer;

  function getPerView() {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  function getWrapWidth() {
    // Width of the visible carousel area (inside the padding: 0 48px)
    const wrap = track.parentElement;
    return wrap ? wrap.getBoundingClientRect().width : window.innerWidth - 96;
  }

  function setCardWidths() {
    const perView = getPerView();
    const wrapW = getWrapWidth();
    const cardW = Math.floor((wrapW - GAP * (perView - 1)) / perView);
    [...track.children].forEach(card => {
      card.style.width = cardW + 'px';
      card.style.flexShrink = '0';
    });
    return { perView, cardW };
  }

  function maxIndex(perView) {
    return Math.max(0, track.children.length - perView);
  }

  function update() {
    const { perView, cardW } = setCardWidths();
    const step = cardW + GAP;
    const max  = maxIndex(perView);
    if (index > max) index = max;
    track.style.transform = `translateX(-${index * step}px)`;
    if (dotsWrap) {
      [...dotsWrap.children].forEach((d, i) => d.classList.toggle('active', i === index));
    }
  }

  function buildDots() {
    if (!dotsWrap) return;
    const { perView } = setCardWidths();
    const max = maxIndex(perView);
    dotsWrap.innerHTML = '';
    for (let i = 0; i <= max; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.addEventListener('click', () => { index = i; update(); resetTimer(); });
      dotsWrap.appendChild(dot);
    }
  }

  function go(dir) {
    const { perView } = setCardWidths();
    index += dir;
    if (index < 0) index = maxIndex(perView);
    if (index > maxIndex(perView)) index = 0;
    update();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => go(1), 4000);
  }

  if (prev) prev.addEventListener('click', () => { go(-1); resetTimer(); });
  if (next) next.addEventListener('click', () => { go(1);  resetTimer(); });

  const carouselEl = track.closest('.carousel');
  if (carouselEl) {
    carouselEl.addEventListener('mouseenter', () => clearInterval(timer));
    carouselEl.addEventListener('mouseleave', resetTimer);
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { index = 0; buildDots(); update(); }, 150);
  });

  buildDots();
  update();
  resetTimer();
}

/* ============================================================
   DONATION IMPACT SLIDER
   ============================================================ */
function initDonationSlider(tiers, upiId, orgName) {
  const slider = document.getElementById('donationSlider');
  const amountEl = document.getElementById('amountDisplay');
  const impactCard = document.getElementById('impactCard');
  const upiBtn = document.getElementById('upiBtn');
  const scaleMin = document.getElementById('scaleMin');
  const scaleMax = document.getElementById('scaleMax');
  const customInput = document.getElementById('customAmount');
  const customApply = document.getElementById('customApply');
  if (!slider) return;

  slider.min = 0;
  slider.max = tiers.length - 1;
  slider.step = 1;
  slider.value = 0;

  if (scaleMin) scaleMin.textContent = '₹' + formatINR(tiers[0].amount);
  if (scaleMax) scaleMax.textContent = '₹' + formatINR(tiers[tiers.length - 1].amount);

  function buildUpiLink(amount) {
    const params = new URLSearchParams({
      pa: upiId,
      pn: orgName,
      am: amount,
      cu: 'INR',
      tn: 'VAF Donation'
    });
    return 'upi://pay?' + params.toString();
  }

  function apply(tier) {
    if (amountEl) amountEl.textContent = '₹' + formatINR(tier.amount);
    if (impactCard) {
      impactCard.style.background = tier.color;
      impactCard.innerHTML = `
        <div class="impact-icon">${tier.icon}</div>
        <div class="impact-title">${esc(tier.title)}</div>
        <div class="impact-desc">${esc(tier.desc)}</div>`;
    }
    if (upiBtn) {
      upiBtn.href = buildUpiLink(tier.amount);
      upiBtn.textContent = `Donate ₹${formatINR(tier.amount)} via UPI →`;
    }
  }

  slider.addEventListener('input', () => apply(tiers[+slider.value]));

  // Custom amount
  if (customApply && customInput) {
    customApply.addEventListener('click', () => {
      const val = parseInt(customInput.value, 10);
      if (!val || val < 1) return;
      if (amountEl) amountEl.textContent = '₹' + formatINR(val);
      if (impactCard) {
        impactCard.style.background = 'var(--navy)';
        impactCard.innerHTML = `
          <div class="impact-icon">🙏</div>
          <div class="impact-title">Thank You</div>
          <div class="impact-desc">Your generous gift of ₹${formatINR(val)} supports all of VAF's programs.</div>`;
      }
      if (upiBtn) {
        upiBtn.href = buildUpiLink(val);
        upiBtn.textContent = `Donate ₹${formatINR(val)} via UPI →`;
      }
    });
  }

  apply(tiers[0]); // initial
}

/* ============================================================
   CONTACT FORM
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const honeypot = form.querySelector('.honeypot');
    if (honeypot && honeypot.value) { form.reset(); return; }
    status.textContent = 'Thank you! This is a demo — on the live site your message would be sent to the VAF team.';
    form.reset();
  });
}

/* ============================================================
   FAQ ACCORDION
   ============================================================ */
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}
