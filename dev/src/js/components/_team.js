const teamSlider = new Swiper('.team__slider', {
  slidesPerView: 1,
  freeMode: true,
  loop: true,
  navigation: {
    nextEl: '.team__arrow-next',
    prevEl: '.team__arrow-prev',
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
    1400: {
      slidesPerView: 5,
    }
  }
});