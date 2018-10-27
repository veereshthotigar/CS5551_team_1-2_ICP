var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('mongoose'),db_string = 'mongodb://icp_10:icp_10_pass@ds135993.mlab.com:35993/medicationtakeback';
var app = express();
var cors = require('cors');

//initializing schema
require('./model/drug');
require('./model/events');
require('./model/users');
require('./model/users_seq');
//connection for DB
var db_promise = db.connect(db_string,{ useNewUrlParser: true });
db_promise.then((data) => {
    console.log("Database connection is successfull !");
}).catch(reason => {
    console.log("Database connection is unsuccessfull ! : "+reason.message);
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(cors());

// Rest APIs
require('./controllers/drug')(app, db);
require('./controllers/events')(app, db);
require('./controllers/users')(app, db);

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
