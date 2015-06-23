/*

References the modules what communicate with the System Database and the Client Application Engine

Connects to the System Database to authenticate the user using HTTP basic auth in a REST API manner.

Drives the Client Application Engine by providing the Client's Database connection which is referenced in the System Database. 

*/

var SystemDAO = require("./system_dao").SystemDAO;
var MongoClient = require('mongodb').MongoClient;

function AppCore(AppConfig) {
"use strict";
	this.SystemDAO = undefined;
	this.AppConfig = AppConfig;

  var Initialize = function Initialize(){
  	// Connect to System Database Connection
  	MongoClient.connect(AppConfig.GetSystemDatabaseConnectionString(), function InitializeSystemDBConnection(err, db){
  		"use strict";
	    if(err) throw err;
	    SystemDAO = new SystemDAO(db);
  	});
  }
  Initialize();

  this.AuthenticateUser = function AuthenticateUser(authorization_header, callback){
  	"use strict";
  	var n = authorization_header.indexOf("Basic "); 

  	var b64string = authorization_header.substring(5);
		var user_pass = new Buffer(b64string, 'base64').toString();
		if (user_pass.split(':').length != 2)
			return undefined;

		var username = user_pass.split(':')[0];
		var password = user_pass.split(':')[1];
  	SystemDAO.AuthenticateUser(username, password, callback);
  	};
}

module.exports.AppCore = AppCore;