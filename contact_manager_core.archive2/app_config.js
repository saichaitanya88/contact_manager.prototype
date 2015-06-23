function AppConfig(){
	this.ApplicationEnvironment = "dev";

	this.GetSystemDatabaseConnectionString = function(){
		if (this.ApplicationEnvironment == "dev")
			return "mongodb://localhost:27017/contact_manager_system_dev";
		else
			return undefined;
	};
}

module.exports.AppConfig = AppConfig;