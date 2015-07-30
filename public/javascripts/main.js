require.config({

    paths: {
        "jquery": "bower_components/jquery/dist/jquery.min",
        "bootstrap": "bower_components/bootstrap/dist/js/bootstrap.min",
        "angular": "bower_components/angular/angular.min",
    },

    shim: {
        "bootstrap": {
            deps: [
                "jquery",
                //"css!/font-awesome/css/font-awesome.min.css",
                ],
            exports: "bs"
        },

        "angular": {
            exports: "ng"
        },

        // "reg": ["css!/stylesheets/form.css"],
        // "login": ["css!/stylesheets/form.css"]
    },

});

require(["jquery", "bootstrap", "angular"],function   ($) {
    //jQuery is loaded and can be used here now.
    var dataModule = $('body').delegate('a[href^="#"]', 'click', function(e){e.preventDefault();}).data('module');
    if(dataModule && dataModule != "undefined") {
        require(dataModule.split(','));
    }
    console.log("all loaded");
});