// =========================================
// MOBILE NAVIGATION LOGIC
// =========================================

const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const navLinks = document.getElementById("nav-links");

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
}
