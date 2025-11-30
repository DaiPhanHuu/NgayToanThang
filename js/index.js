document.addEventListener("DOMContentLoaded", function () {
  console.log("Website loaded successfully!");

  const track = document.getElementById("writerTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dots = document.querySelectorAll(".gw-dot");

  if (track) {
    const items = track.querySelectorAll(".writer-item");
    if (items.length > 0) {
      let currentIndex = 0;
      let autoSlideInterval;

      function getVisibleItems() {
        const width = window.innerWidth;
        if (width <= 560) return 1;
        if (width <= 1024) return 2;
        return 4;
      }

      function goToSlide(index) {
        const visibleItems = getVisibleItems();
        const maxIndex = Math.max(0, items.length - visibleItems);

        if (index > maxIndex) {
          currentIndex = 0;
        } else if (index < 0) {
          currentIndex = maxIndex;
        } else {
          currentIndex = index;
        }

        const itemWidth = items[0].offsetWidth;

        track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        updateDots();
      }

      function updateDots() {
        const visibleItems = getVisibleItems();
        const totalPages = Math.ceil(items.length / visibleItems);
        const currentPage = Math.floor(currentIndex / visibleItems);

        dots.forEach((dot, i) => {
          if (i < totalPages) {
            dot.style.display = "block";
            dot.classList.toggle("active", i === currentPage);
          } else {
            dot.style.display = "none";
          }
        });
      }

      // Tự động chạy mỗi 3 giây
      function startAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
          const visibleItems = getVisibleItems();
          goToSlide(currentIndex + visibleItems);
        }, 3000);
      }

      // Xử lý nút Previous
      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          const visibleItems = getVisibleItems();
          goToSlide(currentIndex - visibleItems);
          startAutoSlide(); // Reset auto slide
        });
      }

      // Xử lý nút Next
      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          const visibleItems = getVisibleItems();
          goToSlide(currentIndex + visibleItems);
          startAutoSlide();
        });
      }

      // Xử lý click vào dots
      dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
          const visibleItems = getVisibleItems();
          goToSlide(i * visibleItems);
          startAutoSlide();
        });
      });

      // Xử lý khi resize màn hình
      window.addEventListener("resize", () => {
        track.style.transition = "none";
        goToSlide(currentIndex);
        setTimeout(() => {
          track.style.transition = "transform 0.5s ease-in-out";
        }, 50);
      });

      startAutoSlide();
      updateDots();
    }
  }

  const numberSection = document.querySelector(".numbers-dont-lie");
  const numberItems = document.querySelectorAll(".number-item h2");
  let animated = false;

  function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      const currentVal = Math.floor(progress * (end - start) + start);
      obj.innerHTML = currentVal.toLocaleString("vi-VN") + "+";

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  function checkScroll() {
    if (animated || !numberSection) return;

    const rect = numberSection.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    if (rect.top <= windowHeight * 0.8) {
      animated = true;
      numberItems.forEach((item) => {
        const text = item.innerText.replace(/\./g, "").replace(/\+/g, "");
        const target = parseInt(text);
        if (!isNaN(target)) {
          animateValue(item, 0, target, 2000);
        }
      });
    }
  }

  window.addEventListener("scroll", checkScroll);
});
