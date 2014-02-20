'use strict';

define(['jquery'], function($) {

    var methods = {

        // shots
        getShot: '/shots/:id',
        getRebounds: '/shots/:id/rebounds',
        getShotsByList: '/shots/:list',
        getShots: '/players/:id/shots',
        getShotsFollowing: '/players/:id/shots/following',
        getShotsLiked: '/players/:id/shots/likes',

        // players
        getPlayer: '/players/:id',
        getFollowers: '/players/:id/followers',
        getFollowing: '/players/:id/following',
        getDraftees: '/players/:id/draftees',

        // comments
        getComments: '/shots/:id/comments'
    };

    var DribbbleService = function() {};

    var createHandler = function(endpoint) {
        return function(id, page, perPage, callback) {

            endpoint = endpoint.replace(/:\w+/, id);

            var data = {};
            if (page || perPage) {
                data = {
                    'page': page,
                    'per_page': perPage
                };
            }

            $.ajax({
                type: 'GET',
                url: '//api.dribbble.com' + endpoint,
                data: data,
                dataType: 'jsonp'
            }).always(callback);

        };
    };

    for (var method in methods) {
        DribbbleService.prototype[method] = createHandler(methods[method]);
    }

    return new DribbbleService();

});
