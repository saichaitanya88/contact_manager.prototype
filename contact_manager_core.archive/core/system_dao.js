/* The SystemDAO must be constructed with a connected database object */
function SystemDAO(db) {
    "use strict";

    // /* If this constructor is called without the "new" operator, "this" points
    //  * to the global object. Log a warning and call it correctly. */
    // if (false === (this instanceof SystemDAO)) {
    //     console.log('Warning: SystemDAO constructor called without "new" operator');
    //     return new SystemDAO(db);
    // }
    this.db = db;
    var users = this.db.collection("users");

    this.AuthenticateUser = function(username, password, callback) {
        "use strict";

        // Callback to pass to MongoDB that validates a user document
          // function validateUserDoc(err, user) {
          //     "use strict";

          //     if (err) return callback(err, null);

          //     if (user) {
          //       if (bcrypt.compareSync(password, user.password)) {
          //         callback(null, user);
          //       }
          //       else {
          //         var invalid_password_error = new Error("Invalid password");
          //         // Set an extra field so we can distinguish this from a db error
          //         invalid_password_error.invalid_password = true;
          //         callback(invalid_password_error, null);
          //       }
          //     }
          //     else {
          //       var no_such_user_error = new Error("User: " + user + " does not exist");
          //       // Set an extra field so we can distinguish this from a db error
          //       no_such_user_error.no_such_user = true;
          //       callback(no_such_user_error, null);
          //     }
          // }

        function sendValidationResult(err, user){
          console.log(user);
          if (err) return undefined;
          if (!user) return undefined;
          return user;
        };

        users.findOne({ 'username' : username, "password" : password }, callback(sendValidationResult));
    }
}

module.exports.SystemDAO = SystemDAO;