(function () {
  var CURRENT_SLIDE_LABEL_CLASS = 'js-current-slide';
  var SETTING_SLIDE_EVENT = 'presenter-set-slide';

  var socketManager = new SocketManager();
  socketManager.connect();

  var presentationManager = new PresentationManager();
  presentationManager.loadSlideList().then(
    updateCurrentSlide,
    function (error) {
      console.log('Failed to load slide list because of ' + error);
    }
  );

  function movePresentation(direction) {
    try {
      if ('left' === direction) {
        presentationManager.goLeft();
      } else {
        presentationManager.goRight();
      }

      updateCurrentSlide();
    } catch (error) {
      console.log('Failed to go ' + direction + ' because of ' + error);
    }
  }

  function updateCurrentSlide() {
    var currentSlide = presentationManager.getCurrentSlideName();

    socketManager.emit(SETTING_SLIDE_EVENT, currentSlide);

    document.getElementsByClassName(CURRENT_SLIDE_LABEL_CLASS)[0].innerHTML = currentSlide;
  }

  window.onload = function () {
    var leftButton = document.getElementsByClassName('button--left')[0];
    var rightButton = document.getElementsByClassName('button--right')[0];

    leftButton.addEventListener('click', function () {
      movePresentation('left');
    });

    rightButton.addEventListener('click', function () {
      movePresentation('right');
    });
  };
})();
