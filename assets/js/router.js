'use strict';

define([
    'backbone'
], function(Backbone) {

    var Router = Backbone.Router.extend({

        routes: {
            'settings': 'settings'
        }

    });

    return new Router();

});