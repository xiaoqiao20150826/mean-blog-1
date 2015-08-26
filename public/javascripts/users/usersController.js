var users = angular.module('multiBlog');

var LoginController = function($scope, $http, $location) {
    $scope.$parent.title = "登陆";
    $scope.submitted = false;
    $scope.submitForm = function() {
        if ($scope.loginForm.$valid) { // 正常提交
            $http({
                method: 'POST',
                url: '/api/users/login',
                data: {
                    username: $scope.login.username,
                    password: $scope.login.password,
                }
            }).success(function(data) {
                if (data.result === true) {
                    $location.path('/');
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

var LogoutController = function($scope, $http, $location) {
    $http({
        method: 'GET',
        url: '/api/users/logout',
    }).success(function(data) {
        $scope.$parent.title = data.title;
        $scope.$parent.users = data.users;
        $location.path('/');
    }).error(function(error) {
        console.log(error);
    });
};

var RegController = function($scope, $http, $location) {
    $scope.$parent.title = "注册";
    $scope.submitted = false;
    $scope.submitForm = function() {
        if ($scope.regForm.$valid) { // 正常提交
            $http({
                method: 'POST',
                url: '/api/users/reg',
                data: {
                    username: $scope.reg.username,
                    password: $scope.reg.password,
                    email: $scope.reg.email
                }
            }).success(function(data) {
                if (data.result === true) {
                    $location.path('/');
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

RegController.$inject = ['$scope', '$http', '$location'];
LoginController.$inject = ['$scope', '$http', '$location'];
LogoutController.$inject = ['$scope', '$http', '$location'];

users.controller('RegController', RegController);
users.controller('LoginController', LoginController);
users.controller('LogoutController', LogoutController);