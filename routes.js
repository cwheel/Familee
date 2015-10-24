var Passport = require('passport');
var fs = require('fs');
var grantConfig = JSON.parse(fs.readFileSync('./config/grant.json').toString());
var request = require("request")

module.exports = function(app) {
	var fitbitAccess_token = null;
	function requireAuth(req, res, next) {
		if (req.isAuthenticated()) {
	    	return next();
		}

	  	res.redirect('/');
	}
	

	app.post('/login', Passport.authenticate('local'), function(req, res) {
	    res.send("valid_auth");
	});

	app.get('/authstatus', function(req, res) {
		if (req.user) {
			res.send("valid_auth");
		} else {
			res.send("invalid_auth");
		}
	});

	app.get("/fitbit/response", function(req, res){
		fitbitAccess_token = req.query.access_token;
		res.send(req.query)
	})

	app.get("/fitbit/getProfile", function(req,res){
		var testOptions = {
		  url: 'https://api.fitbit.com/1/user/-/profile.json',
		  headers: {
		    'Authorization': "Bearer" + " " + fitbitAccess_token
		  }
		};
		request(testOptions, function(error,response,body){
			if (!error && response.statusCode == 200) {
   				res.send(body) // Show the HTML for the Google homepage.
  			}else {
  				res.send(body)
  			}
		})
	})

	app.get("/fitbit/getDevices", function(req,res){
		var testOptions = {
		  url: 'https://api.fitbit.com/1/user/-/devices.json',
		  headers: {
		    'Authorization': "Bearer" + " " + fitbitAccess_token
		  }
		};
		request(testOptions, function(error,response,body){
			if (!error && response.statusCode == 200) {
   				res.send(body) // Show the HTML for the Google homepage.
  			}else {
  				res.send(body)
  			}
		})
	})

	app.get("/fitbit/heartrate/getDay", function(req,res){
		var testOptions = {
		  url: 'https://api.fitbit.com/1/user/-/activities/heart/date/' + req.query.date +' /1d.json',
		  headers: {
		    'Authorization': "Bearer" + " " + fitbitAccess_token
		  }
		};
		request(testOptions, function(error,response,body){
			if (!error && response.statusCode == 200) {
   				res.send(body) // Show the HTML for the Google homepage.
  			}else {
  				res.send(body)
  			}
		})
	})
	app.get("/fitbit/heartrate/getWeek", function(req,res){
		var testOptions = {
		  url: 'https://api.fitbit.com/1/user/-/activities/heart/date/' + req.query.date +' /1w.json',
		  headers: {
		    'Authorization': "Bearer" + " " + fitbitAccess_token
		  }
		};
		request(testOptions, function(error,response,body){
			if (!error && response.statusCode == 200) {
   				res.send(body) // Show the HTML for the Google homepage.
  			}else {
  				res.send(body)
  			}
		})
	})
	app.get("/fitbit/heartrate/getMonth", function(req,res){
		var testOptions = {
		  url: 'https://api.fitbit.com/1/user/-/activities/heart/date/' + req.query.date +' /1m.json',
		  headers: {
		    'Authorization': "Bearer" + " " + fitbitAccess_token
		  }
		};
		request(testOptions, function(error,response,body){
			if (!error && response.statusCode == 200) {
   				res.send(body) // Show the HTML for the Google homepage.
  			}else {
  				res.send(body)
  			}
		})
	})
	app.get("/fitbit/heartrate/getRange", function(req,res){
		var testOptions = {
		  url: 'https://api.fitbit.com/1/user/-/activities/heart/date/' + req.query.start +'/' + req.query.end +'.json',
		  headers: {
		    'Authorization': "Bearer" + " " + fitbitAccess_token
		  }
		};
		request(testOptions, function(error,response,body){
			if (!error && response.statusCode == 200) {
   				res.send(body) // Show the HTML for the Google homepage.
  			}else {
  				res.send(body)
  			}
		})
	})
	app.get("/fitbit/getSleep", function(req,res){
		var testOptions = {
		  url: 'https://api.fitbit.com/1/user/-/sleep/date/' + req.query.date +'.json',
		  headers: {
		    'Authorization': "Bearer" + " " + fitbitAccess_token
		  }
		};
		console.log(req)
		request(testOptions, function(error,response,body){
			if (!error && response.statusCode == 200) {
   				res.send(body) // Show the HTML for the Google homepage.
  			}else {
  				res.send(body)
  			}
		})
	})			


	app.get("/userinfo", requireAuth, function(req, res) {
	    res.send({name : req.user.name});
	});

	app.get("/logout", requireAuth, function(req, res) {
	    req.session.destroy();
		req.logout();
		res.redirect('/');
	});

	app.get("*", function(req, res) {
	    res.redirect("/");
	});
}