define(["jquery", "users/usersModuleInjection"], function($, users){
	'use strict';

	var navChange = function () {
		//控制导航栏选中的按钮
	    var navbar = $("#navbar");

	    navbar.children().each(function() {
	        $(this).removeClass("active");
	    });

	    $("#nav-login").addClass("active");
	};

    function LoginCtrl($scope, $http) {
		navChange();
		$http.post('/').success(function(data) {
		$scope.phones = data;
		});

		$scope.orderProp = 'age';
    };

    users.controller('LoginCtrl', LoginCtrl);
});