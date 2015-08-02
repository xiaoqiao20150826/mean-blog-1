define([
	'angular',
	'angular-route',
	'./phoneCat/index',
	'./users/usersControllerInjection'
], function (angular) {
	'use strict';

	return angular.module('app', [
		'controllers',
		'users',
		'ngRoute'
	]);
});