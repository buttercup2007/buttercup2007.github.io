document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll(".scroll-section");

    function checkVisibility() {
         const triggerBottom = window.innerHeight * 0.85;

         sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if(section < triggerBottom) {
                section.classList.add("visible");
            }
         });
    }

    window.addEventListener("scroll", checkVisibility);
    checkVisibility();
})