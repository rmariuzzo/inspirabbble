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

    var Options = Backbone.Model.extend({

        localStorage: new Backbone.LocalStorage('options'),

        initialize: function() {
            this.$options = defaults;
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
        }

        // /**
        //  * Load user options from localStorage.
        //  */
        // loadUserOptions: function() {
        //     this.$options = JSON.parse(localStorage.options || null) || defaults;
        // },

        // /**
        //  * Save user options to localStorage.
        //  */
        // saveUserOptions: function() {
        //     localStorage.options = JSON.stringify(this.$options);
        // }

    });

    return new Options();

});