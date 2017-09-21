angular.module("templates-templates", ["js/views/index.html"]);

angular.module("js/views/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("js/views/index.html",
    "<div ng-show=\"!gators\" class=\"text-muted\"><i class=\"fa fa-cog fa-spin\"></i> Loading investigators...</div>\n" +
    "<div ng-show=\"!cards\" class=\"text-muted\"><i class=\"fa fa-cog fa-spin\"></i> Loading Cards...</div>\n" +
    "<div ng-show=\"!packs\" class=\"text-muted\"><i class=\"fa fa-cog fa-spin\"></i> Loading Packs...</div>\n" +
    "\n" +
    "<div ng-show=\"cards && gators && packs\">\n" +
    "\n" +
    "    <div>\n" +
    "        <div id=\"blurb\" class=\"well\">\n" +
    "            This tool allows users to randomly generate legal decks for the \n" +
    "            <a href=\"https://www.fantasyflightgames.com/en/news/2017/9/18/invoke-thy-name/\">Ultimatum of Chaos</a> \n" +
    "            method of playing the <a href=\"https://www.fantasyflightgames.com/en/products/arkham-horror-the-card-game/\">Arhkam Horror Living Card Game</a>. \n" +
    "            Select an investigator from the drop-down below and then click the \"Make Deck\" button, or just click the \"Random Investigator\" button. \n" +
    "            Card data and images from <a href=\"https://arkhamdb.com\">https://arkhamdb.com</a>.\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"form-group row\">\n" +
    "        <div class=\"col-sm-3\">\n" +
    "            <select class=\"form-control\" ng-model=\"selectedGator\">\n" +
    "                <option ng-repeat=\"g in gators | orderBy: 'name'\" value=\"{{g.code}}\">{{g.name}}</option>\n" +
    "            </select>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-sm-4 form-inline\">\n" +
    "            <button class=\"btn btn-primary\" ng-click=\"makeDeck()\"><i class=\"fa fa-cog\"></i> Make Deck</button>\n" +
    "            <button class=\"btn btn-primary\" ng-click=\"randomGator()\"><i class=\"fa fa-random\"></i> Random Investigator</button>\n" +
    "            <button class=\"btn btn-primary\" ng-click=\"toggleShowPacks()\">\n" +
    "                <i class=\"fa fa-check-square-o\"></i>\n" +
    "                <span ng-show=\"!showPacks\">Show</span><span ng-show=\"showPacks\">Hide</span> \n" +
    "                Packs\n" +
    "            </button>\n" +
    "            <div class=\"checkbox\">\n" +
    "                <label>\n" +
    "                    <input type=\"checkbox\" ng-model=\"includeUnreleased\"> Include Unreleased\n" +
    "                </label>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\" ng-show=\"showPacks\">\n" +
    "        <div class=\"col-sm-5\"></div>\n" +
    "        <div class=\"col-sm-3 well\">\n" +
    "            <div class=\"form-inline\">\n" +
    "                <button class=\"btn btn-sm btn-primary\" ng-click=\"uncheckAllPacks()\">Uncheck All</button>\n" +
    "                <button class=\"btn btn-sm btn-primary\" ng-click=\"checkAllPacks()\">Check All</button>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"checkbox\" ng-repeat=\"p in packs\">\n" +
    "                <label>\n" +
    "                    <input type=\"checkbox\" ng-model=\"p.checked\"> {{p.name}}\n" +
    "                </label>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\" ng-show=\"gator\">\n" +
    "        <div class=\"col-md-4\">\n" +
    "            <div class=\"panel panel-primary\">\n" +
    "                <div class=\"panel-heading\"><a ng-href=\"{{gator.url}}\"><i class=\"fa fa-external-link\"></i> {{gator.name}}</a></div>\n" +
    "                <div class=\"panel-body text-center\">\n" +
    "\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-sm-6\">\n" +
    "                            <div class=\"row\">\n" +
    "                                <div class=\"col-sm-1\"></div>\n" +
    "                                <div class=\"header col-sm-1\">W</div>\n" +
    "                                <div class=\"header col-sm-1\">I</div>\n" +
    "                                <div class=\"header col-sm-1\">C</div>\n" +
    "                                <div class=\"header col-sm-1\">A</div>\n" +
    "                                <div class=\"header col-sm-1\">H</div>\n" +
    "                                <div class=\"header col-sm-1\">S</div>\n" +
    "                                \n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"row\">\n" +
    "                                <div class=\"col-sm-1\"></div>\n" +
    "                                <div class=\"col-sm-1\">{{gator.skill_willpower}}</div>\n" +
    "                                <div class=\"col-sm-1\">{{gator.skill_intellect}}</div>\n" +
    "                                <div class=\"col-sm-1\">{{gator.skill_combat}}</div>\n" +
    "                                <div class=\"col-sm-1\">{{gator.skill_agility}}</div>\n" +
    "                                <div class=\"col-sm-1\">{{gator.health}}</div>\n" +
    "                                <div class=\"col-sm-1\">{{gator.sanity}}</div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"col-sm-6\">\n" +
    "                            <p ng-bind-html=\"gator.text\"></p>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "                <div class=\"panel-footer\" ng-bind-html=\"gator.back_text\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-show=\"deck\">\n" +
    "\n" +
    "        <div class=\"row header\">\n" +
    "            <div class=\"col-sm-2\">Name</div>\n" +
    "            <div class=\"col-sm-1\">Count</div>\n" +
    "            <div class=\"col-sm-1\">Type</div>\n" +
    "            <div class=\"col-sm-1\">Faction</div>\n" +
    "            <div class=\"col-sm-3\">Traits</div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row\" ng-class-even=\"'rowHighlight'\" hover-class=\"hoverHighlight\" ng-repeat=\"card in deck\">\n" +
    "            <div class=\"col-sm-2\"><a ng-href=\"{{card.card.url}}\">{{card.card.name}}</a></div>\n" +
    "            <div class=\"col-sm-1\">{{card.count}}</div>\n" +
    "            <div class=\"col-sm-1\">{{card.card.type_name}}</div>\n" +
    "            <div class=\"col-sm-1\">{{card.card.faction_name}}</div>\n" +
    "            <div class=\"col-sm-3\">{{card.card.traits}}</div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);
