'use strict';

require(['config'], function() {
    require(['app', 'jquery'], function(app, $) {
        $(document).ready(function() {
            app.init();
        });
    });
});
