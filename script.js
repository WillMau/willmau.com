(function () {
  const nav = document.getElementById('nav');
  const toggle = nav.querySelector('.nav-toggle');
  const links = nav.querySelectorAll('.nav-links a');

  toggle.addEventListener('click', () => {
    const open = nav.getAttribute('data-open') === 'true';
    nav.setAttribute('data-open', String(!open));
    toggle.setAttribute('aria-expanded', String(!open));
  });

  links.forEach((a) => {
    a.addEventListener('click', () => {
      nav.setAttribute('data-open', 'false');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Animate bar chart once visible.
  const bars = document.querySelectorAll('.bar-fill');
  const widths = Array.from(bars).map((el) => el.style.width);
  bars.forEach((el) => { el.style.width = '0%'; });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        bars.forEach((el, i) => { el.style.width = widths[i]; });
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const chart = document.querySelector('.bar-chart');
  if (chart) obs.observe(chart);

  // Hide social FAB while the green Vote section is in view (it has its own CTAs).
  const fab = document.querySelector('.social-fab');
  const voteSection = document.getElementById('vote');
  if (fab && voteSection) {
    const fabObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        fab.classList.toggle('is-hidden', entry.isIntersecting);
      });
    }, { threshold: 0.15 });
    fabObs.observe(voteSection);
  }
})();
