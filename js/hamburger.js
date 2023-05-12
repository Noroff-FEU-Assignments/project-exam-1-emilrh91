document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navList = document.querySelector(".nav-list");

  hamburger.addEventListener("click", function () {
    navList.classList.toggle("show");
    hamburger.classList.toggle("active");
  });

  document.addEventListener("click", function (event) {
    if (
      !navList.contains(event.target) &&
      !hamburger.contains(event.target) &&
      navList.classList.contains("show")
    ) {
      navList.classList.remove("show");
      hamburger.classList.remove("active");
    }
  });
});