
/**
* Module dependencies.
*/

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var flash = require('connect-flash');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.cookieParser());
app.use(express.session({ secret: 'SkHg0qNtVleIpnhD2g5fIKRzenWnnKRViv623ybu' }));
app.use(flash());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req,res,next){
    res.locals.session = req.session;
    res.locals.flash = req.flash;
    next();
});
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/', routes.add);
app.post('/signin', user.signin);
app.get('/signout', user.signout);
app.get('/signup', user.signup);
app.post('/signup', user.signup_post);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// Mixins
app.locals.prettyDate = function prettyDate(date){
  var h = date.getHours();
  h = ((h+"").length == 1 ? "0"+h : h);
  var mi = date.getMinutes();
  mi = ((mi+"").length == 1 ? "0"+mi : mi);
  var s = date.getSeconds();
  s = ((s+"").length == 1 ? "0"+s : s);
  var d = date.getDate();
  var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
  var m = monthNames[date.getMonth()];
  var y = date.getFullYear();
  return d+' '+m+' '+y+' at '+h+':'+mi+':'+s;
};
