var express = require('express');
var handlebars = require('express-handlebars');
var app = express();

app.engine('handlebars', handlebars({ defaultLayout: 'application' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/wtf', function (req, res) {
  res.render('login');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});