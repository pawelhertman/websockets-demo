var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// @todo remove hello world
app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

io.on('connection', function (socket) {
  console.log('a user connected');

  socket.on('left', function () {
    console.log('left');
    //io.emit('left', {for: 'everyone'});
  });

  socket.on('right', function () {
    console.log('right');
    //io.emit('right', {for: 'everyone'});
  })
});

http.listen(8888, function(){
  console.log('listening on *:8888');
});
