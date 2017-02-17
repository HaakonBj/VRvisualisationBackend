var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var vrVisRoutes = require('./routes/VrVisRoutes');
var gitHistoryRoutes = require('./routes/UnrealRoutes');
global.Promise = require("q").Promise;
mongoose.Promise = global.Promise;

// connect to MongoDB
mongoose.connect('mongodb://localhost/VrVisualisation')
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(index);
app.use('/VrVis', vrVisRoutes);
app.use('/GitHistory', gitHistoryRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log("Here is a string");
  var err = <any>new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;