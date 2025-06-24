export function updateFooterYear() {
  const yearSpan = document.querySelector(".footer-bottom p");
  if (yearSpan) {
    const year = new Date().getFullYear();
    yearSpan.innerHTML = `&copy; ${year} Evelio Bustos - Contador Público Certificado. Todos los derechos reservados.`;
  }
}
