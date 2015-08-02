define(["phoneCat/controllers"], function(app){
	'use strict';

    function PhoneController($scope, $http) {
      $http.post('/').success(function(data) {
        $scope.phones = data;
      });

      $scope.orderProp = 'age';
    };

    app.controller('MyCtrl1', PhoneController);
});