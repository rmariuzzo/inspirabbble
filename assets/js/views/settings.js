'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    'views/dialog',
    'models/settings',
    'hbs!templates/settings',
    'templates/helpers/form'
], function($, _, Backbone, Dialog, model, template) {

    var Settings = Backbone.View.extend({

        el: 'body',

        template: template,

        initialize: function() {
            this.el = $(this.el);
            this.model = model;
            this.render();
            this.listenTo(this.dialog, 'hide', this.hide);
        },

        render: function() {
            this.dialog = new Dialog({
                title: 'Setttings',
                content: this.template(_.toArray(this.model.getSchema()))
            });
            this.hide();
        },

        show: function() {
            this.dialog.show();
            this.delegateEvents();
        },

        hide: function() {
            this.dialog.hide();
            this.undelegateEvents();
            this.trigger('hide');
        }

    });

    return new Settings();

});