(function() {

	'use strict';

	angular
		.module('App')
		.controller('HeaderController', HeaderController);

		HeaderController.$inject = ['serviceLogin', '$state'];

		function HeaderController(serviceLogin, $state) {

			var vm = this
			vm.logout = logout;
			vm.menuClass = menuClass;

			function logout() {
				serviceLogin.logout().then(function() {
					$state.go('auth');
				})
			};

			function menuClass(page) {
				var current = $state.current.name.split('.')[0]; 
				return page === current ? 'active': '';
			}
		}

})();
