    'use strict';
    var users = angular.module('users', []);

    function LoginCtrl($scope, $http) {
        $http.post('/').success(function(data) {
            $scope.phones = data;
            console.log(data);
        });
        $scope.orderProp = 'age';
    };

    users.controller('LoginCtrl', LoginCtrl);
});