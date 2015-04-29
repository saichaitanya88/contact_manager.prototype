var MongoClient = require('mongodb').MongoClient;

function UserDataAccess () {
  "use strict";
  this.sGetUserByEmail = function GetUserByEmail(email, result){
    MongoClient.connect("mongodb://localhost:27017/conman_dev", {native_parser:true}, function(err, db) {
      var usersCollection = db.collection('users');
      usersCollection.findOne({ 'email' : email }, function (err, doc) {
          "use strict";
          if (err) throw err;
          return doc;
      });
    });
  };
  this.GetUserByEmail = function GetUserByEmail(email, callback){
    // Open the connection to the server
    MongoClient.connect("mongodb://localhost:27017/conman_dev", {native_parser:true}, function(err, db) {
      // Get the first db and do an update document on it
      var usersCollection = db.collection('users');
      
      usersCollection.findOne({ 'email' : email }, function (err, doc) {
          "use strict";
          if (err) throw err;

          callback(err, doc);
      });
    });
  };
  this.CreateUser = function CreateUser(user, errorCallback, successCallback){
    // Open the connection to the server
    MongoClient.connect("mongodb://localhost:27017/conman_dev", {native_parser:true}, function(err, db) {
      // Get the first db and do an update document on it
      var usersCollection = db.collection('users');
      
      usersCollection.insert(user.getModel(), function (err, result) {
          "use strict";
          if (err){
            errorCallback(err);
          }
          else{
            successCallback(response, result);
          }
      });
    });
  };
}

module.exports.UserDataAccess = UserDataAccess;