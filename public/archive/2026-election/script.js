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

  // Election countdown: live D:H:M ticker in the hero, status pill on day-of
  // and after, plus a synced eyebrow on the Help Win section.
  const cd = document.getElementById('hero-countdown');
  const stack = document.getElementById('cd-stack');
  const status = document.getElementById('cd-status');
  const cdDays = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMins = document.getElementById('cd-mins');
  const eyebrow = document.getElementById('help-win-eyebrow');

  // Polls close at 9pm Eastern on May 19, 2026.
  // Eastern Daylight Time is UTC-4, so 21:00 EDT = 01:00 UTC May 20.
  const pollsClose = new Date('2026-05-20T01:00:00Z').getTime();
  const pollsOpen = new Date('2026-05-19T10:00:00Z').getTime(); // 6am EDT
  const pad = (n) => (n < 10 ? '0' + n : '' + n);
  const prevValues = { d: null, h: null, m: null };

  function setNum(el, value) {
    if (!el) return;
    const text = pad(value);
    if (el.textContent !== text) {
      el.textContent = text;
      el.classList.remove('is-tick');
      // Force reflow so the animation can replay.
      void el.offsetWidth;
      el.classList.add('is-tick');
    }
  }

  function showStatus(text) {
    if (stack) stack.hidden = true;
    if (status) {
      status.textContent = text;
      status.hidden = false;
    }
    if (cd) cd.hidden = false;
  }

  function showStack() {
    if (status) status.hidden = true;
    if (stack) stack.hidden = false;
    if (cd) cd.hidden = false;
  }

  function tick() {
    const nowMs = Date.now();
    const diff = pollsClose - nowMs;
    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);
    const electionMidnight = new Date(2026, 4, 19);
    const daysUntil = Math.round((electionMidnight - todayMidnight) / 86400000);

    // Eyebrow phrasing follows the calendar-day count.
    if (eyebrow) {
      let txt = '';
      if (daysUntil > 14) txt = Math.round(daysUntil / 7) + ' weeks out';
      else if (daysUntil > 1) txt = daysUntil + ' days out';
      else if (daysUntil === 1) txt = 'Tomorrow';
      else if (daysUntil === 0) txt = 'Today';
      else txt = 'Thank you for voting';
      if (txt && eyebrow.textContent !== txt) eyebrow.textContent = txt;
    }

    if (!cd) return;

    if (diff <= 0) {
      showStatus('Polls have closed, thank you');
      return;
    }

    // On election day, switch the cards from D:H:M to a status pill so the
    // 0-days display does not look broken.
    if (daysUntil === 0) {
      if (nowMs < pollsOpen) {
        showStatus('Polls open at 6am');
      } else {
        showStatus('Polls open until 9pm');
      }
      return;
    }

    // Standard live ticker: days, hours, minutes until polls close.
    showStack();
    const totalSec = Math.floor(diff / 1000);
    const days = Math.floor(totalSec / 86400);
    const hours = Math.floor((totalSec % 86400) / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);

    if (days !== prevValues.d) { setNum(cdDays, days); prevValues.d = days; }
    if (hours !== prevValues.h) { setNum(cdHours, hours); prevValues.h = hours; }
    if (mins !== prevValues.m) { setNum(cdMins, mins); prevValues.m = mins; }
  }

  if (cd || eyebrow) {
    tick();
    // Update every 30 seconds so the minutes stay accurate without burning CPU.
    setInterval(tick, 30000);
  }

  // Share button: on phones, use navigator.share() to open the native share
  // sheet (Facebook sharer.php is unreliable on iOS Safari). On desktop, leave
  // the link alone so it opens the FB share dialog in a popup as expected.
  const shareBtn = document.getElementById('share-btn');
  if (shareBtn) {
    const isMobile = (navigator.userAgentData && navigator.userAgentData.mobile) ||
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile && navigator.share) {
      shareBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
          await navigator.share({
            title: 'Will Mau for Schalmont Board of Education',
            text: 'Reelection 2026. Vote Tuesday, May 19.',
            url: 'https://willmau.com/'
          });
        } catch (err) {
          if (err && err.name !== 'AbortError') {
            window.open(shareBtn.href, '_blank', 'noopener');
          }
        }
      });
    }
  }

  // Copy-link button on Help Win section.
  const copyBtn = document.getElementById('copy-link');
  if (copyBtn && navigator.clipboard) {
    const label = copyBtn.querySelector('.btn-label');
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(copyBtn.dataset.copy || window.location.href);
        const original = label ? label.textContent : copyBtn.textContent;
        if (label) label.textContent = 'Copied!';
        else copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('is-copied');
        setTimeout(() => {
          if (label) label.textContent = original;
          else copyBtn.textContent = original;
          copyBtn.classList.remove('is-copied');
        }, 1600);
      } catch (e) {
        // No-op on failure; user can copy URL manually.
      }
    });
  }
})();
