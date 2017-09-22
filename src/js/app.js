(function() {
    'use strict';

    var module = angular.module('ahlcgChaosUltimatum', [
        'angularModalService',
        'base64',
        'download',
        'ngRoute',
        'ngSanitize',
        'ahlcgChaosUltimatum.deckFactory',
        'ahlcgChaosUltimatum.resourceFactory',
        'ahlcgChaosUltimatum.index',
        'ahlcgChaosUltimatum.modal',
        'ui.bootstrap'
    ])
    .config(['$routeProvider',
        function($routeProvider) {
            
            $routeProvider.when('/:deckstring?', {
                controller: 'IndexCtrl',
                templateUrl: 'js/views/index.html'
            })
            //.otherwise({
            //    redirectTo: '/'
            //});
            ;

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
    })
    .directive('sortControl', [
        function() {
            return {
                templateUrl: 'js/views/sort.html',
                restrict: 'E',
                scope: {
                    cls: '@',
                    column: '@',
                    name: '@',
                    sort: '=',
                    order: '=',
                    toggle: '&'
                }
            };
        }
    ]);

}());
