document.addEventListener("DOMContentLoaded", () => {
  // Cargar NAVBAR desde componentes (subir un nivel porque estamos en components/)
  fetch("../components/nav.html")
    .then(res => res.text())
    .then(data => {
      document.querySelector("header").innerHTML = data;
      loadNavScript();
    });

  // Cargar FOOTER
  fetch("../components/footer.html")
    .then(res => res.text())
    .then(data => {
      document.querySelector("footer").innerHTML = data;
      const yearSpan = document.getElementById("currentYear");
      if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    });
});

function loadNavScript() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}
