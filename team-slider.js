document.addEventListener('DOMContentLoaded', function() {
    // Prevent context menu on images
    document.querySelectorAll('.member-image img').forEach(img => {
        img.addEventListener('contextmenu', e => e.preventDefault());
    });

    const teamGrid = document.querySelector('.team-grid');
    const prevButton = document.querySelector('.team-arrow.prev');
    const nextButton = document.querySelector('.team-arrow.next');
    
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    function showHideArrows() {
        const scrollWidth = teamGrid.scrollWidth - teamGrid.clientWidth;
        prevButton.style.display = teamGrid.scrollLeft === 0 ? 'none' : 'flex';
        nextButton.style.display = teamGrid.scrollLeft >= scrollWidth ? 'none' : 'flex';
    }

    function dragStart(e) {
        isDragging = true;
        startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        scrollLeft = teamGrid.scrollLeft;
        teamGrid.classList.add('dragging');
    }

    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        const diff = currentX - startX;
        teamGrid.scrollLeft = scrollLeft - diff;
    }

    function dragEnd() {
        isDragging = false;
        teamGrid.classList.remove('dragging');
        showHideArrows();
    }

    // Button controls
    prevButton.addEventListener('click', () => {
        const scrollAmount = teamGrid.clientWidth * 0.8;
        teamGrid.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    nextButton.addEventListener('click', () => {
        const scrollAmount = teamGrid.clientWidth * 0.8;
        teamGrid.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Add event listeners
    teamGrid.addEventListener('mousedown', dragStart);
    teamGrid.addEventListener('touchstart', dragStart);
    window.addEventListener('mousemove', drag);
    window.addEventListener('touchmove', drag);
    window.addEventListener('mouseup', dragEnd);
    window.addEventListener('touchend', dragEnd);

    // Show/hide arrows on scroll
    teamGrid.addEventListener('scroll', showHideArrows);

    // Initial check for arrows
    showHideArrows();
});