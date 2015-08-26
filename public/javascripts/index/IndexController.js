var app = angular.module('multiBlog');

var IndexController = function($scope, $http, $sce) {
    $http({
        method: 'GET',
        url: '/api',
    }).success(function(data) {
        $scope.posts = angular.forEach(angular.fromJson(data.posts), function(post) {
            post.content = $sce.trustAsHtml(post.content);
        });
        $scope.$parent.title = data.title;
        $scope.$parent.users = data.users;
    }).error(function(error) {
        console.log(error);
    });
};

IndexController.$inject = ['$scope', '$http', '$sce'];

app.controller("IndexController", IndexController);