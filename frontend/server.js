// @todo remove "connect" dependency
//var connect = require('connect');
var express = require('express');
var serveStatic = require('serve-static');
var jadeStatic = require('jade-static');

app = express();

app.use(serveStatic('app'));
app.use(jadeStatic('app/'));

app.listen(8080, function(){
  console.log('Server running on 8080...');
});
