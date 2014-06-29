/**
 * The form helper registry.
 */

'use strict';

define([
    'hbs/handlebars',
    'hbs!templates/input'
], function(Handlebars, inputTemplate) {

    Handlebars.registerHelper('form', function(options) {
        if (this.type === 'text' || this.type === 'checkbox') {
            return new Handlebars.SafeString(inputTemplate(this));
        }
        return options.fn(this);
    });

});