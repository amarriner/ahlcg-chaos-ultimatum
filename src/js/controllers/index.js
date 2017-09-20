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

            $scope.includeUnreleased = false;
            $scope.selectedGator = null;
            $scope.cards = null;
            $scope.gators = null;
            $scope.showPacks = false;

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

            Resource.getPacks().then(
                function(success) {

                    $scope.packs = success.data;
                    for (var i in $scope.packs) {
                        $scope.packs[i].checked = true;
                    }

                    $scope.packs.sort(function(a, b) {
                        var apos = (a.cycle_position * 100) + a.position;
                        var bpos = (b.cycle_position * 100) + b.position;
                                
                        if (apos < bpos) {
                            return -1;
                        }
                        if (apos > bpos) {
                            return 1;
                        }

                        return 0;
                    });

                },
                function(error) {

                    // TODO: Make this nicer...
                    alert("ERROR LOADING PACKS!");

                }
            );

            $scope.makeDeck = function() {
                if ($scope.selectedGator) {
                    $scope.gator = Deck.getGatorById($scope.selectedGator, $scope.gators);
                    $scope.deck = Deck.makeDeck($scope.gator, $scope.cards, $scope.packs, $scope.includeUnreleased);
                    $scope.showPacks = false;
                }
            };

            $scope.randomGator = function() {

                var randomGator = Deck.getRandomGator($scope.gators);
                $scope.selectedGator = randomGator.code;
                $scope.makeDeck();

            };

            $scope.toggleShowPacks = function() {
                $scope.showPacks = !$scope.showPacks;
            };

            $scope.checkAllPacks = function() {
                for (var i in $scope.packs) {
                    $scope.packs[i].checked = true;
                }
            };

            $scope.uncheckAllPacks = function() {
                for (var i in $scope.packs) {
                    $scope.packs[i].checked = false;
                }
            };

        }

    ]);

}());
