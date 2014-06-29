/**
 * The shot model.
 */

'use strict';

define([
    'backbone'
], function(Backbone) {

    var Shot = Backbone.Model.extend({

        // Default attribute values.
        defaults: {
            id: null,
            title: null,
            description: null,
            width: null,
            height: null,
            url: null,
            imageUrl: null,
            imageTeaserUrl: null,
            image400Url: null
        },

        parse: function(data) {
            /* jshint -W106 */
            return {
                id: data.id,
                title: data.title,
                description: data.description,
                width: data.width,
                height: data.height,
                url: data.url,
                imageUrl: data.image_400_url,
                imageTeaserUrl: data.image_teaser_url,
                image400Url: data.image_400_url
            };
            /* jshint +W106 */
        }

    });

    return Shot;

});