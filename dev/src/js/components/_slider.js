const sliderList = new Swiper('.slider__list', {
  preloadImages: false,
  lazy: {
    loadOnTransitionStart: true,
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true,
  },
});