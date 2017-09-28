angular.module("templates-templates", ["js/views/index.html", "js/views/modal.html", "js/views/sort.html"]);

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
    "            Select an investigator from the drop-down below and then click the <i class=\"fa fa-cog\"></i> button, or just click the <i class=\"fa fa-random\"></i> button. \n" +
    "            To change which packs to build a deck from click the <i class=\"fa fa-check-square-o\"></i> button. Click the <i class=\"fa fa-download\"></i> button to export the deck.\n" +
    "            Card data and images from <a href=\"https://arkhamdb.com\">https://arkhamdb.com</a>.\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"form-inline row\">\n" +
    "        <div class=\"col-xs-12\">\n" +
    "            <div class=\"form-group\">\n" +
    "                <select class=\"form-control\" ng-model=\"selectedGator\" ng-change=\"setGator()\">\n" +
    "                    <option ng-repeat=\"g in gators | orderBy: 'name'\" value=\"{{g.code}}\" ng-show=\"validGator(g.code)\">{{g.name}}</option>\n" +
    "                </select>\n" +
    "            </div>\n" +
    "        \n" +
    "            <div class=\"form-group\">\n" +
    "                <button class=\"btn btn-primary\" ng-click=\"makeDeck()\"><i class=\"fa fa-cog\"></i><span class=\"hidden-xs\"> Make Deck</span></button>\n" +
    "                <button class=\"btn btn-primary\" ng-click=\"randomGator()\"><i class=\"fa fa-random\"></i><span class=\"hidden-xs\"> Random Investigator</span></button>\n" +
    "                <button class=\"btn btn-primary\" ng-click=\"toggleShowPacks()\"><i class=\"fa fa-check-square-o\"></i><span class=\"hidden-xs\">Show Packs</span></button>\n" +
    "                <button class=\"btn btn-primary\" ng-click=\"downloadOctgn()\"><i class=\"fa fa-download\"></i><span class=\"hidden-xs\"> Download OCTGN</span></button>\n" +
    "                <div class=\"input-group inline hidden-sm hidden-xs\">\n" +
    "                    <input class=\"form-control\" type=\"text\" id=\"maxXp\" ng-model=\"maxXp\" />\n" +
    "                    <span class=\"input-group-addon\">xp</span>\n" +
    "                </div>\n" +
    "                <input class=\"inline hidden-lg hidden-md visible-sm visible-xs form-control col-xs-2\" type=\"text\" id=\"maxXpSmall\" ng-model=\"maxXp\" />\n" +
    "                <div id=\"include-unreleased\" class=\"checkbox\">\n" +
    "                    <label>\n" +
    "                        <input type=\"checkbox\" ng-model=\"includeUnreleased\"><span class=\"hidden-xs\"> Include</span> Unreleased\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\" id=\"packs\" ng-show=\"showPacks\">\n" +
    "        <div class=\"col-sm-3\"></div>\n" +
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
    "    <div class=\"row\" id=\"gator\" ng-show=\"gator\">\n" +
    "        <div class=\"col-xs-12 col-sm-12 col-md-5\">\n" +
    "            <div class=\"panel panel-primary\">\n" +
    "                <div class=\"panel-heading\"><a ng-href=\"{{gator.url}}\"><i class=\"fa fa-external-link\"></i> {{gator.name}}</a></div>\n" +
    "                <div class=\"panel-body text-center\">\n" +
    "\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-xs-12 col-sm-12 col-md-6\">\n" +
    "                            <div class=\"row\">\n" +
    "                                <div class=\"col-xs-3\"></div>\n" +
    "                                <div class=\"header col-xs-1\"><span class=\"icon-willpower font-normal\"></span></div>\n" +
    "                                <div class=\"header col-xs-1\"><span class=\"icon-intellect font-normal\"></span></div>\n" +
    "                                <div class=\"header col-xs-1\"><span class=\"icon-combat font-normal\"></span></div>\n" +
    "                                <div class=\"header col-xs-1\"><span class=\"icon-agility font-normal\"></span></div>\n" +
    "                                <div class=\"header col-xs-1\">H</div>\n" +
    "                                <div class=\"header col-xs-1\">S</div>\n" +
    "                                \n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"row\">\n" +
    "                                <div class=\"col-xs-3\"></div>\n" +
    "                                <div class=\"col-xs-1\">{{gator.skill_willpower}}</div>\n" +
    "                                <div class=\"col-xs-1\">{{gator.skill_intellect}}</div>\n" +
    "                                <div class=\"col-xs-1\">{{gator.skill_combat}}</div>\n" +
    "                                <div class=\"col-xs-1\">{{gator.skill_agility}}</div>\n" +
    "                                <div class=\"col-xs-1\">{{gator.health}}</div>\n" +
    "                                <div class=\"col-xs-1\">{{gator.sanity}}</div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"col-md-6 hidden-xs hidden-sm text-left\">\n" +
    "                            <p ng-bind-html=\"getGatorText(gator.text)\"></p>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"hidden-md hidden-lg\">\n" +
    "                        <p ng-bind-html=\"getGatorText(gator.text)\"></p>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "                <div class=\"panel-footer\" ng-bind-html=\"getGatorText(gator.back_text)\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-show=\"deck\">\n" +
    "\n" +
    "        <div class=\"row header\">\n" +
    "            <div class=\"hidden-xs col-sm-4 col-md-3\">\n" +
    "                <sort-control   name=\"Name\"\n" +
    "                                sort=\"sort\"\n" +
    "                                order=\"order\"\n" +
    "                                column=\"card.name\"\n" +
    "                                ng-click=\"toggleSort('card.name')\">\n" +
    "                </sort-control>\n" +
    "            </div>\n" +
    "            <div class=\"hidden-xs col-sm-1 text-center\">\n" +
    "                <sort-control   name=\"Count\"\n" +
    "                                sort=\"sort\"\n" +
    "                                order=\"order\"\n" +
    "                                column=\"count\"\n" +
    "                                ng-click=\"toggleSort('count')\">\n" +
    "                </sort-control>\n" +
    "            </div>\n" +
    "            <div class=\"hidden-xs col-sm-1 text-center\">\n" +
    "                <sort-control   name=\"Type\"\n" +
    "                                sort=\"sort\"\n" +
    "                                order=\"order\"\n" +
    "                                column=\"card.type_code\"\n" +
    "                                ng-click=\"toggleSort('card.type_code')\">\n" +
    "                </sort-control>\n" +
    "            </div>\n" +
    "            <div class=\"hidden-xs col-sm-1 col-md-1\">\n" +
    "                <sort-control   name=\"Faction\"\n" +
    "                                sort=\"sort\"\n" +
    "                                order=\"order\"\n" +
    "                                column=\"card.faction_code\"\n" +
    "                                cls=\"text-center\"\n" +
    "                                ng-click=\"toggleSort('card.faction_code')\">\n" +
    "                </sort-control>\n" +
    "            </div>\n" +
    "            <div class=\"hidden-xs col-sm-3\">Traits</div>\n" +
    "            <div class=\"hidden-xs hidden-sm col-md-3\">\n" +
    "                <sort-control   name=\"Pack\"\n" +
    "                                sort=\"sort\"\n" +
    "                                order=\"order\"\n" +
    "                                column=\"card.pack_code\"\n" +
    "                                ng-click=\"toggleSort('card.pack_code')\">\n" +
    "                </sort-control>\n" +
    "            </div> \n" +
    "            <div class=\"col-xs-12 hidden-sm hidden-md hidden-lg\">Deck</div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row\" ng-class-even=\"'rowHighlight'\" hover-class=\"hoverHighlight\" ng-repeat=\"card in deck | orderBy: order + sort\">\n" +
    "            <div class=\"hidden-xs col-sm-4 col-md-3\">\n" +
    "                <a class=\"margin-right\" ng-href=\"{{card.card.url}}\">{{card.card.name}}</a>\n" +
    "                <span class=\"xp\" ng-repeat=\"i in getTimes(card.card.xp)\">\n" +
    "                    <i class=\"fa fa-circle\"></i>\n" +
    "                </span>\n" +
    "            </div>\n" +
    "            <div class=\"hidden-xs col-sm-1 text-center\">{{card.count}}</div>\n" +
    "            <div class=\"hidden-xs col-sm-1 text-center\">{{card.card.type_name}}</div>\n" +
    "            <div class=\"hidden-xs col-sm-1 text-center\"><img ng-show=\"card.card.faction_code != 'neutral'\" ng-src=\"{{card.card.faction_code != 'neutral' ? 'images/' + card.card.faction_code + '.png' : ''}}\" alt=\"{{card.card.faction_name}}\"></div>\n" +
    "            <div class=\"hidden-xs col-sm-3\">{{card.card.traits}}</div>\n" +
    "            <div class=\"hidden-xs hidden-sm col-md-3\">{{card.card.pack_name}}</div>\n" +
    "\n" +
    "            <div class=\"col-xs-7 hidden-sm hidden-md hidden-lg\">\n" +
    "                <a class=\"margin-right\" ng-href=\"{{card.card.url}}\">{{card.card.name}}</a>\n" +
    "                <span class=\"xp\" ng-repeat=\"i in getTimes(card.card.xp)\">\n" +
    "                    <i class=\"fa fa-circle\"></i>\n" +
    "                </span>\n" +
    "                <span class=\"margin-left\">({{card.count}})</span>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-2 hidden-sm hidden-md hidden-lg\">{{card.card.type_name}}</div>\n" +
    "            <div class=\"col-xs-2 hidden-sm hidden-md hidden-lg\"><img ng-show=\"card.card.faction_name != 'Neutral'\" ng-src=\"{{card.card.faction_code != 'neutral' ? 'images/' + card.card.faction_code + '.png' : ''}}\" alt=\"{{card.card.faction_name}}\"></div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("js/views/modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("js/views/modal.html",
    "<div class=\"modal fade\">\n" +
    "  <div class=\"modal-dialog\">\n" +
    "    <div class=\"modal-content\">\n" +
    "      <div class=\"modal-header\">\n" +
    "        <button type=\"button\" class=\"close\" ng-click=\"close(false)\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n" +
    "        <h4 class=\"modal-title\">{{title}}</h4>\n" +
    "      </div>\n" +
    "      <div class=\"modal-body\">\n" +
    "\n" +
    "        <p ng-show=\"msg\">{{msg}}</p>\n" +
    "\n" +
    "        <div class=\"\" id=\"packs\" ng-show=\"packs.length > 0\">\n" +
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
    "\n" +
    "      </div>\n" +
    "      <div class=\"modal-footer\">\n" +
    "        <button type=\"button\" ng-click=\"close(false)\" class=\"btn btn-primary\" data-dismiss=\"modal\">OK</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("js/views/sort.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("js/views/sort.html",
    "<div class=\"point {{cls}}\">\n" +
    "    <i class=\"fa\"\n" +
    "        ng-show=\"sort === column\"\n" +
    "        ng-class=\"{'fa-caret-up': order === '+', 'fa-caret-down': order === '-'}\">\n" +
    "    </i>\n" +
    "    <i class=\"fa fa-sort\" ng-show=\"sort !== column\"></i>\n" +
    "    <strong>{{name}}</strong>\n" +
    "</div>");
}]);
