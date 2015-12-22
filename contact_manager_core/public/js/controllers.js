/* Controllers */
var contactManagerControllers = angular.module('contactManagerControllers', []);

contactManagerControllers.controller('AccountCtrl', ['$scope', '$http', '$cookies', '$location', 'Account', "AppHelper",
  function($scope, $http, $cookies, $location, Account, AppHelper) {
    $scope.AppHelper = AppHelper;
    if ($cookies.get("AccountId")){
    	Account.Get({accountId : $cookies.get("AccountId")}, $scope.AppHelper.GetAuthParams(), function(data, status){
    		$scope.account = data.account;
    	}, function(data, status){
    		console.log(data);
    		console.log(status);
    	})
    }
    $scope.CreateAccount = function() {
      Account.Create($scope.account, $scope.AppHelper.GetAuthParams(), function(data, status) {
        $scope.successResponse = data;
        // Sign the user in automatically
        $scope.SignInAccount();
      }, function(data, status) {
        $scope.errorResponse = data;
      });
    }
    $scope.SignInAccount = function() {
      var credentials = {
        email: $scope.account.email,
        password: $scope.account.password
      }
      Account.SignIn(credentials, $scope.AppHelper.GetAuthParams(), function(data, status) {
        $cookies.put('SessionToken', data.session.token);
        $cookies.put('AccountId', data.session.accountId);
        $location.path("/application/account/" + data.session.accountId);
      }, function(data, status) {
        $location.path("/application/account/signin" + data.session.accountId);
      });
    }
    $scope.ToggleAccountEdit = function() {
      $scope.EditAccount = !$scope.EditAccount;
    }
    $scope.UpdateAccount = function() {
      Account.Update($scope.account, $scope.AppHelper.GetAuthParams(), function(data, status) {
        $scope.successResponse = JSON.stringify(data, null, 2);
        // Sign the user in automatically
        $scope.form.$setPristine();
      }, function(data, status) {
        $scope.errorResponse = JSON.stringify(data, null, 2);
      });
    }
  }
]);


contactManagerControllers.controller('CustomObjectsCtrl', ['$scope', '$http', '$cookies', '$location', '$routeParams', 'Account', 'CustomObject', "AppHelper",
  function($scope, $http, $cookies, $location, $routeParams, Account, CustomObject, AppHelper) {
    $scope.searchTerm = '';
    $scope.customObjects = [];
    $scope.DebugMode = AppHelper.DebugMode;
    $scope.AppHelper = AppHelper;
    $scope.SearchCustomObjects = function() {
      CustomObject.Search({
        name: $scope.searchTerm
      }, $scope.AppHelper.GetAuthParams(), function(data, status) {
        $scope.customObjects = data.customObjects;
        $scope.customObjectsCount = data.count;
        $scope.errorResponse = null;
      }, function(data, status) {
        $scope.errorResponse = JSON.stringify(data, null, 2);
      });
    }
    $scope.CreateCustomObject = function() {
      CustomObject.Create($scope.customObject, $scope.AppHelper.GetAuthParams(), function(data, status) {
        $location.path("/application/account/" + $scope.AppHelper.GetAuthParams().accountId + "/customObject/" + data.customObject.data._id);
      }, function(data, status) {
        $scope.errorResponse = JSON.stringify(data, null, 2);
      });
    }
    $scope.SearchCustomObjects();
    $scope.GetCustomObject = function() {
      CustomObject.Get({
        _id: $routeParams.customObjectId
      }, $scope.AppHelper.GetAuthParams(), function(data, status) {
        $scope.customObject = data.customObject[0];
      }, function(data, status) {
        $scope.errorResponse = JSON.stringify(data, null, 2);
      });
    }
    if ($routeParams.customObjectId != null) {
      $scope.GetCustomObject();
    }
    $scope.UpdateCustomObject = function() {
      CustomObject.Update($scope.customObject, $scope.AppHelper.GetAuthParams(), function(data, status) {
        $scope.form.$setPristine();
      }, function(data, status) {
        $scope.errorResponse = JSON.stringify(data, null, 2);
      });
    }
    $scope.DeleteCustomObject = function() {
      CustomObject.Delete($scope.customObject, $scope.AppHelper.GetAuthParams(), function(data, status) {
        $location.path("/application/account/" + $scope.AppHelper.GetAuthParams().accountId + "/customObjects");
      }, function(data, status) {
        $scope.errorResponse = JSON.stringify(data, null, 2);
      });
    }
    $scope.QuickDelete = function(customObject) {
      CustomObject.Delete(customObject, $scope.AppHelper.GetAuthParams(), function(data, status) {
        $scope.SearchCustomObjects();
      }, function(data, status) {
        $scope.errorResponse = JSON.stringify(data, null, 2);
      });
    }
  }
]);

contactManagerControllers.controller('CustomObjectModelDefinitionCtrl', ['$scope', '$http', '$cookies', '$location', '$routeParams', 'Account', 'CustomObjectModelDefinition',"AppHelper",
  function($scope, $http, $cookies, $location, $routeParams, Account, CustomObjectModelDefinition, AppHelper) {
  	$scope.DebugMode = AppHelper.DebugMode;
    $scope.ValidDataTypes = ["String", "Date", "Number", "ObjectId", "Boolean"];
    $scope.customObjectModelDefinition = {};
    $scope.customObjectModelDefinition.type = $scope.ValidDataTypes[0];
    $scope.AppHelper = AppHelper;
    $scope.GetCustomObjectModelDefinition = function() {
      CustomObjectModelDefinition.Get({
        _id: $routeParams.customObjectModelDefinitionId
      }, $scope.AppHelper.GetAuthParams(), function(data, status) {
        $scope.customObjectModelDefinition = data[0].modelDefinition[0];
      }, function(data, status) {
        $scope.errorResponse = JSON.stringify(data, null, 2);
      });
    }
    $scope.UpdateDefinition = function() {
      CustomObjectModelDefinition.Update($scope.customObjectModelDefinition, $scope.AppHelper.GetAuthParams(), function(data, status) {
        $scope.customObjectModelDefinition = data.customObjectModelDefinition.data;
        $scope.form.$setPristine();
      }, function(data, status) {
        $scope.errorResponse = JSON.stringify(data, null, 2);
      });
    }
    $scope.CreateDefinition = function() {
      CustomObjectModelDefinition.Create($scope.customObjectModelDefinition, $scope.AppHelper.GetAuthParams(), function(data, status) {
        $location.path("/application/account/" + $scope.AppHelper.GetAuthParams().accountId + "/customObject/" + GetAuthParams().customObjectId + "/modelDefinition/" + customObjectModelDefinitionId);
      }, function(data, status) {
        $scope.errorResponse = JSON.stringify(data, null, 2);
      });
    }
    $scope.RemoveDefinition = function() {
      CustomObjectModelDefinition.Delete($scope.customObjectModelDefinition, $scope.AppHelper.GetAuthParams(), function(data, status) {
        $location.path("/application/account/" + $scope.AppHelper.GetAuthParams().accountId + "/customObject/" + $scope.AppHelper.GetAuthParams().customObjectId);
      }, function(data, status) {
        $scope.errorResponse = JSON.stringify(data, null, 2);
      });
    }
    $scope.DataTypeDisabled = function() {
      if (!$scope.customObjectModelDefinition._id) return false;
      return true;
    }
    $scope.FieldDisabled = function() {
      if (!$scope.customObjectModelDefinition) return false;
      return $scope.customObjectModelDefinition.scope == "System";
    }
    if ($routeParams.customObjectModelDefinitionId != null) {
      $scope.GetCustomObjectModelDefinition();
    }
  }
]);

contactManagerControllers.controller('CustomObjectDataCtrl', ['$scope', '$http', '$routeParams', '$location','AppHelper', 'CustomObject', 'CustomObjectData',
	function($scope, $http, $routeParams, $location, AppHelper, CustomObject, CustomObjectData) {
    $scope.AppHelper = AppHelper;
		$scope.GetCustomObject = function() {
      CustomObject.Get({
        _id: $routeParams.customObjectId
      }, $scope.AppHelper.GetAuthParams(), function(data, status) {
        $scope.customObject = data.customObject[0];
        $scope.customObjectDataKeys = [];
        for(var i = 0; i < $scope.customObject.modelDefinition.length; i++){
        	if ($scope.customObject.modelDefinition[i].scope == 'System') continue;
        	var key = {};
        	key['fieldName'] = $scope.customObject.modelDefinition[i].fieldName;
        	key['name'] = $scope.customObject.modelDefinition[i].name;
        	key['type'] = $scope.customObject.modelDefinition[i].type;
        	$scope.customObjectDataKeys.push(key);
        }
      }, function(data, status) {
        $scope.errorResponse = JSON.stringify(data, null, 2);
      });
    }
    $scope.GetCustomObject();
    $scope.GetCustomObjectData = function() {
      CustomObjectData.Get({
        _id: $routeParams.customObjectDataId
      }, $scope.AppHelper.GetAuthParams(), function(data, status) {
        $scope.customObjectData = data.customObjectData;
      }, function(data, status) {
        $scope.errorResponse = JSON.stringify(data, null, 2);
      });
    }
    if ($routeParams.customObjectDataId){
    	$scope.GetCustomObjectData();
    }
    $scope.FieldType = function(field){
    	//["String", "Date", "Number", "ObjectId", "Boolean"];
    	if (field.type == 'String'){
    		return 'text';
    	}
    	if (field.type == 'Date'){
    		return 'date';
    	}
    	if (field.type == 'Number'){
    		return 'number';
    	}
    	if (field.type == 'ObjectId'){
    		return 'ObjectId';
    	}
    	if (field.type == 'Boolean'){
    		return 'checkbox';
    	}
    	return 'text';
    }
    $scope.Create = function(){
    	var customObjectData = {};
    	var customObject = $scope.customObject;
    	for(var i = 0; i < customObject.modelDefinition.length; i ++){
    		if (customObject.modelDefinition[i].scope == 'System') continue;
    		if (customObject.modelDefinition[i].type == 'String'){
	    		customObjectData[customObject.modelDefinition[i].fieldName] = customObject.modelDefinition[i].value;
	    	}
	    	if (customObject.modelDefinition[i].type == 'Date'){
	    		customObjectData[customObject.modelDefinition[i].fieldName] = new Date(customObject.modelDefinition[i].value);
	    	}
	    	if (customObject.modelDefinition[i].type == 'Number'){
	    		customObjectData[customObject.modelDefinition[i].fieldName] = parseFloat(customObject.modelDefinition[i].value);
	    	}
	    	if (customObject.modelDefinition[i].type == 'ObjectId'){
	    		customObjectData[customObject.modelDefinition[i].fieldName] = null;
	    	}
	    	if (customObject.modelDefinition[i].type == 'Boolean'){
	    		customObjectData[customObject.modelDefinition[i].fieldName] = new Boolean(customObject.modelDefinition[i].value);
	    	}
    	}
    	CustomObjectData.Create(customObjectData, $scope.AppHelper.GetAuthParams(), function(data, status) {
    		$location.path("/application/account/" + $scope.AppHelper.GetAuthParams().accountId + "/customObject/" + $scope.AppHelper.GetAuthParams().customObjectId);
    	}, function(data, status){
    		$scope.errorResponse = data;
    	});
    	console.log(customObject);
    }

		$scope.Search = function(){
			var query = {}
			for(var i = 0; i < $scope.customObject.modelDefinition.length; i ++){
				if ($scope.customObject.modelDefinition[i].type == "String"){
					if ($scope.customObject.modelDefinition[i].value){
						var strQuery = {};
						strQuery['$regex'] = ".*" + $scope.customObject.modelDefinition[i].value + ".*";
						query[$scope.customObject.modelDefinition[i].fieldName] = strQuery;	
					}
				}
				else if ($scope.customObject.modelDefinition[i].type == "Date" || $scope.customObject.modelDefinition[i].type == "Number"){
					var dtQuery = {};
					if ($scope.customObject.modelDefinition[i].value_start){
						dtQuery['$gte'] = $scope.customObject.modelDefinition[i].value_start;
					}
					if ($scope.customObject.modelDefinition[i].value_end){
						dtQuery['$lte'] = $scope.customObject.modelDefinition[i].value_end;
					}
					if (Object.keys(dtQuery).length > 0)
						query[$scope.customObject.modelDefinition[i].fieldName] = dtQuery;
				}
				else if ($scope.customObject.modelDefinition[i].type == "Boolean"){
					if ($scope.customObject.modelDefinition[i].value){
						var blQuery = {};
						blQuery['$eq'] = $scope.customObject.modelDefinition[i].value;
						query[$scope.customObject.modelDefinition[i].fieldName] = blQuery;	
					}
				}
			}
			console.log(JSON.stringify(query, null, 2));
			CustomObjectData.Search(query, $scope.AppHelper.GetAuthParams(), function(data, status) {
	        $scope.customObjectData = data;
	      }, function(data, status) {
	        $scope.errorResponse = JSON.stringify(data, null, 2);
	      });
		}
		$scope.ObjectIdValid = function(str){
			var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
			return checkForHexRegExp.test(str);
		}
		$scope.CustomObjectDataUrl = function(data){
       var url = "#/application/account/" + $scope.AppHelper.GetAuthParams().accountId + "/customObject/" + $scope.AppHelper.GetAuthParams().customObjectId + "/data/" + data._id;
			return url;
		}
		$scope.Update = function(){
			CustomObjectData.Update($scope.customObjectData, $scope.AppHelper.GetAuthParams(), function(data, status) {
    		$scope.customObjectData = data.customObjectData.data;
        $scope.form.$setPristine();
    	}, function(data, status){
    		$scope.errorResponse = data;
    	});
		}
    $scope.QuickDeleteCustomObjectData = function(id){
      CustomObjectData.Delete({_id: id}, $scope.AppHelper.GetAuthParams(), function(data, status) {
        $scope.Search();
      }, function(data, status){
        $scope.errorResponse = data;
      });
    }
		$scope.Delete = function(){
			CustomObjectData.Delete({_id: $scope.customObjectData._id}, $scope.AppHelper.GetAuthParams(), function(data, status) {
    		$location.path("/application/account/" + $scope.AppHelper.GetAuthParams().accountId + "/customObject/" + $scope.AppHelper.GetAuthParams().customObjectId);
    	}, function(data, status){
    		$scope.errorResponse = data;
    	});
		}
}]);

contactManagerControllers.controller('StaticCtrl', ['$scope', '$http', "AppHelper", function($scope, $http,AppHelper) {

}]);

contactManagerControllers.controller('MiscCtrl', ['$scope', '$http', "AppHelper", "Account", "$location", "$cookies", 
	function($scope, $http, AppHelper, Account, $location, $cookies) {
	$scope.AppHelper = AppHelper;
	$scope.BaseUrl = "/";
  $scope.LoginPath = "/#/application/account/signin";
  $scope.Authenticate = function() {
    if (!$scope.AppHelper.GetAuthParams().accountId) return;
	  Account.Authenticate($scope.AppHelper.GetAuthParams(), $scope.AppHelper.GetAuthParams(),
			function(data, status){
				$scope.LoggedIn = true;
				if ($location.path() == '/' || $location.path() == '/application/account' || $location.path() == '/application/account/signin' ) {
					$location.path("/application/account/" + $scope.AppHelper.GetAuthParams().accountId);
				}
			 //  if ($location.path() != '/' && $location.path() != '/application/account' && $location.path() != '/application/account/signin' ) {
				// }
			},
			function(data, status){
        $scope.LoggedIn = false;
				if ($location.path() != '/application/account/signin')
					$scope.LogOut();
			}
		);
  }
  $scope.LogOut = function(){
  	$scope.LoggedIn = false;
  	$cookies.remove("AccountId");
		$cookies.remove("SessionToken");
		$location.path($scope.BaseUrl);
  }
  $scope.$root.$on( "$routeChangeStart", function(event, next, current) {
    if (next.$$route){
      window.document.title = next.$$route.title;
    }
    $scope.Authenticate();
  })
  $scope.$on("$stateChangeSuccess", $scope.Authenticate());
  $scope.DebugMode = true;
}]);