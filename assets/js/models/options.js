'use strict';

define([
    'backbone',
], function(Backbone) {

    // Default options.
    var defaults = {
        maxShotsPerRequest: 30,
        refreshInterval: 5000,
        maxShots: 200,
        gridColumns: 6,
        hd: false,
        gridControls: false
    };

    var Options = Backbone.Model.extend({

        initialize: function() {
            this.loadUserOptions();
        },

        /**
         * Return the value of an option.
         *
         * @param key string The key of the option.
         *
         * @return string The value of the option or undefined
         */
        get: function(key) {
            return this.$options[key];
        },

        /**
         * Load user options from localStorage.
         */
        loadUserOptions: function() {
            this.$options = JSON.parse(localStorage.options || null) || defaults;
        },

        /**
         * Save user options to localStorage.
         */
        saveUserOptions: function() {
            localStorage.options = JSON.stringify(this.$options);
        }

    });

    return new Options();

});