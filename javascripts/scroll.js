jQuery(function () {
  const arrowIcon = $('.arrow-icon');
  $(window).on('scroll', function () {
    const scroll = $(window).scrollTop();
    if (scroll >= 10) {
      arrowIcon.removeClass('arrow-bounce');
      arrowIcon.addClass('arrow-fade');
    } else {
      arrowIcon.removeClass('arrow-fade');
      arrowIcon.addClass('arrow-bounce');
    }
  });
});
