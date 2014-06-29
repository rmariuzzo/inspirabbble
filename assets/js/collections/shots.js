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
         * @param options object The fetch options.
         */
        fetchRebounds: function(id, options) {
            this.id = id;
            this.endpoint = '/shots/:id/rebounds';
            this.fetch(options);
        },

        /**
         * Fetch shots in a list.
         *
         * @param list strign The name of the list.
         * @param options object The fetch options.
         */
        fetchShotsByList: function(list, options) {
            this.id = list;
            this.endpoint = '/shots/:list';
            this.fetch(options);
        },

        /**
         * Fetch shots from a player.
         *
         * @param id number The id of the player.
         * @param options object The fetch options.
         */
        fetchShots: function(id, options) {
            this.id = id;
            this.endpoint = '/players/:id/shots';
            this.fetch(options);
        },

        /**
         * Fetch shots followed by a player
         *
         * @param id number The id of the player.
         * @param options object The fetch options.
         */
        fetchShotsFollowing: function(id, options) {
            this.id = id;
            this.endpoint = '/players/:id/shots/following';
            this.fetch(options);
        },

        /**
         * Fetch shots liked by a player.
         *
         * @param id number The id of the player.
         * @param options object The fetch options.
         */
        fetchShotsLiked: function(id, options) {
            this.id = id;
            this.endpoint = '/players/:id/shots/likes';
            this.fetch(options);
        }

    });

    return Shots;

});