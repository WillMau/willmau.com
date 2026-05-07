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

  // Election countdown: drives both the hero chip and the Help Win eyebrow
  // from a single date source so neither goes stale as May 19 approaches.
  const cd = document.getElementById('hero-countdown');
  const eyebrow = document.getElementById('help-win-eyebrow');
  if (cd || eyebrow) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const electionDay = new Date(2026, 4, 19); // May 19, 2026
    const days = Math.round((electionDay - today) / 86400000);
    const hour = now.getHours();

    let chipText = '';
    let eyebrowText = '';
    let urgent = false;

    if (days > 14) {
      const weeks = Math.round(days / 7);
      chipText = days + ' days to go';
      eyebrowText = weeks + ' weeks out';
    } else if (days > 7) {
      chipText = days + ' days to go';
      eyebrowText = days + ' days out';
    } else if (days > 1) {
      chipText = days + ' days to go';
      eyebrowText = days + ' days out';
      urgent = true;
    } else if (days === 1) {
      chipText = 'Tomorrow, polls 6am-9pm';
      eyebrowText = 'Tomorrow';
      urgent = true;
    } else if (days === 0) {
      if (hour < 21) {
        chipText = 'Today, polls open until 9pm';
      } else {
        chipText = 'Polls have closed, thank you';
      }
      eyebrowText = 'Today';
      urgent = true;
    } else {
      chipText = '';
      eyebrowText = 'Thank you for voting';
    }

    if (cd) {
      if (chipText) {
        cd.textContent = chipText;
        cd.hidden = false;
        if (urgent) cd.classList.add('is-urgent');
      } else {
        cd.hidden = true;
      }
    }
    if (eyebrow && eyebrowText) {
      eyebrow.textContent = eyebrowText;
    }
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
