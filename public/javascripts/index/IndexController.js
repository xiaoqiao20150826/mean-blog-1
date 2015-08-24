var app = angular.module('index', []);

var IndexController = function($scope, $http, $sce) {
    $http({
        method: 'POST',
        url: '/',
    }).success(function(data) {
        $scope.posts = angular.forEach(angular.fromJson(data.posts), function(post) {
            post.content = $sce.trustAsHtml(post.content);
        });
        $scope.users = data.users;
    }).error(function(error) {
        console.log(error);
    });
};

IndexController.$inject = ['$scope', '$http', '$sce'];

app.controller("IndexController", IndexController);