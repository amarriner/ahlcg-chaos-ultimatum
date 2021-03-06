(function() {
    'use strict';

    var module = angular.module('ahlcgChaosUltimatum.deckFactory', []).factory('Deck', ['$http', '$q',  

        function ($http, $q) {

            var regex;

            var deck = [];

            var factions = [
                "guardian",
                "seeker",
                "rogue",
                "mystic",
                "survivor"
            ];

            //
            // TODO: An occult card will currently count towards the "Other Seeker/Survivor" limit,
            //       should it?
            //
            function checkCardForGator(deck, gator, card, pack, includeUnreleased, xp) {

                //
                // If the pack has been unchecked, don't allow cards from it
                //
                if (!pack.checked) {
                    return false;
                }

                //
                // If we aren't including unreleased cards, make sure this card has been 
                // released already
                //
                if (!includeUnreleased) {
                    var packDate = new Date(pack.available);
                    var today = new Date();
                    
                    if (packDate > today) {
                        return false;
                    }

                }

                //
                // If the card has the spoiler property, it can't be added to a deck (not a
                // player card)
                //
                if (card.spoiler === 1) {
                    return false;
                }

                //
                // Has to be an asset, event or skill
                //
                if (["Asset", "Event", "Skill"].indexOf(card.type_name) === -1) {
                    return false;
                }

                //
                // Need to have the correct amount of XP for this card
                //
                if (card.xp > xp) {
                    return false;
                }

                //
                // If the card has restrictions, check them 
                // TODO: (currently only looks to see if there's an investigator restriction)
                //
                if (card.restrictions && card.restrictions.investigator) {
                    return false;
                }

                //
                // Can't pick investigators
                //
                if (card.type_name === "Investigator") {
                    return false;
                }

                //
                // If we are already at the deck limit for this card,
                // return false (not allowed)
                //
                var numberInDeck = countCardInDeck(deck, card.name);
                if (numberInDeck >= card.deck_limit) {
                    return false;
                }

                //
                // Iterate over the gator's "deck_options" array to determine
                // if the given card is allowed or not
                //
                for (var i in gator.deck_options) {

                    var option = gator.deck_options[i];

                    var typeCount = 0;

                    //
                    // If the only requirement is level, check for non-faction
                    // totals before adding card
                    //
                    if (!option.faction && !option.trait && !option.uses) {
                        if (card.faction_code != gator.faction_code &&
                            card.faction_code != "Neutral") {

                            for (var f in factions) {
                                if (factions[f] != gator.faction_code) {
                                    typeCount += countFactionsInDeck(deck, [factions[f]]);
                                }
                            }

                        }
                    }

                    //
                    // Check number of uses
                    //
                    if (option.uses) {

                        regex = new RegExp("\([0-9][0-9]? charges\)");

                        var foundUses = false;
                        for (var u in option.uses) {

                            if (regex.test(card.text)) {
                                foundUses = true;
                            }
                            
                        }

                        //
                        // If we didn't find the right type of uses,
                        // continue to the next option iteration
                        //
                        if (!foundUses) {
                            continue;
                        }
                    }

                    //
                    // If option.faction exists, this card MUST be in that faction
                    // for it to be considered an option for this gator
                    //
                    if (option.faction) {

                        //
                        // If we can't find this card's faction in this option's faction array,
                        // continue to the next option iteration
                        //
                        if (option.faction.indexOf(card.faction_name.toLowerCase()) === -1) {
                            continue;
                        }

                        //
                        // If we found this card's faction in the option's faction array,
                        // but the option's "not" property is true, continue to the
                        // next option iteration
                        //
                        if (option.not) {
                            continue;
                        }

                        //
                        // Count the number of this faction in this deck already
                        //
                        typeCount = countFactionsInDeck(deck, option.faction);

                    }

                    //
                    // If option.trait exists, this card MUST have that trait 
                    // for it to be considered an option for this gator
                    //
                    if (option.trait) {

                        //
                        // If the card has no traits, continue to the next option iteration
                        //
                        if (!card.traits) {
                            continue;
                        }

                        //
                        // If we can't find one of this card's traits in this option's 
                        // trait array, continue to the next option iteration
                        //
                        var foundTrait = false;

                        //
                        // Loop through option.trait looking for each one in the card's
                        // "traits" property
                        //
                        for (var j in option.trait) {

                            var trait = option.trait[j];
                            regex = new RegExp(trait.toLowerCase());
                            if (card.traits && regex.test(card.traits.toLowerCase())) {
                                foundTrait = true;
                            }

                        }

                        //
                        // If we didn't find a matching trait, continue to the next
                        // option iteration
                        //
                        if (!foundTrait) {
                            continue;
                        }

                        //
                        // If we found the trait, but this option's "not" value is true
                        // continue to the next option iteration
                        //
                        if (option.not) {
                            continue;
                        }

                        //
                        // Count the number of this trait already in the deck
                        //
                        typeCount = countTraitsInDeck(deck, option.trait);

                    }

                    //
                    // Make sure the card's level is within the gator's range and
                    // if it isn't, continue to the next option iteration
                    //
                    if (option.level && (card.xp < option.level.min || card.xp > option.level.max)) {
                        continue;
                    }

                    //
                    // Figure out the limit for this type of card
                    //
                    var limit = 999;
                    if (option.limit) {
                        limit = option.limit;
                    }

                    //
                    // If there we are already at the limit for this type of card 
                    // (by faction or trait), continue to the next option iteration
                    //
                    if (typeCount >= limit) {
                        continue;
                    }

                    //
                    // If we've gotten this far the card has passed all of a given
                    // option's rules so it's a card that is allowed for this gator
                    //
                    return true;

                }

                return false;

            }

            var getCardById = function (cardId, cards) {

                for (var i in cards) {

                    if (cards[i].code === cardId) {
                        return cards[i];
                    }

                }

                return {};

            };

            function getCardByName (cards, cardName) {

                for (var i in cards) {

                    if (cards[i].name === cardName) {
                        return cards[i];
                    }

                }

                return {};

            }

            function getPackById (packs, packId) {

                for (var i in packs) {

                    if (packs[i].code === packId) {
                        return packs[i];
                    }

                }

                return {};

            }

            function countCardInDeck(deck, cardName) {

                var countDeck = deck.map(function (card) { 
        
                    if (card.name === cardName) {
                        return 1;
                    }

                    else {
                        return 0;
                    }

                });
                
                var total = 0;
                for (var i in countDeck) {
                    total += countDeck[i];
                }

                return total;

            }

            function countFactionsInDeck(deck, factions) {

                var total = 0;

                for (var i in deck) {
                    if (factions.indexOf(deck[i].faction_code) >= 0) {
                        total++;
                    }
                }

                return total;

            }

            function countTraitsInDeck(deck, traits) {

                var total = 0;

                for (var i in deck) {

                    for (var j in traits) {

                        var regex = new RegExp(traits[j].toLowerCase());
                        if (deck[i].traits && regex.test(deck[i].traits.toLowerCase())) {
                            total++;
                        }

                    }
                }

                return total;
            }

            function getRandomFactionCard(factionCode, cards) {

                var factionCards = [];
                
                for (var i in cards) {
                    if (cards[i].faction_code === factionCode) {
                        factionCards.push(cards[i]);
                    }
                }

                return factionCards[Math.floor(Math.random() * factionCards.length)];

            }

            var getRandomGator = function(gators) {
                return gators[Math.floor(Math.random() * gators.length)];
            };

            var getGatorById = function(gatorId, gators) {

                for (var i in gators) {
                    if (gators[i].code === gatorId) {
                        return gators[i];
                    }
                }

                return;

            };

            var sortDeck = function(deck) {
                return deck.sort(
                    function(a, b) {
                        if (a.card.name < b.card.name) {
                            return -1;
                        }

                        if (a.card.name > b.card.name) {
                            return 1;
                        }

                        return 0;
                    }
                );
            };

            var makeDeck = function (gator, cards, packs, includeUnreleased, xp) {

                deck = [];

                //
                // Get three random factions if this is Lola
                //
                var lolaFactions = [];
                if (gator.code === "03006") {

                    lolaFactions = factions.slice();

                    for (var j = 0; j < 2; j++) {
                        lolaFactions.splice(Math.floor(Math.random() * lolaFactions.length), 1);
                    }

                }

                var count = 0;
                var totalXp = 0;
                var unspentXp = xp;
                while(deck.length < gator.deck_requirements.size && count < 3000) {

                    var c;

                    //
                    // If this is Lola, make sure she has her three factions filled
                    // before just selecting any random card
                    //
                    if (lolaFactions.length) {
                        c = getRandomFactionCard(lolaFactions[0], cards);
                    }

                    //
                    // Pull a random card from the possible card pool
                    //
                    else {
                        c = cards[Math.floor(Math.random() * cards.length)];
                    }

                    //
                    // Check to see if this card is allowed for this gator, and
                    // if it is, put it in the deck
                    //
                    if (checkCardForGator(deck, gator, c, getPackById(packs, c.pack_code), includeUnreleased, unspentXp)) {
                        deck.push(c);

                        //
                        // If we added this card to a Lola deck, and there are still
                        // more Lola cards to go, update the counts and remove factions
                        // that are full
                        //
                        if (lolaFactions.length) {
                            if (countFactionsInDeck(deck, [lolaFactions[0]]) >= 7) {
                                lolaFactions.shift();
                            }
                        }

                        unspentXp -= c.xp;
                        totalXp += c.xp;
                    }
                    
                    count++;
                }

                deck.sort(
                    function(a, b) {
                        if (a.name < b.name) {
                            return -1;
                        }

                        if (a.name > b.name) {
                            return 1;
                        }

                        return 0;
                    }
                );

                count = 0;
                var lastCard = {};
                var returnDeck = [];
                for (var i in deck) {

                    if (lastCard.name && lastCard.name !== deck[i].name) {
                        
                        returnDeck.push({
                            card: lastCard,
                            count: count
                        });

                        count = 0;
                    }

                    count++;
                    lastCard = deck[i];

                }

                returnDeck.push({
                    card: lastCard,
                    count: count
                });

                return returnDeck;
            };

            return {

                getCardById: getCardById,
                getGatorById: getGatorById,
                getRandomGator: getRandomGator,
                makeDeck: makeDeck,
                sortDeck: sortDeck

            };

        }

    ]);

}());
