/**
 * The touch utility object.
 */

'use strict';

define([], function() {

    var TouchUtility = {

        isTouchDevice: function() {
            return !!('ontouchstart' in window);
        }

    };

    return TouchUtility;

});