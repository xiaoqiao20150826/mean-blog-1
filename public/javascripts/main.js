require.config({

    paths: {
        "jquery": "/bower_components/jquery/dist/jquery.min",
        "bootstrap": "/bower_components/bootstrap/dist/js/bootstrap.min",
        "angular": "/bower_components/angular/angular.min",
        "angular-route": "/bower_components/angular-route/angular-route.min",
        "domReady": "/bower_components/requirejs-domready/domReady",
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

        "angular-route": ["angular"],

        // "reg": ["css!/stylesheets/form.css"],
        // "login": ["css!/stylesheets/form.css"]
    },

    map: {
        "*": {
            "css": "/bower_components/require-css/css.min.js" // or whatever the path to require-css is
        }
    },

    deps: ["angular", "bootstrap", "./start"]

});

// require(["jquery"],function   ($) {
//     //jQuery is loaded and can be used here now.
//     var dataModule = $('body').delegate('a[href^="#"]', 'click', function(e){e.preventDefault();}).data('module');
//     if(dataModule && dataModule != "undefined") {
//         require(dataModule.split(','));
//     }
//     console.log("all loaded");
// });
require([
        'app',
        'start',
        'routes',
    ],
    function() {
    }
);