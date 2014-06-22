/**
 * The dribble API model.
 */
'use strict';

define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {

    // Dribbble API endpoints.
    var endpoints = {

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

    /**
     * Create a function handler for a given endpoint.
     */
    function createHandler(endpoint) {

        /**
         * @param mixed id The value of the main parameter.
         * @param number page The page to fetch.
         * @param number perPage The number of items per page to fetch.
         * @param function A callback function.
         */
        return function(id, page, perPage, callback) {

            // Replace the the first placeholder with the give value.
            endpoint = endpoint.replace(/:\w+/, id);

            // Prepare pagination object.
            var pagination = {};
            var iter = 1;
            if (page || perPage) {
                if (perPage > 30) {
                    iter = Math.max(perPage / 30);
                    perPage = 30;
                }
                pagination = {
                    'page': page,
                    'per_page': perPage
                };
            }

            // Execute all async calls needed.
            var promises = [];
            for (var i = 0; i < iter; i++) {
                promises.push($.ajax({
                    type: 'GET',
                    url: '//api.dribbble.com' + endpoint,
                    data: pagination,
                    dataType: 'jsonp'
                }));
                if (pagination.page) {
                    pagination.page++;
                }
            }

            // Parse the results and execute the callback.
            $.when.apply($, promises).then(function() {
                var data;
                if (promises.length === 1) {
                    data = arguments[0].shots;
                } else {
                    // Concat all results in a single array.
                    data = Array.prototype.slice.call(arguments, 0);
                    data = data.reduce(function(prev, curr) {
                        return prev.concat(curr[0].shots);
                    }, []);
                }

                // Sort shots by id.
                data.sort(function(a, b) {
                    return a.id - b.id;
                });

                // Execute given callback.
                if (_.isFunction(callback)) {
                    callback.call(this, data);
                }
            });
        };
    }

    // Create a handler for each endpoint.
    var Dribbble = {};
    for (var method in endpoints) {
        Dribbble[method] = createHandler(endpoints[method]);
    }

    // Create the Dribbble model.
    Dribbble = Backbone.Model.extend(Dribbble);

    return Dribbble;

});