/* ============================================================
   ANIMATIONS.JS — Scroll reveal + skill bar triggers
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll reveal ─────────────────────────────────────── */
  const revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-fade, .reveal-scale';
  const revealEls = document.querySelectorAll(revealSelectors);

  if (revealEls.length) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(el => revealObs.observe(el));
  }

  /* ── Skill bars ────────────────────────────────────────── */
  const skillFills = document.querySelectorAll('.skill-fill');

  if (skillFills.length) {
    const skillObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          skillObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    skillFills.forEach(fill => skillObs.observe(fill));
  }

  /* ── Card hover tilt (subtle) ──────────────────────────── */
  document.querySelectorAll('.project-card, .xp-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      const rotX = ((y - cy) / cy) * -4;
      const rotY = ((x - cx) / cx) * 4;

      card.style.transform = `translateY(-6px) perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ── Section progress indicator ───────────────────────── */
  window.addEventListener('scroll', () => {
    const total = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / total) * 100;
    const bar = document.getElementById('progress-bar');
    if (bar) bar.style.width = progress + '%';
  }, { passive: true });
});