/**
 * The validator utility object.
 */
'use strict';

define([
    'underscore'
], function(_) {

    // Constructor //

    var Validator = function() {
        this.validators = Validator.validators || {};
        this.errors = {};
    };

    Validator.extend = function(rule, func) {
        var extension = {};
        extension[rule] = func;
        Validator.validators = Validator.validators || {};
        _.extend(Validator.validators, extension);
    };

    // Public functions //

    Validator.prototype.make = function(data, rules) {
        this.data = data;
        this.rules = rules;
        return this;
    };

    Validator.prototype.passes = function() {

        // Clear all errors.
        this.clearErrors();

        // Parse rules.
        var rules = this.parseRules();
        for (var key in rules) {

            // Get value for rule.
            var value = this.data[key];
            for (var i = 0; i < rules[key].length; i++) {
                var rule = rules[key][i];

                // Validate the given rule with the given value.
                this.validate(rule.name, value, key, rule.params);
            }
        }

        return !this.hasErrors();
    };

    Validator.prototype.parseRules = function() {

        var data = {};
        if (!this.rules) {
            return data; // Nothing to do here.
        }

        for (var key in this.rules) {

            // Obtain all rules definitions.
            var definitions = this.rules[key];
            if (!Array.isArray(definitions)) {
                definitions = [definitions];
            }

            data[key] = [];

            // Parse definition for extra parameters.
            for (var i = 0; i < definitions.length; i++) {
                var parts = definitions[i].split(':');
                data[key].push({
                    name: parts[0],
                    params: parts[1]
                });
            }
        }

        return data;
    };

    Validator.prototype.validate = function(rule, value, key, params) {

        // Check if a validator exists for the given rule.
        var validator = this.validators[rule];
        if (!validator) {
            throw new Error('No validator for rule: ' + rule);
        }

        // Run validator for given rule.
        var validation = validator.call(null, value, key, params);

        // Analyze validation result.
        if (validation !== true) {
            this.addError(key, rule);
        }
    };

    Validator.prototype.addError = function(key, rule) {
        if (!Array.isArray(this.errors[key])) {
            this.errors[key] = [];
        }
        this.errors[key].push(key + '.' + rule);
    };

    Validator.prototype.clearErrors = function() {
        this.errors = {};
    };

    Validator.prototype.hasErrors = function() {
        return !_.isEmpty(this.errors);
    };

    return Validator;

});