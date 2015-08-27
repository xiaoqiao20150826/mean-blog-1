var posts = angular.module('multiBlog');

var PublishController = function($scope, $http, $location) {
    $scope.$parent.title = "发布";
    $scope.submitted = false;
    $scope.submitForm = function() {
        if ($scope.publishForm.$valid) { // 正常提交
            $http({
                method: 'POST',
                url: '/api/posts/publish',
                data: {
                    title: $scope.publish.title,
                    content: $scope.publish.content
                }
            }).success(function(data) {
                if (data.result === true) {
                    $location.path('/');
                } else {
                    $scope.publishForm.content.$setValidity('confirm', false);
                }
            }).error(function(error) {
                console.log(error);
            });
        } else {
            $scope.submitted = true;
        }
    };
};

var EditController = function($scope, $http, $routeParams, $location) {
    $scope.$parent.title = "编辑";
    $scope.edit = {
        title: null,
        content: null
    };

    $http({
        method: 'GET',
        url: '/api/posts/edit/' + $routeParams.username + '/' + $routeParams.day + '/' + $routeParams.title,
    }).success(function(data) {
        $scope.edit.title = data.post.title;
        $scope.edit.content = data.post.content;
    }).error(function(error) {
        console.log(error);
    });

    $scope.submitted = false;
    $scope.submitForm = function() {
        if ($scope.editForm.$valid) { // 正常提交
            $http({
                method: 'POST',
                url: '/api/posts/edit',
                data: {
                    title: $scope.edit.title,
                    content: $scope.edit.content
                }
            }).success(function(data) {
                if (data.result === true) {
                    $location.path('/');
                } else {
                    $scope.editForm.content.$setValidity('confirm', false);
                }
            }).error(function(error) {
                console.log(error);
            });
        } else {
            $scope.submitted = true;
        }
    };
};

var RemoveController = function($scope, $http, $routeParams, $location) {
    $http({
        method: 'POST',
        url: '/api/posts/remove/',
        data: {
            username: $routeParams.username,
            day: $routeParams.day,
            title: $routeParams.title,
        }
    }).success(function(data) {
        console.log(data);
        if (data.result === true) {
            $location.path('/');
        }
    }).error(function(error) {
        console.log(error);
    });
};

var UploadController = function($scope, Upload) {
    $scope.$watch('files', function() {
        $scope.upload($scope.files);
    });

    /* optional: set default directive values */
    //Upload.setDefaults( {ngf-keep:false ngf-accept:'image/*', ...} );

    $scope.log = '';
    $scope.uploadeds = [];

    $scope.upload = function(files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: '/api/posts/upload',
                    file: file
                }).progress(function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.log = 'progress: ' + progressPercentage + '% ' +
                        evt.config.file.name + '\n';
                }).success(function(data, status, headers, config) {
                    $scope.uploadeds.push(data);
                });
            }
        }
    };
};

var UserPostsController = function($scope, $http, $sce, $routeParams) {
    $scope.data = {
        totalItems: 0,
        itemsPerPage: 2,
        currentPage: 1,
        maxSize: 5,
        pageChanged: function() {
            $http({
                method: 'GET',
                url: '/api/posts/user/' + $routeParams.username + '?p=' + $scope.data.currentPage,
            }).success(function(data) {
                $scope.posts = angular.forEach(angular.fromJson(data.posts), function(post) {
                    post.content = $sce.trustAsHtml(post.content);
                });
            }).error(function(error) {
                console.log(error);
            });
        }
    };

    $http({
        method: 'GET',
        url: '/api/posts/user/' + $routeParams.username + '?p=' + $scope.data.currentPage,
    }).success(function(data) {
        $scope.posts = angular.forEach(angular.fromJson(data.posts), function(post) {
            post.content = $sce.trustAsHtml(post.content);
        });
        $scope.data.totalItems = data.total;
        $scope.$parent.title = data.title;
        $scope.$parent.users = data.users;
    }).error(function(error) {
        console.log(error);
    });
};


var PostController = function($scope, $http, $sce, $routeParams) {
    $scope.detail = true;
    $http({
        method: 'GET',
        url: '/api/posts/post/' + $routeParams.username + '/' + $routeParams.day + '/' + $routeParams.title,
    }).success(function(data) {
        $scope.posts = angular.forEach(angular.fromJson(data.posts), function(post) {
            post.content = $sce.trustAsHtml(post.content);
        });
        $scope.$parent.title = data.title;
    }).error(function(error) {
        console.log(error);
    });

    var disqus_shortname = 'nodemultiblog';
    if (window.DISQUS) {
        DISQUS.reset({
            reload: true,
        });
    }else{/* * * DON'T EDIT BELOW THIS LINE * * */
    (function() {
        var dsq = document.createElement('script');
        dsq.type = 'text/javascript';
        dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();}
};

PublishController.$inject = ['$scope', '$http', '$location'];
EditController.$inject = ['$scope', '$http', '$routeParams', '$location'];
RemoveController.$inject = ['$scope', '$http', '$routeParams', '$location'];
PostController.$inject = ['$scope', '$http', '$sce', '$routeParams'];
UserPostsController.$inject = ['$scope', '$http', '$sce', '$routeParams'];
UploadController.$inject = ['$scope', 'Upload'];

posts.controller('PublishController', PublishController);
posts.controller('EditController', EditController);
posts.controller('RemoveController', RemoveController);
posts.controller('PostController', PostController);
posts.controller('UploadController', UploadController);
posts.controller('UserPostsController', UserPostsController);