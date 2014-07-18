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
        id: 'refresh_interval',
        value: 30 * 1000,
        type: 'select',
        options: [{
            text: '10s',
            value: 10 * 1000
        }, {
            text: '30s',
            value: 30 * 1000
        }, {
            text: '1m',
            value: 60 * 1000
        }, {
            text: '5m',
            value: 60 * 1000 * 5
        }, {
            text: '10m',
            value: 60 * 1000 * 10
        }],
        label: 'Refresh Interval',
        rules: ['required', 'numeric', 'min:1000', 'max:1800000']
    }, {
        id: 'hd',
        value: true,
        type: 'checkbox',
        label: 'HD quality?',
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
            // Validate against schema.
            if (!this.validateSchema()) {
                var length = this.models.length;
                for (var i = 0; i < length; i++) {
                    this.at(0).destroy();
                }
                this.loadDefault();
            }
            // Save all settings.
            this.each(function(setting) {
                setting.save();
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
                var s = _.findWhere(schema, {
                    id: settings[i].id
                });
                settings[i] = _.extend(s, settings[i]);
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
        },

        /**
         * Validate loaded settings against schema.
         *
         * @return boolean True if loaded settings are valid for the current schema.
         */
        validateSchema: function() {
            if (schema.length !== this.length) {
                return false;
            }
            return schema.every(function(s) {
                return this.get(s.id);
            }.bind(this));
        },

        /**
         * Load default settings values.
         *
         * @return void.
         */
        loadDefault: function() {
            this.reset(schema);
        }

    });

    return new Settings();

});