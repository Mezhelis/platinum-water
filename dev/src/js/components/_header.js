// Открытие\закрытие попап
const popup = document.querySelector('.header__popup-wrap');
const contactsNav = document.querySelector('.header__contacts-nav');
const logo = document.querySelector('.header__logo');
const header = document.querySelector('.header');
const body = document.querySelector('body');

function popupCloseOpen() {
  let scrollWidth = computedScroll();

  if (!body.style.paddingRight) {
    body.style.paddingRight = `${scrollWidth}px`;
  } else {
    body.style.paddingRight = null;
  };

  if (!header.style.paddingRight) {
    header.style.paddingRight = `${scrollWidth}px`;
  } else {
    header.style.paddingRight = null;
  };

  popup.classList.toggle('header__popup-wrap--open');
  contactsNav.classList.toggle('header__contacts-nav--hidden');
  logo.classList.toggle('header__logo--left');
  body.classList.toggle('lock');
};

// Ширина скролла
function computedScroll() {
  const div = document.createElement('div');
  div.style.cssText = 'overflow-y: scroll; width: 50px; height: 50px; visibility: hidden';
  document.body.appendChild(div);
  let scroll = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div);
  return scroll;
};

// Открытие\закрытие меню
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');

menuBtn.addEventListener('click', function () {
  menu.classList.toggle('menu--active');
  menuBtn.classList.toggle('menu-btn--close');
  popupCloseOpen();
});

const anchors = document.querySelectorAll('a.menu__link[href*="#"]');

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {

    menu.classList.remove('menu--active');
    menuBtn.classList.remove('menu-btn--close');
    popupCloseOpen();

    e.preventDefault();

    let blockID = anchor.getAttribute('href').substr(1);

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
};

// Подключение видео
const videoYoutubeIframe = document.querySelector('.video-youtube iframe');
const videoYoutubeBtn = document.querySelector('.video-youtube__img-bg');

function playVideo() {
  videoYoutubeIframe.style.display = "block";
  videoYoutubeIframe.setAttribute('src', 'https://www.youtube.com/embed/JXq88w678Zw');
};

videoYoutubeBtn.addEventListener('click', function () {
  videoYoutubeBtn.style.display = "none";
  playVideo();
});

// Открытие окна видео
const videoYoutube = document.querySelector('.video-youtube');

function videoOpen() {
  popupBtn.classList.add('popup-btn--enabled');
  menuBtn.classList.add('menu-btn--disabled');
  videoYoutube.classList.add('video-youtube--active');
  popupCloseOpen();
};

// Установка ссылок для открытия видео
const btnVideo = document.querySelectorAll('.btn-video');

for (let btn of btnVideo) {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    videoOpen();
  });
};


// Открытие окна обратной связи
const questions = document.querySelector('.questions');
const popupBtn = document.querySelector('.popup-btn');

function questionsOpen() {
  popupBtn.classList.add('popup-btn--enabled');
  menuBtn.classList.add('menu-btn--disabled');
  questions.classList.add('questions--active');
  popupCloseOpen();
};

// Установка ссылок для открытия обратной связи
const btnMessenger = document.querySelectorAll('.btn-messenger');

for (let btn of btnMessenger) {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    questionsOpen();
  });
};

// Закрытие доп. окон
popupBtn.addEventListener('click', function () {
  popupBtn.classList.remove('popup-btn--enabled');
  menuBtn.classList.remove('menu-btn--disabled');
  questions.classList.remove('questions--active');
  videoYoutube.classList.remove('video-youtube--active');
  popupCloseOpen();
});

// Сужение хедера
const headerBody = document.querySelector('.header__body');

window.addEventListener('scroll', function () {
  let scroll = document.documentElement.scrollTop;
  if (scroll > 46) {
    headerBody.classList.add('header__body--scrolled');
  } else if (scroll <= 46) {
    headerBody.classList.remove('header__body--scrolled');
  };
});