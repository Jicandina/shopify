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

(() => {
  document.querySelectorAll('[data-product-gallery]').forEach((gallery) => {
    const purchase = gallery.closest('[data-purchase-panel]');
    const select = purchase?.querySelector('.auralis-native-variant');
    const price = purchase?.querySelector('[data-variant-price]');
    const colour = purchase?.querySelector('[data-selected-colour]');
    const thumbs = [...gallery.querySelectorAll('[data-gallery-thumb]')];
    const slides = [...gallery.querySelectorAll('[data-gallery-slide]')];
    const pickers = purchase ? [...purchase.querySelectorAll('[data-variant-picker]')] : [];

    const showMedia = (mediaId) => {
      if (!mediaId) return;
      slides.forEach((slide) => {
        const active = slide.dataset.mediaId === String(mediaId);
        slide.hidden = !active;
        slide.classList.toggle('is-active', active);
      });
      thumbs.forEach((thumb) => {
        const active = thumb.dataset.mediaId === String(mediaId);
        thumb.classList.toggle('is-active', active);
        thumb.setAttribute('aria-pressed', String(active));
      });
    };

    thumbs.forEach((thumb) => thumb.addEventListener('click', () => showMedia(thumb.dataset.mediaId)));

    const syncVariant = () => {
      const option = select?.selectedOptions?.[0];
      if (!option) return;
      if (price && option.dataset.price) price.textContent = option.dataset.price;
      if (colour) colour.textContent = option.textContent;
      pickers.forEach((picker) => picker.classList.toggle('is-active', picker.dataset.variantId === select.value));
      showMedia(option.dataset.mediaId);
    };

    pickers.forEach((picker) => picker.addEventListener('click', () => {
      if (!select) return;
      select.value = picker.dataset.variantId;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }));

    select?.addEventListener('change', syncVariant);
    syncVariant();
  });
})();
