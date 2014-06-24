/**
 * The overlay view.
 */

'use strict';

define([
    'backbone',
    'jquery',
    'hbs!templates/overlay'
], function(Backbone, $, template) {

    var Overlay = Backbone.View.extend({

        el: 'body',

        template: $(template()),

        events: {
            'click .overlay': 'hide'
        },

        /**
         * Initialize the overlay view.
         */
        initialize: function() {
            this.el = $(this.el);
            this.render();
        },

        /**
         * Render the overlay once into the DOM.
         */
        render: function() {
            if (this.el.has(this.template).length === 0) {
                this.el.append(this.template);
            }
        },

        show: function() {
            this.template.show();
        },

        hide: function() {
            this.template.hide();
        }

    });

    return Overlay;

});