/**
 * The "Inspirabbble" application.
 */

'use strict';

define([
        'router',
        'models/dribbble',
        'views/options',
        'views/grid',
        'views/header',
        'jquery',
        'underscore',
        'backbone',
        'hbs!templates/shot',
        'utils/validator-commons'
    ],
    function(Router, Dribbble, Options, Grid, Header, $, _, Backbone, template) {

        var Inspirabbble = Backbone.View.extend({

            el: 'body',

            /**
             * Initialize the app.
             */
            initialize: function() {
                this.$grid = new Grid({
                    el: '#grid'
                });
                this.$header = new Header({
                    el: '#header'
                });
                this.$dribbble = new Dribbble();
                this.bindEvents();
                this.setupRoutes();
                Backbone.history.start();
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

                var max = Math.min(this.estimateMaxShots(), +Options.model.get('maxShotsPerRequest'));

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
                }.bind(this), +Options.model.get('refreshInterval'));
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
                        this.$grid.add(template({
                            shot: shot,
                            Options: {
                                hd: !!Options.model.get('hd')
                            }
                        }));
                    }.bind(this));

                    // Allow post-render invocation when grid completes.
                    this.$grid.on('complete', function() {
                        console.log('completed');
                        callback.call(this);
                    }.bind(this));
                } else {
                    callback.call(this);
                }
            },

            /**
             * Estimate maximum number of shots that would fit into the grid.
             *
             * @return number The numer of shots that could fit into the grid.
             */
            estimateMaxShots: function() {
                var calc = _.once(function() {
                    var cols = this.$grid.cols().length;
                    var width = $(window).width() / cols;
                    var height = (3 / 4) * width;
                    var rows = Math.ceil(this.$grid.el.height() / height);
                    return cols * rows;
                }.bind(this));

                return calc();
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

                this.listenTo(Options, 'hide', function() {
                    Router.navigate('/');
                });
            },

            /**
             * Setup all the routes.
             */
            setupRoutes: function() {

                Router.on('route:settings', function() {
                    Options.show();
                });

            }

        });

        return Inspirabbble;

    }
);