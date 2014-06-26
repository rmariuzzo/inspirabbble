/**
 * The router object.
 */
'use strict';

define([
    'backbone'
], function(Backbone) {

    var Router = Backbone.Router.extend({

        routes: {
            '': 'home',
            'settings': 'settings'
        }

    });

    return new Router();

});