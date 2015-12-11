function ApplicationConfig () {
	var appModes = new ApplicationModes();
	this.appMode = appModes.DEBUG;
	this.mongoDbConnection = 'mongodb://localhost:27017/conman_dev'
}

function ApplicationModes (){
	this.DEBUG = 20;
	this.TEST = 10;
	this.PROD = 1;
}

module.exports.ApplicationConfig = ApplicationConfig;
module.exports.ApplicationModes = ApplicationModes;