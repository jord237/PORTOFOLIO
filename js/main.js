/* ============================================================
   MAIN.JS — Navigation, scroll spy, back to top
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll effect ──────────────────────────────── */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ── Scroll spy — active nav link ─────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const observerOptions = {
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  /* ── Mobile burger menu ────────────────────────────────── */
  const burger = document.querySelector('.nav-burger');
  const body = document.body;

  if (burger) {
    burger.addEventListener('click', () => {
      navbar.classList.toggle('nav-mobile-open');
    });

    // Close on nav link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('nav-mobile-open');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        navbar.classList.remove('nav-mobile-open');
      }
    });
  }

  /* ── Smooth scroll with offset ─────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;

      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
      const top = target.getBoundingClientRect().top + window.scrollY - navH;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── Back to top ─────────────────────────────────────*/
  const backTop = document.getElementById('back-top');

  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Typewriter effect ─────────────────────────────────── */
  const typeEl = document.getElementById('typewriter');
  if (typeEl) {
    const phrases = [
      'Cybersécurité',
      'Sécurité Réseaux',
      'Data Science',
      'Analyse de menaces',
      'Data & Python',
      'Security by Design',
      'Ethical Hacking',
      'Pentesting',
      'Cloud Security',
      'Forensics',
      'SIEM & SOC',
      'Cryptographie',
    
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let delay = 120;

    function type() {
      const current = phrases[phraseIndex];
      if (isDeleting) {
        typeEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        delay = 60;
      } else {
        typeEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        delay = 110;
      }

      if (!isDeleting && charIndex === current.length) {
        isDeleting = true;
        delay = 1600; // pause
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
      }

      setTimeout(type, delay);
    }

    setTimeout(type, 900);
  }

  /* ── Counter animation ─────────────────────────────────── */
  const counters = document.querySelectorAll('[data-count]');

  if (counters.length) {
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        let count = 0;
        const step = target / 40;

        const update = () => {
          count = Math.min(count + step, target);
          el.textContent = Math.floor(count);
          if (count < target) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
        counterObs.unobserve(el);
      });
    }, { threshold: 0.6 });

    counters.forEach(c => counterObs.observe(c));
  }

  console.log('%c🔐 BRYAN JORDAN Portfolio', 'font-size:16px;color:#00d4aa;font-weight:bold;');
  console.log('%c Étudiant ingénieur | Cybersécurité | Réseaux | Data', 'color:#94a3b8;font-size:12px;');
});