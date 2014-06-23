'use strict';

define(
    [
        'jquery',
        'models/options',
        'eventEmitter/EventEmitter',
        'hbs!templates/grid',
        'imagesloaded',
        'backbone'
    ], function($, options, EventEmitter, template, Backbone, Thorax) {

        var Grid = Thorax.View({

            el: '.col:visible'

        });

        var ee = new EventEmitter();
        var events = {
            complete: 'complete'
        };

        // Class definition //

        Grid = function(target) {
            this.$target = $(target);
            this.$template = $(template());
            this.$target.html(this.$template);
            this.$wrapper = this.$template;
            this.$grid = this.$template.find('.grid');
            this.$header = this.$template.find('header');
            this.$footer = this.$template.find('footer');
            this.$prev = this.$header.find('.prev');
            this.$next = this.$footer.find('.next');
            this.$queue = 0;
            this.resize();
            this.bindEvents();
            this.startTimers();
        };

        // Methods //

        /**
         * Add an element to the grid.
         *
         * @param html string|DOMNode|jQuery The element to add.
         */
        Grid.prototype.add = function(html) {
            this.$queue++;
            $(html).imagesLoaded(function() {
                this.prepend(html);
                --this.$queue;
                if (!this.$queue) {
                    ee.emitEvent(events.complete);
                }
            }.bind(this));
        };

        /**
         * Return all columns available.
         */
        Grid.prototype.cols = function() {
            return this.$target.find('.col:visible');
        };

        /**
         * Refresh the view.
         */
        Grid.prototype.refresh = function() {
            var cols = this.cols();
            var children = cols.children();
            cols.empty();
            children.each(function(index, child) {
                this.prepend(child);
            }.bind(this));
        };

        /**
         * Resize the view.
         */
        Grid.prototype.resize = function() {
            // The following line should not be there.
            this.$target.height($(window).height() - (this.$target.outerHeight(true) - this.$target.height()));
            this.$wrapper.height(this.$target.height());
            this.$footer.css('top', this.$target.height() - this.$footer.height());
        };

        /**
         * Prepend an element to the view.
         */
        Grid.prototype.prepend = function(html) {
            var cols = this.cols();
            var col = cols.first();
            cols.each(function() {
                var $this = $(this);
                col = col.height() < $this.height() ? col : $this;
            });
            col.prepend(html);
        };

        /**
         * Move the grid to make the next row visible.
         */
        Grid.prototype.next = function() {
            var rowHeight = this.rowHeight();
            var remaining = this.$grid.height() - this.$target.height() + (parseInt(this.$grid.css('top'), 10) || 0);
            if (remaining > rowHeight) {
                this.$grid.css('top', '-=' + rowHeight);
            } else {
                this.$grid.css('top', (this.$target.height() - this.$grid.height()));
            }
        };

        /**
         * Move the grid to make the previous row visible.
         */
        Grid.prototype.prev = function() {
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
        };

        /**
         * Return the virtual row height.
         */
        Grid.prototype.rowHeight = function() {
            var children = this.cols().first().children();
            if (children.length >= 2) {
                return children.eq(1).offset().top - children.eq(0).offset().top;
            }
            return 0;
        };

        /**
         * Refresh arrows visibility state.
         */
        Grid.prototype.refresh = function() {
            var top = parseInt(this.$grid.css('top'), 10);
            if (top === 0) {
                this.$header.hide();
            } else {
                this.$header.show();
            }
            var remaining = this.$grid.height() - this.$target.height() + top;
            if (remaining > 0) {
                this.$footer.show();
            } else {
                this.$footer.hide();
            }
        };

        /**
         * Bind events.
         */
        Grid.prototype.bindEvents = function() {
            this.$prev.on('click', function(event) {
                event.preventDefault();
                this.prev();
            }.bind(this));

            this.$next.on('click', function(event) {
                event.preventDefault();
                this.next();
            }.bind(this));

            this.$wrapper.on('DOMMouseScroll', function(event) {
                event.preventDefault();
                if (event.originalEvent.detail > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }.bind(this));

            this.$wrapper.on('mousewheel', function(event) {
                event.preventDefault();
                if (event.originalEvent.wheelDelta < 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }.bind(this));
        };

        Grid.prototype.startTimers = function() {
            setInterval(function() {
                this.refresh();
            }.bind(this), 300);
        };

        // Events //

        /**
         * Listen to a event.
         *
         * @param event string The name of the event to listen.
         * @param listener function The function to execute.
         */
        Grid.prototype.on = function(event, listener) {
            ee.addListener(event, listener);
        };

        return Grid;

    }
);