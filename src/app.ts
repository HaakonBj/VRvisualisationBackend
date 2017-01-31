var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var vrVisRoutes = require('./routes/VrVisRoutes');

mongoose.Promise = global.Promise;

// connect to MongoDB
//TODO: Change:
mongoose.connect('mongodb://localhost/VrVisualisation')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/VrVis', vrVisRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = {
    error: new Error('Not Found'),
    status: 404
};
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.error.message;
  res.locals.error = req.app.get('env') === 'development' ? err.error : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
