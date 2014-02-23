'use strict';

require.config({
    waitSeconds: 0,
    baseUrl: '/assets/js/',
    paths: {
        text: '../bower_components/requirejs-text/text',
        angular: '../bower_components/angular/angular',
        handlebars: '../bower_components/handlebars/handlebars.amd',
        jquery: '../bower_components/jquery/dist/jquery',
        hbs: '../bower_components/require-handlebars-plugin/hbs',
        imagesloaded: '../bower_components/imagesloaded/imagesloaded'
    },
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
