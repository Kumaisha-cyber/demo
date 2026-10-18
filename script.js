
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const projectSearch = document.getElementById("projectSearch");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const noResults = document.getElementById("noResults");
const backToTop = document.getElementById("backToTop");

let activeFilter = "all";

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Filter buttons
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");
    activeFilter = button.dataset.filter;

    filterProjects();
  });
});

// Search and filter
function filterProjects() {
  const searchTerm = projectSearch.value.trim().toLowerCase();
  let visibleCount = 0;

  projectCards.forEach((card) => {
    const category = card.dataset.category;
    const content = card.textContent.toLowerCase();

    const matchesCategory =
      activeFilter === "all" || category === activeFilter;

    const matchesSearch = content.includes(searchTerm);
    const shouldShow = matchesCategory && matchesSearch;

    card.hidden = !shouldShow;

    if (shouldShow) {
      visibleCount++;
    }
  });

  noResults.hidden = visibleCount !== 0;
}

projectSearch.addEventListener("input", filterProjects);

// Back to top
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 400);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Automatic current year
document.getElementById("year").textContent =
  new Date().getFullYear();

// Reveal projects as they enter the viewport
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);

projectCards.forEach((card) => {
  card.style.animationPlayState = "paused";
  revealObserver.observe(card);
});
