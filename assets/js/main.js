'use strict';

// Load requirejs configuration.
require(['config'], function() {

    require(['inspirabbble', 'jquery'], function(Inspirabbble, $) {

        // Start Inspirabbble when DOM is ready.
        $(document).ready(function() {
            (new Inspirabbble()).start();
        });

    });
});