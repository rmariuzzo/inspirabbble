/**
 * The shots collection.
 */

'use strict';

define([
    'underscore',
    'backbone',
    'models/shot'
], function(_, Backbone, Shot) {

    /**
     * The shots collection.
     */
    var Shots = Backbone.Collection.extend({

        /**
         * The model class this collection contains.
         */
        model: Shot,

        /**
         * The parameter identifier to use when fetching.
         */
        id: null,

        /**
         * The page to fetch when using pagination.
         */
        page: 1,

        /**
         * The number of shots to fetch when using pagination.
         */
        perPage: 30,

        /**
         * The host name of the Dribbble API to use when fetching.
         */
        host: '//api.dribbble.com',

        /**
         * The endpoint to use when fetching.
         */
        endpoint: null,

        /**
         * Return the URL to fetch shots.
         */
        url: function() {
            return this.host + this.endpoint.replace(/:\w+/, this.id);
        },

        /**
         * Parse the raw fetch response.
         */
        parse: function(response) {
            return response.shots || response;
        },

        /**
         * Fetch shots from Dribbble API.
         *
         * @params options object The fetch options.
         */
        fetch: function(options) {
            // Ensure we have an endpoint and an id.
            if (!this.endpoint || !this.id) {
                throw new Error('Endpoint and/or id are missing.');
            }

            // Force the AJAX call to be of JSONP type.
            options = _.extend(options || {}, {
                dataType: 'jsonp'
            });

            // Call the original fetch method.
            Backbone.Collection.prototype.fetch.call(this, options);
        },

        /**
         * Fetch a single shot.
         *
         * @param id number The id of the shot.
         * @param options object The fetch options.
         */
        fetchShot: function(id, options) {
            this.id = id;
            this.endpoint = '/shots/:id';
            this.fetch(options);
        },

        /**
         * Fetch shot rebounds.
         *
         * @param id number The id of the shot.
         * @param page number The page to fetch.
         * @param size number The number of shots to fetch.
         * @param options object The fetch options.
         */
        fetchRebounds: function(id, page, size, options) {
            this.id = id;
            this.endpoint = '/shots/:id/rebounds';
            this.fetchWithPagination(page, size, options);
        },

        /**
         * Fetch shots in a list.
         *
         * @param list strign The name of the list.
         * @param page number The page to fetch.
         * @param size number The number of shots to fetch.
         * @param options object The fetch options.
         */
        fetchShotsByList: function(list, page, size, options) {
            this.id = list;
            this.endpoint = '/shots/:list';
            this.fetchWithPagination(page, size, options);
        },

        /**
         * Fetch shots from a player.
         *
         * @param id number The id of the player.
         * @param page number The page to fetch.
         * @param size number The number of shots to fetch.
         * @param options object The fetch options.
         */
        fetchShots: function(id, page, size, options) {
            this.id = id;
            this.endpoint = '/players/:id/shots';
            this.fetchWithPagination(page, size, options);
        },

        /**
         * Fetch shots followed by a player
         *
         * @param id number The id of the player.
         * @param page number The page to fetch.
         * @param size number The number of shots to fetch.
         * @param options object The fetch options.
         */
        fetchShotsFollowing: function(id, page, size, options) {
            this.id = id;
            this.endpoint = '/players/:id/shots/following';
            this.fetchWithPagination(page, size, options);
        },

        /**
         * Fetch shots liked by a player.
         *
         * @param id number The id of the player.
         * @param page number The page to fetch.
         * @param size number The number of shots to fetch.
         * @param options object The fetch options.
         */
        fetchShotsLiked: function(id, page, size, options) {
            this.id = id;
            this.endpoint = '/players/:id/shots/likes';
            this.fetchWithPagination(page, size, options);
        },

        /**
         * Fetch shots with pagination data.
         *
         * @param page number The page to fetch.
         * @param size number The number of shots to fetch.
         * @param options object The fetch options.
         */
        fetchWithPagination: function(page, size, options) {
            /* jshint -W106 */
            options = _.extend(options, {
                data: {
                    page: page,
                    per_page: size
                }
            });
            /* jshint +W106 */
            this.fetch(options);
        }

    });

    return Shots;

});