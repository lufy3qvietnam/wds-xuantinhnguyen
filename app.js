var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
// var config = require('config');
var session = require('express-session');
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var productsRouter = require('./routes/products');
var checkoutRouter = require('./routes/checkout');
var blogRouter = require('./routes/blog');
var detailsRouter = require('./routes/details');
var teamsRouter = require('./routes/teams');
var team_detailsRouter = require('./routes/team-details')

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser('cookie'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret string',
  resave: false,
  saveUninitialized: true,
  cookie: {
    // secure: true, require https
    maxAge: 600000 //thoi gian luu phien lam viec
  }
}));
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/checkout', checkoutRouter);
app.use('/details', detailsRouter);
app.use('/products', productsRouter);
app.use('/blog', blogRouter);
app.use('/teams', teamsRouter);
app.use('/team-details', team_detailsRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.send(err.message)
});
app.listen(8080, () => {
  console.log('server is litening on port 8080')
})
module.exports = app;