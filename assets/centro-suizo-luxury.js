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

/* CENTRO SUIZO — dropdown de categorias del buscador, autocontenido.
   El tema no maneja value-picker de forma generica: cada dropdown se
   registra a mano por ID en su seccion (footer, ordenar, etc). En vez de
   tocar theme.min.js, replicamos aca el mismo abrir/cerrar. */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var wrapper = document.querySelector('.cs-category-picker');
    if (!wrapper) return;

    var trigger = wrapper.querySelector('[data-action="open-value-picker"]');
    var picker = wrapper.querySelector('.value-picker');
    var closeBtn = wrapper.querySelector('[data-action="close-value-picker"]');
    var select = wrapper.querySelector('select');
    var label = wrapper.querySelector('[data-cs-category-label]');
    if (!trigger || !picker) return;

    function open() {
      trigger.setAttribute('aria-expanded', 'true');
      picker.setAttribute('aria-hidden', 'false');
    }

    function close() {
      trigger.setAttribute('aria-expanded', 'false');
      picker.setAttribute('aria-hidden', 'true');
    }

    trigger.addEventListener('click', function (event) {
      event.stopPropagation();
      if (picker.getAttribute('aria-hidden') === 'false') {
        close();
      } else {
        open();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function (event) {
        event.stopPropagation();
        close();
      });
    }

    document.addEventListener('click', function (event) {
      if (picker.getAttribute('aria-hidden') === 'false' && !wrapper.contains(event.target)) {
        close();
      }
    });

    wrapper.addEventListener('click', function (event) {
      var choice = event.target.closest('[data-cs-category-value]');
      if (!choice) return;

      var value = choice.getAttribute('data-cs-category-value');
      if (select) {
        select.value = value;
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
      if (label) label.textContent = choice.textContent.trim();

      wrapper.querySelectorAll('[data-cs-category-value]').forEach(function (item) {
        item.classList.remove('is-selected');
        item.removeAttribute('aria-current');
      });
      choice.classList.add('is-selected');
      choice.setAttribute('aria-current', 'true');

      close();
    });
  });
})();
