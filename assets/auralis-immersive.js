(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stage = document.querySelector('[data-stage-visual]');
  const product = document.querySelector('[data-product-object]');

  if (!stage || !product || reduceMotion || window.matchMedia('(pointer: coarse)').matches) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let frame;

  const animate = () => {
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;
    product.style.transform = `rotateX(${6 - currentY * 5}deg) rotateY(${-15 + currentX * 10}deg) rotateZ(${3 + currentX * 1.5}deg) translate3d(${currentX * 9}px, ${currentY * 7}px, 0)`;
    frame = requestAnimationFrame(animate);
  };

  stage.addEventListener('pointermove', (event) => {
    const bounds = stage.getBoundingClientRect();
    targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
  });

  stage.addEventListener('pointerleave', () => {
    targetX = 0;
    targetY = 0;
  });

  animate();
  window.addEventListener('pagehide', () => cancelAnimationFrame(frame), { once: true });
})();
