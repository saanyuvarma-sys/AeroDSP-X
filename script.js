
document.addEventListener("DOMContentLoaded", () => {

    // Update copyright year
    const year = document.getElementById("year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Active navigation
    const sections = document.querySelectorAll("main section");
    const navLinks = document.querySelectorAll("nav a");

    function updateNavigation() {
        let current = "";

        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 150) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + current
            );
        });
    }

    window.addEventListener("scroll", updateNavigation);
    updateNavigation();

    // Reveal all matching project cards
    const revealItems = document.querySelectorAll(
        ".info-card, .technical-card, .metric-card, .research-panel"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05 });

        revealItems.forEach(item => observer.observe(item));

    } else {
        revealItems.forEach(item => item.classList.add("visible"));
    }

});
