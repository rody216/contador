document.addEventListener("DOMContentLoaded", () => {
  // Cargar NAVBAR desde components/
  fetch("../components/nav.html")
    .then(res => res.text())
    .then(data => {
      document.querySelector("header").innerHTML = data;
      loadNavScript();
    });

  // Cargar FOOTER desde components/
  fetch("../components/footer.html")
    .then(res => res.text())
    .then(data => {
      document.querySelector("footer").innerHTML = data;
      const yearSpan = document.getElementById("currentYear");
      if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
      }
    });
});

// ✅ Solo una definición limpia
function loadNavScript() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navbar = document.querySelector('.navbar');
  const logo = document.getElementById('logo');

  if (!hamburger || !navMenu || !navbar || !logo) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  const updateNavbarStyle = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
      logo.src = '../img/6b.png'; // logo oscuro
    } else {
      navbar.classList.remove('scrolled');
      logo.src = '../img/5b.png'; // logo claro
    }
  };

  window.addEventListener('scroll', updateNavbarStyle);
  updateNavbarStyle(); // Al cargar
}
