define(["app"], function(app){
    function PhoneController($scope, $http) {
      $http.post('/').success(function(data) {
        $scope.phones = data;
      });

      $scope.orderProp = 'age';
    };

    app.controller('PhoneController', PhoneController);
});
