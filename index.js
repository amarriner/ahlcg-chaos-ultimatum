
const cards = require("./json/cards.json");

console.log(cards.length);

var possible = [];
var deck = [];
var gator = {
    name: "Daisy Walker",
    deckSize: 30,
    factions: [
        {
            "name": "Seeker",
            "max": 30,
            "level": 0
        },
        {
            "name": "Mystic",
            "max": 30,
            "level": 0
        },
        {
            "name": "Neutral",
            "max": 30,
            "level": 0
        },
    ]
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

function countFactionInDeck(deck, faction) {

    var total = 0;

    for (i in deck) {
        if (deck[i]["faction_name"] === faction) {
            total++;
        }
    }

    return total;

}

//
// Aggregate allowed factions into an array
//
var allowedFactions = gator.factions.map(function(f) { return f.name; });

for (i in cards) {

    var c = cards[i];

    //
    // Find the index of the current card's faction in this gator's allowed factions
    //
    var factionIndex = allowedFactions.indexOf(c["faction_name"]);

    //
    // Determine whether this card's faction is allowed for this gator or not
    //
    var factionAllowed = factionIndex >= 0;

    //
    // Determine whether this card's level is allowed for this gator or not
    //
    var levelAllowed = factionIndex >= 0 && c["xp"] <= gator.factions[factionIndex].level;

    if (factionAllowed && levelAllowed) {

        possible.push(c);

    }
    
}

while(deck.length < deckSize) {

    //
    // Pull a random card from the possible card pool
    //
    var c = possible[Math.floor(Math.random() * possible.length)];

    //
    // Find the index of the current card's faction in this gator's allowed factions
    //
    var factionIndex = allowedFactions.indexOf(c["faction_name"]);

    //
    // Check to make sure that adding this card wouldn't go over
    // the faction limit
    //
    var allowedFaction = factionIndex >= 0 && countFactionInDeck(deck, c["faction_name"]) < gator.factions[factionIndex].max;

    //
    // Check to make sure there aren't two of these cards already in the deck
    //
    atCardLimit = countCardInDeck(deck, c.name) >= 2;

    if (!allowedFaction || atCardLimit) {
        continue;
    }

    deck.push(c);

}

for (i in deck) {
    console.log(deck[i].name + " :: " + deck[i]["faction_name"]);
}

// {"pack_code":"eotp","pack_name":"Echoes of the Past","type_code":"asset","type_name":"Asset","faction_code":"survivor","faction_name":"Survivor","position":115,"exceptional":false,"code":"03115","name":"Plucky","cost":1,"text":"Fast. Limit 1 <b>Composure</b> in play.\nNon-direct horror must be assigned to Plucky before it can be assigned to your investigator card.\n[free] Spend 1 resource: You get +1 [willpower] for this skill test.\n[free] Spend 1 resource: You get +1 [intellect] for this test.","quantity":2,"skill_willpower":1,"skill_intellect":1,"xp":1,"clues_fixed":false,"health_per_investigator":false,"sanity":1,"deck_limit":2,"traits":"Talent. Composure.","illustrator":"Dani Hartel","is_unique":false,"exile":false,"hidden":false,"permanent":false,"double_sided":false,"url":"https://arkhamdb.com/card/03115","imagesrc":"/bundles/cards/03115.png"},{"pack_code":"eotp","pack_name":"Echoes of the Past","type_code":"skill","type_name":"Skill","faction_code":"neutral","faction_name":"Neutral","position":119,"exceptional":false,"code":"03119","name":"Run For Your Life","text":"Max 1 committed per skill test.\nCommit to a skill test only if you have 3 or fewer remaining sanity.","quantity":2,"skill_agility":4,"xp":0,"clues_fixed":false,"health_per_investigator":false,"deck_limit":2,"traits":"Desperate.","illustrator":"Nicholas Elias","is_unique":false,"exile":false,"hidden":false,"permanent":false,"double_sided":false,"url":"https://arkhamdb.com/card/03119","imagesrc":"/bundles/cards/03119.png"}
