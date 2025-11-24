// Stats Counter Animation
function initializeStatsCounter() {
  const numberItems = document.querySelectorAll(
    ".Numbers-dont-lie .number-item h2"
  );
  let animated = false;

  function animateCounter(element) {
    const text = element.textContent;
    // Extract number from text (e.g., "1.146.250+" -> 1146250)
    const numberStr = text.replace(/[^0-9]/g, "");
    const target = parseInt(numberStr);
    const hasPlusSign = text.includes("+");

    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        // Format final number with dots as thousand separators
        const formatted = target.toLocaleString("de-DE");
        element.textContent = formatted + (hasPlusSign ? "+" : "");
        clearInterval(timer);
      } else {
        // Format current number with dots as thousand separators
        const formatted = Math.floor(current).toLocaleString("de-DE");
        element.textContent = formatted + (hasPlusSign ? "+" : "");
      }
    }, 16);
  }

  function checkScroll() {
    if (animated) return;

    const numbersSection = document.querySelector(".Numbers-dont-lie");
    if (!numbersSection) return;

    const sectionTop = numbersSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Trigger animation when section is 75% visible
    if (sectionTop < windowHeight * 0.75) {
      animated = true;
      numberItems.forEach((element) => {
        animateCounter(element);
      });
    }
  }

  // Check on scroll
  window.addEventListener("scroll", checkScroll);
  // Check on load in case section is already visible
  checkScroll();
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initializeStatsCounter();
});
