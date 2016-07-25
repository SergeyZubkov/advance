(function() {

	'use strict';

	angular
		.module('App')
		.controller('headerController', headerController);


	function headerController($auth, $state, $http, $rootScope) {

		var vm = this
		vm.registration = function() {
			$state.go('registration')
		}
		vm.auth = function() {
			$state.go('auth')
		}
	}

})();