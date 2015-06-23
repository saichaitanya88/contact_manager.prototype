//var bcrypt = require('bcrypt-nodejs');

/* The UsersDAO must be constructed with a connected database object */
var MongoClient = require('mongodb').MongoClient;
var AppConfig = require('../app_config').AppConfig;
var UserModel = require("model").UserModel;

function DataAccess() {
  "use strict";
  var appConfig = new AppConfig();
  this.GetUser = function GetUser(username, callback){
    MongoClient.connect(appConfig.GetSystemDatabaseConnectionString(), function MongoGetUser(err, db) {
        function validateUserDoc(err, user) {
          "use strict";
          if (err) return callback(err, null);
          callback(null, user);
      }
      var users = db.collection("users");
      users.findOne({ 'username' : username }, validateUserDoc);
    });
  }

  this.CreateUser = function CreateUser(params, callback){
    var user = new UserModel(params);
    if (user.getErrors() != undefined){
      callback(user.getErrors(), null);
    }
    callback(null, user.getModel());
    // if (ValidateUser()){
    //   MongoClient.connect(appConfig.GetSystemDatabaseConnectionString(), function MongoGetUser(err, db) {
    //     // Insert
    //   });
    // }
  };
}

module.exports.DataAccess = DataAccess;