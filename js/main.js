import { initNavEvents } from './nav.js';
import { initParallax } from './hero.js';
import { initServiciosScroll } from './servicios.js';
import { initExperienciaScroll } from './experiencia.js';
import { initTestimonialSlider } from './testimonios.js';
import { initContactForm } from './contacto.js';
import { updateFooterYear } from './footer.js';

async function loadComponent(selector, htmlPath, cssPath) {
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

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Carga los componentes en orden, y ejecuta el init justo después
    await loadComponent("header", "components/nav.html", "css/nav.css");
    initNavEvents();

    await loadComponent("#hero", "components/hero.html", "css/hero.css");
    initParallax();

    await loadComponent("#servicios", "components/servicios.html", "css/servicios.css");
    initServiciosScroll();

    await loadComponent("#experiencia", "components/experiencia.html", "css/experiencia.css");
    initExperienciaScroll();

    await loadComponent("#testimonios", "components/testimonios.html", "css/testimonios.css");
    initTestimonialSlider();

    await loadComponent("#contacto", "components/contacto.html", "css/contacto.css");
    initContactForm();

    await loadComponent("footer", "components/footer.html", "css/footer.css");
    updateFooterYear();

  } catch (error) {
    console.error("Error cargando componentes:", error);
  }
});
