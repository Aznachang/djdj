var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var axios = require('axios');
var bcrypt = require('bcrypt');
var session = require('express-session');
var util = require('./util');

// var session = require('express-session');
var db = require('../db/index.js');
var routes = require('./routes.js');

var app = express();


db.Song.sync();
// db.Playlist.sync();
db.User.sync();

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
  secret: 'djdj',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use('/api/', routes);

// all static files/modules being served 
// app.use() will "mount" specified middleware at the path listed - mount === invoke, require?
// combine the directories at these two file paths

// use the function/middleware whenever we make any type of request that includes the path passed in arguments[0]

app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
app.use('/static', express.static(path.join(__dirname, '../public')));

//<div class="app" style="background-image: url(static/images/people-dancing.png)">


//whenever anything 
app.use( function(incomingRequest, res, next) {
  console.log('Now serving ' + incomingRequest.method + ' @ ' + incomingRequest.url);
  next();
});

// when there is a get request at this path, use the middleware listed as the second argument. If there is no middleware listed, perform callback

// serving the user index.html after running util.checkUser
app.get('/', util.checkUser, function(req, res) {
// app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

//send favecon when a get req is made to this endpoint
app.get('/favicon.ico', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/favicon.ico')); 
});

//Need to see why checkUser gives us multiple requests to GET Now serving GET @ /
//{} 'req query in check USER'

//Look at auth to see why we are getting issues when we use util.CheckUser

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// send login when get request to login endpoint
app.get('/login', function(req, res) {
  // res.sendFile(path.join(__dirname, '../public/login.html'));
   res.sendFile(path.join(__dirname, '../public/index.html'));
});


// app.get('/signup', function(req, res) {
//   res.sendFile(path.join(__dirname, '../public/signup.html'));
// });

//send a post request to signup and post a new user to DB
app.post('/signup', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
    util.hashPassword(username, password, function(hashedPassword) {
      res.redirect('/api/signup/?username=' + username + '&password=' + hashedPassword);
    });
});





var port = 3000;
app.listen(process.env.PORT || port, function () {
  console.log('You are now running on port ' + port + '!');
})
