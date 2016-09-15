(function() {

  'use strict';

  angular
    .module('App')
    .controller('AdminController', AdminController);

  AdminController.$inject = ['dataService', '$state', '$rootScope'];
  
  function AdminController(dataService, $state, $rootScope) {
    var vm = this;
    vm.updateData = updateData;
    vm.activeTab = 1;

    function updateData(tab) {
      vm.activeTab = tab;
    }
  }

})();