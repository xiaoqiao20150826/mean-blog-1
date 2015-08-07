var users = angular.module('users');

var ensureUnique = function($http) {
    return {
        require: 'ngModel',
        link: function(scope, ele, attrs, ngModel) {
            scope.$watch(attrs.ngModel, function(n) {
                if (!n) return;
                $http({
                    method: 'POST',
                    url: '/users/check',
                    data: {
                        field: attrs.ensureUnique,
                        value: ele
                    }
                }).success(function(data) {
                    console.log(data);
                    ngModel.$setValidity('unique', data.isUnique);
                }).error(function(data) {
                    ngModel.$setValidity('unique', false);
                });
            });
        }
    };
};

var ngFocus = function() {
    var FOCUS_CLASS = "ng-focused";
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, ele, attrs, ngModel) {
            ngModel.$focused = false;
            ele.bind('focus', function(evt) {
                ele.addClass(FOCUS_CLASS);
                scope.$apply(function() {
                    ngModel.$focused = true;
                });
            });
            ele.bind('blur', function(evt) {
                ele.removeClass(FOCUS_CLASS);
                scope.$apply(function() {
                    ngModel.$focused = false;
                });
            });
        }
    };
};

ensureUnique.$inject = ['$http'];

users.directive('ensureUnique', ensureUnique);
users.directive('ngFocus', ngFocus);