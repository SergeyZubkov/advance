(function() {
    'use strict';
    angular
        .module('App')
        .controller('UsersController', UsersController);
    UsersController.$inject = ['dataService', '$filter', 'NgTableParams'];
    /* @ngInject */
    function UsersController(dataService, $filter, NgTableParams) {
        var vm = this;
        vm.users =[];
        vm.showSpinner = true;
        activate();
        ////////////////
        function activate() {
          dataService.getUsers().success(function(users) {
            vm.users = users;
            vm.tableParams = new NgTableParams({}, {dataset: vm.users});
            vm.showSpinner = false;
            console.log(users)
          }).error(function(error) {
            vm.error = error;
          });
        }
    }
})();