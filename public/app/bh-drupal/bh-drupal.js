(function () {
    'use strict';
    var app = angular.module('bhDrupal', []);
    app.run(['drupal', function (drupal) {
        window.bhDrupal_rest_pre_process = function(xhr, data) {
            xhr.withCredentials = true;
        }
        drupal.modules['bhDrupal'] = true;
    }]);

    app.directive('drupalNode', drupalNode);
    drupalNode.$inject = ['drupal', '$timeout'];
    function drupalNode(drupal, $timeout){
        var drupalNode = {
            restrict: 'E',
            controller: ['$timeout', ctrl],
            controllerAs: 'bhNode',
            scope: false,
            transclude: true,
            template: '<div class="hover-border"><ng-transclude></ng-transclude><button ng-click="bhNode.saveNode()">Save</button></div>',
            link: link,
            bindToController: {
                nid: '<'
            }
        };
        function ctrl($timeout) {
            var bhNode = this;
            bhNode.myNode;

            drupal.nodeLoad(bhNode.nid).then(function (node) {
                bhNode.node = node;
            });

            //node.set('field_name', 0, { value: 'kick ass breed' });

            bhNode.saveNode = function () {
                bhNode.node.save()
                    .then(function (res) { console.log(res) })
                    .catch(function (err) { console.log (err) });
            }
        }
        function link(scope, elem, attrs, bhNode) {
            elem.on('click', function (event) {
                $timeout(function () {
                    bhNode.editing = true;
                });
            });
        }
        return drupalNode;
    }

    app.directive('drupalField', drupalField);
    drupalField.$inject = [];
    function drupalField() {
        var drupalField = {
            restrict: 'E',
            controller: [ctrl],
            controllerAs: 'bhField',
            transclude: true,
            scope: {},
            //template: '<span ng-if="!bhField.editing">{{ bhField.value }}</span><input ng-model="bhField.value" ng-if="bhField.editing" />',
            template: '<ng-transclude ng-if="!bhField.editing"></ng-transclude><input ng-model="bhField.value" ng-if="bhField.editing" />',
            bindToController: {
                value: '=',
                editing: '='
            }
        };
        function ctrl() {
            var vm = this;
        }
        return drupalField;
    }
})();
