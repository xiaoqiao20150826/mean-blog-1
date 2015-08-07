var users = angular.module('users', ['ngMessages']);

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
    $scope.submitted = false;
    $scope.submitForm = function() {
        if ($scope.regForm.$valid) { // 正常提交

        } else {
            $scope.regForm.submitted = true;
        }
    };
};

RegController.$inject = ['$scope'];
LoginController.$inject = ['$scope'];

users.controller('RegController', RegController);
users.controller('LoginController', LoginController);