async function loadHTML(id, file) {
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`Failed to load ${file}`);
    const html = await res.text();
    const element = document.getElementById(id);
    if (element) {
      element.innerHTML = html;
    }
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadHTML("header", "../html/Header.html");
  await loadHTML("footer", "../html/Footer.html");

  initializeHeader();
});

function initializeHeader() {
  const hamburgerBtn = document.querySelector(".hamburger-toggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("menuOverlay");
  const closeBtn = document.querySelector(".close-btn");

  function toggleMenu() {
    if (mobileMenu && overlay) {
      mobileMenu.classList.toggle("active");
      overlay.classList.toggle("active");
    }
  }

  if (hamburgerBtn && mobileMenu && overlay) {
    hamburgerBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    overlay.addEventListener("click", toggleMenu);

    if (closeBtn) {
      closeBtn.addEventListener("click", toggleMenu);
    }

    const menuLinks = mobileMenu.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (mobileMenu.classList.contains("active")) {
          toggleMenu();
        }
      });
    });
  }
}
