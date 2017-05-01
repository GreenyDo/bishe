var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var index = require('./routes/index');
var users = require('./routes/users');
var verify = require('./function/verify');

var app = express();

// ejs engine setup
app.set('views', __dirname + '/views');
// app.set('.html', ejs.__express);貌似没什么用，被下一行代替
app.engine('html', require('ejs').renderFile);
app.set('view engine','html');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use("/",users);
// app.use("/",index);
app.use(verify);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    var ejsErr = {
      message: err.message,
      error: err
    };//ejs 加载错误信息，注意html编写是否正确
    res.render('error', ejsErr);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  var ejsErr = {
      message: err.message,
      error: {}
    };//ejs 加载错误信息，注意html编写是否正确
    res.render('error', ejsErr);
});


module.exports = app;
