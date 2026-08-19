/* CENTRO SUIZO — revelado suave de secciones al hacer scroll */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.addEventListener('DOMContentLoaded', function () {
    var targets = document.querySelectorAll(
      '.section-header, .collection-item, .product-item, .text-with-icons__item, .footer__block'
    );
    if (!targets.length || !('IntersectionObserver' in window)) return;

    targets.forEach(function (el) {
      el.classList.add('cs-reveal');
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('cs-reveal--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  });
})();

/* CENTRO SUIZO — sincroniza el dropdown de categorias (value-picker) con el <select> real de busqueda */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (event) {
      var choice = event.target.closest('[data-cs-category-value]');
      if (!choice) return;

      var wrapper = choice.closest('.cs-category-picker');
      if (!wrapper) return;

      var select = wrapper.querySelector('select');
      var label = wrapper.querySelector('[data-cs-category-label]');
      var value = choice.getAttribute('data-cs-category-value');

      if (select) {
        select.value = value;
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }

      if (label) {
        label.textContent = choice.textContent.trim();
      }

      wrapper.querySelectorAll('[data-cs-category-value]').forEach(function (item) {
        item.classList.remove('is-selected');
        item.removeAttribute('aria-current');
      });
      choice.classList.add('is-selected');
      choice.setAttribute('aria-current', 'true');

      var closeButton = wrapper.querySelector('[data-action="close-value-picker"]');
      if (closeButton) closeButton.click();
    });
  });
})();
