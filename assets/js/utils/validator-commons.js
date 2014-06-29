/**
 * Common validator extensions.
 */
'use strict';

define([
    'utils/validator',
    'jquery',
    'underscore'
], function(Validator, $, _) {

    /**
     * Required rule: `required`.
     */
    Validator.extend('required', function(value) {
        if (_.isString(value)) {
            return $.trim(value).length > 0;
        }
    });

    /**
     * Boolean rule: `boolean`.
     */
    Validator.extend('boolean', function(value) {
        if (_.isString(value)) {
            value = $.trim(value).toLowerCase();
            return value === 'true' || value === 'false';
        }
        return _.isBoolean(value);
    });

    /**
     * Numeric rule: `numeric`.
     */
    Validator.extend('numeric', function(value) {
        return $.isNumeric(value);
    });

    /**
     * Max rule: `max:number`.
     */
    Validator.extend('max', function(value, params) {
        var max = params[0];
        value = parseFloat(value);
        return value <= max;
    });

    /**
     * Min rule: `min:number`.
     */
    Validator.extend('min', function(value, params) {
        var min = params[0];
        value = parseFloat(value);
        return value >= min;
    });

});