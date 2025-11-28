async function loadHTML(id, file) {
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`Failed to load ${file}`);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
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
    const hamburgerButton = document.querySelector('.hamburger-toggle');
    const mobileMenu = document.querySelector('.mobile-nav-menu');
    
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 99998;
        display: none;
        transition: opacity 0.3s ease-in-out;
    `;
    document.body.appendChild(overlay);
    
    if (hamburgerButton && mobileMenu){
        hamburgerButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-open');
            overlay.style.display = mobileMenu.classList.contains('is-open') ? 'block' : 'none';
        });

        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('is-open');
                overlay.style.display = 'none';
            });
        });

        document.addEventListener('click', (event) => {
            const isClickInsideMenu = mobileMenu.contains(event.target);
            const isClickOnButton = hamburgerButton.contains(event.target);

            if (!isClickInsideMenu && !isClickOnButton && mobileMenu.classList.contains('is-open')) {
                mobileMenu.classList.remove('is-open');
                overlay.style.display = 'none';
            }
        });
      overlay.addEventListener('click', () => {
            mobileMenu.classList.remove('is-open');
            overlay.style.display = 'none';
      });
    }
}