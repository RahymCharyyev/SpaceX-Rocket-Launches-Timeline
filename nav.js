$(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $(".header__nav").addClass("color");
    } else {
      $(".header__nav").removeClass("color");
    }
  });
});
