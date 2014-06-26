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

        events: {
            'click .dialog-close': 'hide'
        },

        template: $(template()),

        initialize: function() {
            this.el = $(this.el);
            this.model = model;
            this.overlay = new Overlay();
            this.hide();
            this.render();
        },

        render: function() {
            this.el.append(this.template);
        },

        show: function() {
            this.overlay.show();
            this.template.show();
        },

        hide: function() {
            this.overlay.hide();
            this.template.hide();
            this.trigger('hide');
        }

    });

    return new Options();

});