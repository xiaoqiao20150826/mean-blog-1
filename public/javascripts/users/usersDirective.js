var users = angular.module('users');

var ensureUnique = function($http){
    return {
        require: 'ngModel',
        link: function(scope, ele, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function(n) {
                if(!n) return;
                if(n == 1) ctrl.$setValidity('unique', true);
                else if(n == 'nihao@123') ctrl.$setValidity('unique', false);
            });
        }
    }
}

var ngFocus = function(){
    var FOCUS_CLASS = "ng-focused";
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, ele, attrs, ctrl) {
           ctrl.$focused = false;
           ele.bind('focus', function(evt) {
                ele.addClass(FOCUS_CLASS);
                scope.$apply(function() {
                    ctrl.$focused = true;
                });
           });
           ele.bind('blur', function(evt) {
                ele.removeClass(FOCUS_CLASS);
                scope.$apply(function() {
                    ctrl.$focused = false;
                });
           });
        }
    }
}

ensureUnique.$inject = ['$http'];

users.directive('ensureUnique', ensureUnique);
users.directive('ngFocus', ngFocus);