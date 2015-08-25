var users = angular.module('multiBlog');

var ensureUnique = function($http) {
    return {
        require: 'ngModel',
        link: function(scope, ele, attrs, ngModel) {
            scope.$watch(attrs.ngModel, function(val) {
                if (!val) return;
                $http({
                    method: 'POST',
                    url: '/users/check',
                    data: {
                        field: attrs.ensureUnique,
                        value: val
                    }
                }).success(function(data) {
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
                ngModel.$setValidity('wrong', true);
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

var confirmed = function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, ele, attrs, ngModel) {
            scope.$watch(attrs.ngModel, function(val) {
                if (!val) return;
                if (val == scope.reg.password) {
                    ngModel.$setValidity('confirmed', true);
                } else {
                    ngModel.$setValidity('confirmed', false);
                }
            });
        }
    };
};

ensureUnique.$inject = ['$http'];

users.directive('ensureUnique', ensureUnique);
users.directive('ngFocus', ngFocus);
users.directive('confirmed', confirmed);