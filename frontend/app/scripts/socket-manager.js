var SocketManager = function () {
  var SOCKET_SERVER_HOST = 'http://localhost:8888';

  var socket = io(SOCKET_SERVER_HOST, {autoConnect: false});

  socket.on('connect', function () {
    console.log('Connected');
  });

  socket.on('connect_error', function () {
    console.log('Connection error');
  });

  function emit(event, message) {
    socket.emit(event, message);
  }

  function addListener(event, cb) {
    socket.on(event, cb);
  }

  function connect() {
    socket.connect();
  }

  return {
    connect: connect,
    emit: emit,
    addListener: addListener
  };
};
