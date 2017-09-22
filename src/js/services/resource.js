(function() {
    'use strict';

    var module = angular.module('ahlcgChaosUltimatum.resourceFactory', []).factory('Resource', ['$http', '$q',

        function ($http, $q) {

            var cards;
            var packs;
            var gators;

            return {

                getCards: function() {

                    if (cards) {
                        return $q.resolve(cards);
                    }

                    return $http.get('json/cards.json').then(
                        function(success) {
                            cards = success;
                            return success;
                        },
                        function(error) {
                            console.log(error);
                            return $q.reject(error);
                        }
                    );

                },

                getGators: function() {

                    if (gators) {
                        return $q.resolve(gators);
                    }

                    return $http.get('json/gators.json')
                        .then(function(success) {
                            gators = success;
                            return success;
                        },
                        function(error) {
                            return $q.reject(error);
                        });

                },

                getPacks: function() {

                    if (packs) {
                        return $q.resolve(packs);
                    }
                    
                    return $http.get('json/packs.json').then(
                        function(success) {
                            packs = success;
                            return success;
                        },
                        function(error) {
                            return $q.reject(error);
                        }
                    );

                }

            };
            
        }

    ]);

}());
