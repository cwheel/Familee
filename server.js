var express = require('express')
  , session = require('express-session');
var Grant = require('grant').express()
  , grant = new Grant(require('./config/grant.json'));
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var Passport = require('passport');
var Redis = require("redis");

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
	res.header('POST https://api.fitbit.com/oauth2/token\nAuthorization: Basic MjI5UkREOiBhZGY5NjdmODNhMjRlMmNlYjFhYzY0ZTRmY2NhMWQyMA==', 0)
	res.send(req.query)
})
app.use(express.static(__dirname + '/app'));
app.listen(3000);

exports = module.exports = app;