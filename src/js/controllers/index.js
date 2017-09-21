(function() {
    'use strict';

    var module = angular.module('ahlcgChaosUltimatum.index', ['ngRoute']);

    module.config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: 'js/views/index.html',
            controller: 'IndexCtrl'
        });

    }])
    .controller('IndexCtrl', ['$scope', 'Resource', 'Deck', 'download', 'ModalService',

        function($scope, Resource, Deck, download, ModalService) {

            $scope.includeUnreleased = false;
            $scope.selectedGator = null;
            $scope.cards = null;
            $scope.gators = null;

            Resource.getGators().then(
                function(success) {

                    $scope.gators = success.data;

                },
                function(error) {

                        ModalService.showModal({
                            templateUrl: "js/views/modal.html",
                            controller: "ModalCtrl",
                            inputs: {
                                title: "ERROR",
                                msg: "ERROR LOADING GATORS",
                                packs: []
                            }
                        }).then(
                            function(modal) {
                                modal.element.modal();
                                modal.close.then(
                                    function(result) {
                                
                                    }
                                );
                            }
                        );

                }
            );

            Resource.getCards().then(
                function(success) {

                    $scope.cards = success.data;

                },
                function(error) {

                        ModalService.showModal({
                            templateUrl: "js/views/modal.html",
                            controller: "ModalCtrl",
                            inputs: {
                                title: "ERROR",
                                msg: "ERROR LOADING CARDS",
                                packs: []
                            }
                        }).then(
                            function(modal) {
                                modal.element.modal();
                                modal.close.then(
                                    function(result) {
                                
                                    }
                                );
                            }
                        );


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

                        ModalService.showModal({
                            templateUrl: "js/views/modal.html",
                            controller: "ModalCtrl",
                            inputs: {
                                title: "ERROR",
                                msg: "ERROR LOADING PACKS",
                                packs: []
                            }
                        }).then(
                            function(modal) {
                                modal.element.modal();
                                modal.close.then(
                                    function(result) {
                                
                                    }
                                );
                            }
                        );


                }
            );

            $scope.makeDeck = function() {
                if ($scope.selectedGator) {
                    $scope.setGator();
                    $scope.deck = Deck.makeDeck($scope.gator, $scope.cards, $scope.packs, $scope.includeUnreleased);
                }
            };

            $scope.randomGator = function() {

                //
                // Make sure there's a gator to pick
                //
                var n = 0;
                for (var i in $scope.gators) {
                    if ($scope.validGator($scope.gators[i].code)) {
                        n++;
                    }
                }

                if (n > 0) {
                    
                    var found = false;
                    var randomGator;
                    
                    while (!found) {
                        randomGator = Deck.getRandomGator($scope.gators);
                        found = $scope.validGator(randomGator.code);
                    } 

                    $scope.selectedGator = randomGator.code;
                    $scope.makeDeck();

                }

            };

            $scope.setGator = function() {
                $scope.gator = Deck.getGatorById($scope.selectedGator, $scope.gators);
            };

            $scope.validGator = function(gatorId) {
                var g = Deck.getGatorById(gatorId, $scope.gators);
                for (var i in $scope.packs) {
                    if (g.pack_code === $scope.packs[i].code && !$scope.packs[i].checked) {
                        return false;
                    }
                }

                return true;
            };

            $scope.toggleShowPacks = function() {
                ModalService.showModal({
                    templateUrl: "js/views/modal.html",
                    controller: "ModalCtrl",
                    inputs: {
                        title: "Set Packs",
                        msg: "",
                        packs: $scope.packs
                    }
                }).then(
                    function(modal) {
                        modal.element.modal();
                        modal.close.then(
                            function(result) {
                                $scope.packs = result;
                            }
                        );
                    }
                );
            };

            $scope.downloadOctgn = function() {
                if ($scope.gator) {

                    if (!$scope.gator.octgn_id) {

                        ModalService.showModal({
                            templateUrl: "js/views/modal.html",
                            controller: "ModalCtrl",
                            inputs: {
                                title: "Missing OCTGN ID",
                                msg: "This investigator doesn't have an OCTGN ID in the database yet so a deck cannot be exported",
                                packs: []
                            }
                        }).then(
                            function(modal) {
                                modal.element.modal();
                                modal.close.then(
                                    function(result) {
                                
                                    }
                                );
                            }
                        );
                        
                        return;

                    }

                    var deck = $scope.deck.slice();
                    var foundUndefined = false;
                    for(var r in $scope.gator.deck_requirements.card) {

                        var req = $scope.gator.deck_requirements.card[r];
                        var c = Deck.getCardById($scope.cards, req);

                        if (!c.octgn_id) {
                            foundUndefined = true;
                        }

                        deck.push({card: c, count: 1});

                    }

                    var xml = '<?xml version="1.0" encoding="utf-8" standalone="yes"?>\n';
                    xml += '<deck game="a6d114c7-2e2a-4896-ad8c-0330605c90bf" sleeveid="0">\n';
                    xml += '  <section name="Investigator" shared="False">\n';
                    xml += '    <card qty="1" id="' + $scope.gator.octgn_id.split(":")[0] + '">' + $scope.gator.name + '</card>\n';
                    xml += '    <card qty="1" id="' + $scope.gator.octgn_id.split(":")[1] + '">' + $scope.gator.name + '</card>\n';
                    xml += '</section>\n';

                    var cards = {};
                    for (var i in deck) {

                        var card = deck[i];
                        if (!cards[card.card.type_code]) {
                            cards[card.card.type_code] = "";
                        }

                        if (!card.card.octgn_id) {
                            foundUndefined = true;
                        }

                        cards[card.card.type_code] += '    <card qty="' + card.count + '" id="' + card.card.octgn_id + '">' + card.card.name + '</card>\n';

                    }

                    xml += '  <section name="Asset" shared="False">\n';
                    xml += cards.asset;
                    xml += '  </section>\n';
                    xml += '  <section name="Event" shared="False">\n';
                    xml += cards.event;
                    xml += '  </section>\n';
                    xml += '  <section name="Skill" shared="False">\n';
                    xml += cards.skill;
                    xml += '  </section>\n';
                    xml += '  <section name="Weakness" shared="False">\n';
                    if (cards.treachery) {
                        xml += cards.treachery;
                    }
                    xml += '  </section>\n';
                    xml += '  <section name="Sideboard" shared="False" />\n';
                    xml += '  <section name="Agenda" shared="True" />\n';
                    xml += '  <section name="Act" shared="True" />\n';
                    xml += '  <section name="Encounter" shared="True" />\n';
                    xml += '  <section name="Location" shared="True" />\n';
                    xml += '  <section name="Special" shared="True" />\n';
                    xml += '  <section name="Second Special" shared="True" />\n';
                    xml += '  <section name="Setup" shared="True" />\n';
                    xml += '  <notes><![CDATA[]]></notes>\n';
                    xml += '</deck>\n';

                    if (foundUndefined) {
                        ModalService.showModal({
                            templateUrl: "js/views/modal.html",
                            controller: "ModalCtrl",
                            inputs: {
                                title: "Missing OCTGN ID",
                                msg: "Some cards in this deck don't have OCTGN IDs in the database yet so a deck cannot be exported",
                                packs: []
                            }
                        }).then(
                            function(modal) {
                                modal.element.modal();
                                modal.close.then(
                                    function(result) {
                                
                                    }
                                );
                            }
                        );
                        
                        return;
                    }

                    download.fromData(xml, "application/xml", "deck.o8d");
                }
            };

            $scope.getGatorText = function(text) {

                if (!text) { return; }

                text = text.replace(/\[action\]/g, "<span class=\"icon-action\"></span>");
                text = text.replace(/\[elder_sign\]/g, "<span class=\"icon-eldersign\"></span>");
                text = text.replace(/\[elder_thing\]/g, "<span class=\"icon-elderthing\"></span>");
                text = text.replace(/\[free\]/g, "<span class=\"icon-free\"></span>");
                text = text.replace(/\[lightning\]/g, "<span class=\"icon-lightning\"></span>");
                text = text.replace(/\[reaction\]/g, "<span class=\"icon-reaction\"></span>");
                text = text.replace(/\[skull\]/g, "<span class=\"icon-skull\"></span>");
                text = text.replace(/\[wild\]/g, "<span class=\"icon-wild\"></span>");

                text = text.replace(/\[guardian\]/g, "<img src=\"images/guardian.png\" alt=\"Guardian\">");
                text = text.replace(/\[mystic\]/g, "<img src=\"images/mystic.png\" alt=\"Mystic\">");
                text = text.replace(/\[rogue\]/g, "<img src=\"images/rogue.png\" alt=\"Rogue\">");
                text = text.replace(/\[seeker\]/g, "<img src=\"images/seeker.png\" alt=\"Seeker\">");
                text = text.replace(/\[survivor\]/g, "<img src=\"images/survivor.png\" alt=\"Survivor\">");

                text = text.split("\n").map(function(i) { return "<p>" + i + "</p>"; }).join(" ");

                return text;

            };

        }

    ]);

}());
