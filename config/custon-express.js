var load = require('express-load');
var express = require('express');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
module.exports = function (){
  var app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(expressValidator());
  load('controllers')
      .then('routes')
      .then('persistencia')
      .into(app);
  return app;
}
