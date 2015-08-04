'use strict';

function RegCtrl($scope, $http) {
    $("#reg-btn").click(function() {
        validate();
        if (isValid === true) {
            $http.post('/').success(function(data) {
                console.log(data);
                window.location = "#/view1";
            });
            $scope.orderProp = 'age';
        }
    });
};

var users = angular.module('users', []);

users.controller('RegCtrl', RegCtrl);