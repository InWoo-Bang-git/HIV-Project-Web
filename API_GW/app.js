var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/authenticate');
var contetnRouter = require('./routes/content');
var adminRouter = require('./routes/admin');
var notificationRouter = require('./routes/notificationPreferences');

var auth = require('./middleware/authAndAuthorize');

var app = express();

// WE lazy
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(auth);

app.use('/', indexRouter);
app.use('/users/*', usersRouter);
app.use('/admin',adminRouter);
app.use('/content',contetnRouter)
app.use('/register',registerRouter);
app.use('/login',loginRouter);
app.use('/notifications',notificationRouter)

module.exports = app;
