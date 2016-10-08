'use strict';

/**
 * @ngdoc overview
 * @name gistAppApp
 * @description
 * # gistAppApp
 *
 * Main module of the application.
 */
angular
  .module('gistAppApp', [
    'ngAnimate',
    'ngAria',
    'ngMaterial',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',

    // 3rd party libraries
    'ui.bootstrap',

  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl',
        controllerAs: 'search'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
