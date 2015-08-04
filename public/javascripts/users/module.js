define(['angularAMD', 'domReady', 'angular-route',], function (angularAMD, domready) {
    var app = angular.module("users", ['ngRoute']);
    // app.config(function ($routeProvider) {
    //     $routeProvider.when("/home", angularAMD.route({
    //         templateUrl: 'views/home.html', controller: 'HomeCtrl',
    //         controllerUrl: 'ctrl/home'
    //     }))
    // });
    return angularAMD.bootstrap(app);
});