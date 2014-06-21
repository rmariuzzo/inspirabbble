/**
 * Require.js configuration.
 */

'use strict';

require.config({
    waitSeconds: 0,
    baseUrl: '/assets/js/',
    paths: {
        text: '../bower_components/requirejs-text/text',
        handlebars: '../bower_components/handlebars/handlebars.amd',
        jquery: '../bower_components/jquery/dist/jquery',
        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone',
        hbs: '../bower_components/require-handlebars-plugin/hbs',
        imagesloaded: '../bower_components/imagesloaded/imagesloaded',
        'eventEmitter/EventEmitter': '../bower_components/eventEmitter/EventEmitter',
        'eventie/eventie': '../bower_components/eventie/eventie'
    },
    shim: {
        imagesloaded: ['jquery'],
        backbone: ['underscore', 'jquery'],
        underscore: {
            exports: '_'
        }
    }
});