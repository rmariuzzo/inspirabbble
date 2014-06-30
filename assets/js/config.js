/**
 * Require.js configuration.
 */

'use strict';

require.config({
    waitSeconds: 0,
    paths: {
        'text': '../bower_components/requirejs-text/text',
        'handlebars': '../bower_components/handlebars/handlebars',
        'jquery': '../bower_components/jquery/dist/jquery',
        'underscore': '../bower_components/underscore/underscore',
        'backbone': '../bower_components/backbone/backbone',
        'backbone.localStorage': '../bower_components/backbone.localStorage/backbone.localStorage',
        'hbs': '../bower_components/require-handlebars-plugin/hbs',
        'imagesloaded': '../bower_components/imagesloaded/imagesloaded',
        'eventEmitter/EventEmitter': '../bower_components/eventEmitter/EventEmitter',
        'eventie/eventie': '../bower_components/eventie/eventie',
        'modernizr': '../bower_components/modernizr/modernizr'
    },
    shim: {
        'imagesloaded': {
            deps: ['jquery']
        },
        'handlebars': {
            exports: 'Handlebars'
        },
        'backbone': {
            exports: 'Backbone',
            deps: ['jquery', 'underscore']
        },
        'underscore': {
            exports: '_'
        },
        'jquery.nicescroll': {
            deps: ['jquery']
        },
        'modernizr': {
            exports: 'Modernizr'
        }
    }
});