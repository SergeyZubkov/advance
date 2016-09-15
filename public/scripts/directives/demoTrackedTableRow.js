(function() {
    'use strict';
    angular
        .module('App')
        .directive('demoTrackedTableRow', demoTrackedTableRow);
    demoTrackedTableRow.$inject = [];
    /* @ngInject */
    function demoTrackedTableRow() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            restrict: "A",
            priority: -1,
            require: ["^demoTrackedTable", "ngForm"],
            controller: demoTrackedTableRowController
        };
        return directive;
    }
    
    demoTrackedTableRowController.$inject = ["$attrs", "$element", "$parse", "$scope"];

    function demoTrackedTableRowController($attrs, $element, $parse, $scope) {
      var self = this;
      var row = $parse($attrs.demoTrackedTableRow)($scope);
      var rowFormCtrl = $element.controller("form");
      var trackedTableCtrl = $element.controller("demoTrackedTable");

      self.isCellDirty = isCellDirty;
      self.setCellDirty = setCellDirty;
      self.setCellInvalid = setCellInvalid;

      function isCellDirty(cell) {
        return trackedTableCtrl.isCellDirty(row, cell);
      }

      function setCellDirty(cell, isDirty) {
        trackedTableCtrl.setCellDirty(row, cell, isDirty)
      }

      function setCellInvalid(cell, isInvalid) {
        trackedTableCtrl.setCellInvalid(row, cell, isInvalid)
      }
    }
})();