/**
 * The main entry point when everything comes to life ;)
 */

'use strict';

// Load requirejs configuration.
require(['config'], function() {

    // Load Inspirabbble app and jQuery.
    require(['inspirabbble', 'jquery'], function(Inspirabbble, $) {

        // Start Inspirabbble when DOM is ready.
        $(document).ready(function() {
            (new Inspirabbble()).start();
        });

    });
});