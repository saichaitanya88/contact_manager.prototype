"use strict";

/* Requirements */
var express = require('express'),
    app = express(),
    cons = require('consolidate'); // Templating library adapter for Express
var bodyParser = require('body-parser');
// var AppCore = require('./core').AppCore;
//var AppConfig = require ("./app_config").AppConfig;
var Api = require('./api');

var Logger = require('./utilities/logger').Logger;
var ApplicationModes = require("./utilities/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();
/* Express Initialize */
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(express.static('public'));
/* Initialize Application Core */
//var appConfig = new AppConfig();
// var appCore = new AppCore(appConfig);


Api(app);

app.listen(8080);
logger.log('Express server started on port 8080', appModes.PROD);