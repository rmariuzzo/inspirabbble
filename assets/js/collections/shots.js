/**
 * The shots collection.
 */

'use strict';

define([
    'backbone',
    'models/shot'
], function(Backbone, Shot) {

    var Shots = Backbone.Collection.extend({

        model: Shot

    });

    return Shots;

});