var app = angular.module('app');

function WelcomeController($scope){
    $scope.username = 'Conan_Z';
}

WelcomeController.$inject = ['$scope'];

app.controller('WelcomeController', WelcomeController);