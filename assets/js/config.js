'use strict';

var paths = {
    text: '../bower_components/requirejs-text/text',
    angular: '../bower_components/angular/angular',
    handlebars: '../bower_components/handlebars/handlebars.amd',
    jquery: '../bower_components/jquery/dist/jquery',
    hbs: '../bower_components/require-handlebars-plugin/hbs',
    imagesloaded: '../bower_components/imagesloaded/imagesloaded'
};

// If file is required by node, export paths only
if (typeof module === 'object' && module && typeof module.exports === 'object') {
    module.exports = paths;
} else {
    // If it's required by require.js, execute configuration function
    if (typeof define === 'function' && define.amd) {
        require.config({
            waitSeconds: 0,
            baseUrl: '/assets/js/',
            paths: paths,
            shim: {
                angular: {
                    exports: 'angular'
                },
                jquery: {
                    exports: 'jQuery'
                }
            },
            priority: 'angular',
            map: {
                imagesloaded: {
                    'eventEmitter/EventEmitter': '../bower_components/eventEmitter/EventEmitter',
                    'eventie/eventie': '../bower_components/eventie/eventie'
                }
            }
        });
    }
}
