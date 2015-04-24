var MC = function Connector(){
	this.LoadValidation = function LoadValidation(){
		var ValidateName = function ValidateName(){
			if (model.name ===  undefined) 
				errors.name = "name is not available";
		};
		var ValidateHp = function ValidateHp(){
			if (model.hp === undefined) 
				errors.hp = "hp is not available";
		};
		var ValidateMethods = new Array();
		ValidateMethods.push(ValidateName);
		ValidateMethods.push(ValidateHp);
		this.Validate = function Validate(car){
			model = car;
			errors = new Object();
			for(var method in ValidateMethods)
			{
				ValidateMethods[method]();
			}
			return errors;
		}
	}
}

var CarMetaData = function CarMetaData1(){
	this.CarSchema = mongoose.Schema({
		name: String,
		hp : Number
	});	
	this.Validate = new MC().LoadValidation;
}

var carMetaData = new CarMetaData();
var car = mongoose.Document({ }, carMetaData.CarSchema);
function ValidateName(model, errors){if (model.name ===  undefined) errors.name = "name is not available"; };
var vn = ValidateName.toString();
eval(vn);
var errs = new Object();
var tmpFunc = new Function("ValidateName(car, errs)");
tmpFunc();