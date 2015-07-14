/* Controllers */
var contactManagerControllers = angular.module('contactManagerControllers', []);

contactManagerControllers.controller('AccountCtrl', ['$scope', '$http', '$cookies', '$location', 'Account', "AppHelper",
  function($scope, $http, $cookies, $location, Account, AppHelper) {
    $scope.AuthParams = AppHelper.GetAuthParams();
    if ($cookies.get("AccountId")){
    	Account.Get({accountId : $cookies.get("AccountId")}, function(data, status){
    		$scope.account = data.account;
    	}, function(data, status){
    		console.log(data);
    		console.log(status);
    	})
    }
    $scope.CreateAccount = function() {
      Account.Create($scope.account, function(data, status) {
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
      Account.SignIn(credentials, function(data, status) {
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
      Account.Update($scope.account, $scope.AuthParams, function(data, status) {
        $scope.successResponse = JSON.stringify(data, null, 2);
        // Sign the user in automatically
        $scope.SignInAccount();
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
    $scope.AuthParams = AppHelper.GetAuthParams();
    $scope.AppHelper = AppHelper;
    if ($location.path() != '/' && $location.path() != '/application/account' && $location.path() != '/application/account/signin') {
      // if no cookies, then go to sign-in page
      Account.Authenticate($scope.AuthParams,
        function(data, status) {
          // Authenticated
          $scope.account = data.account;
        },
        function(data, status) {
          $cookies.remove("AccountId");
          $cookies.remove("SessionToken");
          $location.path("/");
        })
    }
    $scope.SearchCustomObjects = function() {
      CustomObject.Search({
        name: $scope.searchTerm
      }, $scope.AuthParams, function(data, status) {
        $scope.customObjects = data.customObjects;
        $scope.customObjectsCount = data.count;
        $scope.errorResponse = null;
      }, function(data, status) {
        $scope.errorResponse = JSON.stringify(data, null, 2);
      });
    }
    $scope.CreateCustomObject = function() {
      CustomObject.Create($scope.customObject, $scope.AuthParams, function(data, status) {
        $location.path("/application/account/" + $scope.AuthParams.accountId + "/customObject/" + data.customObject.data._id);
      }, function(data, status) {
        $scope.errorResponse = JSON.stringify(data, null, 2);
      });
    }
    $scope.SearchCustomObjects();
    $scope.GetCustomObject = function() {
      CustomObject.Get({
        _id: $routeParams.customObjectId
      }, $scope.AuthParams, function(data, status) {
        $scope.customObject = data.customObject[0];
      }, function(data, status) {
        $scope.errorResponse = JSON.stringify(data, null, 2);
      });
    }
    if ($routeParams.customObjectId != null) {
      $scope.GetCustomObject();
    }
    $scope.UpdateCustomObject = function() {
      CustomObject.Update($scope.customObject, $scope.AuthParams, function(data, status) {
        //$location.path("/application/account/" + $scope.AuthParams.accountId+ "/customObject/" + data.customObject.data._id);
        $scope.form.$setPristine();
      }, function(data, status) {
        $scope.errorResponse = JSON.stringify(data, null, 2);
      });
    }
    $scope.DeleteCustomObject = function() {
      CustomObject.Delete($scope.customObject, $scope.AuthParams, function(data, status) {
        $location.path(AppHelper.GetAccountUrl() + "/customObjects");
      }, function(data, status) {
        $scope.errorResponse = JSON.stringify(data, null, 2);
      });
    }
  }
]);

contactManagerControllers.controller('CustomObjectModelDefinitionCtrl', ['$scope', '$http', '$cookies', '$location', '$routeParams', 'Account', 'CustomObjectModelDefinition',"AppHelper",
  function($scope, $http, $cookies, $location, $routeParams, Account, CustomObjectModelDefinition, AppHelper) {
    $scope.ValidDataTypes = ["String", "Date", "Number", "ObjectId", "Boolean"];
    $scope.customObjectModelDefinition = {};
    $scope.customObjectModelDefinition.type = $scope.ValidDataTypes[0];
    $scope.AuthParams = AppHelper.GetAuthParams();
    $scope.GetCustomObjectModelDefinition = function() {
      CustomObjectModelDefinition.Get({
        _id: $routeParams.customObjectModelDefinitionId
      }, $scope.AuthParams, function(data, status) {
        $scope.customObjectModelDefinition = data[0].modelDefinition[0];
      }, function(data, status) {
        $scope.errorResponse = JSON.stringify(data, null, 2);
      });
    }
    $scope.UpdateDefinition = function() {
      CustomObjectModelDefinition.Update($scope.customObjectModelDefinition, $scope.AuthParams, function(data, status) {
        $scope.customObjectModelDefinition = data.customObjectModelFieldDefinition.data;
      }, function(data, status) {
        $scope.errorResponse = JSON.stringify(data, null, 2);
      });
    }
    $scope.CreateDefinition = function() {
      CustomObjectModelDefinition.Create($scope.customObjectModelDefinition, $scope.AuthParams, function(data, status) {
        $location.path(AppHelper.GetCustomObjectsModelDefinitionUrl());
      }, function(data, status) {
        $scope.errorResponse = JSON.stringify(data, null, 2);
      });
    }
    $scope.RemoveDefinition = function() {
      CustomObjectModelDefinition.Delete($scope.customObjectModelDefinition, $scope.AuthParams, function(data, status) {
        $location.path(AppHelper.GetCustomObjectsUrl());
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

contactManagerControllers.controller('CustomObjectModelDataCtrl', ['$scope', '$http', 'AppHelper', function($scope, $http, AppHelper) {}]);
contactManagerControllers.controller('StaticCtrl', ['$scope', '$http', "AppHelper", function($scope, $http,AppHelper) {
}]);
contactManagerControllers.controller('MiscCtrl', ['$scope', '$http', "AppHelper", "Account", "$location", "$cookies", 
	function($scope, $http, AppHelper, Account, $location, $cookies) {
	$scope.getAuthParams = AppHelper.GetAuthParams;
	$scope.BaseUrl = "/";
	$scope.LoggedIn = false;
  $scope.AccountUrl = function() {
    return AppHelper.GetAccountUrl();
  }
  $scope.CustomObjectUrl = function() {
    return AppHelper.GetCustomObjectUrl();
  }
  $scope.CustomObjectsModelDefinitionUrl = function() {
    return AppHelper.GetCustomObjectsModelDefinitionUrl();
  }
  $scope.LoginPath = "/#/application/account/signin";
  $scope.Authenticate = function() {
	  if ($location.path() != '/' && $location.path() != '/application/account' && $location.path() != '/application/account/signin' ) {
	  	Account.Authenticate($scope.getAuthParams(),
	  		function(data, status){
	  			$scope.LoggedIn = true;
	  		},
	  		function(data, status){
	  			$scope.LogOut();
	  		})
	  }
  }
  $scope.LogOut = function(){
  	$scope.LoggedIn = false;
  	$cookies.remove("AccountId");
		$cookies.remove("SessionToken");
		$location.path($scope.BaseUrl);
  }
  $scope.$root.$on( "$routeChangeStart", function(event, next, current) {
      $scope.Authenticate();
    })
  $scope.$on("$stateChangeSuccess", $scope.Authenticate());
}]);
