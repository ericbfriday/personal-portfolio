var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'NavBar', 'CodeTiles']);

/// Routes ///
myApp.config(function ($routeProvider, $locationProvider, $mdThemingProvider) {
  $locationProvider.hashPrefix('');

  $mdThemingProvider.theme('default')
    .primaryPalette('pink')
    .accentPalette('blue');

  $routeProvider
    .when('/', {
      templateUrl: '/views/home.html',
      controller: 'UserController as uc',
    })
    .when('/aboutme', {
      templateUrl: '/views/aboutme.html',
      controller: 'UserController as uc'
    })
    .when('/aboutcode', {
      templateUrl: '/views/aboutcode.html',
      controller: 'UserController as uc'
    }).otherwise('/', {
      templateUrl: '/views/home.html',
      controller: 'UserController as uc',
    });
});