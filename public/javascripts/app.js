var app = angular.module('multiBlog', ['ngMessages', 'ngFileUpload', 'ui.bootstrap', 'ngRoute']);

var config = function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            templateUrl: '/views/tpls/posts/index.html',
            controller: 'IndexController'
        })
        .when('/users/login', {
            templateUrl: 'views/tpls/users/login.html',
            controller: 'LoginController'
        })
        .when('/users/logout', {
            template: '<div></div>',
            controller: 'LogoutController'
        })
        .when('/users/reg', {
            templateUrl: 'views/tpls/users/reg.html',
            controller: 'RegController'
        })
        .when('/posts/publish', {
            templateUrl: 'views/tpls/posts/publish.html',
            controller: 'PublishController'
        })
        .when('/posts/edit/:username/:day/:title', {
            templateUrl: 'views/tpls/posts/edit.html',
            controller: 'EditController'
        })
        .otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(true);
}

config.$inject = ['$routeProvider', '$locationProvider'];

app.config(config);