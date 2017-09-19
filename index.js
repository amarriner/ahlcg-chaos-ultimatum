
const gators = require("./json/gators.json");
const cards = require("./json/cards.json");

var deck = [];
var gator = gators[0];

//
// TODO: An occult card will currently count towards the "Other Seeker/Survivor" limit,
//       should it?
//
function checkCardForGator(deck, gator, card) {

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
    if (["Asset", "Event", "Skill"].indexOf(card["type_name"]) === -1) {
        return false;
    }

    //
    // Card has to be zero level
    //
    if (card.xp > 0) {
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
    if (card["type_name"] === "Investigator") {
        return false;
    }

    //
    // If we are already at the deck limit for this card,
    // return false (not allowed)
    //
    var numberInDeck = countCardInDeck(deck, card.name);
    if (numberInDeck >= card["deck_limit"]) {
        return false;
    }

    //
    // Iterate over the gator's "deck_options" array to determine
    // if the given card is allowed or not
    //
    for (i in gator["deck_options"]) {

        var option = gator["deck_options"][i];

        var typeCount = 0;

        //
        // If option.faction exists, this card MUST be in that faction
        // for it to be considered an option for this gator
        //
        if (option.faction) {

            //
            // If we can't find this card's faction in this option's faction array,
            // continue to the next option iteration
            //
            if (option.faction.indexOf(card["faction_name"].toLowerCase()) === -1) {
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
            for (j in option.trait) {

                var trait = option.trait[j];
                var regex = new RegExp(trait.toLowerCase());
                if (regex.test(card.traits.toLowerCase())) {
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
            // Count the number of this trait already in the deck
            //
            typeCount = countTraitsInDeck(deck, option.trait);

        }

        //
        // Make sure the card's level is within the gator's range and
        // if it isn't, continue to the next option iteration
        //
        if (card.xp < option.level.min || card.xp > option.level.max) {
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

function getCardById (cards, cardId) {

    for (i in cards) {

        if (cards[i].code === cardId) {
            return cards[i];
        }

    }

    return {};

}

function getCardByName (cards, cardName) {

    for (i in cards) {

        if (cards[i].name === cardName) {
            return cards[i];
        }

    }

    return {};

}

function countCardInDeck(deck, cardName) {

    return deck.map(function (card) { 
        
        if (card.name === cardName) {
            return 1;
        }

        else {
            return 0;
        }

    }).reduce((a, b) => a + b, 0);

}

function countFactionsInDeck(deck, factions) {

    var total = 0;

    for (i in deck) {
        if (factions.indexOf(deck[i]["faction_code"]) >= 0) {
            total++;
        }
    }

    return total;

}

function countTraitsInDeck(deck, traits) {

    var total = 0;

    for (i in deck) {

        for (j in traits) {

            var regex = new RegExp(traits[j].toLowerCase());
            if (regex.test(deck[i].traits.toLowerCase())) {
                total++;
            }

        }
    }

    return total;
}

while(deck.length < gator["deck_requirements"].size) {

    //
    // Pull a random card from the possible card pool
    //
    var c = cards[Math.floor(Math.random() * cards.length)];

    //
    // Check to see if this card is allowed for this gator, and
    // if it is, put it in the deck
    //
    if (checkCardForGator(deck, gator, c)) {
        deck.push(c);
    }

}

console.log("<html>\n");
console.log("<head>\n");
console.log("<title>" + gator.name + " Deck</title>\n");
console.log("</head>\n");
console.log("<body>\n");

var count = 0;
console.log("<div>\n");
for (i in deck) {

    if (count % 5 === 0) {
        console.log("</div>\n<div>\n");
    }

    console.log("<a href=\"" + deck[i].url + "\">");
    if (deck[i].imagesrc) {
        console.log("<img src=\"https://arkhamdb.com" + deck[i].imagesrc + "\">");
    }
    else {
        console.log(deck[i].name);
    }
    console.log("</a>\n");
    count++;

}
console.log("</div>\n");

console.log("</body>\n");
console.log("</html>\n");
