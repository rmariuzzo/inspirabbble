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
            this.bindEvents();
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
         *
         * @param callback function A callback function.
         */
        App.prototype.refresh = function(callback) {

            // Estimate maximum shots that can fit in screen.
            var max = +options.get('maxShotsPerRequest');
            if (this.$firstRefresh) {
                var cols = this.$grid.cols().length;
                var width = $(window).width() / cols;
                var height = (3 / 4) * width;
                var rows = Math.ceil($(window).height() / height);
                max = Math.min((cols * rows), +options.get('maxShots'));
            }

            // Get shots.
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

                // Render new shots.
                this.render(function() {
                    this.$firstRefresh = false;
                    callback.call(this);
                }.bind(this));

            }.bind(this));
        };

        /**
         * Schedule the refresh of shots.
         */
        App.prototype.scheduleRefresh = function() {
            clearTimeout(this.$timeout);
            this.$timeout = setTimeout(function() {
                this.refresh(function() {
                    this.scheduleRefresh();
                }.bind(this));
            }.bind(this), +options.get('refreshInterval'));
        };

        /**
         * Render new shots.
         *
         * @param callback function A callback function.
         */
        App.prototype.render = function(callback) {

            if (this.$newShots.length) {

                // Add new shots to grid.
                this.$newShots.forEach(function(shot) {
                    this.$grid.add(templates.shot({
                        shot: shot,
                        options: {
                            hd: !! options.get('hd')
                        }
                    }));
                }.bind(this));

                // Allow post-render invocation when grid completes.
                this.$grid.on('complete', function() {
                    callback.call(this);
                }.bind(this));
            } else {
                callback.call(this);
            }
        };

        /**
         * Bind events.
         */
        App.prototype.bindEvents = function() {

            // Handle resize event
            $(window).on('resize', function() {
                clearTimeout(this.$resizeTimeout);
                this.$resizeTimeout = setTimeout(function() {
                    this.$grid.refresh();
                    this.$grid.resize();
                }.bind(this), 100);
            }.bind(this));
        };

        return new App();

    }
);
