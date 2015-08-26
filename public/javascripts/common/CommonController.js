var common = angular.module('multiBlog');

var CommonController = function($scope, $http){
    $http({
        method: 'GET',
        url: '/api/users',
    }).success(function(data) {
        $scope.title = data.title;
        $scope.users = data.users;
    }).error(function(error) {
        console.log(error);
    });
}

CommonController.$inject = ['$scope', '$http'];

common.controller('CommonController', CommonController);
