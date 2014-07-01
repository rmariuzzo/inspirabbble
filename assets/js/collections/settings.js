/**
 * The settings collections.
 */

'use strict';

define([
    'backbone',
    'backbone.localStorage'
], function(Backbone) {

    var Settings = Backbone.Collection.extend({

        localStorage: new Backbone.LocalStorage('settings')

    });

    return Settings;

});