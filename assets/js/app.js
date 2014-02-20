'use strict';

define([
        'angular',
        'utils/templates',
        'components/dribbble',
        'components/options',
        'jquery'
    ],
    function(
        angular,
        templates,
        dribbble,
        options,
        $) {

        //angular.module('inspirabbbe', []);

        var App = function() {};

        /**
         * Initialize the app.
         */
        App.prototype.init = function() {
            this.$shots = [];
            this.refresh(function() {
                this.scheduleRefresh();
            }.bind(this));
        };

        /**
         * Refresh shots.
         */
        App.prototype.refresh = function(callback) {
            // Preventing calling refresh when already refreshing.
            if (this.$refreshing) {
                return;
            }
            this.$refreshing = true;

            // Get shots.
            var max = options.get('maxShotsPerRequest');
            dribbble.getShotsByList('everyone', 1, max, function(response, status, xhr) {

                // Process new shots.
                if (status === 'success') {
                    var shots = $.grep(response.shots, function(shot) {
                        return this.$shots[shot.id] === undefined;
                    }.bind(this));
                    this.$updated = !!shots.length;
                    if (this.$updated) {
                        var remaining = this.$shots.splice(max - shots.length);
                        this.$shots = shots.concat(remaining);
                    }
                    this.$shots = shots;
                    this.render();
                }

                this.$refreshing = false;
                callback.apply(this, [response, status, xhr]);
            }.bind(this));
        };

        /**
         * Schedule the refresh of shots.
         */
        App.prototype.scheduleRefresh = function() {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(function() {
                this.refresh(function() {
                    this.scheduleRefresh();
                }.bind(this));
            }.bind(this), 5000);
        };

        /**
         * Render shots.
         */
        App.prototype.render = function() {
            $('body').empty();
            (this.$shots || []).forEach(function(shot, index) {
                $('body').append(templates.shot({
                    shot: shot,
                    index: index
                }));
            }.bind(this));
        };

        return new App();

    }
);
