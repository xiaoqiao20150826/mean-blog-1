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

var RegController = function($scope) {
};

RegController.$inject = ['$scope'];
LoginController.$inject = ['$scope'];

users.controller('RegController', RegController);
users.controller('LoginController', LoginController);