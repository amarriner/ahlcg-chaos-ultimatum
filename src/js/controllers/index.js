(function() {
    'use strict';

    var module = angular.module('ahlcgChaosUltimatum.index', ['ngRoute']);

    module.config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: 'js/views/index.html',
            controller: 'IndexCtrl'
        });

    }])
    .controller('IndexCtrl', ['$scope', 'Resource', 'Deck', 

        function($scope, Resource, Deck) {

            $scope.selectedGator = null;
            $scope.cards = null;
            $scope.gators = null;

            Resource.getGators().then(
                function(success) {

                    $scope.gators = success.data;

                },
                function(error) {

                    // TODO: Make this nicer...
                    alert("ERROR LOADING GATORS!");

                }
            );

            Resource.getCards().then(
                function(success) {

                    $scope.cards = success.data;

                },
                function(error) {

                    // TODO: Make this nicer...
                    alert("ERROR LOADING CARDS!");

                }
            );

            $scope.makeDeck = function() {
                if ($scope.selectedGator) {
                    $scope.gator = Deck.getGatorById($scope.selectedGator, $scope.gators);
                    $scope.deck = Deck.makeDeck($scope.gator, $scope.cards);
                }
            };

            $scope.randomGator = function() {

                var randomGator = Deck.getRandomGator($scope.gators);
                $scope.selectedGator = randomGator.code;
                $scope.makeDeck();

            };

        }

    ]);

}());
