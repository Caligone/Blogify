
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('SkHg0qNtVleIpnhD2g5fIKRzenWnnKRViv623ybu'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/', routes.add);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

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