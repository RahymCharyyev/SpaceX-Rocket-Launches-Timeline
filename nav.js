$(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $(".header__nav").addClass("header__nav-bg");
    } else {
      $(".header__nav").removeClass("header__nav-bg");
    }
  });
});
