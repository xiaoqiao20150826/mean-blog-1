var app = angular.module('multiBlog');

function WelcomeController($scope){
    console.log(111);
    $scope.username = 'Conan_Z';
}

WelcomeController.$inject = ['$scope'];

app.controller('WelcomeController', WelcomeController);