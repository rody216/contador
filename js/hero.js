

function loadComponent(selector, htmlPath, cssPath) {
  return fetch(htmlPath)
    .then(res => {
      if (!res.ok) throw new Error(`Error al cargar ${htmlPath}`);
      return res.text();
    })
    .then(html => {
      const container = document.querySelector(selector);
      if (container) container.innerHTML = html;

      if (cssPath) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = cssPath;
        document.head.appendChild(link);
      }
    });
}

export function initParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
  });
}

