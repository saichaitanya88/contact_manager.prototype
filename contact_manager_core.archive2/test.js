var CoreUser =  UserModel;

var user_params = {
	"first_name" : "Sai",
	"last_name" : "Chaitanya",
	"password" : "123123123",
	"email" : "saichaitanya88@gmail.com",
	"twitter" : "whysaiwhy"
}

var user = new CoreUser(user_params);

// console.log(user.toString());

// console.log(user.getErrors());