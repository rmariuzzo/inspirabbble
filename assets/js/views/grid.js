/**
 * The grid view.
 */

'use strict';

define(
    [
        'collections/settings',
        'hbs!templates/grid',
        'jquery',
        'backbone',
        'imagesloaded'
    ], function(settings, template, $, Backbone) {

        var Grid = Backbone.View.extend({

            template: template,

            events: {
                'touchstart': 'touchstartHandler',
                'mousewheel': 'mousewheelHandler',
                'DOMMouseScroll': 'domMouseScrollHandler'
            },

            touched: false,

            /**
             * Initialize the grid view.
             */
            initialize: function() {
                this.el = $(this.el);
                this.render();
                this.$queue = 0;
                this.resize();
                this.bindEvents();
                this.startTimers();
            },

            /**
             * Render this view.
             */
            render: function() {
                this.el.html(this.template());
                this.$wrapper = this.$('.grid-wrapper');
                this.$grid = this.$('.grid');
                this.$header = this.$('header');
                this.$footer = this.$('footer');
                this.$prev = this.$('.prev');
                this.$next = this.$('.next');
            },

            /**
             * Add an element to the grid.
             *
             * @param html mixed The element to add.
             */
            add: function(html) {
                this.$queue++;
                $(html).imagesLoaded(function() {
                    this.prepend(html);
                    --this.$queue;
                    if (!this.$queue) {
                        this.trigger('complete');
                    }
                }.bind(this));
            },

            /**
             * Return all columns available.
             */
            cols: function() {
                return this.el.find('.col:visible');
            },

            /**
             * Resize the view.
             */
            resize: function() {
                if (this.touched) {
                    return; // Nothing to do here.
                }
                // The following line should not be there.
                this.el.height($(window).height() - (this.el.outerHeight(true) - this.el.height()));
                this.$wrapper.height(this.el.height());
                this.$footer.css('top', this.el.height() - this.$footer.height());
            },

            /**
             * Prepend an element to the view.
             */
            prepend: function(html) {
                var cols = this.cols();
                var col = cols.first();
                cols.each(function() {
                    var $this = $(this);
                    col = col.children().length <= $this.children().length ? col : $this;
                });
                col.prepend(html);
            },

            /**
             * Move the grid to make the next row visible.
             */
            next: function() {
                var rowHeight = this.rowHeight();
                var remaining = this.$grid.height() - this.el.height() + (parseInt(this.$grid.css('top'), 10) || 0);
                if (remaining > rowHeight) {
                    this.$grid.css('top', '-=' + rowHeight);
                } else {
                    this.$grid.css('top', (this.el.height() - this.$grid.height()));
                }
            },

            /**
             * Move the grid to make the previous row visible.
             */
            prev: function() {
                var rowHeight = this.rowHeight();
                var remaining = -parseInt(this.$grid.css('top'), 10) || 0;
                var inperfections = (remaining % rowHeight);
                if (inperfections) {
                    this.$grid.css('top', '+=' + inperfections);
                    this.$lastRow = false;
                } else if (remaining > rowHeight) {
                    this.$grid.css('top', '+=' + rowHeight);
                } else {
                    this.$grid.css('top', 0);
                }
            },

            /**
             * Return the virtual row height.
             */
            rowHeight: function() {
                var children = this.cols().first().children();
                if (children.length >= 2) {
                    return children.eq(1).offset().top - children.eq(0).offset().top;
                }
                return 0;
            },

            /**
             * Refresh arrows visibility state.
             */
            refresh: function() {
                if (settings.value('grid_controls')) {
                    var top = parseInt(this.$grid.css('top'), 10);
                    if (top === 0) {
                        this.$header.hide();
                    } else {
                        this.$header.show();
                    }
                    var remaining = this.$grid.height() - this.el.height() + top;
                    if (remaining > 0) {
                        this.$footer.show();
                    } else {
                        this.$footer.hide();
                    }
                }
            },

            /**
             * Bind events.
             */
            bindEvents: function() {
                this.listenTo(this.$prev, 'click', function(event) {
                    event.preventDefault();
                    this.prev();
                }.bind(this));

                this.listenTo(this.$next, 'click', function(event) {
                    event.preventDefault();
                    this.next();
                }.bind(this));
            },

            startTimers: function() {
                setInterval(function() {
                    this.refresh();
                }.bind(this), 300);
            },

            // Event handlers //

            mousewheelHandler: function(event) {
                if (this.touched) {
                    return; // Nothing to do here.
                }
                event.preventDefault();
                if (event.originalEvent.wheelDelta < 0) {
                    this.next();
                } else {
                    this.prev();
                }
            },

            domMouseScrollHandler: function(event) {
                if (this.touched) {
                    return; // Nothing to do here.
                }
                event.preventDefault();
                if (event.originalEvent.detail > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            },

            touchstartHandler: function() {
                if (!this.touched) {
                    this.el.css('height', 'auto');
                    this.$wrapper.css('height', 'auto');
                }
                this.touched = true;
            }

        });

        return Grid;

    }
);