'use strict';

define([
    'backbone',
    'backbone.localStorage'
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

    // var schema = {
    //     maxShotsPerRequest: ['required', 'numeric', 'min:1', 'max:30'],
    //     refreshInterval: ['required', 'numeric', 'min:1000', 'max:1800000'],
    //     maxShots: ['required', 'numeric', 'min:1'],
    //     gridColumns: ['required', 'numeric', 'min:1'],
    //     hd: ['required', 'boolean'],
    //     gridControls: ['required', 'boolean']
    // };

    var Settings = Backbone.Model.extend({

        localStorage: new Backbone.LocalStorage('settings'),

        initialize: function() {
            this.$settings = defaults;
        },

        /**
         * Return the value of an option.
         *
         * @param key string The key of the option.
         *
         * @return string The value of the option or undefined
         */
        get: function(key) {
            return this.$settings[key];
        }

        // /**
        //  * Load user settings from localStorage.
        //  */
        // loadUsersettings: function() {
        //     this.$settings = JSON.parse(localStorage.settings || null) || defaults;
        // },

        // /**
        //  * Save user settings to localStorage.
        //  */
        // saveUsersettings: function() {
        //     localStorage.settings = JSON.stringify(this.$settings);
        // }

    });

    return new Settings();

});