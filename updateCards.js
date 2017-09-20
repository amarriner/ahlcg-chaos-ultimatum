
const fs = require("fs");
const request = require("sync-request");

const jsonDir = "./src/json/";
const packsUrl = "https://arkhamdb.com/api/public/packs/";

var packs = JSON.parse(request("GET", packsUrl).getBody());
fs.writeFileSync(jsonDir + "packs.json", JSON.stringify(packs));

var all = [];
var gators = [];
for (var i in packs) {

    console.log("Downloading " + packs[i].name);
    var cardsUrl = "https://arkhamdb.com/api/public/cards/" + packs[i].code + ".json";
    var cards = JSON.parse(request("GET", cardsUrl).getBody());
    fs.writeFileSync(jsonDir + "/packs/" + packs[i].code + ".json", JSON.stringify(cards));

    all = all.concat(cards);

    for (j in cards) {
        if (cards[j]["type_name"] === "Investigator") {
            console.log("Pushing " + cards[j].name);
            gators.push(cards[j]);
        }
    }

}

fs.writeFileSync(jsonDir + "gators.json", JSON.stringify(gators));
fs.writeFileSync(jsonDir + "cards.json", JSON.stringify(all));
console.log(all.length + " total cards");
