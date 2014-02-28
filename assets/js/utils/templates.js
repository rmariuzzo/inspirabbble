'use strict';

define(
    [
        'hbs!../../../views/partials/shot',
        'hbs!../../../views/partials/grid'
    ], function(
        shot,
        grid
    ) {
        return {
            shot: shot,
            grid: grid
        };
    }
);
