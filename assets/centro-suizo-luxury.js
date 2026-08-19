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
