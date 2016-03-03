'use strict';

/**
 * @ngdoc overview
 * @name zendeskChallengeApp
 * @description
 * # zendeskChallengeApp
 *
 * Main module of the application.
 */
angular
  .module('zendeskChallengeApp', [
    'ngResource',
    'ngRoute',
    'angular-table',
    'infinite-scroll',
    'angularSpinners',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about',{
            templateUrl: '/about.html',
        })
      .otherwise({
        redirectTo: '/'
      });
    
});

