// DOM Elements
const header = document.querySelector('.header');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

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
