var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var orderRouter = require('./routes/testKitOrders');
var addTestResultRouter = require('./routes/userTestResult');
var userTestKitOrdersRouter = require('./routes/getUserTestKitOrders');
var userTestResultsRouter = require('./routes/getTestResults');
var usersRouter = require('./routes/users');
var addUserDemographicsRouter = require('./routes/addUserDemographics');
var getUserDemographicsRouter = require('./routes/getUserDemographics');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users/orders', orderRouter);
app.use('/users/addTestResult', addTestResultRouter);
app.use('/users/getUserTestKitOrders', userTestKitOrdersRouter);
app.use('/users/getTestResults', userTestResultsRouter);
app.use('/users', usersRouter);
app.use('/users/addUserDemographics', addUserDemographicsRouter);
app.use('/users/getUserDemographics', getUserDemographicsRouter);

module.exports = app;
