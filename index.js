var express = require('express');
var http = require('http');
var path = require('path')
var favicon = require('serve-favicon');
var fs = require('fs');

var app = express();

var publicDir = path.join(__dirname, 'public');
var imagesDir = path.join(publicDir, 'images');

app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);
app.use(favicon(path.join(imagesDir, 'favicons/favicon-32x32.png')));
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

var pages = [
  'products',
  'products/macaron',
  'products/tart',
  'products/financier',
  'products/madeleine',
  'products/cookie',
  'products/choux'
];

pages.forEach(page => {
  if (page !== 'products') {
    var carouselDir = './public/images/jpgs/' + page.split('/')[1];;
    fs.readdir(carouselDir, (err, files) => {
      var jpgFiles = files.filter((file) => file.indexOf('jpg') > 0);
      app.get(`/${page}`, (req, res) => {
        res.render(page, {
          carouselImages: jpgFiles,
          product: page.split('/')[1]
        });
      })
    });
  } else {
    app.get(`/${page}`, (req, res) => {
      res.render(page);
    })
  }
})

var server = http.createServer(app);
server.listen(app.get('port'), () => {
  console.log('Web server listening on port ' + app.get('port'));
});
