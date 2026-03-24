/* ================================================================
   PRIYAM TIWARI — Portfolio  |  script.js
   All interactive features
================================================================ */

/* ──────────────────────────────────────────────────────────────
   LOADER
────────────────────────────────────────────────────────────── */
function initLoader() {
  const fill = document.getElementById('lbFill');
  const loader = document.getElementById('loader');
  if (!fill || !loader) return;
  let p = 0;
  const iv = setInterval(() => {
    p += Math.random() * 18 + 4;
    if (p >= 100) { p = 100; clearInterval(iv); }
    fill.style.width = p + '%';
    if (p === 100) {
      setTimeout(() => {
        loader.classList.add('loaded');
        revealHeroElements();
        startTypewriter();
        startCounters();
      }, 300);
    }
  }, 80);
}

/* ──────────────────────────────────────────────────────────────
   CUSTOM CURSOR
────────────────────────────────────────────────────────────── */
function initCursor() {
  const outer = document.getElementById('cursor-outer');
  const inner = document.getElementById('cursor-inner');
  if (!outer || !inner || window.innerWidth < 900) return;
  let mx = 0, my = 0, ox = 0, oy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; inner.style.left = mx + 'px'; inner.style.top = my + 'px'; });
  (function moveOuter() { ox += (mx - ox) * 0.18; oy += (my - oy) * 0.18; outer.style.left = ox + 'px'; outer.style.top = oy + 'px'; requestAnimationFrame(moveOuter); })();
  document.querySelectorAll('a, button, .cert-slide, .tl-node, .tn-card, .proj-card, .mem-algo-tag, .tpp-thumb, .acp-img').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-grow'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-grow'));
  });
}

/* ──────────────────────────────────────────────────────────────
   HERO REVEAL
────────────────────────────────────────────────────────────── */
function revealHeroElements() {
  document.querySelectorAll('.fade-up').forEach(el => {
    const delay = parseInt(el.dataset.delay || 0);
    setTimeout(() => el.classList.add('in'), delay);
  });
}

/* ──────────────────────────────────────────────────────────────
   TYPEWRITER
────────────────────────────────────────────────────────────── */
function startTypewriter() {
  const el = document.getElementById('typedRole');
  if (!el) return;
  const roles = ['Data Analyst', 'Python Developer', 'C++ & DSA', 'Power BI Specialist', 'Problem Solver'];
  let ri = 0, ci = 0, del = false;
  function tick() {
    const role = roles[ri];
    if (!del) {
      el.textContent = role.slice(0, ++ci);
      if (ci === role.length) { del = true; setTimeout(tick, 1800); return; }
      setTimeout(tick, 80 + Math.random() * 30);
    } else {
      el.textContent = role.slice(0, --ci);
      if (ci === 0) { del = false; ri = (ri + 1) % roles.length; setTimeout(tick, 300); return; }
      setTimeout(tick, 40);
    }
  }
  tick();
}

/* ──────────────────────────────────────────────────────────────
   NUMBER COUNTER
────────────────────────────────────────────────────────────── */
function animateNumber(el, end, dur) {
  const isFloat = el.hasAttribute('data-float');
  const start = parseFloat(el.textContent) || 0;
  const startTime = performance.now();
  function step(now) {
    const p = Math.min((now - startTime) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    const val = start + (end - start) * ease;
    el.textContent = isFloat ? val.toFixed(1) : Math.round(val);
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function startCounters() {
  document.querySelectorAll('.hsb-n[data-to], .chip-num[data-to]').forEach(el => {
    animateNumber(el, parseInt(el.dataset.to), 1800);
  });
}

/* ──────────────────────────────────────────────────────────────
   SCROLL UI — nav / progress / back-to-top
────────────────────────────────────────────────────────────── */
function initScrollUi() {
  const nav = document.getElementById('nav');
  const progress = document.getElementById('page-progress');
  const btt = document.getElementById('backToTop');
  function onScroll() {
    const sy = window.scrollY;
    const dh = document.documentElement.scrollHeight - window.innerHeight;
    if (nav) nav.classList.toggle('scrolled', sy > 40);
    if (progress) progress.style.width = (dh > 0 ? (sy / dh) * 100 : 0) + '%';
    if (btt) btt.classList.toggle('show', sy > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ──────────────────────────────────────────────────────────────
   REVEAL ON SCROLL
────────────────────────────────────────────────────────────── */
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.delay || 0);
        setTimeout(() => e.target.classList.add('in'), delay);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ──────────────────────────────────────────────────────────────
   ACTIVE NAV
────────────────────────────────────────────────────────────── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links .nl');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const a = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (a) a.classList.add('active');
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => obs.observe(s));
}

/* ──────────────────────────────────────────────────────────────
   SMOOTH ANCHORS
────────────────────────────────────────────────────────────── */
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: y, behavior: 'smooth' });
      closeMobileDrawer();
    });
  });
}

/* ──────────────────────────────────────────────────────────────
   MOBILE DRAWER
────────────────────────────────────────────────────────────── */
function closeMobileDrawer() {
  document.getElementById('mobDrawer')?.classList.remove('open');
  document.getElementById('mobOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}
function initMobileDrawer() {
  const btn = document.getElementById('hamBtn');
  const drawer = document.getElementById('mobDrawer');
  const overlay = document.getElementById('mobOverlay');
  const closeBtn = document.getElementById('drawerClose');
  const open = () => { drawer?.classList.add('open'); overlay?.classList.add('open'); document.body.style.overflow = 'hidden'; };
  btn?.addEventListener('click', open);
  closeBtn?.addEventListener('click', closeMobileDrawer);
  overlay?.addEventListener('click', closeMobileDrawer);
}

/* ──────────────────────────────────────────────────────────────
   ACHIEVEMENT COUNTERS (scroll-triggered)
────────────────────────────────────────────────────────────── */
function initAchievementCounters() {
  const els = document.querySelectorAll('.ach-ctr[data-to], .ach-num[data-to], .cmb-num[data-to], .xp-num[data-to]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateNumber(e.target, parseFloat(e.target.dataset.to), 1400);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  els.forEach(el => obs.observe(el));
}

/* ──────────────────────────────────────────────────────────────
   PARALLAX ORBS
────────────────────────────────────────────────────────────── */
function initParallax() {
  const orbs = document.querySelectorAll('.hero-orb');
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    orbs.forEach((o, i) => { o.style.transform = `translateY(${sy * (i ? 0.12 : 0.06)}px)`; });
  }, { passive: true });
}

/* ──────────────────────────────────────────────────────────────
   ABOUT SECTION DECOR PARALLAX
────────────────────────────────────────────────────────────── */
function initAboutParallax() {
  const aboutSection = document.getElementById('about');
  const items = document.querySelectorAll('.ad-circ, .ad-big-num, .ad-cross, .ad-dots');
  if (!aboutSection || !items.length) return;

  aboutSection.addEventListener('mousemove', (e) => {
    const rect = aboutSection.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    items.forEach(el => {
      const speed = parseFloat(el.dataset.speed || 0);
      const moveX = -(x * speed) / 10;
      const moveY = -(y * speed) / 10;
      // For the rotating circle, we must preserve its centering translate
      if (el.classList.contains('ad-circ')) {
        el.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px)) rotate(${Date.now() / 150}deg)`; 
        // Note: CSS Animation handles rotation smoothly, but JS override might conflict. 
        // Better to use a wrapper for parallax or just simple translate.
        // Let's stick to simple translate and remove the rotation from JS to let CSS handle it via a wrapper if needed.
        // Or simplified:
        el.style.marginLeft = `${moveX}px`;
        el.style.marginTop = `${moveY}px`;
      } else {
        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    });
  });
}

/* ──────────────────────────────────────────────────────────────
   CONTACT FORM
────────────────────────────────────────────────────────────── */
const EMAILJS_CONFIG = {
  publicKey: 'V6bsxFt5xYm1PiWbC',
  serviceId: 'service_lspycop',
  ownerTemplateId: 'template_78a7g4n',
  autoReplyTemplateId: 'template_z7oag1t',
};

function initForm() {
  const form = document.getElementById('contactForm');
  const fb = document.getElementById('cfFeedback');
  const btn = document.getElementById('cfSubmit');
  const btnTxt = document.getElementById('cfBtnText');
  const subjectEl = form?.querySelector('input[name="subject"]');
  const hpEl = form?.querySelector('input[name="website"]');
  if (!form) return;

  const showFeedback = (text, type) => {
    if (!fb) return;
    fb.textContent = text;
    fb.className = type ? `cf-feedback ${type}` : 'cf-feedback';
  };

  if (window.emailjs) {
    window.emailjs.init(EMAILJS_CONFIG.publicKey);
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    let ok = true;
    const nameEl = document.getElementById('cf-name');
    const emailEl = document.getElementById('cf-email');
    const msgEl = document.getElementById('cf-msg');
    const validate = (el, msg) => {
      const err = el.parentElement.querySelector('.cf-err');
      if (!el.value.trim()) {
        if (err) err.textContent = msg;
        el.style.borderColor = 'rgba(251,113,133,.4)';
        ok = false;
      } else {
        if (err) err.textContent = '';
        el.style.borderColor = '';
      }
    };

    validate(nameEl, 'Name is required');
    if (emailEl && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value)) {
      const err = emailEl.parentElement.querySelector('.cf-err');
      if (err) err.textContent = 'Valid email required';
      emailEl.style.borderColor = 'rgba(251,113,133,.4)';
      ok = false;
    } else if (emailEl) {
      const err = emailEl.parentElement.querySelector('.cf-err');
      if (err) err.textContent = '';
      emailEl.style.borderColor = '';
    }

    validate(msgEl, 'Message is required');
    if (!ok) return;
    if (hpEl && hpEl.value.trim()) return;

    if (!window.emailjs) {
      showFeedback('EmailJS library load nahi hui. Internet/CDN check karo.', 'err');
      return;
    }

    btnTxt.textContent = 'Sending...';
    btn.disabled = true;

    const templateParams = {
      name: nameEl.value.trim(),
      email: emailEl.value.trim(),
      subject: subjectEl?.value.trim() || 'New message from portfolio contact form',
      message: msgEl.value.trim(),
      reply_to: emailEl.value.trim(),
      sent_at: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
    };

    try {
      await window.emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.ownerTemplateId, templateParams);
      await window.emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.autoReplyTemplateId, templateParams);

      showFeedback('Message sent successfully. Confirmation email bhi chali gayi.', 'ok');
      form.reset();
      setTimeout(() => showFeedback('', ''), 6000);
    } catch (err) {
      console.error('EmailJS send failed:', err);
      showFeedback('Message send nahi ho paya. Thoda der baad try karo.', 'err');
    } finally {
      btnTxt.textContent = 'Send Message';
      btn.disabled = false;
    }
  });
}
function drawRadar() {
  const svg = document.getElementById('radarSvg');
  if (!svg) return;
  const cx = 80, cy = 80, maxR = 60;
  const skills = [
    { label: 'Python', val: 0.92, color: '#d4a96a' },
    { label: 'C++ DSA', val: 0.88, color: '#a78bfa' },
    { label: 'Power BI', val: 0.88, color: '#2dd4bf' },
    { label: 'SQL', val: 0.85, color: '#fb7185' },
    { label: 'Django', val: 0.82, color: '#d4a96a' },
    { label: 'ML', val: 0.75, color: '#60a5fa' },
  ];
  const n = skills.length;
  const angle = (i) => (i / n) * 2 * Math.PI - Math.PI / 2;

  // Grid rings
  [0.25, 0.5, 0.75, 1].forEach(r => {
    const pts = skills.map((_, i) => {
      const a = angle(i); return `${cx + Math.cos(a) * maxR * r},${cy + Math.sin(a) * maxR * r}`;
    }).join(' ');
    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    poly.setAttribute('points', pts);
    poly.setAttribute('fill', 'none');
    poly.setAttribute('stroke', 'rgba(255,255,255,0.07)');
    poly.setAttribute('stroke-width', '1');
    svg.appendChild(poly);
  });

  // Spoke lines
  skills.forEach((_, i) => {
    const a = angle(i);
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', cx); line.setAttribute('y1', cy);
    line.setAttribute('x2', cx + Math.cos(a) * maxR); line.setAttribute('y2', cy + Math.sin(a) * maxR);
    line.setAttribute('stroke', 'rgba(255,255,255,0.06)'); line.setAttribute('stroke-width', '1');
    svg.appendChild(line);
  });

  // Data polygon
  const dataPts = skills.map((s, i) => {
    const a = angle(i); return `${cx + Math.cos(a) * maxR * s.val},${cy + Math.sin(a) * maxR * s.val}`;
  }).join(' ');
  const dataPoly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  dataPoly.setAttribute('points', dataPts);
  dataPoly.setAttribute('fill', 'rgba(212,169,106,0.12)');
  dataPoly.setAttribute('stroke', 'rgba(212,169,106,0.6)');
  dataPoly.setAttribute('stroke-width', '1.5');
  dataPoly.setAttribute('stroke-linejoin', 'round');
  svg.appendChild(dataPoly);

  // Dots
  skills.forEach((s, i) => {
    const a = angle(i);
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', cx + Math.cos(a) * maxR * s.val);
    dot.setAttribute('cy', cy + Math.sin(a) * maxR * s.val);
    dot.setAttribute('r', '3.5'); dot.setAttribute('fill', s.color);
    svg.appendChild(dot);
  });
}

function initSkillsRadar() {
  const section = document.getElementById('skills');
  if (!section) return;
  let done = false;
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !done) { done = true; drawRadar(); obs.disconnect(); }
  }, { threshold: 0.2 });
  obs.observe(section);
}

/* ──────────────────────────────────────────────────────────────
   PROFICIENCY CIRCLES — animated stroke-dashoffset
────────────────────────────────────────────────────────────── */
function initProfCircles() {
  const CIRC = 2 * Math.PI * 34; // r=34, circumference ≈ 213.6
  const cards = document.querySelectorAll('.pcirc');
  if (!cards.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const pct = parseInt(e.target.dataset.pct || 0) / 100;
        const dashoffset = CIRC * (1 - pct);
        e.target.style.setProperty('--dashoffset', dashoffset);
        e.target.classList.add('animated');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  cards.forEach(c => obs.observe(c));
}

/* ──────────────────────────────────────────────────────────────
   MEMORY ALLOCATOR — algo switcher
────────────────────────────────────────────────────────────── */
window.setAlgo = function(el, name) {
  document.querySelectorAll('.mem-algo-tag').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const lbl = document.getElementById('memAlgoLabel');
  if (lbl) lbl.textContent = 'Algorithm: ' + name;

  const blocks = document.getElementById('memBlocks');
  if (!blocks) return;
  // Animate blocks differently per algo
  const layouts = {
    'First Fit': [
      { cls: 'mb-free', flex: 2.5, label: 'Free · 250B' },
      { cls: 'mb-alloc', flex: 2, label: 'P1 · 200B', mc: '#d4a96a' },
      { cls: 'mb-free', flex: 1.5, label: 'Free · 150B' },
      { cls: 'mb-alloc', flex: 2.5, label: 'P2 · 250B', mc: '#2dd4bf' },
      { cls: 'mb-free', flex: 1, label: 'Free · 100B' },
    ],
    'Best Fit': [
      { cls: 'mb-alloc', flex: 2, label: 'P1 · 200B', mc: '#d4a96a' },
      { cls: 'mb-free', flex: 1, label: 'Free · 50B' },
      { cls: 'mb-alloc', flex: 2.5, label: 'P2 · 250B', mc: '#2dd4bf' },
      { cls: 'mb-free', flex: 1.5, label: 'Free · 150B' },
      { cls: 'mb-free', flex: 3, label: 'Free · 300B' },
    ],
    'Worst Fit': [
      { cls: 'mb-free', flex: 1, label: 'Free · 100B' },
      { cls: 'mb-alloc', flex: 2.5, label: 'P2 · 250B', mc: '#2dd4bf' },
      { cls: 'mb-free', flex: 1, label: 'Free · 100B' },
      { cls: 'mb-alloc', flex: 2, label: 'P1 · 200B', mc: '#d4a96a' },
      { cls: 'mb-free', flex: 3.5, label: 'Free · 350B' },
    ],
  };
  const layout = layouts[name];
  if (!layout) return;
  blocks.innerHTML = '';
  layout.forEach(b => {
    const div = document.createElement('div');
    div.className = `mem-block ${b.cls}`;
    div.style.flex = b.flex;
    if (b.mc) div.style.setProperty('--mc', b.mc);
    div.innerHTML = `<span>${b.label}</span>`;
    blocks.appendChild(div);
  });
};

/* ──────────────────────────────────────────────────────────────
   TIMELINE — horizontal drag + nav + photo preview lightbox
────────────────────────────────────────────────────────────── */
function initTimeline() {
  const wrap = document.getElementById('tlTrack');
  const inner = document.getElementById('tlInner');
  const dotsEl = document.getElementById('tlDots');
  const prevBtn = document.getElementById('tlPrev');
  const nextBtn = document.getElementById('tlNext');
  if (!wrap || !inner) return;

  // Drag scroll
  let isDragging = false, startX = 0, scrollLeft = 0;
  wrap.addEventListener('mousedown', e => { isDragging = true; startX = e.pageX - wrap.offsetLeft; scrollLeft = wrap.scrollLeft; wrap.classList.add('dragging'); });
  document.addEventListener('mouseup', () => { isDragging = false; wrap.classList.remove('dragging'); });
  wrap.addEventListener('mousemove', e => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - wrap.offsetLeft;
    wrap.scrollLeft = scrollLeft - (x - startX) * 1.2;
  });
  wrap.addEventListener('touchstart', e => { startX = e.touches[0].pageX; scrollLeft = wrap.scrollLeft; }, { passive: true });
  wrap.addEventListener('touchmove', e => { const dx = e.touches[0].pageX - startX; wrap.scrollLeft = scrollLeft - dx; }, { passive: true });

  // Dots
  const nodes = inner.querySelectorAll('.tl-node');
  if (dotsEl) {
    nodes.forEach((_, i) => {
      const d = document.createElement('div');
      d.className = 'tl-dot-ind' + (i === 0 ? ' active' : '');
      d.addEventListener('click', () => scrollToNode(i));
      dotsEl.appendChild(d);
    });
  }

  function scrollToNode(i) {
    const node = nodes[i];
    if (!node) return;
    const nodeCenter = node.offsetLeft + node.offsetWidth / 2;
    const scrollTo = nodeCenter - wrap.offsetWidth / 2;
    wrap.scrollTo({ left: scrollTo, behavior: 'smooth' });
    updateDots(i);
  }
  function updateDots(active) {
    dotsEl?.querySelectorAll('.tl-dot-ind').forEach((d, i) => d.classList.toggle('active', i === active));
  }

  let currentNode = 0;
  prevBtn?.addEventListener('click', () => { currentNode = Math.max(0, currentNode - 1); scrollToNode(currentNode); });
  nextBtn?.addEventListener('click', () => { currentNode = Math.min(nodes.length - 1, currentNode + 1); scrollToNode(currentNode); });

  // Sync dots on scroll
  wrap.addEventListener('scroll', () => {
    const wCenter = wrap.scrollLeft + wrap.offsetWidth / 2;
    let closest = 0, closestDist = Infinity;
    nodes.forEach((n, i) => {
      const nCenter = n.offsetLeft + n.offsetWidth / 2;
      const d = Math.abs(nCenter - wCenter);
      if (d < closestDist) { closestDist = d; closest = i; }
    });
    currentNode = closest;
    updateDots(closest);
  }, { passive: true });

  // Photo preview — hover on card → show lightbox with that card's photos
  nodes.forEach(node => {
    const card = node.querySelector('.tn-card');
    if (!card) return;
    const thumbs = card.querySelectorAll('.tpp-thumb');

    thumbs.forEach((thumb, idx) => {
      thumb.addEventListener('click', e => {
        e.stopPropagation();
        const photosAttr = card.dataset.photos;
        let photos = [];
        try { 
          // Replace backslashes with forward slashes to prevent JSON errors and fix paths
          const cleanAttr = (photosAttr || '[]').replace(/\\/g, '/');
          photos = JSON.parse(cleanAttr); 
        } catch (err) { photos = []; }
        if (photos.length) openPhotoBox(photos, idx);
      });
    });
  });
}

/* ── Timeline Photo Lightbox ── */
let _photos = [], _photoIdx = 0;

function openPhotoBox(photos, startIdx) {
  _photos = photos;
  _photoIdx = startIdx || 0;
  const box = document.getElementById('tlPhotoBox');
  if (!box) return;
  box.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderPhotoBox();
}

function renderPhotoBox() {
  const img = document.getElementById('tpbImg');
  const counter = document.getElementById('tpbCounter');
  const dotsEl = document.getElementById('tpbDots');
  if (!img) return;

  const src = _photos[_photoIdx] || '';
  img.src = src;
  img.style.display = src ? 'block' : 'none';
  
  // Fix: Hide the placeholder text when an image is successfully loaded
  const placeholder = img.nextElementSibling;
  if (placeholder && placeholder.classList.contains('tpb-placeholder')) {
    placeholder.style.display = src ? 'none' : 'flex';
  }

  if (counter) counter.textContent = `${_photoIdx + 1} / ${_photos.length}`;

  if (dotsEl) {
    dotsEl.innerHTML = '';
    _photos.forEach((_, i) => {
      const d = document.createElement('div');
      d.className = 'tdot' + (i === _photoIdx ? ' active' : '');
      d.addEventListener('click', () => { _photoIdx = i; renderPhotoBox(); });
      dotsEl.appendChild(d);
    });
  }
}

function initPhotoBox() {
  const box = document.getElementById('tlPhotoBox');
  const backdrop = document.getElementById('tpbBackdrop');
  const closeBtn = document.getElementById('tpbClose');
  const prevBtn = document.getElementById('tpbPrev');
  const nextBtn = document.getElementById('tpbNext');
  const close = () => { box?.classList.remove('open'); document.body.style.overflow = ''; };
  backdrop?.addEventListener('click', close);
  closeBtn?.addEventListener('click', close);
  prevBtn?.addEventListener('click', () => { _photoIdx = (_photoIdx - 1 + _photos.length) % _photos.length; renderPhotoBox(); });
  nextBtn?.addEventListener('click', () => { _photoIdx = (_photoIdx + 1) % _photos.length; renderPhotoBox(); });
  document.addEventListener('keydown', e => {
    if (!box?.classList.contains('open')) return;
    if (e.key === 'ArrowLeft') { _photoIdx = (_photoIdx - 1 + _photos.length) % _photos.length; renderPhotoBox(); }
    if (e.key === 'ArrowRight') { _photoIdx = (_photoIdx + 1) % _photos.length; renderPhotoBox(); }
    if (e.key === 'Escape') close();
  });
}

/* ──────────────────────────────────────────────────────────────
   CERTIFICATES CAROUSEL
────────────────────────────────────────────────────────────── */
function initCertCarousel() {
  const track = document.getElementById('certTrack');
  const dotsEl = document.getElementById('certDots');
  const prevBtn = document.getElementById('certPrev');
  const nextBtn = document.getElementById('certNext');
  const detailPanel = document.getElementById('certDetailPanel');
  const cdpImg = document.getElementById('cdpCertImg');
  const cdpImageTag = document.getElementById('cdpCertImage');
  const cdpMeta = document.getElementById('cdpMeta');
  const cdpTitle = document.getElementById('cdpTitle');
  const cdpDesc = document.getElementById('cdpDesc');
  const cdpFsBtn = document.getElementById('cdpFullscreenBtn');
  if (!track) return;

  const slides = track.querySelectorAll('.cert-slide');
  const CARD_W = 320 + 20; // card width + gap
  let current = 0, autoTimer = null, isCertSectionVisible = false;

  // Build dots
  slides.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'cdot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsEl?.appendChild(d);
  });

  function goTo(idx, animate = true) {
    current = Math.max(0, Math.min(slides.length - 1, idx));
    const offset = -(current * CARD_W) + (track.parentElement.offsetWidth / 2 - CARD_W / 2 + 20);
    track.style.transition = animate ? 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)' : 'none';
    track.style.transform = `translateX(${offset}px)`;
    slides.forEach((s, i) => s.classList.toggle('active-card', i === current));
    dotsEl?.querySelectorAll('.cdot').forEach((d, i) => d.classList.toggle('active', i === current));
    updateDetailPanel(slides[current]);
    resetAutoAdvance();
  }

  function updateDetailPanel(slide) {
    if (!slide || !detailPanel) return;
    const img = slide.dataset.img || '';
    const title = slide.dataset.title || '';
    const issuer = slide.dataset.issuer || '';
    const desc = slide.dataset.desc || '';

    detailPanel.style.opacity = '0';
    setTimeout(() => {
      const isPdf = img.toLowerCase().endsWith('.pdf');
      if (isPdf) {
        if (cdpImg) { cdpImg.src = img; cdpImg.style.display = 'block'; }
        if (cdpImageTag) cdpImageTag.style.display = 'none';
      } else {
        if (cdpImg) { cdpImg.style.display = 'none'; cdpImg.src = ''; }
        if (cdpImageTag) { cdpImageTag.src = img; cdpImageTag.style.display = 'block'; }
      }
      
      if (!img) { if(cdpImg) cdpImg.style.display='none'; if(cdpImageTag) cdpImageTag.style.display='none'; }

      if (cdpMeta) cdpMeta.textContent = issuer;
      if (cdpTitle) cdpTitle.textContent = title;
      if (cdpDesc) cdpDesc.textContent = desc;
      detailPanel.style.opacity = '1';
    }, 180);

    // Fullscreen button
    if (cdpFsBtn) {
      cdpFsBtn.onclick = () => img && openCertLB(img, title);
    }
  }

  function resetAutoAdvance() {
    clearInterval(autoTimer);
    if (isCertSectionVisible) {
      autoTimer = setInterval(() => goTo((current + 1) % slides.length), 4500);
    }
  }

  // Section visibility for auto-advance
  const section = document.getElementById('certificates');
  if (section) {
    const obs = new IntersectionObserver(entries => {
      isCertSectionVisible = entries[0].isIntersecting;
      if (isCertSectionVisible) resetAutoAdvance();
      else clearInterval(autoTimer);
    }, { threshold: 0.3 });
    obs.observe(section);
  }

  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));

  // Slide click → go to that slide or open lightbox
  slides.forEach((s, i) => {
    s.addEventListener('click', () => {
      if (i === current) {
        const img = s.dataset.img;
        if (img) openCertLB(img, s.dataset.title || '');
      } else {
        goTo(i);
      }
    });
  });

  // View image buttons
  slides.forEach((s) => {
    const btn = s.querySelector('.cert-view-btn');
    if (btn) {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const img = s.dataset.img;
        if (img) openCertLB(img, s.dataset.title || '');
      });
    }
  });

  // Touch swipe
  let tsX = 0;
  track.addEventListener('touchstart', e => { tsX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tsX;
    if (Math.abs(dx) > 40) goTo(dx < 0 ? current + 1 : current - 1);
  });

  // Keyboard
  document.addEventListener('keydown', e => {
    if (!isCertSectionVisible) return;
    if (document.getElementById('certLightbox')?.classList.contains('open')) return;
    if (e.key === 'ArrowLeft') goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  // Init
  goTo(0, false);
  window.addEventListener('resize', () => goTo(current, false));
}

/* ── Certificate Lightbox ── */
function openCertLB(src, title) {
  const lb = document.getElementById('certLightbox');
  const img = document.getElementById('clbImg');
  const imgTag = document.getElementById('clbImage');
  const t = document.getElementById('clbTitle');
  if (!lb) return;
  
  const isPdf = src.toLowerCase().endsWith('.pdf');
  if (isPdf) {
    if (img) { img.src = src; img.style.display = 'block'; }
    if (imgTag) imgTag.style.display = 'none';
  } else {
    if (img) { img.style.display = 'none'; img.src = ''; }
    if (imgTag) { imgTag.src = src; imgTag.style.display = 'block'; }
  }
  
  if (t) t.textContent = title;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
// Expose globally for onclick in HTML
window.openCertLB = openCertLB;

function initCertLightbox() {
  const lb = document.getElementById('certLightbox');
  const bg = document.getElementById('clbBg');
  const closeBtn = document.getElementById('clbClose');
  const close = () => { lb?.classList.remove('open'); document.body.style.overflow = ''; };
  bg?.addEventListener('click', close);
  closeBtn?.addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if (lb?.classList.contains('open') && e.key === 'Escape') close();
  });
}

/* ──────────────────────────────────────────────────────────────
   MAIN INIT
────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCursor();
  initScrollUi();
  initReveal();
  initActiveNav();
  initSmoothAnchors();
  initMobileDrawer();
  initParallax();
  initAboutParallax();
  initForm();
  initSkillsRadar();
  initProfCircles();
  initAchievementCounters();
  initTimeline();
  initPhotoBox();
  initCertCarousel();
  initCertLightbox();
});


