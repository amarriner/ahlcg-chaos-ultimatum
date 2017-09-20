(function() {
    'use strict';

    var module = angular.module('ahlcgChaosUltimatum.resourceFactory', []).factory('Resource', ['$http', '$q',

        function ($http, $q) {

            return {

                getCards: function() {

                    return $http.get('json/cards.json').then(
                        function(success) {
                            return success;
                        },
                        function(error) {
                            return $q.reject(error);
                        }
                    );

                },

                getGators: function() {

                    return $http.get('json/gators.json')
                        .then(function(success) {
                            return success;
                        },
                        function(error) {
                            return $q.reject(error);
                        });

                }

            };
            
        }

    ]);

}());
