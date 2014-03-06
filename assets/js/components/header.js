'use strict';

define(['jquery', 'utils/templates'], function($, templates) {

    // Class definition //

    var Header = function(target) {
        this.$target = $(target);
        this.$target.html(templates.header());
    };

    // Methods //


    return Header;

});
