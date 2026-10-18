
document.addEventListener("DOMContentLoaded", () => {
  // Reveal sections and cards as they enter the screen
  const revealElements = document.querySelectorAll(
    ".section-heading, .panel, .education-card, " +
    ".skill-card, .project-card, .strength, .career-banner"
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // Highlight the navigation link for the current section
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const sections = document.querySelectorAll(
    "main section[id], main div.hero[id]"
  );

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navLinks.forEach((link) => {
            const isCurrent =
              link.getAttribute("href") === "#" + entry.target.id;

            link.classList.toggle("active", isCurrent);
          });
        });
      },
      {
        rootMargin: "-25% 0px -60% 0px"
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // Create a dark mode toggle if it is not already present
  let themeButton = document.getElementById("theme-toggle");

  if (!themeButton) {
    themeButton = document.createElement("button");
    themeButton.id = "theme-toggle";
    themeButton.type = "button";
    themeButton.className = "btn btn-secondary";
    themeButton.setAttribute("aria-label", "Toggle dark mode");
    themeButton.style.position = "fixed";
    themeButton.style.right = "18px";
    themeButton.style.bottom = "18px";
    themeButton.style.zIndex = "200";
    document.body.appendChild(themeButton);
  }

  // Remember theme choice during this browser session
  let darkMode = false;

  try {
    darkMode = localStorage.getItem("kumaisha-theme") === "dark";
  } catch (error) {
    darkMode = false;
  }

  function applyTheme() {
    document.body.classList.toggle("dark-mode", darkMode);
    themeButton.textContent = darkMode ? "☀️ Light mode" : "🌙 Dark mode";
    themeButton.setAttribute(
      "aria-pressed",
      String(darkMode)
    );
  }

  applyTheme();

  themeButton.addEventListener("click", () => {
    darkMode = !darkMode;
    applyTheme();

    try {
      localStorage.setItem(
        "kumaisha-theme",
        darkMode ? "dark" : "light"
      );
    } catch (error) {
      // Theme still works if browser storage is unavailable.
    }
  });
});
