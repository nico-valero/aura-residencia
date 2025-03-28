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

const handleCarouselArrow = (icon) => {
    const carousel = icon.closest('.carousel-wrapper').querySelector('.carousel');
    if (carousel) {
        const firstImg = carousel.querySelector("img");
        if (firstImg) {
            let firstImgWidth = firstImg.clientWidth + 14;
            carousel.scrollLeft += icon.classList.contains('ri-arrow-drop-left-line') ? -firstImgWidth : firstImgWidth;
            setTimeout(() => showHideIcons(carousel), 60);
        }
    }
}

// Handle gallery and team carousel arrows
[...galleryArrows, ...teamArrows].forEach(icon => {
    icon.addEventListener("click", () => handleCarouselArrow(icon));
    
    // Add keyboard handler for Enter key
    icon.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleCarouselArrow(icon);
        }
    });
    
    // Make arrows focusable and add role
    icon.setAttribute("tabindex", "0");
    icon.setAttribute("role", "button");
    icon.setAttribute("aria-label", icon.classList.contains('ri-arrow-drop-left-line') ? "Previous slide" : "Next slide");
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