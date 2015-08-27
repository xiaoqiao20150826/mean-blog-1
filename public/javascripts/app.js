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
        .when('/posts/user/:username', {
            templateUrl: 'views/tpls/posts/userPosts.html',
            controller: 'UserPostsController'
        })
        .when('/posts/post/:username/:day/:title', {
            templateUrl: 'views/tpls/posts/post.html',
            controller: 'PostController'
        })
        .when('/posts/edit/:username/:day/:title', {
            templateUrl: 'views/tpls/posts/edit.html',
            controller: 'EditController'
        })
        .when('/posts/remove/:username/:day/:title', {
             template: '<div></div>',
            controller: 'RemoveController'
        })
        .otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(true);
};

config.$inject = ['$routeProvider', '$locationProvider'];

app.config(config);