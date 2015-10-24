var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var Passport = require('passport');
var Redis = require("redis-node");
var LocalStrategy = require('passport-local').Strategy;
var Bcrypt = require('bcrypt');
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

Passport.use(new LocalStrategy(
  function(username, password, done) {
    rclient.exists(username, function(err, exists) {
    	if (exists) {
	    	rclient.hgetall(username, function (err, resp) {
	    		if (Bcrypt.compareSync(password, resp.pass)) {
					return done(null, resp);
	    		} else {
	    			return done(null, false, { message: 'Wrong password.' });
	    		}
		      	
		    });
    	}
    });
  }
));

Passport.serializeUser(function(user, done) {
  done(null, user);
});

Passport.deserializeUser(function(user, done) {
  done(null, user)
});

app.post('/login', Passport.authenticate('local'), function(req, res) {
    res.send("valid_auth");
});

app.use(express.static(__dirname + '/app'));
app.listen(3000);

exports = module.exports = app;