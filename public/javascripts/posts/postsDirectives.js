var posts = angular.module('posts');

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

posts.directive('ngFocus', ngFocus);