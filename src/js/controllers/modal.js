(function() {
    'use strict';

    var module = angular.module('ahlcgChaosUltimatum.modal', []);

    module.controller('ModalCtrl', ['$scope', 'close', 'title', 'msg', 
        function($scope, close, title, msg) {
            $scope.title = title;
            $scope.msg = msg;
            $scope.close = function(result) {
 	            close(result, 500);
            };
        }
    ]);

}());