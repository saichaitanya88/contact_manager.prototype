var Logger = require('../utilities/logger').Logger;
var ApplicationModes = require("../utilities/config").ApplicationModes;
var logger = new Logger();
var appModes = new ApplicationModes();

function CustomObjectAPIHelper (){
	this.GetFieldValue = function GetFieldValue(value, fieldDefinition){
		logger.log("CustomObjectAPIHelper.GetFieldValue", appModes.DEBUG);
		if (fieldDefinition.type.toLowerCase() == "date"){
			var paramValue = new Date(value);
      if (paramValue.toString() != "Invalid Date") {
        return paramValue;
      }
		}
		else if (fieldDefinition.type.toLowerCase() == "string"){
			return value;
		}
		else if (fieldDefinition.type.toLowerCase() == "number"){
			if (NaN != Number(value))
				return Number(value);
		}
		else if (fieldDefinition.type.toLowerCase() == "boolean"){
			return (value.toString().toLowerCase() == "true");
		}
		else if (fieldDefinition.type.toLowerCase() == "objectid"){
			if (ObjectId.isValid(value))
				return new ObjectId(value);
		}
		return null;
	};
	var getFieldValue = this.GetFieldValue;
	this.GetFieldDBQuery = function GetFieldDBQuery(field, fieldDefinition){
		logger.log("CustomObjectAPIHelper.GetFieldDBQuery", appModes.DEBUG);
		var query = new Object();
		for (var key in field){
			query[key] = getFieldValue(field[key], fieldDefinition);
		}
		return query;
	}
}

module.exports.CustomObjectAPIHelper = CustomObjectAPIHelper;