(function () {
  var socketManager = new SocketManager();

  window.onload = function () {
    var slideManager = new SlideManager();

    slideManager.loadSlides();
  };
})();
