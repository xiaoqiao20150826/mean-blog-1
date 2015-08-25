var users = angular.module('multiBlog');

var LoginController = function($scope, $http) {
    $scope.submitted = false;
    $scope.submitForm = function() {
        if ($scope.loginForm.$valid) { // 正常提交
            $http({
                method: 'POST',
                url: '/users/login',
                data: {
                    username: $scope.login.username,
                    password: $scope.login.password,
                }
            }).success(function(data) {
                if (data.result === true) {
                    window.location = "/";
                } else {
                    $scope.loginForm.password.$setValidity('wrong', false);
                }
            }).error(function(error) {
                console.log(error);
            });
        } else {
            $scope.loginForm.submitted = true;
        }
    };
};

var RegController = function($scope, $http) {
    $scope.submitted = false;
    $scope.submitForm = function() {
        if ($scope.regForm.$valid) { // 正常提交
            $http({
                method: 'POST',
                url: '/users/reg',
                data: {
                    username: $scope.reg.username,
                    password: $scope.reg.password,
                    email: $scope.reg.email
                }
            }).success(function(data) {
                if (data.result === true) {
                    window.location = "/";
                } else {
                    if (data.reason == 'username') {
                        $scope.regForm.username.$setValidity('unique', false);
                    } else if (data.reason == 'email') {
                        $scope.regForm.email.$setValidity('unique', false);
                    }
                }
            }).error(function(error) {
                console.log(error);
            });
        } else {
            $scope.regForm.submitted = true;
        }
    };
};

RegController.$inject = ['$scope', '$http'];
LoginController.$inject = ['$scope', '$http'];

users.controller('RegController', RegController);
users.controller('LoginController', LoginController);