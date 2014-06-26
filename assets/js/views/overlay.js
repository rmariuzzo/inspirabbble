/**
 * The overlay view.
 */

'use strict';

define([
    'jquery',
    'backbone',
    'hbs!templates/overlay'
], function($, Backbone, template) {

    var Overlay = Backbone.View.extend({

        /**
         * The element where overlay will be attached.
         */
        el: 'body',

        /**
         * The template.
         */
        template: $(template()),

        /**
         * Events.
         */
        events: {
            'click .overlay': 'clickOverlay'
        },

        /**
         * Initialize the overlay view.
         */
        initialize: function() {
            this.el = $(this.el);
            this.hide();
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

        /**
         * Show the overlay.
         */
        show: function() {
            this.template.show();
            this.delegateEvents();
        },

        /**
         * Hide the overlay.
         */
        hide: function() {
            this.template.hide();
            this.undelegateEvents();
        },

        // Event handlers //

        /**
         * Handle click on overlay.
         */
        clickOverlay: function() {
            this.trigger('hide');
        }

    });

    return Overlay;

});