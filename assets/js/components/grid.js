'use strict';

define(['jquery', 'components/options', 'eventEmitter/EventEmitter', 'imagesloaded'], function($, options, EventEmitter) {

    var ee = new EventEmitter();
    var events = {
        complete: 'complete'
    };

    // Class definition //

    var Grid = function(target) {
        this.target(target);
        this.$areColumnsRendered = false;
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
     */
    Grid.prototype.add = function(html) {
        if (!this.$areColumnsRendered) {
            this._renderColumns();
        }
        this.$queue++;
        $(html).imagesLoaded(function() {
            var cols = this.$target.find('.col');
            var col = cols.first();
            cols.each(function() {
                var $this = $(this);
                col = col.height() < $this.height() ? col : $this;
            });
            col.prepend(html);
            this.$queue--;
            if (!this.$queue) {
                ee.emitEvent(events.complete);
            }
        }.bind(this));
    };

    // Events //

    Grid.prototype.on = function(event, listener) {
        ee.addListener(event, listener);
    };

    /**
     * Render columns into grid.
     */
    Grid.prototype._renderColumns = function() {
        var cols = $();
        for (var i = 0; i < +options.get('gridColumns'); i++) {
            var col = $('<div class="col"></div>');
            col.css('width', (100 / options.get('gridColumns')) + '%');
            cols = cols.add(col);
        }
        this.$target.html(cols);
        this.$areColumnsRendered = true;
    };

    return Grid;

});
