var express = require('express');
var http = require('http');
var path = require('path')
var favicon = require('serve-favicon');

var app = express();

var publicDir = path.join(__dirname, 'public');
var imagesDir = path.join(publicDir, 'images');

app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);
app.use(favicon(path.join(imagesDir, 'favicon.png')));
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

var server = http.createServer(app);

server.listen(app.get('port'), () => {
  console.log('Web server listening on port ' + app.get('port'));
});
