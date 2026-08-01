(() => {
  const page = document.querySelector('[data-product-page]');
  const gallery = page?.querySelector('[data-product-gallery]');
  const main = gallery?.querySelector('[data-gallery-main]');
  if (!gallery || !main) return;
  const thumbs = [...gallery.querySelectorAll('[data-gallery-thumb]')];
  const select = page.querySelector('.product-native-variant');
  const price = page.querySelector('[data-product-price]');
  const finish = page.querySelector('[data-selected-finish]');
  const pickers = [...page.querySelectorAll('[data-product-variant-picker]')];
  const showImage = (mediaId) => {
    const thumb = thumbs.find((item) => item.dataset.mediaId === String(mediaId));
    if (!thumb) return;
    const image = main.querySelector('img');
    if (!image) return;
    image.src = thumb.dataset.fullImage;
    image.alt = thumb.dataset.alt || image.alt;
    thumbs.forEach((item) => { const active = item === thumb; item.classList.toggle('is-active', active); item.setAttribute('aria-pressed', String(active)); });
  };
  thumbs.forEach((button) => {
    button.addEventListener('click', () => {
      showImage(button.dataset.mediaId);
    });
  });
  const syncVariant = () => {
    const option = select?.selectedOptions?.[0];
    if (!option) return;
    if (price && option.dataset.price) price.textContent = option.dataset.price;
    if (finish) finish.textContent = option.textContent;
    pickers.forEach((picker) => { const active = picker.dataset.variantId === select.value; picker.classList.toggle('is-active', active); picker.setAttribute('aria-pressed', String(active)); });
    showImage(option.dataset.mediaId);
  };
  pickers.forEach((picker) => picker.addEventListener('click', () => { if (!select) return; select.value = picker.dataset.variantId; select.dispatchEvent(new Event('change', { bubbles: true })); }));
  select?.addEventListener('change', syncVariant);
  syncVariant();
})();
