var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//variables de mensajes flash y sesion
var flash=require('connect-flash');
var cookieSession=require('cookie-session');
//variable con los modulos de ruta
var routes = require('./routes/routes');
//uso de las librerias passport para autenticacion
var passport=require('passport');
//requerir del modulo passport 
require('./passport/passport')(passport);


//variable con todos los metodos de express
var app = express();
//parsear a cookie, uso de la sesion con un clave en produccion la clave de ser mas compleja
app.use(cookieParser());
app.use(cookieSession({
  name:'sesion',
  keys:["arigato-kosaymas", "ningen"]
}));
app.use(flash());



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

//middleware de passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;


