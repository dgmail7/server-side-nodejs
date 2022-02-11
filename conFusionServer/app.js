var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter')
var promoRouter = require('./routes/promotionRouter')
var leaderRouter = require('./routes/leaderRouter')

const mongoose = require('mongoose')
const Dishes = require('./models/dishes')
const url = 'mongodb://localhost:27017/conFusion'
const connect = mongoose.connect(url)
connect.then(db => {
  console.log('Connected correctly to server')
}, err => console.log(err))

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/*
https://stackoverflow.com/questions/48225408/set-home-page-in-express
The home page is rendered as part of the express.static middleware default options.

To disable this logic, set express.static(..., { index: false }).

If you want to change the file served as a home page, set express.static(..., { index: 'yourfile.html' }).

What this option does, in fact, is attempt to serve an index page with given file name for each directory in your public folder, 
so if you have public/foo/index.html then it will get served when requesting /foo/ path.
*/

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishRouter)
app.use('/promotions', promoRouter)
app.use('/leaders', leaderRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
