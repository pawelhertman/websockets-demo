var Presentation = function () {
  var SLIDE_CONTENT_URL = '/slides/';
  var SLIDE_SELECTOR = 'section.slide';
  var ACTIVE_SLIDE_CLASS = 'slide--active';
  var FIRST_SLIDE_NAME = 'main';

  function loadSlides() {
    var slidesSections = document.querySelectorAll(SLIDE_SELECTOR);
    var resolvedPromises = 0;

    Array.prototype.forEach.call(slidesSections, function (slideSection, index) {
      var slideName = slideSection.dataset.slideName;

      loadSlide(slideName).then(
        function (response) {
          slideSection.innerHTML = response;
          resolvedPromises++;

          if (resolvedPromises === slidesSections.length) {
            setActiveSlide(FIRST_SLIDE_NAME);
          }
        },
        function (error) {
          console.log(error);
        });
    });
  }

  function loadSlide(name) {
    return new Promise(function (resolve, reject) {
      var req = new XMLHttpRequest();
      req.open('GET', SLIDE_CONTENT_URL + name + '.html', true);

      req.onload = function () {
        if (req.status === 200) {
          resolve(req.responseText);
        } else {
          reject(Error(req.statusText));
        }
      };

      req.onerror = function () {
        reject(Error('Failed to load slide ' + name));
      };

      req.send();
    });
  }

  function setActiveSlide(name) {
    var slidesSections = document.querySelectorAll(SLIDE_SELECTOR);

    Array.prototype.forEach.call(slidesSections, function (slideSection, index) {
      var slideName = slideSection.dataset.slideName;

      if (slideName === name) {
        slideSection.classList.add(ACTIVE_SLIDE_CLASS);
      } else {
        slideSection.classList.remove(ACTIVE_SLIDE_CLASS);
      }
    });
  }

  return {
    loadSlides: loadSlides,
    setActiveSlide: setActiveSlide
  }
};
