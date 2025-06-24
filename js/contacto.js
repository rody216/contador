export function initContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  form.addEventListener("submit", () => {
    const button = form.querySelector("button[type='submit']");
    button.textContent = "Enviando...";
    button.disabled = true;
  });
}
