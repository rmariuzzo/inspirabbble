'use strict';

define([
    'backbone',
    'jquery',
    'views/dialog',
    'models/settings',
    'hbs!templates/settings'
], function(Backbone, $, Dialog, model, template) {

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
                content: this.template()
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