'use strict';

// hbtemplate.js plugin for requirejs / text.js
// it loads and compiles Handlebars templates
define(['handlebars'], function(Handlebars) {

    var loadResource = function(resourceName, parentRequire, callback) {
        parentRequire([('text!' + resourceName)],
            function(templateContent) {
                var template = Handlebars.default.compile(templateContent);
                callback(template);
            }
        );
    };

    return {
        load: loadResource
    };

});
