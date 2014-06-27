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
        }

    });

    return Shot;

});