/**
 * The settings view.
 */

'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    'views/dialog',
    'collections/settings',
    'hbs!templates/settings',
    'templates/helpers/form'
], function($, _, Backbone, Dialog, settings, template) {

    var Settings = Backbone.View.extend({

        /** The element where the settings view will be attached when rendered. */
        el: 'body',

        /** The hash of events used in the settings view. */
        events: {
            'click .settings-save': 'handleSaveClick',
            'click .settings-cancel': 'handleCancelClick'
        },

        /** The template used for the settings view. */
        template: template,

        /**
         * Initialize the settings view.
         */
        initialize: function() {
            this.el = $(this.el);
            this.render();
            this.listenTo(this.dialog, 'hide', this.hide);
        },

        /**
         * Render the settings view.
         */
        render: function() {
            this.dialog = new Dialog({
                title: 'Settings',
                content: this.template(_.toArray(settings.schema()))
            });
            this.hide();
        },

        /**
         * Refresh the rendered data with the current settings.
         */
        refresh: function() {
            settings.each(function(setting) {
                this.dialog.content.find('[name=' + setting.get('id') + ']').val(setting.get('value'));
            }.bind(this));
        },

        /**
         * Show this settings view.
         */
        show: function() {
            this.refresh();
            this.dialog.show();
            this.delegateEvents();
        },

        /**
         * Hide this settings view.
         */
        hide: function() {
            this.dialog.hide();
            this.undelegateEvents();
            this.trigger('hide');
        },

        /**
         * Save input values to settings storage.
         */
        save: function() {
            var input = this.getInput();
            _.each(_.keys(input), function(key) {
                settings.get(key).set('value', input[key]).save();
            });
            this.hide();
        },

        /**
         * Return a hash of input data.
         *
         * @return object A hash of input data.
         */
        getInput: function() {
            var input = {};
            this.dialog.content.find(':input').each(function() {
                if (this.type === 'checkbox') {
                    input[this.name] = !!this.checked;
                } else {
                    input[this.name] = this.value;
                }
            });
            return input;
        },

        /**
         * Handle click on save link.
         */
        handleSaveClick: function(event) {
            event.preventDefault();
            this.save();
        },

        /**
         * Handle click on cancel link.
         */
        handleCancelClick: function(event) {
            event.preventDefault();
            this.hide();
        }

    });

    return new Settings();

});