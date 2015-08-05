var users = angular.module('users', []);

var LoginController = function($scope) {
    $scope.counter = 0;
    $scope.add = function(amount) {
        $scope.counter += amount;
    };
    $scope.subtract = function(amount) {
        $scope.counter -= amount;
    };
};

LoginController.$inject = ['$scope'];

users.controller('LoginController', LoginController);