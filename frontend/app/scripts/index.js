var socket = io('http://localhost:8888');

socket.on('connect', function () {
  console.log('Connected');
});

socket.on('connect_error', function () {
  console.log('Connection error');
});
