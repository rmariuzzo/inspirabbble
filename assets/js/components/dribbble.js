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
            var iter = 1;
            if (page || perPage) {
                if (perPage > 30) {
                    iter = Math.max(perPage / 30);
                    perPage = 30;
                }
                data = {
                    'page': page,
                    'per_page': perPage
                };
            }

            var promises = [];
            for (var i = 0; i < iter; i++) {
                promises.push($.ajax({
                    type: 'GET',
                    url: '//api.dribbble.com' + endpoint,
                    data: data,
                    dataType: 'jsonp'
                }));
                if (data.page) {
                    data.page++;
                }
            }

            $.when.apply($, promises).then(function() {
                var data;
                if (promises.length === 1) {
                    data = arguments[0].shots;
                } else {
                    data = Array.prototype.slice.call(arguments, 0);
                    data = data.reduce(function(prev, curr) {
                        return prev.concat(curr[0].shots);
                    }, []);
                }
                data.sort(function(a, b) {
                    return a.id - b.id;
                });
                callback.call(this, data);
            });
        };
    };

    for (var method in methods) {
        DribbbleService.prototype[method] = createHandler(methods[method]);
    }

    return new DribbbleService();

});
