require.config({

    paths: {
        "jquery": "/bower_components/jquery/dist/jquery.min",
        "bootstrap": "/bower_components/bootstrap/dist/js/bootstrap.min",
        "angular": "/bower_components/angular/angular.min",
        "domReady": "/bower_components/requirejs-domready/domReady",
        "app" : "/javascripts/app",
        "controllers": "/javascripts/controllers"
    },

    shim: {
        "bootstrap": {
            deps: [
                "jquery",
                //"css!/font-awesome/css/font-awesome.min.css",
                ],
            exports: "bootstrap"
        },

        "angular": {
            exports: "angular"
        },

        "app":{
            exports: "app"
        }

        // "reg": ["css!/stylesheets/form.css"],
        // "login": ["css!/stylesheets/form.css"]
    },

    deps: ["angular", "bootstrap"]

});

// require(["jquery"],function   ($) {
//     //jQuery is loaded and can be used here now.
//     var dataModule = $('body').delegate('a[href^="#"]', 'click', function(e){e.preventDefault();}).data('module');
//     if(dataModule && dataModule != "undefined") {
//         require(dataModule.split(','));
//     }
//     console.log("all loaded");
// });
require(['angular', 'app', 'controllers'],function (angular){

      $(function () {

            angular.bootstrap(document,["phonecatApp"]);

      })

});