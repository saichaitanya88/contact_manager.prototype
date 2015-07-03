
//'use strict';

/* App Module */


var conmanApp = angular.module('conmanApp', [
  'ngRoute',
  'conmanControllers'
  // ,
  // 'conmanFilters',
  // 'conmanServices'
]);
conmanApp.config(['$routeProvider',
function($routeProvider) {
  $routeProvider.
    when('/application/account', {
      templateUrl: 'partials/accounts/new.html',
      controller: 'AccountCtrl'
    }).
  // when('/application/account/signin', {
  //     templateUrl: 'partials/accounts/sign-in.html',
  //     controller: 'AccountCtrl'
  //   }).
  // when('/application/account/:accountId', {
  //     templateUrl: 'partials/accounts/get.html',
  //     controller: 'AccountCtrl'
  //   }).
  // when('/application/account/:accountId/customObjects', {
  //     templateUrl: 'partials/customObjects/search.html',
  //     controller: 'CustomObjectsCtrl'
  //   }).
  // when('/application/account/:accountId/customObject/:customObjectId', {
  //     templateUrl: 'partials/customObjects/get.html',
  //     controller: 'CustomObjectsCtrl'
  //   }).
  // when('/application/account/:accountId/customObject/:customObjectId/modelDefinition', {
  //     templateUrl: 'partials/customObjects/modelDefinitions/new.html',
  //     controller: 'CustomObjectmodelDefinitionCtrl'
  //   }).
  // when('/application/account/:accountId/customObject/:customObjectId/modelDefinition/:customObjectModelDefinitionId', {
  //     templateUrl: 'partials/customObjects/modelDefinitions/get.html',
  //     controller: 'CustomObjectmodelDefinitionCtrl'
  //   }).
  // when('/application/account/:accountId/customObject/:customObjectId/data/search', {
  //     templateUrl: 'partials/customObjects/data/search.html',
  //     controller: 'CustomObjectmodelDataCtrl'
  //   }).
  // when('/application/account/:accountId/customObject/:customObjectId/data/:customObjectDataId', {
  //     templateUrl: 'partials/customObjects/data/get.html',
  //     controller: 'CustomObjectmodelDataCtrl'
  //   }).
  //   when('/static/not-found', {
  //     templateUrl: 'partials/static/not-found.html',
  //     controller: 'StaticCtrl'
  //   }).
    otherwise({
      redirectTo: '/static/not-found'
    });
}]);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//


