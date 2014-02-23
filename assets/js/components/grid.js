'use strict';

define(['jquery', 'components/options', 'imagesloaded'], function($, options) {

    var Grid = function(target) {
        this.target(target);
        this.$areColumnsRendered = false;
    };

    /**
     * Set the target where the grid will be rendered.
     */
    Grid.prototype.target = function(selector) {
        this.$target = $(selector);
    };

    /**
     * Add an element to the grid.
     */
    Grid.prototype.add = function(html) {
        if (!this.$areColumnsRendered) {
            this._renderColumns();
        }
        $(html).imagesLoaded(function() {
            var cols = this.$target.find('.col');
            var col = cols.first();
            cols.each(function() {
                var $this = $(this);
                col = col.height() < $this.height() ? col : $this;
            });
            col.prepend(html);
        }.bind(this));
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
