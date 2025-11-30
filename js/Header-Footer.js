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
  initializeScrollEffect();
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

      // Ngăn body scroll khi menu mở
      if (mobileMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
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

function initializeScrollEffect() {
  const header = document.querySelector("header");
  let ticking = false;

  // CHỈ áp dụng scroll effect cho desktop (>1024px)
  function updateHeader() {
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;
    const isDesktop = window.innerWidth > 1024;

    if (isDesktop) {
      // Thêm class "scrolled" khi scroll xuống hơn 100px (CHỈ DESKTOP)
      if (currentScroll > 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    } else {
      // Mobile/Tablet: Luôn bỏ class scrolled
      header.classList.remove("scrolled");
    }

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateHeader();
      });
      ticking = true;
    }
  });

  // Kiểm tra khi resize màn hình
  window.addEventListener("resize", () => {
    updateHeader();
  });

  // Kiểm tra ngay khi load trang
  updateHeader();
}
