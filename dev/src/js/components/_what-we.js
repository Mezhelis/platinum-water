const whatWeTabDots = document.querySelectorAll('.what-we__tab-dot');
const tabsWhatWe = document.querySelectorAll('.tab-what-we');

for (let dot of whatWeTabDots) {
  dot.addEventListener('focus', switchWhatWeTabs);

  dot.addEventListener('click', function (e) {
    e.preventDefault();

    switchWhatWeTabs(e);
  });
};

function switchWhatWeTabs(e) {
  if (e.target.dataset.for) {

    for (let tab of tabsWhatWe) {
      if (e.target.dataset.for == tab.dataset.id) {
        document.querySelector('.tab-what-we--active').classList.remove('tab-what-we--active');
        tab.classList.add('tab-what-we--active');
      }
    }
  };
};