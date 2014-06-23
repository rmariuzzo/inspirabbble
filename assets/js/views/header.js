'use strict';

define([
    'jquery',
    'hbs!templates/header'
], function($, template) {

    // Class definition //

    var Header = function(target) {
        this.$target = $(target);
        this.$target.html(template());
    };

    // Methods //

    return Header;

});