/**
 * The "Inspirabbble" application.
 */

'use strict';

define([
        'utils/templates',
        'models/dribbble',
        'components/options',
        'components/grid',
        'components/header',
        'jquery',
        'backbone'
    ],
    function(templates, Dribbble, options, Grid, Header, $, Backbone) {

        var Inspirabbble = Backbone.View.extend({

            el: 'body',

            /**
             * Initialize the app.
             */
            initialize: function() {
                this.$grid = new Grid('#grid');
                this.$header = new Header('#header');
                this.$firstRefresh = true;
                this.$dribbble = new Dribbble();
                this.bindEvents();
            },

            /**
             * Start the app.
             */
            start: function() {
                this.$shots = [];
                this.refresh(function() {
                    this.scheduleRefresh();
                }.bind(this));
            },

            /**
             * Refresh Dribbble shots.
             *
             * @param callback function A callback function.
             * @return void
             */
            refresh: function(callback) {

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
                this.$dribbble.getShotsByList('everyone', 1, max, function(data) {

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
            },

            /**
             * Schedule the next refresh of Dribbble shots.
             */
            scheduleRefresh: function() {
                clearTimeout(this.$timeout);
                this.$timeout = setTimeout(function() {
                    this.refresh(function() {
                        this.scheduleRefresh();
                    }.bind(this));
                }.bind(this), +options.get('refreshInterval'));
            },

            /**
             * Render new Dribbble shots.
             *
             * @param callback function A callback function.
             */
            render: function(callback) {

                if (this.$newShots.length) {

                    // Add new shots to grid.
                    this.$newShots.forEach(function(shot) {
                        this.$grid.add(templates.shot({
                            shot: shot,
                            options: {
                                hd: !!options.get('hd')
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
            },

            /**
             * Bind events.
             */
            bindEvents: function() {

                // Handle resize event
                $(window).on('resize', function() {
                    clearTimeout(this.$resizeTimeout);
                    this.$resizeTimeout = setTimeout(function() {
                        this.$grid.refresh();
                        this.$grid.resize();
                    }.bind(this), 100);
                }.bind(this));
            }

        });

        return Inspirabbble;

    }
);