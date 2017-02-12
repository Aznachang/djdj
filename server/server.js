var express = require('express');
var axios = require('axios');
var app = express();
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var db = require('../db/index.js');
var path = require('path');
var routes = require('./routes.js');
var session = require('express-session');
var util = require('./util');


db.Song.sync();
db.User.sync();
db.Party.sync();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
  secret: 'djdj',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use('/api/', routes);
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
app.use('/static', express.static(path.join(__dirname, '../public')));
app.use( function(incomingRequest, res, next) {
  next();
});

// Serving the user index.html after running util.checkUser
app.get('/', util.checkUser, function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Send favecon when a get req is made to this endpoint
app.get('/favicon.ico', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/favicon.ico'));
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/login', function(req, res) {
   res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/signup', function(req, res) {
  var username = req.body.username;
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;
  var password = req.body.password;
    util.hashPassword(username, password, function(hashedPassword) {
      res.redirect('/api/signup/?username=' + username + '&password=' + hashedPassword + '&latitude=' + latitude + '&longitude=' + longitude);
    });
});

var port = 3000;
app.listen(process.env.PORT || port, function () {
  console.log('You are now running on port ' + port + '!');
})
