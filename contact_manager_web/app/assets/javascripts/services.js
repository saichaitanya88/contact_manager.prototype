'use strict';

/* Services */

var contactManagerServices = angular.module('contactManagerServices', ['ngResource']);

var authHeader = "Basic dGVzdC1rZXk6dGVzdC1zZWNyZXQ="
var headers = { "Authentication" : authHeader }
// contactManagerServices.factory('Account', ['$resource',
//   function($resource){
//     return $resource('/application/account', 
//     	{}, 
//     	{
//       	create: { method:'POST', params:{account:'{}'} , headers: headers}
//     	}
//     );
//   }]);


contactManagerServices.factory('Account', function($http) {
    var create = function(account, successCallback, errorCallback) {
        return $http({method: "POST", url: "/application/account", data: account, headers: headers})
        .success(function(data, status){
          successCallback(data, status);
        }).error(function(data, status){
          errorCallback(data, status);
        });
    };
    return { create: create };
});