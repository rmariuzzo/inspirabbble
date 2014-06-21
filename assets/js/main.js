'use strict';

// Load requirejs configuration.
require(['config'], function() {

    // Load app when things are ready.
    require(['app', 'jquery'], function(App, $) {

        $(document).ready(function() {
            var app = new App();
            app.init();
        });

    });
});