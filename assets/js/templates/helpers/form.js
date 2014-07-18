/**
 * The form helper registry.
 */

'use strict';

define([
    'underscore',
    'hbs/handlebars',
    'hbs!templates/input'
], function(_, Handlebars, inputTemplate) {

    Handlebars.registerHelper('form', function() {
        if (this.type === 'checkbox') {
            this.isCheckbox = true;
            this.checked = !!this.value;
        }
        if (this.type === 'select') {
            this.isSelect = true;
            _.each(this.options, function(option) {
                if (option.value === this.value) {
                    option.selected = true;
                }
            }.bind(this));
        }
        if (this.type === 'text') {
            this.isText = true;
        }
        return new Handlebars.SafeString(inputTemplate(this));
    });

});