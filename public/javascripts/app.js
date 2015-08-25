var app = angular.module('multiBlog', ['ngMessages', 'ngFileUpload', 'ui.bootstrap', 'ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/views/tpls/posts.html',
            controller: 'IndexController'
        })
        .when('/users/login', {
            templateUrl: 'views/tpls/login.html',
            controller: 'LoginController'
        })
        .when('/users/reg', {
            templateUrl: 'views/tpls/reg.html',
            controller: 'RegController'
        })
        .otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(true);
}]);