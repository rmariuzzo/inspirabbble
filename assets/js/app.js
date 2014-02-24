'use strict';

define([
        'utils/templates',
        'components/dribbble',
        'components/options',
        'components/grid',
        'jquery'
    ],
    function(
        templates,
        dribbble,
        options,
        Grid,
        $) {

        //angular.module('inspirabbbe', []);

        var App = function() {
            this.$grid = new Grid('#grid');
            this.$firstRefresh = true;
            this.$rendering = false;
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
            var max = +options.get('maxShotsPerRequest');
            if (this.$firstRefresh) {
                // Estimate maximum shots that can fit in screen.
                var cols = +options.get('gridColumns');
                var width = $(window).width() / cols;
                var height = (3 / 4) * width;
                var rows = Math.ceil($(window).height() / height);
                max = Math.min((cols * rows), +options.get('maxShots'));
            }
            dribbble.getShotsByList('everyone', 1, max, function(data) {

                // Store and filter new shots.
                this.$newShots = $.grep(data, function(shot) {
                    if (this.$shots[shot.id]) {
                        return false;
                    } else {
                        this.$shots[shot.id] = shot;
                        return true;
                    }
                }.bind(this));

                this.render();
                this.$refreshing = false;
                this.$firstRefresh = false;
                callback.call(this, data);
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

            if (!this.$rendering && this.$newShots.length) {
                this.$rendering = true;

                // Add new shots to grid.
                this.$newShots.forEach(function(shot) {
                    this.$grid.add(templates.shot({
                        shot: shot
                    }));
                }.bind(this));

                // Allow post-render invocation when grid completes.
                this.$grid.on('complete', function() {
                    this.$rendering = false;
                }.bind(this));
            }
        };

        return new App();

    }
);
