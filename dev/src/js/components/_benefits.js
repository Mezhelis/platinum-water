const benefitsSlider = new Swiper('.benefits__slider', {
  slidesPerView: 1,
  centeredSlides: true,
  loop: true,
  breakpoints: {
    640: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 4,
      centeredSlides: false,
    },
    1200: {
      slidesPerView: 5,
      centeredSlides: true,
    },
    1400: {
      slidesPerView: 6,
      centeredSlides: false,
    }
  }
});