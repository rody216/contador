export function initNavEvents() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navbar = document.querySelector('.navbar');
  const logoImg = document.querySelector('.logo-img');

  if (!hamburger || !navMenu || !navbar || !logoImg) return;

  // Menú hamburguesa
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Cerrar menú al hacer clic en un enlace
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Cambiar fondo y logo al hacer scroll
  const updateNavbarStyle = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
      logoImg.src = 'img/6w.png';
    } else {
      navbar.classList.remove('scrolled');
      logoImg.src = 'img/5b.png';
    }
  };

  window.addEventListener('scroll', updateNavbarStyle);
  updateNavbarStyle(); // Aplicar al cargar
}

