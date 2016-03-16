var SocketManager = function () {
  var SOCKET_SERVER_HOST = 'http://localhost:8888';

  var socket = io(SOCKET_SERVER_HOST);

  socket.on('connect', function () {
    console.log('Connected');
  });

  socket.on('connect_error', function () {
    console.log('Connection error');
  });

  return socket;
};