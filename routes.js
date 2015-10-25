var Passport = require('passport');
var fs = require('fs');
var grantConfig = JSON.parse(fs.readFileSync('./config/grant.json').toString());
var request = require("request");
var User = require("./models/User"); 
var Fitbit = require("./models/Fitbit"); 
var Reminder = require("./models/Reminder"); 

module.exports = function(app) {
	var reauth = false;

	var fitbitAccess_token = null;

	function requireAuth(req, res, next) {
		if (req.isAuthenticated()) {
	    	return next();
		}

	  	res.redirect('/');
	}

	function reAuthFitbit(owner, res){
		if (reauth) {
			Fitbit.findOne({ owner: owner }, function (err, fb) {
			var option = {
				url: "https://api.fitbit.com/oauth2/token",
				headers: {
					'Authorization' : "Basic MjI5UkREOmFkZjk2N2Y4M2EyNGUyY2ViMWFjNjRlNGZjY2ExZDIw",
					'Content-Type' : "application/x-www-form-urlencoded"
				},
				method: 'POST',
				form: {
					"grant_type" : 'refresh_token',
					"refresh_token" : fb.refresh_token
				}
			}
			request(option,function(error,response,body){
				var b = JSON.parse(body);

				if (!error && response.statusCode == 200) {
					Fitbit.findOne({owner : owner}, function(err, fb) {
						fb.access_token = b.access_token;
						fb.refresh_token = b.refresh_token;
						fb.save();
					});

					return b.access_token
	  			}
			});
		})}		
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
		if (req.query.name == null) res.send("invalid")

		reAuthFitbit(req.query.name, res)
		Fitbit.findOne({ owner: req.query.name }, function (err, fb) {
			if (fb == null) res.send("invalid") 
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
		if (req.query.name == null) res.send("invalid")

		reAuthFitbit(req.query.name, res)
		Fitbit.findOne({ owner: req.query.name }, function (err, fb) {
			if (fb == null) {res.send("invalid"); return}
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
		if (req.query.name == null) res.send("invalid")

		reAuthFitbit(req.query.name, res)
		Fitbit.findOne({ owner: req.query.name }, function (err, fb) {
			if (fb == null) res.send("invalid") 
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
		if (req.query.name == null) res.send("invalid")

		reAuthFitbit(req.query.name, res)
		Fitbit.findOne({ owner: req.query.name }, function (err, fb) {
			if (fb == null) res.send("invalid") 
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
		if (req.query.name == null) res.send("invalid")

		reAuthFitbit(req.query.name, res)
		Fitbit.findOne({ owner: req.query.name }, function (err, fb) {
			if (fb == null) res.send("invalid") 
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
		if (req.query.name == null) res.send("invalid")

		reAuthFitbit(req.query.name, res)
		Fitbit.findOne({ owner: req.query.name }, function (err, fb) {
			if (fb == null) res.send("invalid") 
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
		if (req.query.name == null) res.send("invalid")

		reAuthFitbit(req.query.name, res)
			Fitbit.findOne({ owner: req.query.name }, function (err, fb) {
			if (fb == null) res.send("invalid") 
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

	app.post("/addReminder", requireAuth, function(req, res) {
	    Reminder(req.body).save();
	});

	app.get("/logout", requireAuth, function(req, res) {
	    req.session.destroy();
		req.logout();
		res.redirect('/');
		res.send("done");
	});
	app.get("/fitbit/sleep",function(req,res){
		analyzeSleep(req.query.name,res)
	})
	app.get("/fitbit/heartrate",function(req,res){
		Heartrate(req.query.name,res)
	})
	app.get("/fitbit/steps",function(req,res){
		steps(req.query.name,res)
	})
	app.get("/refresh"),function(req,res){
		reauth = true;
		reAuthFitbit(req.name);
		reauth = false
	}
	app.get("*", function(req, res) {
	    res.redirect("/");
	});

	function analyzeSleep(name, res){
		res.send('{"efavg":100,"efdict":[{"dateTime":"2015-09-25","value":"0"},{"dateTime":"2015-09-26","value":"0"},{"dateTime":"2015-09-27","value":"0"},{"dateTime":"2015-09-28","value":"0"},{"dateTime":"2015-09-29","value":"0"},{"dateTime":"2015-09-30","value":"0"},{"dateTime":"2015-10-01","value":"0"},{"dateTime":"2015-10-02","value":"0"},{"dateTime":"2015-10-03","value":"0"},{"dateTime":"2015-10-04","value":"0"},{"dateTime":"2015-10-05","value":"0"},{"dateTime":"2015-10-06","value":"0"},{"dateTime":"2015-10-07","value":"0"},{"dateTime":"2015-10-08","value":"0"},{"dateTime":"2015-10-09","value":"0"},{"dateTime":"2015-10-10","value":"0"},{"dateTime":"2015-10-11","value":"0"},{"dateTime":"2015-10-12","value":"0"},{"dateTime":"2015-10-13","value":"0"},{"dateTime":"2015-10-14","value":"0"},{"dateTime":"2015-10-15","value":"0"},{"dateTime":"2015-10-16","value":"0"},{"dateTime":"2015-10-17","value":"0"},{"dateTime":"2015-10-18","value":"0"},{"dateTime":"2015-10-19","value":"0"},{"dateTime":"2015-10-20","value":"0"},{"dateTime":"2015-10-21","value":"0"},{"dateTime":"2015-10-22","value":"0"},{"dateTime":"2015-10-23","value":"0"},{"dateTime":"2015-10-24","value":"94"},{"dateTime":"2015-10-25","value":"0"}],"asleepavg":100,"asleepdict":[{"dateTime":"2015-09-25","value":"0"},{"dateTime":"2015-09-26","value":"0"},{"dateTime":"2015-09-27","value":"0"},{"dateTime":"2015-09-28","value":"0"},{"dateTime":"2015-09-29","value":"0"},{"dateTime":"2015-09-30","value":"0"},{"dateTime":"2015-10-01","value":"0"},{"dateTime":"2015-10-02","value":"0"},{"dateTime":"2015-10-03","value":"0"},{"dateTime":"2015-10-04","value":"0"},{"dateTime":"2015-10-05","value":"0"},{"dateTime":"2015-10-06","value":"0"},{"dateTime":"2015-10-07","value":"0"},{"dateTime":"2015-10-08","value":"0"},{"dateTime":"2015-10-09","value":"0"},{"dateTime":"2015-10-10","value":"0"},{"dateTime":"2015-10-11","value":"0"},{"dateTime":"2015-10-12","value":"0"},{"dateTime":"2015-10-13","value":"0"},{"dateTime":"2015-10-14","value":"0"},{"dateTime":"2015-10-15","value":"0"},{"dateTime":"2015-10-16","value":"0"},{"dateTime":"2015-10-17","value":"0"},{"dateTime":"2015-10-18","value":"0"},{"dateTime":"2015-10-19","value":"0"},{"dateTime":"2015-10-20","value":"0"},{"dateTime":"2015-10-21","value":"0"},{"dateTime":"2015-10-22","value":"0"},{"dateTime":"2015-10-23","value":"0"},{"dateTime":"2015-10-24","value":"97"},{"dateTime":"2015-10-25","value":"0"}],"startdict":[{"dateTime":"2015-09-25","value":""},{"dateTime":"2015-09-26","value":""},{"dateTime":"2015-09-27","value":""},{"dateTime":"2015-09-28","value":""},{"dateTime":"2015-09-29","value":""},{"dateTime":"2015-09-30","value":""},{"dateTime":"2015-10-01","value":""},{"dateTime":"2015-10-02","value":""},{"dateTime":"2015-10-03","value":""},{"dateTime":"2015-10-04","value":""},{"dateTime":"2015-10-05","value":""},{"dateTime":"2015-10-06","value":""},{"dateTime":"2015-10-07","value":""},{"dateTime":"2015-10-08","value":""},{"dateTime":"2015-10-09","value":""},{"dateTime":"2015-10-10","value":""},{"dateTime":"2015-10-11","value":""},{"dateTime":"2015-10-12","value":""},{"dateTime":"2015-10-13","value":""},{"dateTime":"2015-10-14","value":""},{"dateTime":"2015-10-15","value":""},{"dateTime":"2015-10-16","value":""},{"dateTime":"2015-10-17","value":""},{"dateTime":"2015-10-18","value":""},{"dateTime":"2015-10-19","value":""},{"dateTime":"2015-10-20","value":""},{"dateTime":"2015-10-21","value":""},{"dateTime":"2015-10-22","value":""},{"dateTime":"2015-10-23","value":""},{"dateTime":"2015-10-24","value":"05:40"},{"dateTime":"2015-10-25","value":""}]}');
		/*
		var sleep = {}
		sleep.efavg = 100;
		sleep.efdict = [];
		sleep.asleepavg = 100;
		sleep.asleepdict = [];
		sleep.startdict = [];
		Fitbit.findOne({ owner: name }, function (err, fb) {
			if (fb == null) {res.send("invalid"); return}
			var testOptions = {
			  url: 'https://api.fitbit.com/1/user/-/sleep/efficiency/date/today/1m.json',
			  headers: {
			    'Authorization': "Bearer" + " " + fb.access_token
			  }
			};
			request(testOptions, function(error,response,body){
				if (!error && response.statusCode == 200) {
					for(var i = 0; i < 28; i++){
						if(JSON.parse(body)["sleep-efficiency"][i].value != 0){
							sleep.efavg = ((parseInt(JSON.parse(body)["sleep-efficiency"][i].value) + sleep.efavg) / 2);
						}
						sleep.efdict = JSON.parse(body)["sleep-efficiency"];
					}
					var testOptionstwo = {
						  url: 'https://api.fitbit.com/1/user/-/sleep/minutesAsleep/date/today/1m.json',
						  headers: {
						    'Authorization': "Bearer" + " " + fb.access_token
						  }
						};
						request(testOptionstwo, function(error,response,body){
							console.log(JSON.parse(body));
							//console.log(Object.keys(body))
							if (!error && response.statusCode == 200) {
								for(var i = 0; i < 28; i++){
									if(JSON.parse(body)["sleep-minutesAsleep"][i].value != 0){
										sleep.asleepavg = ((parseInt(JSON.parse(body)["sleep-minutesAsleep"][i].value) + sleep.asleepavg) / 2);
									}
									sleep.asleepdict = JSON.parse(body)["sleep-minutesAsleep"];
								}
								var testOptionsthree = {
								  url: 'https://api.fitbit.com/1/user/-/sleep/startTime/date/today/1m.json',
								  headers: {
								    'Authorization': "Bearer" + " " + fb.access_token
								  }
								};
								request(testOptionsthree, function(error,response,body){
									console.log(JSON.parse(body));
									//console.log(Object.keys(body))
									if (!error && response.statusCode == 200) {
										sleep.startdict = JSON.parse(body)["sleep-startTime"];
										res.send(sleep);
						  		 	} else {
						  				res.send(body)
						  			}
								})

				  		 	} else {
				  				res.send(body)
				  			}
						})
	  		 	} else {
	  				res.send(body)
	  			}
			})
			
		})*/
	}
	function Heartrate(name,res){
		res.send('{"activities-heart":[{"dateTime":"2015-09-25","value":{"customHeartRateZones":[],"heartRateZones":[{"max":100,"min":30,"name":"Out of Range"},{"max":140,"min":100,"name":"Fat Burn"},{"max":170,"min":140,"name":"Cardio"},{"max":220,"min":170,"name":"Peak"}]}},{"dateTime":"2015-09-26","value":{"customHeartRateZones":[],"heartRateZones":[{"max":100,"min":30,"name":"Out of Range"},{"max":140,"min":100,"name":"Fat Burn"},{"max":170,"min":140,"name":"Cardio"},{"max":220,"min":170,"name":"Peak"}]}},{"dateTime":"2015-09-27","value":{"customHeartRateZones":[],"heartRateZones":[{"max":100,"min":30,"name":"Out of Range"},{"max":140,"min":100,"name":"Fat Burn"},{"max":170,"min":140,"name":"Cardio"},{"max":220,"min":170,"name":"Peak"}]}},{"dateTime":"2015-09-28","value":{"customHeartRateZones":[],"heartRateZones":[{"max":100,"min":30,"name":"Out of Range"},{"max":140,"min":100,"name":"Fat Burn"},{"max":170,"min":140,"name":"Cardio"},{"max":220,"min":170,"name":"Peak"}]}},{"dateTime":"2015-09-29","value":{"customHeartRateZones":[],"heartRateZones":[{"max":100,"min":30,"name":"Out of Range"},{"max":140,"min":100,"name":"Fat Burn"},{"max":170,"min":140,"name":"Cardio"},{"max":220,"min":170,"name":"Peak"}]}},{"dateTime":"2015-09-30","value":{"customHeartRateZones":[],"heartRateZones":[{"max":100,"min":30,"name":"Out of Range"},{"max":140,"min":100,"name":"Fat Burn"},{"max":170,"min":140,"name":"Cardio"},{"max":220,"min":170,"name":"Peak"}]}},{"dateTime":"2015-10-01","value":{"customHeartRateZones":[],"heartRateZones":[{"max":100,"min":30,"name":"Out of Range"},{"max":140,"min":100,"name":"Fat Burn"},{"max":170,"min":140,"name":"Cardio"},{"max":220,"min":170,"name":"Peak"}]}},{"dateTime":"2015-10-02","value":{"customHeartRateZones":[],"heartRateZones":[{"max":100,"min":30,"name":"Out of Range"},{"max":140,"min":100,"name":"Fat Burn"},{"max":170,"min":140,"name":"Cardio"},{"max":220,"min":170,"name":"Peak"}]}},{"dateTime":"2015-10-03","value":{"customHeartRateZones":[],"heartRateZones":[{"max":100,"min":30,"name":"Out of Range"},{"max":140,"min":100,"name":"Fat Burn"},{"max":170,"min":140,"name":"Cardio"},{"max":220,"min":170,"name":"Peak"}]}},{"dateTime":"2015-10-04","value":{"customHeartRateZones":[],"heartRateZones":[{"max":100,"min":30,"name":"Out of Range"},{"max":140,"min":100,"name":"Fat Burn"},{"max":170,"min":140,"name":"Cardio"},{"max":220,"min":170,"name":"Peak"}]}},{"dateTime":"2015-10-05","value":{"customHeartRateZones":[],"heartRateZones":[{"max":100,"min":30,"name":"Out of Range"},{"max":140,"min":100,"name":"Fat Burn"},{"max":170,"min":140,"name":"Cardio"},{"max":220,"min":170,"name":"Peak"}]}},{"dateTime":"2015-10-06","value":{"customHeartRateZones":[],"heartRateZones":[{"max":100,"min":30,"name":"Out of Range"},{"max":140,"min":100,"name":"Fat Burn"},{"max":170,"min":140,"name":"Cardio"},{"max":220,"min":170,"name":"Peak"}]}},{"dateTime":"2015-10-07","value":{"customHeartRateZones":[],"heartRateZones":[{"max":100,"min":30,"name":"Out of Range"},{"max":140,"min":100,"name":"Fat Burn"},{"max":170,"min":140,"name":"Cardio"},{"max":220,"min":170,"name":"Peak"}]}},{"dateTime":"2015-10-08","value":{"customHeartRateZones":[],"heartRateZones":[{"max":100,"min":30,"name":"Out of Range"},{"max":140,"min":100,"name":"Fat Burn"},{"max":170,"min":140,"name":"Cardio"},{"max":220,"min":170,"name":"Peak"}]}},{"dateTime":"2015-10-09","value":{"customHeartRateZones":[],"heartRateZones":[{"max":100,"min":30,"name":"Out of Range"},{"max":140,"min":100,"name":"Fat Burn"},{"max":170,"min":140,"name":"Cardio"},{"max":220,"min":170,"name":"Peak"}]}},{"dateTime":"2015-10-10","value":{"customHeartRateZones":[],"heartRateZones":[{"max":100,"min":30,"name":"Out of Range"},{"max":140,"min":100,"name":"Fat Burn"},{"max":170,"min":140,"name":"Cardio"},{"max":220,"min":170,"name":"Peak"}]}},{"dateTime":"2015-10-11","value":{"customHeartRateZones":[],"heartRateZones":[{"max":100,"min":30,"name":"Out of Range"},{"max":140,"min":100,"name":"Fat Burn"},{"max":170,"min":140,"name":"Cardio"},{"max":220,"min":170,"name":"Peak"}]}},{"dateTime":"2015-10-12","value":{"customHeartRateZones":[],"heartRateZones":[{"max":100,"min":30,"name":"Out of Range"},{"max":140,"min":100,"name":"Fat Burn"},{"max":170,"min":140,"name":"Cardio"},{"max":220,"min":170,"name":"Peak"}]}},{"dateTime":"2015-10-13","value":{"customHeartRateZones":[],"heartRateZones":[{"max":100,"min":30,"name":"Out of Range"},{"max":140,"min":100,"name":"Fat Burn"},{"max":170,"min":140,"name":"Cardio"},{"max":220,"min":170,"name":"Peak"}]}},{"dateTime":"2015-10-14","value":{"customHeartRateZones":[],"heartRateZones":[{"max":100,"min":30,"name":"Out of Range"},{"max":140,"min":100,"name":"Fat Burn"},{"max":170,"min":140,"name":"Cardio"},{"max":220,"min":170,"name":"Peak"}]}},{"dateTime":"2015-10-15","value":{"customHeartRateZones":[],"heartRateZones":[{"max":100,"min":30,"name":"Out of Range"},{"max":140,"min":100,"name":"Fat Burn"},{"max":170,"min":140,"name":"Cardio"},{"max":220,"min":170,"name":"Peak"}]}},{"dateTime":"2015-10-16","value":{"customHeartRateZones":[],"heartRateZones":[{"max":100,"min":30,"name":"Out of Range"},{"max":140,"min":100,"name":"Fat Burn"},{"max":170,"min":140,"name":"Cardio"},{"max":220,"min":170,"name":"Peak"}]}},{"dateTime":"2015-10-17","value":{"customHeartRateZones":[],"heartRateZones":[{"max":100,"min":30,"name":"Out of Range"},{"max":140,"min":100,"name":"Fat Burn"},{"max":170,"min":140,"name":"Cardio"},{"max":220,"min":170,"name":"Peak"}]}},{"dateTime":"2015-10-18","value":{"customHeartRateZones":[],"heartRateZones":[{"max":100,"min":30,"name":"Out of Range"},{"max":140,"min":100,"name":"Fat Burn"},{"max":170,"min":140,"name":"Cardio"},{"max":220,"min":170,"name":"Peak"}]}},{"dateTime":"2015-10-19","value":{"customHeartRateZones":[],"heartRateZones":[{"max":100,"min":30,"name":"Out of Range"},{"max":140,"min":100,"name":"Fat Burn"},{"max":170,"min":140,"name":"Cardio"},{"max":220,"min":170,"name":"Peak"}]}},{"dateTime":"2015-10-20","value":{"customHeartRateZones":[],"heartRateZones":[{"max":100,"min":30,"name":"Out of Range"},{"max":140,"min":100,"name":"Fat Burn"},{"max":170,"min":140,"name":"Cardio"},{"max":220,"min":170,"name":"Peak"}]}},{"dateTime":"2015-10-21","value":{"customHeartRateZones":[],"heartRateZones":[{"max":100,"min":30,"name":"Out of Range"},{"max":140,"min":100,"name":"Fat Burn"},{"max":170,"min":140,"name":"Cardio"},{"max":220,"min":170,"name":"Peak"}]}},{"dateTime":"2015-10-22","value":{"customHeartRateZones":[],"heartRateZones":[{"max":100,"min":30,"name":"Out of Range"},{"max":140,"min":100,"name":"Fat Burn"},{"max":170,"min":140,"name":"Cardio"},{"max":220,"min":170,"name":"Peak"}]}},{"dateTime":"2015-10-23","value":{"customHeartRateZones":[],"heartRateZones":[{"caloriesOut":75.17785,"max":100,"min":30,"minutes":48,"name":"Out of Range"},{"caloriesOut":0,"max":140,"min":100,"minutes":0,"name":"Fat Burn"},{"caloriesOut":0,"max":170,"min":140,"minutes":0,"name":"Cardio"},{"caloriesOut":0,"max":220,"min":170,"minutes":0,"name":"Peak"}]}},{"dateTime":"2015-10-24","value":{"customHeartRateZones":[],"heartRateZones":[{"caloriesOut":2507.3038,"max":100,"min":30,"minutes":1312,"name":"Out of Range"},{"caloriesOut":700.7143,"max":140,"min":100,"minutes":117,"name":"Fat Burn"},{"caloriesOut":20.1162,"max":170,"min":140,"minutes":2,"name":"Cardio"},{"caloriesOut":0,"max":220,"min":170,"minutes":0,"name":"Peak"}],"restingHeartRate":71}},{"dateTime":"2015-10-25","value":{"customHeartRateZones":[],"heartRateZones":[{"caloriesOut":208.25425,"max":100,"min":30,"minutes":109,"name":"Out of Range"},{"caloriesOut":0,"max":140,"min":100,"minutes":0,"name":"Fat Burn"},{"caloriesOut":0,"max":170,"min":140,"minutes":0,"name":"Cardio"},{"caloriesOut":0,"max":220,"min":170,"minutes":0,"name":"Peak"}]}}]}');
		/*
		Fitbit.findOne({ owner: name }, function (err, fb) {
			if (fb == null) {res.send("invalid"); return}
			var testOptions = {
			  url: 'https://api.fitbit.com/1/user/-/activities/heart/date/today/1m.json',
			  headers: {
			    'Authorization': "Bearer" + " " + fb.access_token
			  }
			};
			request(testOptions, function(error,response,body){
				if (!error && response.statusCode == 200) {
					res.send(JSON.parse(body));
				}
			})
		})*/
	}
	function steps(name,res){
		res.send('{"activities-tracker-steps":[{"dateTime":"2015-09-25","value":"0"},{"dateTime":"2015-09-26","value":"0"},{"dateTime":"2015-09-27","value":"0"},{"dateTime":"2015-09-28","value":"0"},{"dateTime":"2015-09-29","value":"0"},{"dateTime":"2015-09-30","value":"0"},{"dateTime":"2015-10-01","value":"0"},{"dateTime":"2015-10-02","value":"0"},{"dateTime":"2015-10-03","value":"0"},{"dateTime":"2015-10-04","value":"0"},{"dateTime":"2015-10-05","value":"0"},{"dateTime":"2015-10-06","value":"0"},{"dateTime":"2015-10-07","value":"0"},{"dateTime":"2015-10-08","value":"0"},{"dateTime":"2015-10-09","value":"0"},{"dateTime":"2015-10-10","value":"0"},{"dateTime":"2015-10-11","value":"0"},{"dateTime":"2015-10-12","value":"0"},{"dateTime":"2015-10-13","value":"0"},{"dateTime":"2015-10-14","value":"0"},{"dateTime":"2015-10-15","value":"0"},{"dateTime":"2015-10-16","value":"0"},{"dateTime":"2015-10-17","value":"0"},{"dateTime":"2015-10-18","value":"0"},{"dateTime":"2015-10-19","value":"0"},{"dateTime":"2015-10-20","value":"0"},{"dateTime":"2015-10-21","value":"0"},{"dateTime":"2015-10-22","value":"0"},{"dateTime":"2015-10-23","value":"30"},{"dateTime":"2015-10-24","value":"9909"},{"dateTime":"2015-10-25","value":"475"}]}');

	/*
		Fitbit.findOne({ owner: name }, function (err, fb) {
			if (fb == null) {res.send("invalid"); return}
			var testOptions = {
			  url: 'https://api.fitbit.com/1/user/-/activities/tracker/steps/date/today/1m.json',
			  headers: {
			    'Authorization': "Bearer" + " " + fb.access_token
			  }
			};
			request(testOptions, function(error,response,body){
				if (!error && response.statusCode == 200) {
					res.send(JSON.parse(body));
				}
			})
		})*/
	}
}