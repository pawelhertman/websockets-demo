var PresentationManager = function () {
  var SLIDES_LIST_CONFIG_URL = '/config/slides.json';

  var slides = null;
  var currentSlideIndex = null;

  function setListByJson(json) {
      var jsonObject = JSON.parse(json);

      slides = jsonObject.slides;
      currentSlideIndex = 0;
  }

  function loadSlideList() {
    return new Promise(function (resolve, reject) {
      var req = new XMLHttpRequest();
      req.open('GET', SLIDES_LIST_CONFIG_URL, true);

      req.onload = function () {
        if (req.status === 200) {
          setListByJson(req.responseText);
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

  function goLeft() {
    if (!slides) {
      throw 'List not loaded';
    }

    if (currentSlideIndex === 0) {
      throw 'Current slide is the first one';
    }

    currentSlideIndex--;
  }

  function goRight() {
    if (!slides) {
      throw 'List not loaded';
    }

    if (currentSlideIndex === slides.length - 1) {
      throw 'Current slide is the last one';
    }

    currentSlideIndex++;
  }

  function getCurrentSlideName() {
    if (!slides) {
      throw 'List not loaded';
    }

    return slides[currentSlideIndex];
  }

  return {
    loadSlideList: loadSlideList,
    goLeft: goLeft,
    goRight: goRight,
    getCurrentSlideName: getCurrentSlideName
  }
};
