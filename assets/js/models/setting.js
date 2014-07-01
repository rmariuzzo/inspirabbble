/**
 * The setting model.
 */

'use strict';

define([
    'backbone'
], function(Backbone) {

    var Setting = Backbone.Model.extend({

        // Default attribute values.
        defaults: {
            id: null,
            value: null
        }

    });

    return Setting;

});