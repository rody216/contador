document.addEventListener('DOMContentLoaded', () => {
    Promise.all([
        fetch("components/nav.html").then(res => {
            if (!res.ok) throw new Error("Error cargando nav.html");
            return res.text();
        }).then(data => {
            const nav = document.createElement("div");
            nav.innerHTML = data;
            document.body.prepend(nav);
            const navCSS = document.createElement("link");
            navCSS.rel = "stylesheet";
            navCSS.href = "css/nav.css";
            document.head.appendChild(navCSS);
        }),

        fetch("components/footer.html").then(res => {
            if (!res.ok) throw new Error("Error cargando footer.html");
            return res.text();
        }).then(data => {
            const footer = document.createElement("div");
            footer.innerHTML = data;
            document.body.appendChild(footer);
            const footerCSS = document.createElement("link");
            footerCSS.rel = "stylesheet";
            footerCSS.href = "css/footer.css";
            document.head.appendChild(footerCSS);
        })
    ]).then(() => {
        setTimeout(() => {
            initNavEvents();
            animateNumbers();
            initTestimonialSlider();
            initContactForm();
            initSmoothScroll();
            initScrollAnimations();
            initFormValidation();
            initParallax();
            applyValidationStyles();
        }, 100);
    }).catch(error => {
        console.error("Error cargando componentes:", error);
    });
});

function initNavEvents() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => {
        n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.background = 'rgba(5, 13, 17, 0.95)';
            navbar.style.boxShadow = window.scrollY > 50 ?
                '0 2px 20px rgba(0, 0, 0, 0.15)' :
                '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Animación de estadísticas
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;

                const updateNumber = () => {
                    if (current < target) {
                        current += increment;
                        entry.target.textContent = Math.ceil(current);
                        setTimeout(updateNumber, 20);
                    } else {
                        entry.target.textContent = target;
                    }
                };

                updateNumber();
                observer.unobserve(entry.target);
            }
        });
    });

    stats.forEach(stat => observer.observe(stat));
}

// Slider de testimonios
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    const showSlide = (index) => {
        testimonials.forEach(t => t.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % testimonials.length;
        showSlide(currentSlide);
    };

    setInterval(nextSlide, 5000);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
}

// Formulario de contacto
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.textContent;

        button.textContent = 'Enviando...';
        button.disabled = true;

        setTimeout(() => {
            alert('¡Gracias por su consulta! Nos pondremos en contacto con usted pronto.');
            form.reset();
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
    });
}

// Scroll suave
function initSmoothScroll() {
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 70;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === "#") return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const scrollTo = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
                window.scrollTo({
                    top: scrollTo >= 0 ? scrollTo : 0,
                    behavior: "smooth"
                });
            }
        });
    });
}



// Animaciones al hacer scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .credential-item, .stat-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function initNavEvents() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    if (!hamburger || !navMenu || !navbar) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => {
        n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    const updateNavbarStyle = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', updateNavbarStyle);
    updateNavbarStyle(); // Llamar al cargar la página
}


// Validación de formulario
function initFormValidation() {
    const inputs = document.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) existingError.remove();

    switch (field.type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor ingrese un email válido';
            }
            break;
        case 'tel':
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,}$/;
            if (value && !phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor ingrese un teléfono válido';
            }
            break;
    }

    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Este campo es requerido';
    }

    if (!isValid) {
        field.classList.add('error');
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = errorMessage;
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '0.25rem';
        errorElement.style.display = 'block';
        field.parentNode.appendChild(errorElement);
    }

    return isValid;
}

// Parallax en la sección hero
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Estilos para errores y animación del menú
function applyValidationStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
            border-color: #e74c3c !important;
            box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
        }

        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }

        .hamburger.active .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    `;
    document.head.appendChild(styleSheet);
}