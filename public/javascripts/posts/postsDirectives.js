var posts = angular.module('multiBlog');

var ngFocus = function() {
    var FOCUS_CLASS = "ng-focused";
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, ele, attrs, ngModel) {
            ngModel.$focused = false;
            ele.bind('focus', function(evt) {
                ngModel.$setValidity('confirm', true);
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

var haveValue = function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            ngModel: '='
        },
        link: function(scope, ele, attrs, ngModel) {
            scope.ngModel = attrs.haveValue;
        }
    };
};

posts.directive('ngFocus', ngFocus);
posts.directive('haveValue', haveValue);