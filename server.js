var express = require('express')
  , session = require('express-session');
var Grant = require('grant').express()
  , grant = new Grant(require('./config/grant.json'));
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var request = require('request');
var Passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var Bcrypt = require('bcrypt');
var User = require("./models/User");
var app = express();

mongoose.connect('mongodb://localhost/sprox');

//User({name: "Cameron Wheeler", pass: "$2a$10$u5Gpzryz5/9xIrsL6pu6resMIltqp/5grI516724ErZDhKzdkVabC", "user" : "test"}).save();

app.use(session({secret:'grant'}))
app.use(grant)

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

Passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ user: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!Bcrypt.compareSync(password, user.pass)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

Passport.serializeUser(function(user, done) {
  done(null, user);
});

Passport.deserializeUser(function(user, done) {
  done(null, user)
});

app.use(express.static(__dirname + '/app'));
app.listen(3000);

require("./routes")(app)

exports = module.exports = app;