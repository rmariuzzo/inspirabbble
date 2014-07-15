'use strict';

define([
    'jquery'
], function($) {

    $.fn.reflow = function() {
        return this.each(function() {
            /* jshint -W030 */
            $(this).offset().left;
            /* jshint +W030 */
        });
    };

});