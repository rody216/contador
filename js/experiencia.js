export function initExperienciaScroll() {
  const elementsToAnimate = document.querySelectorAll('.credential-item, .stat-item');
  const statNumbers = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Si es número, activa la animación de conteo
        if (entry.target.classList.contains('stat-item')) {
          const number = entry.target.querySelector('.stat-number');
          if (number) animateNumber(number);
        }

        // obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  elementsToAnimate.forEach(el => observer.observe(el));
}

// 🔢 Función que anima el contador desde 0 hasta data-target
function animateNumber(element) {
  const target = parseInt(element.getAttribute('data-target'), 10);
  if (!target) return;

  let current = 0;
  const increment = Math.ceil(target / 60); // puedes ajustar la velocidad aquí

  const update = () => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
    } else {
      element.textContent = current;
      requestAnimationFrame(update);
    }
  };

  update();
}
