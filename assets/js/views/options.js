'use strict';

define([
    'backbone',
    'jquery',
    'views/overlay',
    'models/options',
    'hbs!templates/options'
], function(Backbone, $, Overlay, model, template) {

    var Options = Backbone.View.extend({

        el: 'body',

        template: $(template()),

        initialize: function() {
            this.el = $(this.el);
            this.model = model;
            this.hide();
            this.render();
        },

        render: function() {
            this.el.append(this.template);
        },

        show: function() {
            this.template.show();
        },

        hide: function() {
            this.template.hide();
        }

    });

    return new Options();

});