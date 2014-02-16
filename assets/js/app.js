/* globals console */

'use strict';

define(['angular', 'utils/templates', 'components/dribbble'], function(angular, templates, dribbble) {

    var App = function () {};

    App.prototype.init = function() {
        console.log(templates.shot());
        window.dribbble = dribbble;
    };

    return new App();

});
