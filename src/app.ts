var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var exphbs = require('express-handlebars');

let hbs = exphbs.create();

import * as indexRouter from './routes/index';
import * as aboutRouter from './routes/about';
import * as contactRouter from './routes/contact';
import * as heatmapRouter from './routes/heatmap';
import * as statisticRouter from './routes/statistic';

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/heatmap', heatmapRouter);
app.use('/statistic', statisticRouter);

module.exports = app;
