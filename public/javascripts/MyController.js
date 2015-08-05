var app = angular.module('app', []);

var MyController = function($scope) {
    $scope.clock = {
        now: new Date()
    };

    var updateClock = function() {
        $scope.clock.now = new Date();
    };

    setInterval(function() {
        $scope.$apply(updateClock);
    }, 1000);

    updateClock();
};

MyController.$inject = ['$scope'];

app.controller("MyController", MyController);