/* Controllers */

var contactManagerControllers = angular.module('contactManagerControllers', []);


contactManagerControllers.controller('AccountCtrl', ['$scope', '$http', '$cookies' , '$location', 'Account',
	  function($scope, $http, $cookies , $location, Account) {
	  	$scope.getAuthParams = function(){
				return { accountId : $cookies.get("AccountId"), "SessionToken" : $cookies.get("SessionToken")};
	  	}
	  	if ($location.path() != '/' && $location.path() != '/application/account' && $location.path() != '/application/account/signin' ) {
	  		// if no cookies, then go to sign-in page
	  		Account.Authenticate($scope.getAuthParams(),
	  			function(data, status){
	  				// Authenticated
	  				$scope.account = data.account;
	  			},
	  			function(data, status){
	  				$cookies.remove("AccountId");
	  				$cookies.remove("SessionToken");
	  				$location.path("/");
	  			})
	  	}
	  	$scope.CreateAccount = function(){
	  		Account.Create($scope.account, function(data, status){
	  			$scope.successResponse = data;
          // Sign the user in automatically
          $scope.SignInAccount();
	  		}, function (data, status){
	  			$scope.errorResponse = data;
	  		});
	  	}
	  	$scope.SignInAccount = function(){
	  		var credentials = { email : $scope.account.email, password : $scope.account.password }
	  		Account.SignIn(credentials, function(data, status){
	  			$cookies.put('SessionToken', data.session.token);
	  			$cookies.put('AccountId', data.session.accountId);
	  			$location.path("/application/account/" + data.session.accountId);
	  		}, function(data, status){
					$location.path("/application/account/signin" + data.session.accountId);
	  		});
	  	}
	  	$scope.ToggleAccountEdit = function(){
	  		$scope.EditAccount = !$scope.EditAccount;
	  	}
	  	$scope.UpdateAccount = function () {
	  		Account.Update($scope.account, $scope.getAuthParams(), function(data, status){
	  			$scope.successResponse = JSON.stringify(data, null, 2);
          // Sign the user in automatically
          $scope.SignInAccount();
	  		}, function (data, status){
	  			$scope.errorResponse = JSON.stringify(data, null, 2);
	  		});
	  	}
	  }
  ]
);


contactManagerControllers.controller('CustomObjectsCtrl', ['$scope', '$http', '$cookies' , '$location', '$routeParams', 'Account', 'CustomObject', 
	function($scope, $http, $cookies, $location, $routeParams,Account, CustomObject) {
		$scope.searchTerm = '';
		$scope.customObjects = []
		$scope.getAuthParams = function(){
			return { accountId : $cookies.get("AccountId"), "SessionToken" : $cookies.get("SessionToken")};
  	}
		if ($location.path() != '/' && $location.path() != '/application/account' && $location.path() != '/application/account/signin' ) {
  		// if no cookies, then go to sign-in page
  		Account.Authenticate($scope.getAuthParams(),
  			function(data, status){
  				// Authenticated
  				$scope.account = data.account;
  			},
  			function(data, status){
  				$cookies.remove("AccountId");
  				$cookies.remove("SessionToken");
  				$location.path("/");
  			})
  	}
		$scope.SearchCustomObjects = function(){
			CustomObject.Search({name : $scope.searchTerm}, $scope.getAuthParams(), function(data, status){
	  			$scope.customObjects = data.customObjects;
	  			$scope.customObjectsCount = data.count;
	  			$scope.errorResponse = null;
	  		}, function(data, status){
					$scope.errorResponse = JSON.stringify(data, null, 2);
	  		});
		}
		$scope.CreateCustomObject = function(){
			CustomObject.Create($scope.customObject, $scope.getAuthParams(), function(data, status){
	  			$location.path("/application/account/" + $scope.getAuthParams().accountId+ "/customObject/" + data.customObject.data._id);
	  		}, function(data, status){
					$scope.errorResponse = JSON.stringify(data, null, 2);
	  		});
		}
		$scope.SearchCustomObjects();
		$scope.GetCustomObject = function(){
			CustomObject.Get({ customObjectId : $routeParams.customObjectId}, $scope.getAuthParams(), function(data, status){
	  			$scope.customObject = data.customObject;
	  		}, function(data, status){
					$scope.errorResponse = JSON.stringify(data, null, 2);
	  		});	
		}
		if($routeParams.customObjectId != null){
			$scope.GetCustomObject();
		}
	}]
);

contactManagerControllers.controller('CustomObjectmodelDefinitionCtrl', ['$scope', '$http', function($scope, $http) {
	  }
  ]
);

contactManagerControllers.controller('CustomObjectmodelDataCtrl', ['$scope', '$http', function($scope, $http) {
	  }
  ]
);
contactManagerControllers.controller('StaticCtrl', ['$scope', '$http', function($scope, $http) {
	  }
  ]
);