'use strict';

define([
    'jquery',
    'underscore',
    'backbone',
    'views/dialog',
    'collections/settings',
    'hbs!templates/settings',
    'templates/helpers/form'
], function($, _, Backbone, Dialog, settings, template) {

    var Settings = Backbone.View.extend({

        el: 'body',

        template: template,

        initialize: function() {
            this.el = $(this.el);
            this.render();
            this.listenTo(this.dialog, 'hide', this.hide);
        },

        render: function() {
            this.dialog = new Dialog({
                title: 'Settings',
                content: this.template(_.toArray(settings.schema()))
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