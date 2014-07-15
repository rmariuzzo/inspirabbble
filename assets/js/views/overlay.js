/**
 * The overlay view.
 */

'use strict';

define([
    'jquery',
    'backbone',
    'utils/transitionend',
    'hbs!templates/overlay',
    'utils/jquery.reflow'
], function($, Backbone, transitionend, template) {

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
            'click .overlay': 'handleClick'
        },

        /**
         * Initialize the overlay view.
         */
        initialize: function() {
            this.el = $(this.el);
            this.render();
            this.hide(true);
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
            this.template.show().reflow().removeClass('hidden');
            this.delegateEvents();
        },

        /**
         * Hide the overlay.
         */
        hide: function(immediate) {
            if (immediate) {
                this.template.hide();
            } else {
                this.template.one(transitionend, function() {
                    this.template.hide();
                }.bind(this));
            }
            this.template.addClass('hidden');
            this.undelegateEvents();
        },

        // Event handlers //

        /**
         * Handle click on overlay.
         */
        handleClick: function() {
            this.trigger('click');
        }

    });

    return Overlay;

});