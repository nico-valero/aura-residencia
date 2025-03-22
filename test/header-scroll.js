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