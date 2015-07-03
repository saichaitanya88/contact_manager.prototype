/* Controllers */

var contactManagerControllers = angular.module('contactManagerControllers', []);


contactManagerControllers.controller('AccountCtrl', ['$scope', '$http', 'Account',
	  function($scope, $http, Account) {
	  	$scope.account = new Object();
	  	$scope.account.email = "test@test";
	  	$scope.account.password = "123";
	  	$scope.account.firstName = "s";
	  	$scope.account.lastName = "c";

	  	$scope.SubmitForm = function(){
	  		Account.create($scope.account, function(data, status){
	  			$scope.successResponse = data;
          $scope.createAccountSuccess = true;
	  		}, function (data, status){
	  			$scope.errorResponse = data;
          $scope.createAccountFailed = true;
          $scope.successResponse = data;
          $scope.createAccountSuccess = true;
	  		});
	  	}
	  }
  ]
);