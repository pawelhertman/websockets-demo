var Presentation = function () {
  var SLIDE_CONTENT_URL = '/slides/';
  var SLIDE_SELECTOR = 'section.slide-container';
  var ACTIVE_SLIDE_CLASS = 'slide-container--active';

  var currentSlide = null;

  function loadSlides() {
    var slideListPromise = new SlideList();

    slideListPromise.then(
      function (slideList) {
        loadSlidesContent(slideList);
      },
      function (error) {
        console.log('Failed to load slide list because of ' + error);
      }
    );
  }

  function loadSlidesContent(slides) {
    var resolvedPromises = 0;

    slides.forEach(function (slideName) {
      loadSlide(slideName).then(
        function (response) {
          var sectionContainer = document.createElement('section');
          sectionContainer.className = 'slide-container';
          sectionContainer.dataset.slideName = slideName;
          sectionContainer.innerHTML = response;

          document.body.appendChild(sectionContainer);

          resolvedPromises++;

          if (resolvedPromises === slides.length && currentSlide !== undefined) {
            displayActiveSlide(currentSlide);
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

  function displayActiveSlide(name) {
    var slidesSections = document.querySelectorAll(SLIDE_SELECTOR);

    currentSlide = name;

    Array.prototype.forEach.call(slidesSections, function (slideSection, index) {
      var slideName = slideSection.dataset.slideName;

      if (slideName === name) {
        slideSection.classList.add(ACTIVE_SLIDE_CLASS);
      } else {
        slideSection.classList.remove(ACTIVE_SLIDE_CLASS);
      }
    });
  }

  function setCurrentSlide(name) {
    currentSlide = name;
  }

  return {
    loadSlides: loadSlides,
    displayActiveSlide: displayActiveSlide
  }
};
