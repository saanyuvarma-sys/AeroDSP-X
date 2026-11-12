
// AeroDSP-X Interactive Portfolio

document.addEventListener("DOMContentLoaded", () => {

  // Highlight the navigation link for the current section
  const sections = document.querySelectorAll("main section");
  const navLinks = document.querySelectorAll("nav a");

  function updateNavigation() {
    let currentSection = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 130;

      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + currentSection
      );
    });
  }

  window.addEventListener("scroll", updateNavigation);
  updateNavigation();

  // Reveal project cards when they enter the screen
  const cards = document.querySelectorAll(".card");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    cards.forEach(card => observer.observe(card));
  } else {
    cards.forEach(card => card.classList.add("visible"));
  }

  // Display current year in footer
  const footer = document.querySelector("footer");

  if (footer) {
    const year = document.createElement("p");
    year.textContent = "© " + new Date().getFullYear() + " AeroDSP-X";
    footer.appendChild(year);
  }

});
