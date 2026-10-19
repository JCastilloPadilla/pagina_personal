const gallery = document.querySelector<HTMLElement>('[data-gallery]');

if (gallery) {
  const main = gallery.querySelector<HTMLImageElement>('#gallery-main');
  const caption = gallery.querySelector<HTMLElement>('[data-gallery-caption]');
  const status = gallery.querySelector<HTMLElement>('[data-gallery-status]');
  const options = gallery.querySelectorAll<HTMLAnchorElement>('[data-view]');

  options.forEach((option) => {
    option.addEventListener('click', (event) => {
      // Conservar las acciones nativas de abrir imagen en otra pestaña.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const image = option.querySelector('img');
      if (!main || !image || !caption || !status) return;
      event.preventDefault();
      main.src = option.href;
      main.alt = image.alt;
      main.width = image.width;
      main.height = image.height;
      caption.textContent = option.dataset.caption ?? '';
      options.forEach((item) => item.removeAttribute('aria-current'));
      option.setAttribute('aria-current', 'true');
      status.textContent = `Mostrando: ${image.alt}`;
    });
  });
}

// El contenido siempre es visible; JS sólo agrega el movimiento de entrada.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}
