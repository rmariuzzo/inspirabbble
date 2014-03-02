'use strict';

define(
    [
        'hbs!../../../views/partials/shot',
        'hbs!../../../views/partials/grid',
        'hbs!../../../views/partials/header'
    ], function(
        shot,
        grid,
        header
    ) {
        return {
            shot: shot,
            grid: grid,
            header: header
        };
    }
);
