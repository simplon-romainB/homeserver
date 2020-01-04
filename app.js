var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dbRouter = require('./routes/db');
var loginRouter = require('./routes/login');
var articlesRouter = require('./routes/articles');
var postarticlesRouter = require('./routes/postarticles');
var commentsRouter = require('./routes/comments');
var sendcontactRouter = require('./routes/sendcontact');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true, store: new MemcachedStore({
  //hosts: ["127.0.0.1:11211"],
  //secret: "123, easy as ABC. ABC, easy as 123" // Optionally use transparent encryption for memcache session data
   // })
  //})
//);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Connection", "close");

  // authorized headers for preflight requests
  // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
  //res.header('Access-Control-Allow-Headers', '*');
  res.header("Access-Control-Allow-Headers", "*");
  next();

  app.options('*', (req, res) => {
      // allowed XHR methods  
      res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
      res.send();
  });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/db', dbRouter);
app.use('/login', loginRouter);
app.use('/articles', articlesRouter);
app.use('/postarticles', postarticlesRouter);
app.use('/comments', commentsRouter);
app.use('/sendcontact', sendcontactRouter);

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

//uselesscom
