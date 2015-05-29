var UserDataAccess = require ('../dao/users').UserDataAccess;
var UserCore = require('../core/users').UserCore;
var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();

function CustomObjectHandler () {
  "use strict";
  this.GetAllCustomObjects = function GetAllCustomObjects(req, res){
    res.status(500).send("GetAllCustomObjects");
  };
}

module.exports.CustomObjectHandler = CustomObjectHandler;