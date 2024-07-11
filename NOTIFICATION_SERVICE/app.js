var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cron = require('node-cron');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var preferenceRouter = require('./routes/preferences');

var sendReminders = require('./tasks/sendReminders');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/preferences', preferenceRouter)

// cron.schedule('59 23 1-31 * *', () => {
//     console.log('running every minute 1, 2, 4 and 5');
// });

cron.schedule('* * * * *', async () => {
    await sendReminders();
});

// (async () => {
//     await sendReminders();
// })();

module.exports = app;
