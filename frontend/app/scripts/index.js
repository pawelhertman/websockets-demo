(function () {
  var socketManager = new SocketManager();
  socketManager.connect();

  window.onload = function () {
    var presentation = new Presentation();
    presentation.loadSlides();

    socketManager.addListener('set-slide', function (slideName) {
      console.log('Setting current slide to ' + slideName);
      presentation.setActiveSlide(slideName);
    });
  };
})();
