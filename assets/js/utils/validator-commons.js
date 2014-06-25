/**
 * Common validator extensions.
 */
'use strict';

define([
    'utils/validator',
    'jquery',
    'underscore'
], function(Validator, $, _) {

    Validator.extend('required', function(value) {
        if (_.isString(value)) {
            return $.trim(value).length > 0;
        }
    });

});