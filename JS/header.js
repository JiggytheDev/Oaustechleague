const openMobileNav = document.getElementById("open-nav-header");
const closeMobileNav = document.getElementById("close-nav-header");
const headerNav = document.getElementById("headerNav");

openMobileNav.addEventListener("click", () => {
  headerNav.style.display = "flex";
});

closeMobileNav.addEventListener("click", () => {
  headerNav.style.display = "none";
});