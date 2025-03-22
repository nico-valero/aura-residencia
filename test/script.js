// DOM Elements
const header = document.querySelector('.header');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

// Header scroll effect
window.addEventListener('scroll', () => {
    const videoSection = document.querySelector('.video');
    if (videoSection) {
        const videoBottom = videoSection.offsetTop + videoSection.offsetHeight;
        if (window.scrollY > videoBottom - 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    } else {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Mobile menu functionality
mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('.mobile-menu')) {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Desplazamiento Suave para Enlaces de Navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Cerrar menú móvil si está abierto
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
                mobileMenu.classList.remove('active');
            }
        }
    });
});

// Validación y Envío del Formulario de Contacto
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validación básica del formulario
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
        alert('Por favor, complete todos los campos');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Por favor, ingrese una dirección de correo electrónico válida');
        return;
    }
    
    // Aquí normalmente enviarías los datos del formulario a un servidor
    // Para este ejemplo, solo mostraremos un mensaje de éxito
    alert('¡Gracias por su mensaje! Nos pondremos en contacto pronto.');
    contactForm.reset();
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Carrusel de imágenes
const carousels = document.querySelectorAll(".carousel");
const galleryArrows = document.querySelectorAll("#left, #right");
const teamArrows = document.querySelectorAll("#team-left, #team-right");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft;

const showHideIcons = (carousel) => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    const wrapper = carousel.closest('.carousel-wrapper');
    const leftIcon = wrapper.querySelector('.ri-arrow-drop-left-line');
    const rightIcon = wrapper.querySelector('.ri-arrow-drop-right-line');
    
    if (leftIcon && rightIcon) {
        leftIcon.style.display = carousel.scrollLeft == 0 ? "none" : "block";
        rightIcon.style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
    }
}

// Handle gallery carousel arrows
galleryArrows.forEach(icon => {
    icon.addEventListener("click", () => {
        const carousel = icon.closest('.carousel-wrapper').querySelector('.carousel');
        if (carousel) {
            const firstImg = carousel.querySelector("img");
            if (firstImg) {
                let firstImgWidth = firstImg.clientWidth + 14;
                carousel.scrollLeft += icon.classList.contains('ri-arrow-drop-left-line') ? -firstImgWidth : firstImgWidth;
                setTimeout(() => showHideIcons(carousel), 60);
            }
        }
    });
});

// Handle team carousel arrows
teamArrows.forEach(icon => {
    icon.addEventListener("click", () => {
        const carousel = icon.closest('.carousel-wrapper').querySelector('.carousel');
        if (carousel) {
            const firstImg = carousel.querySelector("img");
            if (firstImg) {
                let firstImgWidth = firstImg.clientWidth + 14;
                carousel.scrollLeft += icon.classList.contains('ri-arrow-drop-left-line') ? -firstImgWidth : firstImgWidth;
                setTimeout(() => showHideIcons(carousel), 60);
            }
        }
    });
});

const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    const carousel = e.target.closest('.carousel');
    if (carousel) {
        prevScrollLeft = carousel.scrollLeft;
    }
}

const dragging = (e) => {
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    const carousel = e.target.closest('.carousel');
    if (carousel) {
        carousel.classList.add("dragging");
        let currentX = e.pageX || e.touches[0].pageX;
        let diff = currentX - prevPageX;
        carousel.scrollLeft = prevScrollLeft - diff;
        showHideIcons(carousel);
    }
}

const dragStop = (e) => {
    isDragStart = false;
    const carousel = e.target.closest('.carousel');
    if (carousel) {
        carousel.classList.remove("dragging");
        isDragging = false;
    }
}

carousels.forEach(carousel => {
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("touchstart", dragStart);
});

document.addEventListener("mousemove", dragging);
document.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
document.addEventListener("touchend", dragStop);

// Initialize icons visibility
carousels.forEach(carousel => {
    showHideIcons(carousel);
});
