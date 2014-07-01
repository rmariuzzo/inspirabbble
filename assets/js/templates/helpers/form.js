/**
 * The form helper registry.
 */

'use strict';

define([
    'hbs/handlebars',
    'hbs!templates/input'
], function(Handlebars, inputTemplate) {

    Handlebars.registerHelper('form', function() {
        if (this.type === 'checkbox') {
            this.checkbox = true;
            this.checked = !!this.value;
        }
        return new Handlebars.SafeString(inputTemplate(this));
    });

});