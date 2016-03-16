(function () {
  var socketManager = new SocketManager();

  window.onload = function () {
    var leftButton = document.getElementsByClassName('button--left')[0];
    var rightButton = document.getElementsByClassName('button--right')[0];

    leftButton.addEventListener('click', function () {
      console.log('left');
      socketManager.emit('left');
    });

    rightButton.addEventListener('click', function () {
      console.log('right');
      socketManager.emit('right');
    });
  };
})();
