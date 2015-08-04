var app = angular.module('app', []);

var MyController = function ($scope, $timeout) {
    var updateClock = function() {
        $scope.clock = new Date();
        $timeout(function() {
            updateClock();
        }, 1000);
    };

    updateClock();
};

MyController.$inject = ['$scope', '$timeout'];

app.controller("MyController", MyController);
