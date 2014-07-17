/**
 * The dummy shots collection.
 */

'use strict';

define([
    'underscore',
    'backbone',
    'collections/shots'
], function(_, Backbone, Shots) {

    /**
     * The shots collection.
     */
    var Dummy = Shots.extend({

        /**
         * Fetch shots from Dribbble API.
         *
         * @params options object The fetch options.
         */
        fetch: function(options) {
            var lipsum = 'Praesent rutrum urna a sem feugiat rutrum. Mauris pulvinar tortor tortor, ut laoreet tortor cursus quis.'.split(' ');
            /* jshint -W106 */
            for (var i = 0; i < options.data.per_page; i++) {
                /* jshint +W106 */
                var url = 'http://placehold.it/400x300/' + Math.random().toString(16).substring(2, 8);
                this.add({
                    id: _.uniqueId(),
                    title: _.shuffle(['Awesome', 'Magic', 'In', 'Dummy', 'Supreme']).join(' '),
                    description: _.sample(lipsum, _.random(lipsum.length)).join(' '),
                    width: 400,
                    height: 300,
                    url: url,
                    imageUrl: url,
                    imageTeaserUrl: url,
                    image400Url: url
                });
            }

            // Make a shot to have wrong url
            var shot = this.at(_.random(this.length - 1));
            var badUrl = 'http://placehold.it/400x300/intentional-error';
            shot.set({
                url: badUrl,
                imageUrl: badUrl,
                imageTeaserUrl: badUrl,
                image400Url: badUrl
            });

            options.success.call(this, this);
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

    return Dummy;

});