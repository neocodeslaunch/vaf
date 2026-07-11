/* ============================================================
   VAF — RENDER JS
   Template functions that build page sections from JSON data.
   Edit the JSON files in /data — structure builds automatically.
   ============================================================ */

/* ---------- Program cards (home teaser + used on programs) ---------- */
function renderProgramCards(programs, linkTarget) {
  return programs.map(p => `
    <article class="pcard" style="border-top-color:${p.color}">
      <div class="pcard-icon" style="background:${p.color}">${icon(p.icon)}</div>
      <h3>${esc(p.name)}</h3>
      <p>${esc(p.short)}</p>
      ${linkTarget ? `<a href="${linkTarget}" class="card-link">Learn More &rarr;</a>` : ''}
    </article>`).join('');
}

/* ---------- Program detail blocks (programs page) ---------- */
function renderProgramDetails(programs) {
  return programs.map((p, i) => {
    const rev = i % 2 === 1 ? ' rev' : '';
    const altSection = i % 2 === 1 ? ' section-alt' : '';
    const points = p.points.map(pt => `<li>${esc(pt)}</li>`).join('');
    return `
    <section class="section${altSection}">
      <div class="container prog-detail${rev}">
        <div class="prog-media"><img src="${p.image}" alt="${esc(p.name)}" loading="lazy"></div>
        <div>
          <span class="eyebrow">Pillar ${i + 1}</span>
          <h2>${esc(p.name)}</h2>
          <p>${esc(p.description)}</p>
          <ul class="prog-list">${points}</ul>
        </div>
      </div>
    </section>`;
  }).join('');
}

/* ---------- Impact stats grid ---------- */
function renderStats(stats) {
  return stats.map(s => `
    <div class="stat-box">
      <div class="icon">${icon(s.icon)}</div>
      <div class="num" style="color:${s.color}">${esc(s.number)}</div>
      <div class="lbl">${esc(s.label)}</div>
    </div>`).join('');
}

/* ---------- Hero stat cards ---------- */
function renderHeroStats(stats) {
  const colors = ['#F08F1E', '#4C957A', '#4FC3F7', '#ffffff'];
  return stats.map((s, i) => `
    <div class="hero-stat" style="border-left-color:${colors[i % colors.length]}">
      <div class="num">${esc(s.number)}</div>
      <div class="lbl">${esc(s.label)}</div>
    </div>`).join('');
}

/* ---------- Values list ---------- */
function renderValues(values) {
  const iconMap = {
    'Compassion': 'compassion', 'Collaboration': 'collaboration',
    'Integrity': 'integrity', 'Sustainability': 'sustainability',
    'Transformation': 'transformation'
  };
  return values.map(v => `
    <div class="value-row">
      <div class="value-icon" style="background:${v.color}">${icon(iconMap[v.name] || 'compassion')}</div>
      <div class="value-text">
        <h3 style="color:${v.color}">${esc(v.name)}</h3>
        <p>${esc(v.desc)}</p>
      </div>
    </div>`).join('');
}

/* ---------- Partner carousel cards ---------- */
function renderPartners(partners) {
  return partners.map(p => `
    <div class="partner-card">
      ${p.logo ? `<img src="${p.logo}" alt="${esc(p.name)}">` : `<div class="ph">${esc(p.name)}</div>`}
    </div>`).join('');
}

/* ---------- News rows (home — latest 3) ---------- */
function renderNewsRows(events, limit) {
  return events.slice(0, limit).map(e => `
    <div class="news-row">
      <div class="news-thumb"><img src="${e.image}" alt="${esc(e.title)}" loading="lazy"></div>
      <div>
        <span class="news-date">${formatDate(e.date)}</span>
        <h3>${esc(e.title)}</h3>
        <a href="updates.html" class="card-link">Read More &rarr;</a>
      </div>
    </div>`).join('');
}

/* ---------- News cards (updates page — all) ---------- */
function renderNewsCards(events) {
  return events.map(e => `
    <article class="news-card">
      <div class="news-card-img"><img src="${e.image}" alt="${esc(e.title)}" loading="lazy"></div>
      <div class="news-card-body">
        <span class="news-cat">${esc(e.category)}</span>
        <span class="news-date">${formatDate(e.date)}</span>
        <h3>${esc(e.title)}</h3>
        <p>${esc(e.summary)}</p>
      </div>
    </article>`).join('');
}

/* ---------- Gallery grid ---------- */
function renderGallery(items) {
  return items.map(g => `
    <div class="gallery-item">
      <img src="${g.image}" alt="${esc(g.caption)}" loading="lazy">
      <div class="gallery-cap">${esc(g.caption)}</div>
    </div>`).join('');
}

/* ---------- Team grid ---------- */
function renderTeam(team) {
  return team.map(m => `
    <div class="team-card">
      <div class="team-photo">${m.photo ? `<img src="${m.photo}" alt="${esc(m.name)}">` : ''}</div>
      <h3>${esc(m.name)}</h3>
      <span class="team-role">${esc(m.role)}</span>
      <p>${esc(m.bio)}</p>
    </div>`).join('');
}

/* ---------- Featured campaign ---------- */
function renderFeaturedCampaign(c) {
  return `
    <div class="container campaign-grid">
      <div>
        <span class="eyebrow green">Featured Campaign</span>
        <h2>${esc(c.title)}</h2>
        <div class="campaign-meta">
          <div><span class="ico">&#128205;</span> ${esc(c.location)}</div>
          <div><span class="ico">&#128197;</span> ${esc(c.date)}</div>
          <div><span class="ico">&#127795;</span> ${esc(c.highlight)}</div>
        </div>
        <p>${esc(c.description)}</p>
        <a href="programs.html" class="btn btn-outline-green" style="margin-top:1rem;">View Campaign Details &rarr;</a>
      </div>
      <div class="campaign-image"><img src="${c.image}" alt="${esc(c.title)}" loading="lazy"></div>
    </div>`;
}
