(function() {
    'use strict';

    var module = angular.module('ahlcgChaosUltimatum', [
        'ngRoute',
        'ahlcgChaosUltimatum.deckFactory',
        'ahlcgChaosUltimatum.resourceFactory',
        'ahlcgChaosUltimatum.index',
        'ui.bootstrap',
    ])
    .config(['$routeProvider',
        function($routeProvider) {
            
            $routeProvider.when('/', {
                controller: 'IndexCtrl',
                templateUrl: 'js/views/index.html'
            }).otherwise({
                redirectTo: '/'
            });

    }])
    .directive('hoverClass', function () {
        return {
            restrict: 'A',
            scope: {
                hoverClass: '@'
            },
            link: function (scope, element) {
                element.on('mouseenter', function() {
                    element.addClass(scope.hoverClass);
                });
                element.on('mouseleave', function() {
                    element.removeClass(scope.hoverClass);
                });
            }
        };
    });

}());
