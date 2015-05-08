var ApplicationConfig = require("./config").ApplicationConfig;
var ApplicationModes = require("./config").ApplicationModes;
var AppModes = new ApplicationModes();
function Logger () {
	var appConfig = new ApplicationConfig();

	// logs the message if the current application mode is greater than provided
	this.log = function log(message, appMode){
		//console.log('appConfig.appMode: ' + appConfig.appMode + ' appmode: ' + appMode)
		if (appMode === undefined && appConfig.appMode == AppModes.DEBUG)
			console.log(message);
		if (appConfig.appMode >= appMode)
			console.log(message);
	}
}

module.exports.Logger = Logger;