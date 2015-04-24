/*
  Cache the database connection with the application, this should speed up data retrieval from the database
*/

"use strict";
var MongoClient = require('mongodb').MongoClient;

function DbConnectionCache()
{
    var ConnectionCache = new Object();
    
    this.Init = function(){
      console.log("DbConnectionCache.Init()");
    }
    this.Init();

    this.GetConnection = function(connection_string){
      console.log("DbConnectionCache.GetConnection()");
      var db_connection = GetConnection(connection_string);
      if (db_connection) return db_connection;
      if (AddConnection(connection_string)) return ConnectionCache[connection_string]
      return undefined;
    }

    this.CheckConnection = function(connection_string){
      console.log("DbConnectionCache.CheckConnection()"); 
    }

    this.RemoveConnection = function(connection_string){
      console.log("DbConnectionCache.RemoveConnection()"); 
    }

    function AddConnection(connection_string){
      console.log("DbConnectionCache.AddConnection()");
      MongoClient.connect(connection_string, function(err, db) {
        if(err) //throw err;
          return false;
        ConnectionCache[connection_string] = db;
        return true;
      });
    }
}

module.exports.DbConnectionCache = DbConnectionCache;