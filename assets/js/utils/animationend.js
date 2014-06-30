/**
 * The animationend object.
 */

'use strict';

define([], function() {

    function animationEnd() {
        var t;
        var el = document.createElement('fakeelement');
        var animations = {
            'animation': 'animationend',
            '-o-animation': 'oAnimationEnd',
            '-moz-animation': 'animationend',
            '-webkit-animation': 'webkitAnimationEnd'
        };

        for (t in animations) {
            if (el.style[t] !== undefined) {
                return animations[t];
            }
        }
    }


    return animationEnd();

});