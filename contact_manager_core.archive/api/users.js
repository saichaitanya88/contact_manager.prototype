var UserModel = require('../core/users/model').UserModel;
//var UserValidation = require ('../core/users/validation').UserValidation;
function UsersHandler () {
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
  this.CreateUser = function CreateUser(req, res){
    var userModel = new UserModel(req.body);
    if (userModel.getErrors()){
      res.send(userModel, 401)
    }
    else{
      res.send("will process");
    }
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