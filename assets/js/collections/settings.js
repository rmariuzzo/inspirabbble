/**
 * The settings collections.
 */

'use strict';

define([
    'models/setting',
    'underscore',
    'backbone',
    'backbone.localStorage'
], function(Setting, _, Backbone) {

    var schema = [{
        id: 'max_shots_per_request',
        value: 30,
        type: 'text',
        label: 'Max shots per request',
        rules: ['required', 'numeric', 'min:1', 'max:30']
    }, {
        id: 'refresh_interval',
        value: 5000,
        type: 'text',
        label: 'Refresh Interval',
        rules: ['required', 'numeric', 'min:1000', 'max:1800000']
    }, {
        id: 'max_shots',
        value: 200,
        type: 'text',
        label: 'Max shots',
        rules: ['required', 'numeric', 'min:1']
    }, {
        id: 'grid_columns',
        value: 6,
        type: 'text',
        label: 'Number of columns',
        rules: ['required', 'numeric', 'min:1']
    }, {
        id: 'hd',
        value: true,
        type: 'checkbox',
        label: 'HD shots?',
        rules: ['required', 'boolean']
    }, {
        id: 'grid_controls',
        value: false,
        type: 'checkbox',
        label: 'Show controls?',
        rules: ['required', 'boolean']
    }];

    var Settings = Backbone.Collection.extend({

        model: Setting,

        localStorage: new Backbone.LocalStorage('settings'),

        initialize: function() {
            // Fetch user settings from local storage.
            this.fetch({
                async: false,
                success: function(collection) {
                    for (var i = 0; i < schema.length; i++) {
                        if (!collection.get(schema[i].id)) {
                            collection.add(_.pick(schema[i], 'id', 'value'));
                        }
                    }
                }.bind(this)
            });
            // Save settings.
            this.each(function(model) {
                model.save();
            });
        },

        /**
         * Return all the settings with its schema.
         *
         * @return object All settings with its schema.
         */
        schema: function() {
            var settings = this.toJSON();
            for (var i = 0; i < settings.length; i++) {
                settings[i] = _.extend(_.findWhere(schema, {
                    id: settings[i].id
                }), settings[i]);
            }
            return settings;
        },

        /**
         * Return the value of a setting.
         *
         * @param string id The id of the setting.
         * @return mixed The value of the setting if found.
         */
        value: function(id) {
            var setting = _.findWhere(this.schema(), {
                id: id
            });
            if (!setting) {
                throw new Error('Undefined setting: ' + id);
            }
            return setting.type === 'checkbox' ? setting.value : +setting.value;
        }

    });

    return new Settings();

});