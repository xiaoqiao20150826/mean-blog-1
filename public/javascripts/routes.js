/**
 * Defines the main routes in the application.
 * The routes you see here will be anchors '#/' unless specifically configured otherwise.
 */

define(['./app'], function (app) {
    'use strict';
    return app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'templates/partial1.html',
            controller: 'MyCtrl1'
        });

        $routeProvider.when('/users/login', {
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
        });

        $routeProvider.when('/users/reg', {
            templateUrl: 'templates/reg.html',
            controller: 'RegCtrl'
        });

        $routeProvider.otherwise({
            redirectTo: '/view1'
        });
    }]);
});
