
//'use strict';

/* App Module */

var contactManagerApp = angular.module('contactManagerApp', [
  'ngRoute', 'ngCookies','contactManagerControllers', 'contactManagerServices', 'ui.bootstrap'
]);
contactManagerApp.config(['$routeProvider',
function($routeProvider) {
  $routeProvider.
  when('/', {
      templateUrl: 'partials/accounts/new.html',
      controller: 'AccountCtrl',
      title: "New Account"
    }).
    when('/application/account', {
      templateUrl: 'partials/accounts/new.html',
      controller: 'AccountCtrl',
      title: "New Account"
    }).
  when('/application/account/signin', {
      templateUrl: 'partials/accounts/signin.html',
      controller: 'AccountCtrl',
      title: "Sign In"
    }).
  when('/application/account/:accountId', {
      templateUrl: 'partials/accounts/get.html',
      controller: 'AccountCtrl',
      title: "Edit Account"
    }).
  when('/application/account/:accountId/customObjects', {
      templateUrl: 'partials/customObjects/search.html',
      controller: 'CustomObjectsCtrl',
      title: "Search CustomObjects"
    }).
  when('/application/account/:accountId/customObject', {
      templateUrl: 'partials/customObjects/new.html',
      controller: 'CustomObjectsCtrl',
      title: "New CustomObject"
    }).
  when('/application/account/:accountId/customObject/:customObjectId', {
      templateUrl: 'partials/customObjects/get.html',
      controller: 'CustomObjectsCtrl',
      title: "Edit CustomObject"
    }).
  when('/application/account/:accountId/customObject/:customObjectId/modelDefinition', {
      templateUrl: 'partials/customObjects/modelDefinitions/new.html',
      controller: 'CustomObjectModelDefinitionCtrl',
      title: "New CustomObject ModelDefinition"
    }).
  when('/application/account/:accountId/customObject/:customObjectId/modelDefinition/:customObjectModelDefinitionId', {
      templateUrl: 'partials/customObjects/modelDefinitions/get.html',
      controller: 'CustomObjectModelDefinitionCtrl',
      title: "Edit CustomObject ModelDefinition"
    }).
  when('/application/account/:accountId/customObject/:customObjectId/data/search', {
      templateUrl: 'partials/customObjects/data/search.html',
      controller: 'CustomObjectDataCtrl',
      title: "Search CustomObject Data"
    }).
  when('/application/account/:accountId/customObject/:customObjectId/data', {
      templateUrl: 'partials/customObjects/data/new.html',
      controller: 'CustomObjectDataCtrl',
      title: "New CustomObject Data"
    }).
  when('/application/account/:accountId/customObject/:customObjectId/data/:customObjectDataId', {
      templateUrl: 'partials/customObjects/data/get.html',
      controller: 'CustomObjectDataCtrl',
      title: "Edit CustomObject Data"
    }).
    when('/static/not-found', {
      templateUrl: 'partials/static/not-found.html',
      controller: 'StaticCtrl',
      title: "Page Not Found"
    }).
    otherwise({
      redirectTo: '/static/not-found'
    });
}]);