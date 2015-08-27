var app = angular.module('multiBlog');

var IndexController = function($scope, $http, $sce) {
    $scope.data = {
        totalItems: 0,
        itemsPerPage: 2,
        currentPage: 1,
        maxSize: 5,
        pageChanged: function() {
            $http({
                method: 'GET',
                url: '/api?p=' + $scope.data.currentPage,
            }).success(function(data) {
                $scope.posts = angular.forEach(angular.fromJson(data.posts), function(post) {
                    post.content = $sce.trustAsHtml(post.content);
                });
            }).error(function(error) {
                console.log(error);
            });
        }
    };

    $http({
        method: 'GET',
        url: '/api?p=' + $scope.currentPage,
    }).success(function(data) {
        $scope.posts = angular.forEach(angular.fromJson(data.posts), function(post) {
            post.content = $sce.trustAsHtml(post.content);
        });
        $scope.data.totalItems = data.total;
        $scope.$parent.title = data.title;
        $scope.$parent.users = data.users;
    }).error(function(error) {
        console.log(error);
    });
};

IndexController.$inject = ['$scope', '$http', '$sce'];

app.controller("IndexController", IndexController);