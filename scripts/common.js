(function () {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  document.querySelectorAll('form.notify-form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      const action = form.getAttribute('action') || '';
      const msg = form.querySelector('.form-msg');
      if (!action || action.includes('YOUR_FORMSPREE_ENDPOINT')) {
        e.preventDefault();
        const email = (form.querySelector('input[type="email"]')?.value || '').trim();
        if (!email) {
          if (msg) msg.textContent = 'Please enter an email.';
          return;
        }
        if (msg) msg.textContent = "You're on the list — we'll be in touch.";
        form.reset();
      }
    });
  });

  document.querySelectorAll('.marquee-track').forEach((track) => {
    const content = track.innerHTML;
    track.innerHTML = content + content;
  });
})();
