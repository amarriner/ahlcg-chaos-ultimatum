(function() {
    'use strict';

    var module = angular.module('ahlcgChaosUltimatum.modal', []);

    module.controller('ModalCtrl', ['$scope', 'close', 'title', 'msg', 'packs',
        function($scope, close, title, msg, packs) {

            $scope.title = title;
            $scope.msg = msg;
            $scope.packs = packs;

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
            
            $scope.close = function(result) {
 	            close($scope.packs, 500);
            };
        }
    ]);

}());