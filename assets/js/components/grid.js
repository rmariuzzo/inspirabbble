'use strict';

define(['jquery', 'components/options', 'eventEmitter/EventEmitter', 'imagesloaded'], function($, options, EventEmitter) {

    var ee = new EventEmitter();
    var events = {
        complete: 'complete'
    };

    // Class definition //

    var Grid = function(target) {
        this.target(target);
    };

    /**
     * Set the target where the grid will be rendered.
     */
    Grid.prototype.target = function(selector) {
        this.$target = $(selector);
        this.$queue = 0;
    };

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

    // Events //

    Grid.prototype.on = function(event, listener) {
        ee.addListener(event, listener);
    };

    return Grid;

});
