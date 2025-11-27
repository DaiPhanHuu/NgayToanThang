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

// Dữ liệu nhà văn
const writers = [
  {
    name: "Tố Hữu",
    role: "Nhà thơ cách mạng",
    image: "../assets/main-ToHuu.png",
    quote: "Từ ấy trong tôi bừng nắng hạ<br />Mặt trời chân lý chói qua tim",
  },
  {
    name: "Xuân Diệu",
    role: "Nhà Thơ",
    image: "../assets/main-XuanDieu.png",
    quote:
      "Tôi cùng xương thịt với nhân dân của tôi<br />Cùng đổ mồ hôi, cùng sôi giọt máu<br />Tôi sống với cuộc đời chiến đấu<br />Của triệu người yêu dấu gian lao",
  },
  {
    name: "Chế Lan Viên",
    role: "Nhà Thơ",
    image: "../assets/main-CheLanVien.png",
    quote:
      "Chẳng phải lật sách nào ra tìm hiểu Bác<br />Bác sống trong ta, Bác ở giữa đời",
  },
  {
    name: "Nguyễn Đình Thi",
    role: "Nhà Thơ",
    image: "../assets/main-NguyenDinhThi.png",
    quote:
      "Nước chúng ta<br />Nước những người chưa bao giờ khuất<br />Đêm đêm rì rầm trong tiếng đất<br />Những buổi ngày xưa vọng nói về",
  },
  {
    name: "Tố Hữu",
    role: "Nhà thơ cách mạng",
    image: "../assets/main-ToHuu.png",
    quote: "Từ ấy trong tôi bừng nắng hạ<br />Mặt trời chân lý chói qua tim",
  },
  {
    name: "Xuân Diệu",
    role: "Nhà Thơ",
    image: "../assets/main-XuanDieu.png",
    quote:
      "Tôi cùng xương thịt với nhân dân của tôi<br />Cùng đổ mồ hôi, cùng sôi giọt máu<br />Tôi sống với cuộc đời chiến đấu<br />Của triệu người yêu dấu gian lao",
  },
  {
    name: "Chế Lan Viên",
    role: "Nhà Thơ",
    image: "../assets/main-CheLanVien.png",
    quote:
      "Chẳng phải lật sách nào ra tìm hiểu Bác<br />Bác sống trong ta, Bác ở giữa đời",
  },
  {
    name: "Nguyễn Đình Thi",
    role: "Nhà Thơ",
    image: "../assets/main-NguyenDinhThi.png",
    quote:
      "Nước chúng ta<br />Nước những người chưa bao giờ khuất<br />Đêm đêm rì rầm trong tiếng đất<br />Những buổi ngày xưa vọng nói về",
  },
  {
    name: "Tố Hữu",
    role: "Nhà thơ cách mạng",
    image: "../assets/main-ToHuu.png",
    quote: "Từ ấy trong tôi bừng nắng hạ<br />Mặt trời chân lý chói qua tim",
  },
  {
    name: "Xuân Diệu",
    role: "Nhà Thơ",
    image: "../assets/main-XuanDieu.png",
    quote:
      "Tôi cùng xương thịt với nhân dân của tôi<br />Cùng đổ mồ hôi, cùng sôi giọt máu<br />Tôi sống với cuộc đời chiến đấu<br />Của triệu người yêu dấu gian lao",
  },
  {
    name: "Chế Lan Viên",
    role: "Nhà Thơ",
    image: "../assets/main-CheLanVien.png",
    quote:
      "Chẳng phải lật sách nào ra tìm hiểu Bác<br />Bác sống trong ta, Bác ở giữa đời",
  },
  {
    name: "Nguyễn Đình Thi",
    role: "Nhà Thơ",
    image: "../assets/main-NguyenDinhThi.png",
    quote:
      "Nước chúng ta<br />Nước những người chưa bao giờ khuất<br />Đêm đêm rì rầm trong tiếng đất<br />Những buổi ngày xưa vọng nói về",
  },
  {
    name: "Tố Hữu",
    role: "Nhà thơ cách mạng",
    image: "../assets/main-ToHuu.png",
    quote: "Từ ấy trong tôi bừng nắng hạ<br />Mặt trời chân lý chói qua tim",
  },
  {
    name: "Xuân Diệu",
    role: "Nhà Thơ",
    image: "../assets/main-XuanDieu.png",
    quote:
      "Tôi cùng xương thịt với nhân dân của tôi<br />Cùng đổ mồ hôi, cùng sôi giọt máu<br />Tôi sống với cuộc đời chiến đấu<br />Của triệu người yêu dấu gian lao",
  },
  {
    name: "Chế Lan Viên",
    role: "Nhà Thơ",
    image: "../assets/main-CheLanVien.png",
    quote:
      "Chẳng phải lật sách nào ra tìm hiểu Bác<br />Bác sống trong ta, Bác ở giữa đời",
  },
  {
    name: "Nguyễn Đình Thi",
    role: "Nhà Thơ",
    image: "../assets/main-NguyenDinhThi.png",
    quote:
      "Nước chúng ta<br />Nước những người chưa bao giờ khuất<br />Đêm đêm rì rầm trong tiếng đất<br />Những buổi ngày xưa vọng nói về",
  },
];

let currentIndex = 0;
const itemsPerPage = 4;

// Hàm khởi tạo carousel nhà văn
function initializeWritersCarousel() {
  const writerItems = document.querySelectorAll(".writer-item");
  const navLeft = document.querySelector(".gw-nav-left");
  const navRight = document.querySelector(".gw-nav-right");
  const dots = document.querySelectorAll(".gw-dot");

  if (!writerItems.length || !navLeft || !navRight || !dots.length) {
    return; // Không tìm thấy elements cần thiết
  }

  // Hàm cập nhật hiển thị nhà văn
  function updateWriters() {
    writerItems.forEach((item, index) => {
      const writerIndex = (currentIndex + index) % writers.length;
      const writer = writers[writerIndex];

      const img = item.querySelector("img");
      const paragraphs = item.querySelectorAll("p");

      img.src = writer.image;
      img.alt = `Nhà văn ${writer.name}`;
      paragraphs[0].textContent = writer.name;
      paragraphs[1].textContent = writer.role;
      paragraphs[2].innerHTML = `"${writer.quote}"`;
    });

    updateDots();
  }

  // Hàm cập nhật dots
  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle(
        "active",
        index === Math.floor(currentIndex / itemsPerPage) % dots.length
      );
    });
  }

  // Xử lý click nút trái (previous)
  navLeft.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + writers.length) % writers.length;
    updateWriters();
  });

  // Xử lý click nút phải (next)
  navRight.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % writers.length;
    updateWriters();
  });

  // Xử lý click vào dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index * itemsPerPage;
      updateWriters();
    });
  });

  // Khởi tạo
  updateDots();
}

// Stats Counter Animation
function initializeStatsCounter() {
  const numberItems = document.querySelectorAll(
    ".Numbers-dont-lie .number-item h2"
  );
  let animated = false;

  function animateCounter(element) {
    const text = element.textContent;
    const numberStr = text.replace(/[^0-9]/g, "");
    const target = parseInt(numberStr);
    const hasPlusSign = text.includes("+");

    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        const formatted = target.toLocaleString("de-DE");
        element.textContent = formatted + (hasPlusSign ? "+" : "");
        clearInterval(timer);
      } else {
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

    if (sectionTop < windowHeight * 0.75) {
      animated = true;
      numberItems.forEach((element) => {
        animateCounter(element);
      });
    }
  }

  window.addEventListener("scroll", checkScroll);
  checkScroll();
}

// Khởi tạo tất cả khi DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initializeWritersCarousel();
  initializeStatsCounter();
});
