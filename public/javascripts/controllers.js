var phonecatApp = angular.module('phonecatApp', []);

function PhoneController($scope, $http) {
  $http.post('/').success(function(data) {
    $scope.phones = data;
  });

  $scope.orderProp = 'age';
};

PhoneController.$inject = ['$scope', '$http'];

phonecatApp.controller('PhoneController', PhoneController);