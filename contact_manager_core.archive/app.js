"use strict";

/* Requirements */
var express = require('express'),
    app = express(),
    cons = require('consolidate'); // Templating library adapter for Express
var logger = require('morgan');
var bodyParser = require('body-parser');
//var MongoClient = require('mongodb').MongoClient;
var AppCore = require('./core').AppCore;
var AppConfig = require ("./app_config").AppConfig;
var Api = require('./api');

/* Express Initialize */
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());

/* Initialize Application Core */
//var appConfig = new AppConfig();
// var appCore = new AppCore(appConfig);

Api(app);

app.listen(8080);
console.log('Express server started on port 8080');