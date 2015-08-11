var posts = angular.module('posts', ['ngMessages', 'ngFileUpload']);

var PublishController = function($scope, $http) {
    $scope.submitted = false;
    $scope.submitForm = function() {
        if ($scope.publishForm.$valid) { // 正常提交
            $http({
                method: 'POST',
                url: '/posts/publish',
                data: {
                    title: $scope.publish.title,
                    content: $scope.publish.content
                }
            }).success(function(data) {
                if (data.result === true) {
                    window.location = '/';
                } else {
                    $scope.publishForm.content.$setValidity('confirm', false);
                }
            }).error(function(error) {
                console.log(error);
            });
        } else {
            $scope.publishForm.submitted = true;
        }
    };
};

var UploadController = function($scope, Upload) {
    $scope.$watch('files', function() {
        $scope.upload($scope.files);
    });

    /* optional: set default directive values */
    //Upload.setDefaults( {ngf-keep:false ngf-accept:'image/*', ...} );

    $scope.log = '';

    $scope.upload = function(files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: '/posts/upload',
                    fields: {
                        'username': 'wen'
                    },
                    file: file
                }).progress(function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.log = 'progress: ' + progressPercentage + '% ' +
                        evt.config.file.name + '\n';
                }).success(function(data, status, headers, config) {
                });
            }
        }
    };
}

PublishController.$inject = ['$scope', '$http'];
UploadController.$inject = ['$scope', 'Upload'];

posts.controller('PublishController', PublishController);
posts.controller('UploadController', UploadController);