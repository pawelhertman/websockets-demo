var PresentationManager = function () {
  var slides = null;
  var currentSlideIndex = null;

  function loadSlideList() {
    var slideListPromise = new SlideList();

    return new Promise(function (resolve, reject) {
      slideListPromise.then(
        function (slideList) {
          slides = slideList;
          currentSlideIndex = 0;

          resolve(slides);
        },
        reject
      );
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
