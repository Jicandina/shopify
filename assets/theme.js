(() => {
  const menuButton = document.querySelector('[data-menu-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    mobileNav?.classList.toggle('is-open', !open);
  });

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-tilt]').forEach((element) => {
    if (reduced || window.matchMedia('(pointer: coarse)').matches) return;
    element.addEventListener('pointermove', (event) => {
      const box = element.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - .5;
      const y = (event.clientY - box.top) / box.height - .5;
      element.style.transform = `perspective(1000px) rotateX(${y * -7}deg) rotateY(${x * 9}deg) translate3d(${x * 8}px, ${y * 8}px, 0)`;
    });
    element.addEventListener('pointerleave', () => { element.style.transform = ''; });
  });

  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  }), { threshold: .12 });
  document.querySelectorAll('.fade-up').forEach((element) => observer.observe(element));
})();
