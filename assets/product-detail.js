(() => {
  const gallery = document.querySelector('[data-product-gallery]');
  const main = gallery?.querySelector('[data-gallery-main]');
  if (!gallery || !main) return;
  gallery.querySelectorAll('[data-gallery-thumb]').forEach((button) => {
    button.addEventListener('click', () => {
      const image = main.querySelector('img');
      if (!image) return;
      image.src = button.dataset.fullImage;
      image.alt = button.dataset.alt || image.alt;
      gallery.querySelectorAll('[data-gallery-thumb]').forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');
    });
  });
})();
