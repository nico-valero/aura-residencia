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