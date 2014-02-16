/* globals console */

'use strict';

define(['angular', 'util/templates'], function(angular, templates) {

    var App = function () {};

    App.prototype.init = function() {
        console.log(templates.shot());
    };

    return new App();

});
