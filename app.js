require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var router = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(router);

// 404 not found handler
app.use(router.notFoundHandler);

// error handler
app.use(router.customErrorHandler);

/*
// Start the server - npm start script is used
app.listen(process.env.PORT || 3000);
*/

module.exports = app;