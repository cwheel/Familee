var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var Passport = require('passport');
var Redis = require("redis");

var app = express();

var rclient = Redis.createClient();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser());
app.use(session({ 
  secret: 'familee-secret', 
  saveUninitialized: true, 
  resave: true
}));

app.use(Passport.initialize());
app.use(Passport.session());

app.use(express.static(__dirname + '/app'));
app.listen(3000);

exports = module.exports = app;