'use strict';

define([], function() {

    // Default options.
    var defaults = {
        maxShotsPerRequest: 30,
        refreshInterval: 5000,
        maxShots: 200,
        gridColumns: 6,
        hd: false
    };

    var Options = function() {
        this.loadUserOptions();
    };

    /**
     * Show the options dialog.
     */
    Options.prototype.show = function() {
        // TODO
    };

    /**
     * Hide the options dialog.
     */
    Options.prototype.hide = function() {
        // TODO
    };

    /**
     * Return the value of an option.
     *
     * @param key string The key of the option.
     *
     * @return string The value of the option or undefined
     */
    Options.prototype.get = function(key) {
        return this.$options[key];
    };

    /**
     * Load user options from localStorage.
     */
    Options.prototype.loadUserOptions = function() {
        this.$options = JSON.parse(localStorage.options || null) || defaults;
    };

    /**
     * Save user options to localStorage.
     */
    Options.prototype.saveUserOptions = function() {
        localStorage.options = JSON.stringify(this.$options);
    };

    return new Options();

});
