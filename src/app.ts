import * as express from "express";
import * as path from "path";
import * as logger from "morgan";
import * as exphbs from "express-handlebars";


let hbs = exphbs.create();

import * as indexRouter from './routes/index';
import * as aboutRouter from './routes/about';
import * as contactRouter from './routes/contact';
import * as othersRouter from './routes/others';
import * as heatmapRouter from './routes/heatmap';
import * as statisticRouter from './routes/statistic';
import * as docRouter from './routes/doc';

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter as express.Router);
app.use('/about', aboutRouter as express.Router);
app.use('/contact', contactRouter as express.Router);
app.use('/others', othersRouter as express.Router);
app.use('/heatmap', heatmapRouter as express.Router);
app.use('/statistic', statisticRouter as express.Router);
app.use('/doc', docRouter as express.Router);

app.use(function(req: express.Request, res: express.Response) {
    res.status(400);
    res.render('404');
});

app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    console.error(err.stack);
    res.status(500).render('error', { error: err });
});

module.exports = app;
