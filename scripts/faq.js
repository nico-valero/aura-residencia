document.addEventListener('DOMContentLoaded', function() {
    const questions = document.querySelectorAll('.faq-question');

    questions.forEach(question => {
        question.addEventListener('click', function() {
            const card = this.parentElement;
            const answer = this.nextElementSibling;
            const isActive = card.classList.toggle('active'); 

            answer.style.display = isActive ? 'block' : 'none';
        });
    });
});