var Passport = require('passport');

module.exports = function(app) {
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
		res.header('POST https://api.fitbit.com/oauth2/token\nAuthorization: Basic MjI5UkREOiBhZGY5NjdmODNhMjRlMmNlYjFhYzY0ZTRmY2NhMWQyMA==', 0)
		res.send(req.query)
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