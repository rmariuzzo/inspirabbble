'use strict';

define([
        'angular',
        'utils/templates',
        'components/dribbble',
        'components/options',
        'components/grid',
        'jquery'
    ],
    function(
        angular,
        templates,
        dribbble,
        options,
        Grid,
        $) {

        //angular.module('inspirabbbe', []);

        var App = function() {
            this.$grid = new Grid('#grid');
        };

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
            var max = options.get('maxShots');
            dribbble.getShotsByList('everyone', 1, max, function(response, status, xhr) {

                // Process new shots.
                if (status === 'success') {

                    // Store and filter new shots.
                    this.$newShots = $.grep(response.shots, function(shot) {
                        if (this.$shots[shot.id]) {
                            return false;
                        } else {
                            this.$shots[shot.id] = shot;
                            return true;
                        }
                    }.bind(this));

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
            }.bind(this), +options.get('refreshInterval'));
        };

        /**
         * Render new shots.
         */
        App.prototype.render = function() {
            this.$newShots.forEach(function(shot) {
                this.$grid.add(templates.shot({
                    shot: shot
                }));
            }.bind(this));
        };

        return new App();

    }
);
