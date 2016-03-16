var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var currentSlide = null;

// @todo remove hello world
app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

io.on('connection', function (socket) {
  console.log('User connected');

  if (currentSlide) {
    socket.emit('set-slide', currentSlide);
  }

  socket.on('presenter-set-slide', function (slideName) {
    if (currentSlide !== slideName) {
      currentSlide = slideName;
      console.log('Setting current slide: ' + slideName);
      // emit event to everyone except presenter
      socket.broadcast.emit('set-slide', slideName);
    }
  });
});

http.listen(8888, function(){
  console.log('listening on *:8888');
});
