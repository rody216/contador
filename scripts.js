 // Navegación móvil
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un enlace
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));

        // Cambiar navbar al hacer scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(5, 13, 17, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.background = 'rgba(5, 13, 17, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        });

        // Animación de números en estadísticas
        const animateNumbers = () => {
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
        };

        // Slider de testimonios
        const initTestimonialSlider = () => {
            const testimonials = document.querySelectorAll('.testimonial');
            const dots = document.querySelectorAll('.dot');
            let currentSlide = 0;

            const showSlide = (index) => {
                testimonials.forEach(testimonial => testimonial.classList.remove('active'));
                dots.forEach(dot => dot.classList.remove('active'));
                
                testimonials[index].classList.add('active');
                dots[index].classList.add('active');
            };

            const nextSlide = () => {
                currentSlide = (currentSlide + 1) % testimonials.length;
                showSlide(currentSlide);
            };

            // Auto-advance slider
            setInterval(nextSlide, 5000);

            // Dot navigation
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentSlide = index;
                    showSlide(currentSlide);
                });
            });
        };

        // Formulario de contacto
        const initContactForm = () => {
            const form = document.getElementById('contactForm');
            
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Recoger datos del formulario
                const formData = new FormData(form);
                const data = {
                    nombre: formData.get('nombre'),
                    email: formData.get('email'),
                    telefono: formData.get('telefono'),
                    servicio: formData.get('servicio'),
                    mensaje: formData.get('mensaje')
                };

                // Simular envío de formulario
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
        };

        // Smooth scroll para enlaces internos
        const initSmoothScroll = () => {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        const offsetTop = target.offsetTop - 70; // Ajustar por altura del navbar
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        };

        // Animaciones al hacer scroll
        const initScrollAnimations = () => {
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

            // Observar elementos que deben animarse
            document.querySelectorAll('.service-card, .credential-item, .stat-item').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        };

        // Validación de formulario en tiempo real
        const initFormValidation = () => {
            const inputs = document.querySelectorAll('input, select, textarea');
            
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    validateField(input);
                });

                input.addEventListener('input', () => {
                    if (input.classList.contains('error')) {
                        validateField(input);
                    }
                });
            });
        };

        const validateField = (field) => {
            const value = field.value.trim();
            let isValid = true;
            let errorMessage = '';

            // Remover clases de error previas
            field.classList.remove('error');
            const existingError = field.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }

            // Validaciones específicas
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

            // Campos requeridos
            if (field.hasAttribute('required') && !value) {
                isValid = false;
                errorMessage = 'Este campo es requerido';
            }

            // Mostrar error si no es válido
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
        };

        // Efecto parallax sutil para el hero
        const initParallax = () => {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero');
                if (hero) {
                    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
            });
        };

        // Inicializar todas las funciones cuando el DOM esté listo
        document.addEventListener('DOMContentLoaded', () => {
            animateNumbers();
            initTestimonialSlider();
            initContactForm();
            initSmoothScroll();
            initScrollAnimations();
            initFormValidation();
            initParallax();
        });

        // Añadir estilos CSS adicionales para validación
        const additionalStyles = `
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

        const styleSheet = document.createElement('style');
        styleSheet.textContent = additionalStyles;
        document.head.appendChild(styleSheet);