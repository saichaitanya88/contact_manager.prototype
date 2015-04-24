var UserModel = require('../core/users').UserModel;
//var UserValidation = require ('../core/users/validation').UserValidation;
function UsersHandler () {
  console.log("IMPLEMENT OAUTH FIRST");
  //"use strict";
  //var users_dao = new UsersDAO();
  this.GetUser = function GetUser(req, res){
    // users_dao.GetUser("sai", function DAOGetUser(err, user){
    //   if (err) 
    //     return res.send("not found");
    //   else 
    //     return res.send(JSON.stringify(user));
    // })
  res.send("not implemented");
  };
  this.UserSignIn = function UserSignIn(req, res){
    // users_dao.GetUser("sai", function DAOGetUser(err, user){
    //   if (err) 
    //     return res.send("not found");
    //   else 
    //     return res.send(JSON.stringify(user));
    // })
  res.send("not implemented - responds with token");
  };
  this.CreateUser = function CreateUser(req, res){
    var result = "Sanitize data and return UserModel";
    result += "\n\n" + JSON.stringify(new UserModel(req.body));
    result += "\n\n" + JSON.stringify(req.body);
    res.send(result);
    // Validate User
    // function CreateUser(req){
    //   // return 
    //   if (ValidateUser(req))
    //     res.send("valid");
    //   else 
    //     res.send("invalid");
    //   }
  };
  this.CreateUserSession = function CreateUser(req, res){
    res.send("not implemented");
    // Validate User
    // function CreateUser(req){
    //   // return 
    //   if (ValidateUser(req))
    //     res.send("valid");
    //   else 
    //     res.send("invalid");
    //   }
  };
}




module.exports.UsersHandler = UsersHandler;