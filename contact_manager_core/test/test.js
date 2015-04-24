
var CarSchema = mongoose.Schema({
    make: String,
    model: String,
    year: Number,
    mileage: Number
});

var carObj = {
	make : "Toyota",
	model : "Yaris",
	year : 2010,
	mileage : 134100
}

var Car = mongoose.Document(carObj, CarSchema);

var CarWrapper = (function(Car){
    var model = Car;

    function getModel(args){
        return JSON.parse(JSON.stringify(model));
    }

    return {
    getModel :	function getModel(args){
        return JSON.parse(JSON.stringify(model));
    },
        validate: function(validateMethod, name){
        	eval(validateMethod)(getModel(), new Array());
          log("validate with " + validateMethod);
        }
    };
})(Car);

function log(msg){
	var html = $("#inner").html() + msg + "<br/>";
	$("#inner").html(html);
}

function validateMyCar(model, errors){
	if (model.make == "" || model.make === undefined) {
		errors.push("make is not provided");
	}
	return errors;
}

var vmcStr = validateMyCar.toString();
var functionName = validateMyCar.prototype.constructor.name;
log(vmcStr);
// validateMyCar = undefined;
// log(CarWrapper.validate(vmcStr, functionName));

eval(validateMyCar)(CarWrapper.getModel(), new Array());