
const cards = require("./json/cards.json");
const packs = require("./json/packs.json");

console.log(cards.length);

for (c in cards) {
    // console.log(cards[c].name);
}

console.log(packs.length);

var total = 0;
for (i in packs) {
    //console.log("Adding " + packs[i].name + " (" + packs[i].total + ")");
    console.log("https://arkhamdb.com/api/public/cards/" + packs[i].code + ".json");
    total += packs[i].total;
}

console.log(total);


