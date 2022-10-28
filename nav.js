let scroll = document.getElementById("nav");
window.addEventListener("scroll", () => {
  document.body.scrollTop > 150 || document.documentElement.scrollTop > 150
    ? scroll.classList.add("header__nav-bg")
    : scroll.classList.remove("header__nav-bg");
});
