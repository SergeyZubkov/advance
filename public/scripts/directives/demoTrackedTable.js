(function() {
    'use strict';
    angular
        .module('App')
        .directive('demoTrackedTable', demoTrackedTable);
    demoTrackedTable.$inject = [];
    /* @ngInject */
    function demoTrackedTable() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            controller: demoTrackedTableController,
            restrict: 'A',
            priority: -1,
            require: 'ngForm'
        };
        return directive;
    }
    demoTrackedTableController.$inject = ["$scope", "$parse", "$attrs", "$element"];

    function demoTrackedTableController($scope, $parse, $attrs, $element) {
      var self = this;
      var tableForm = $element.controller("form");
      var dirtyCellsByRow = [];
      var invalidCellsByRow = [];

      init();

      ////////

      function init() {
        var setter = $parse($attrs.demoTrackedTable).assign;
        setter($scope, self);
        $scope.$on("$destroy", function() {
          setter(null);
        });

        self.reset = reset;
        self.isCellDirty = isCellDirty;
        self.setCellDirty = setCellDirty;
        self.setCellInvalid = setCellInvalid;
        self.untrack = untrack;
      }

      function getCellsForRow(row, cellsByRow) {
        return _.find(cellsByRow, function(entry) {
          return entry.row === row;
        })
      }

      function isCellDirty(row, cell) {
        var rowCells = getCellsForRow(row, dirtyCellsByRow);
        return rowCells && rowCells.cells.indexOf(cell) !== -1;
      }

      function reset() {
        dirtyCellsByRow = [];
        invalidCellsByRow = [];
        setInvalid(false);
      }

      function setCellDirty(row, cell, isDirty) {
        setCellStatus(row, cell, isDirty, dirtyCellsByRow);
      }

      function setCellInvalid(row, cell, isInvalid) {
        setCellStatus(row, cell, isInvalid, invalidCellsByRow);
        setInvalid(invalidCellsByRow.length > 0);
      }

      function setCellStatus(row, cell, value, cellsByRow) {
        var rowCells = getCellsForRow(row, cellsByRow);
        if (!rowCells && !value) {
          return;
        }

        if (value) {
          if (!rowCells) {
            rowCells = {
              row: row,
              cells: []
            };
            cellsByRow.push(rowCells);
          }
          if (rowCells.cells.indexOf(cell) === -1) {
            rowCells.cells.push(cell);
          }
        } else {
          _.without(rowCells.cells, cell);
          if (rowCells.cells.length === 0) {
            _.without(cellsByRow, rowCells);
          }
        }
      }

      function setInvalid(isInvalid) {
        self.$invalid = isInvalid;
        self.$valid = !isInvalid;
      }

      function untrack(row) {
        _.without(invalidCellsByRow, row);
        _.without(dirtyCellsByRow, row);
        setInvalid(invalidCellsByRow.length > 0);
      }
    }
})();