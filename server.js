var express = require('express')
  , session = require('express-session');
var Grant = require('grant').express()
  , grant = new Grant(require('./config/grant.json'));
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var request = require('request');
var Passport = require('passport');
var Redis = require("redis-node");
var LocalStrategy = require('passport-local').Strategy;
var Bcrypt = require('bcrypt');
var app = express();

var rclient = Redis.createClient(); 

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
app.get("/fitbit/response", function(req, res){
	console.log(req.query)
	var testOptions = {
	  url: 'https://api.fitbit.com/1/user/-/profile.json',
	  headers: {
	    'Authorization': "Bearer" + " " + req.query.access_token
	  }
	};

	function testCallback(error, response, body) {
		res.send(body)
	};
	console.log(testOptions)
	console.log("test")
	request(testOptions,testCallback)
})

Passport.use(new LocalStrategy(
  function(username, password, done) {
    rclient.exists(username, function(err, exists) {
    	if (exists) {
	    	rclient.hgetall(username, function (err, resp) {
          console.log(resp);
	    		if (Bcrypt.compareSync(password, resp.pass)) {
					return done(null, resp);
	    		} else {
	    			return done(null, false, { message: 'Wrong credentials.' });
	    		}
		      	
		    });
    	} else {
    		return done(null, false, { message: 'Wrong credentials.' });
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

app.use(express.static(__dirname + '/app'));
app.listen(3000);

require("./routes")(app)

exports = module.exports = app;