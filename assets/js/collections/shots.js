/**
 * The shots collection.
 */

'use strict';

define([
    'underscore',
    'backbone',
    'models/shot'
], function(_, Backbone, Shot) {

    var Shots = Backbone.Collection.extend({

        model: Shot,
        id: null,
        page: 1,
        perPage: 30,
        host: '//api.dribbble.com',
        endpoint: '/shots/:id',

        url: function() {
            return this.host + this.endpoint.replace(/:\w+/, this.id);
        },

        parse: function(response) {
            return response.shots;
        },

        fetch: function(options) {
            options = _.extend({
                dataType: 'jsonp'
            }, options);
            Backbone.Collection.prototype.fetch.call(this, options);
        }

    });

    return Shots;

});