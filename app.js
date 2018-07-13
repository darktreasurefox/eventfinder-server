const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
require('dotenv').config()
const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/db_eventfinder',{useNewUrlParser:true})


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/events', require('./routes/events'))
app.use('/tweets', require('./routes/twitter'))
app.use('/darksky', require('./routes/darksky'))

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
  res.send("error")
});

module.exports = app;
