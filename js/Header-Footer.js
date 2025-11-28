// Hàm tải nội dung HTML (Header/Footer)
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

// Chạy khi trang web tải xong
document.addEventListener("DOMContentLoaded", async () => {
  // 1. Tải Header và Footer
  await loadHTML("header", "../html/Header.html");
  await loadHTML("footer", "../html/Footer.html");

  // 2. Sau khi tải xong HTML thì mới gán sự kiện click
  initializeHeader();
});

function initializeHeader() {
  // Lấy các phần tử từ DOM theo Class/ID mới trong HTML
  const hamburgerBtn = document.querySelector(".hamburger-toggle");
  const mobileMenu = document.getElementById("mobileMenu"); // ID đã thêm vào HTML
  const overlay = document.getElementById("menuOverlay"); // ID đã thêm vào HTML
  const closeBtn = document.querySelector(".close-btn"); // Nút đóng (X) trong sidebar

  // Hàm bật/tắt menu
  function toggleMenu() {
    if (mobileMenu && overlay) {
      // Toggle class 'active' để kích hoạt CSS transform/opacity
      mobileMenu.classList.toggle("active");
      overlay.classList.toggle("active");
    }
  }

  // Kiểm tra nếu các phần tử tồn tại thì mới gán sự kiện
  if (hamburgerBtn && mobileMenu && overlay) {
    // 1. Click nút Hamburger -> Mở/Đóng menu
    hamburgerBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Ngăn chặn sự kiện nổi bọt
      toggleMenu();
    });

    // 2. Click vào Overlay (vùng tối bên ngoài) -> Đóng menu
    overlay.addEventListener("click", toggleMenu);

    // 3. Click nút Close (X) -> Đóng menu
    if (closeBtn) {
      closeBtn.addEventListener("click", toggleMenu);
    }

    // 4. (Tùy chọn) Click vào bất kỳ link nào trong menu -> Đóng menu
    // Giúp trải nghiệm người dùng tốt hơn, chọn xong thì menu tự ẩn
    const menuLinks = mobileMenu.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        // Chỉ đóng nếu menu đang mở
        if (mobileMenu.classList.contains("active")) {
          toggleMenu();
        }
      });
    });
  }
}
