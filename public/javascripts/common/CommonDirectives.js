var common = angular.module('multiBlog');

var ensureUnique = function($http) {
    return {
        require: 'ngModel',
        link: function(scope, ele, attrs, ngModel) {
            scope.$watch(attrs.ngModel, function(val) {
                if (!val) return;
                $http({
                    method: 'POST',
                    url: '/api/users/check',
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

common.directive('ensureUnique', ensureUnique);
common.directive('ngFocus', ngFocus);
common.directive('confirmed', confirmed);