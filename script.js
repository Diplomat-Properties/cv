/* A lightweight, framework-free interactive layer.
   Works directly on GitHub Pages — no build tools needed. */
(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.reading-progress');
  const navLinks = [...document.querySelectorAll('.desktop-nav a')];
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  function updateScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? Math.min(100, window.scrollY / max * 100) : 0}%`;
    header.classList.toggle('scrolled', window.scrollY > 12);
  }
  updateScroll();
  window.addEventListener('scroll', updateScroll, { passive: true });
  window.addEventListener('resize', updateScroll, { passive: true });

  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileNav.inert = !open;
  }
  menuToggle.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', () => { if (window.innerWidth > 980) setMenu(false); }, { passive: true });

  // Section navigation and subtle entrances.
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.09, rootMargin: '0px 0px -25px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-22% 0px -63% 0px' });
    document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));

    // Count once when the statistics strip comes into view.
    const impact = document.querySelector('.impact-strip');
    const countObserver = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      document.querySelectorAll('[data-count]').forEach(el => {
        const finalValue = Number(el.dataset.count);
        if (prefersReducedMotion) { el.textContent = String(finalValue); return; }
        const start = performance.now();
        const duration = 1150;
        function animate(now) {
          const t = Math.min(1, (now - start) / duration);
          const ease = 1 - Math.pow(1 - t, 4);
          el.textContent = String(Math.round(finalValue * ease));
          if (t < 1) requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
      });
      countObserver.disconnect();
    }, { threshold: .3 });
    countObserver.observe(impact);
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view'));
  }

  // Responsive pointer-reactive portrait with actual 3D perspective.
  const portraitScene = document.getElementById('portraitScene');
  const heroArt = document.getElementById('heroArt');
  const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  if (heroArt && portraitScene && finePointer && !prefersReducedMotion) {
    heroArt.addEventListener('pointermove', e => {
      const box = heroArt.getBoundingClientRect();
      const x = (e.clientX - box.left) / box.width - .5;
      const y = (e.clientY - box.top) / box.height - .5;
      portraitScene.style.setProperty('--rY', `${(x * 7).toFixed(2)}deg`);
      portraitScene.style.setProperty('--rX', `${(-y * 6).toFixed(2)}deg`);
    });
    heroArt.addEventListener('pointerleave', () => {
      portraitScene.style.setProperty('--rY', '0deg');
      portraitScene.style.setProperty('--rX', '0deg');
    });
  }

  // Filter businesses without navigation / page reload.
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const ventureCards = [...document.querySelectorAll('.venture-card')];
  filterButtons.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(b => {
      const selected = b === button;
      b.classList.toggle('is-selected', selected);
      b.setAttribute('aria-pressed', String(selected));
    });
    ventureCards.forEach(card => { card.hidden = filter !== 'all' && card.dataset.category !== filter; });
  }));

  // Full company details, based on the supplied CV and the requested title updates.
  const companies = {
    diplomat: {
      name: 'Diplomat Properties', sector: 'REAL ESTATE · 2013 — PRESENT', role: 'PROPRIETOR',
      summary: 'Leading property-focused services with an emphasis on acquisitions, sales, leasing, strategic planning and long-standing client relationships.',
      points: ['Real estate strategy, property sales and leasing', 'Property acquisitions and investment opportunities', 'Business operations, team development and client relationships', 'Marketing direction and compliance oversight']
    },
    businesslink: {
      name: 'Business Link Consultancies', sector: 'BUSINESS CONSULTANCY · 2011 — PRESENT', role: 'PROPRIETOR',
      summary: 'Supporting entrepreneurs and established businesses through practical company formation, documentation, government-related processes and management consultancy.',
      points: ['Company formation and trade licence management', 'PRO services and document clearing', 'Business and management consultancy', 'Human resources advisory and client support']
    },
    rise: {
      name: 'Rise Properties LLC', sector: 'REAL ESTATE · JUNE 2024 — PRESENT', role: 'DIRECTOR & PARTNER',
      summary: 'Contributing to the growth and direction of a Dubai real estate business, from property investment strategy to leasing and relationship management.',
      points: ['Property acquisition and investment planning', 'Business budgets, revenue and financial oversight', 'Leasing, property marketing and negotiation', 'Industry networks and regulatory awareness']
    },
    risebranch: {
      name: 'Rise Properties LLC (Branch)', sector: 'REAL ESTATE · SEPTEMBER 2025 — PRESENT', role: 'DIRECTOR & PARTNER',
      summary: 'Providing strategic and operational direction for a real estate branch serving clients and property owners in a competitive market.',
      points: ['Operational planning and performance oversight', 'Sales, leasing and property management direction', 'Client and stakeholder relationships', 'Team management and marketing initiatives']
    },
    faiza: {
      name: 'Faiza Saqlain Ready Made Garments', sector: 'FASHION & APPAREL · FEBRUARY 2024 — PRESENT', role: 'SALES DIRECTOR & PARTNER',
      summary: 'Leading sales strategy, business relationships and market development in the ready-made garments and apparel industry.',
      points: ['Sales planning and revenue-growth strategy', 'Retail and wholesale relationship management', 'Team training and sales performance', 'Market analysis, pricing and negotiation']
    },
    trading: {
      name: 'Diplomat Trading LLC', sector: 'GENERAL TRADING · 2004 — 2016', role: 'DIRECTOR & PARTNER',
      summary: 'Earlier commercial leadership experience spanning operational performance, business development and trade-related decision-making.',
      points: ['New business opportunity assessment', 'Long-term commercial planning', 'Budgeting, forecasting and profitability', 'Supply chain and day-to-day operations']
    },
    transport: {
      name: 'Business Link Transport LLC', sector: 'TRANSPORT & LOGISTICS · 2005 — 2017', role: 'DIRECTOR & PARTNER',
      summary: 'Leadership across cargo movement, equipment-related services and commercial transport operations.',
      points: ['Daily operations across transport services', 'Client relationships and service quality', 'Transport planning and logistics coordination', 'Safety, budgeting and operational efficiency']
    },
    tourism: {
      name: 'Shahnawaz Tourism LLC', sector: 'TOURISM · 2009 — 2011', role: 'DIRECTOR & PARTNER',
      summary: 'Business leadership experience in tourism, centered on service delivery, market opportunities and customer relationships.',
      points: ['Business strategy and market development', 'Customer relationships and service standards', 'Tourism products and partnerships', 'Industry awareness and service improvement']
    }
  };
  const dialog = document.getElementById('ventureDialog');
  const closeDialog = document.getElementById('dialogClose');
  let lastTrigger = null;
  function openCompany(companyKey, trigger) {
    const company = companies[companyKey];
    if (!company) return;
    lastTrigger = trigger;
    document.getElementById('dialogEyebrow').textContent = company.sector;
    document.getElementById('dialogTitle').textContent = company.name;
    document.getElementById('dialogRole').textContent = company.role;
    document.getElementById('dialogSummary').textContent = company.summary;
    const list = document.getElementById('dialogPoints');
    list.replaceChildren();
    company.points.forEach(p => {
      const li = document.createElement('li');
      li.textContent = p;
      list.append(li);
    });
    document.getElementById('dialogContact').href = `mailto:tahirbaig77@gmail.com?subject=${encodeURIComponent(`Enquiry — ${company.name}`)}`;
    if (typeof dialog.showModal === 'function') dialog.showModal();
  }
  document.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', e => {
    e.stopPropagation();
    openCompany(button.dataset.open, button);
  }));
  ventureCards.forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('button')) return;
      openCompany(card.dataset.company, card);
    });
    card.addEventListener('keydown', e => {
      if (e.target !== card || !['Enter', ' '].includes(e.key)) return;
      e.preventDefault();
      openCompany(card.dataset.company, card);
    });
  });
  closeDialog.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => lastTrigger?.focus());

  // One-click email copying for GitHub Pages (secure HTTPS).
  const copyButton = document.getElementById('copyEmail');
  const copyLabel = document.getElementById('copyLabel');
  let copyTimeout;
  copyButton.addEventListener('click', async () => {
    const email = 'tahirbaig77@gmail.com';
    try {
      if (!navigator.clipboard) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(email);
      copyLabel.textContent = 'EMAIL COPIED ✓';
    } catch (_) {
      copyLabel.textContent = 'SELECT EMAIL ABOVE';
    }
    clearTimeout(copyTimeout);
    copyTimeout = setTimeout(() => { copyLabel.textContent = 'COPY EMAIL'; }, 2600);
  });

  document.getElementById('year').textContent = String(new Date().getFullYear());
})();
