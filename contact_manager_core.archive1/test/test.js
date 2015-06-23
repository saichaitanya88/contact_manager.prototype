function log(msg){
	var html = $("#inner").html() + msg + "<br/>";
	$("#inner").html(html);
}

var DAO = function DAO(){
    this.FindSomething = function FindSomething(val, callback){
        log(val);
        callback();
    }
}

function validate_1(myInt, count, ){
    log('val 1');
}
function validate_2(){
    log('val 2');
}
function validate_3(){
    log('val 3');
}
function validate_4(){
    log('val 4');
}
function validate_5(){
    log('val 5');
}
function validate_6(){
    log('val 6');
}
validate_1();

function cb(){
    log("this is the callback");
}
d = new DAO();
d.FindSomething("something", validate_6)


var valArray = new Array();
valArray.push(validate_1)
valArray.push(validate_2)
valArray.push(validate_3)
valArray.push(validate_4)
valArray.push(validate_5)
valArray.push(validate_6)

valArray[0](0, valArray.length, cb);