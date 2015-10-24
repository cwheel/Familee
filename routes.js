var Passport = require('passport');
var fs = require('fs');
var grantConfig = JSON.parse(fs.readFileSync('./config/grant.json').toString());
var request = require("request")
var User = require("./models/User"); 
var Fitbit = require("./models/Fitbit"); 

module.exports = function(app) {
	var fitbitAccess_token = null;
	function requireAuth(req, res, next) {
		if (req.isAuthenticated()) {
	    	return next();
		}

	  	res.redirect('/');
	}
	function reAuthFitbit(owner, res){
		Fitbit.findOne({ owner: owner }, function (err, fb) {
			console.log(fb)
		var option = {
			url: "https://api.fitbit.com/oauth2/token",
			headers: {
				'Authorization' : "Basic MjI5UkREOmFkZjk2N2Y4M2EyNGUyY2ViMWFjNjRlNGZjY2ExZDIw",
				'Content-Type' : "application/x-www-form-urlencoded",
			},
			method: 'POST',
			form: {
				"grant_type" : 'refresh_token',
				"refresh_token" : fb.refresh_token
			}
		}
		request(option,function(error,response,body){
			var b = JSON.parse(body);

			console.log("Sending: " + b.access_token);
			console.log("Sending: " + b.refresh_token);
			if (!error && response.statusCode == 200) {
				Fitbit.findOne({owner : owner}, function(err, fb) {
					fb.access_token = b.access_token;
					fb.refresh_token = b.refresh_token;
					fb.save();
				});
				console.log(b.access_token)
			return b.access_token
  			} else {
  				res.send(body);
  			}
		});
	})
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

	app.get("/fitbit/response", requireAuth, function(req, res) {
		var testOptions = {
		  url: 'https://api.fitbit.com/1/user/-/profile.json',
		  headers: {
		    'Authorization': "Bearer" + " " + req.query.access_token
		  }
		};
		request(testOptions, function(error,response,body) {
			if (!error && response.statusCode == 200) {
				var relName = JSON.parse(body).user.fullName;

				console.log("here" + relName);

				Fitbit({access_token: req.query.access_token, refresh_token: req.query.refresh_token, owner: relName, username: req.user.user}).save();
				res.sendfile("app/routes/oauth_bounce.html")
  			} else {
  				res.send(body);
  			}
		})
	});

	app.get("/fitbit/getProfile", requireAuth, function(req,res){
		reAuthFitbit(req.query.name, res)
		Fitbit.findOne({ owner: req.query.name }, function (err, fb) {
			var testOptions = {
			  url: 'https://api.fitbit.com/1/user/-/profile.json',
			  headers: {
			    'Authorization': "Bearer" + " " + fb.access_token
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
	})

	app.get("/fitbit/getDevices", requireAuth, function(req,res){
		reAuthFitbit(req.query.name, res)
		Fitbit.findOne({ owner: req.query.name }, function (err, fb) {
			var testOptions = {
			  url: 'https://api.fitbit.com/1/user/-/devices.json',
			  headers: {
			    'Authorization': "Bearer" + " " + fb.access_token
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
	})

	app.get("/fitbit/heartrate/getDay", requireAuth, function(req,res){
		reAuthFitbit(req.query.name, res)
		Fitbit.findOne({ owner: req.query.name }, function (err, fb) {
			var testOptions = {
			  url: 'https://api.fitbit.com/1/user/-/activities/heart/date/' + req.query.date +' /1d.json',
			  headers: {
			    'Authorization': "Bearer" + " " + fb.access_token
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
	})

	app.get("/fitbit/heartrate/getWeek", requireAuth, function(req,res){
		reAuthFitbit(req.query.name, res)
		Fitbit.findOne({ owner: req.query.name }, function (err, fb) {
			var testOptions = {
			  url: 'https://api.fitbit.com/1/user/-/activities/heart/date/' + req.query.date +' /1w.json',
			  headers: {
			    'Authorization': "Bearer" + " " + fb.access_token
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
	})

	app.get("/fitbit/heartrate/getMonth", requireAuth, function(req,res){
		reAuthFitbit(req.query.name, res)
		Fitbit.findOne({ owner: req.query.name }, function (err, fb) {
			var testOptions = {
			  url: 'https://api.fitbit.com/1/user/-/activities/heart/date/' + req.query.date +' /1m.json',
			  headers: {
			    'Authorization': "Bearer" + " " + fb.access_token
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
	})

	app.get("/fitbit/heartrate/getRange", requireAuth, function(req,res){
		reAuthFitbit(req.query.name, res)
		Fitbit.findOne({ owner: req.query.name }, function (err, fb) {
			var testOptions = {
			  url: 'https://api.fitbit.com/1/user/-/activities/heart/date/' + req.query.start +'/' + req.query.end +'.json',
			  headers: {
			    'Authorization': "Bearer" + " " + fb.access_token
			  }
			};
			request(testOptions, requireAuth, function(error,response,body){
				if (!error && response.statusCode == 200) {
	   				res.send(body) // Show the HTML for the Google homepage.
	  			}else {
	  				res.send(body)
	  			}
			})
		})
	})
	app.get("/fitbit/getSleep", requireAuth, function(req,res){
		reAuthFitbit(req.query.name, res)
			Fitbit.findOne({ owner: req.query.name }, function (err, fb) {
			var testOptions = {
			  url: 'https://api.fitbit.com/1/user/-/sleep/date/' + req.query.date + '.json',
			  headers: {
			    'Authorization': "Bearer" + " " + fb.access_token
			  }
			};
			console.log(req)
			request(testOptions, function(error,response,body){
				if (!error && response.statusCode == 200) {
	   				res.send(body) // Show the HTML for the Google homepage.
	  		 	} else {
	  				res.send(body)
	  			}
			})
		})
	})			

	app.get("/userinfo/devices", requireAuth, function (req, res) {
		Fitbit.find({username : req.user.user}, function(err, devices) {
		    res.send(devices);
		});
	});

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