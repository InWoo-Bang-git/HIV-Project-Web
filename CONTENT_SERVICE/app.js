var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var contentRouter = require('./routes/content');
var topicRouter = require('./routes/topics');
var bookMarksRouter = require('./routes/bookMarks');

var DBconnect = require('./data/DBconnect');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/page',contentRouter);
app.use('/topics',topicRouter);
app.use('/bookmarks',bookMarksRouter);

module.exports = app;
