'use strict';

define([
    'jquery',
    'backbone',
    'hbs!templates/header'
], function($, Backbone, template) {

    var Header = Backbone.View.extend({

        template: $(template()),

        initialize: function() {
            this.el = $(this.el);
            this.render();
        },

        render: function() {
            this.el.html(this.template);
        }

    });

    return Header;

});