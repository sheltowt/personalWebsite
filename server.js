var express = require('express'),
  app = express();

app.get('/', function (req, res) {
  res.sendfile('williamshelton.html');
});

app.get('/hex.css', function (req, res) {
  res.sendfile('hex.css');
});

app.get('/hex.js', function (req, res) {
  res.sendfile('hex.js');
});

app.get('/medium.jpeg', function (req, res) {
  res.sendfile('medium.jpeg');
});

app.get('/linkedin.jpeg', function (req, res) {
  res.sendfile('linkedin.jpeg');
});

app.get('/twitter.jpeg', function (req, res) {
  res.sendfile('twitter.jpeg');
});

app.get('/github.jpeg', function (req, res) {
  res.sendfile('github.jpeg');
});

app.get('/nature.jpg', function (req, res) {
  res.sendfile('nature.jpg');
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server running at' + port);
});