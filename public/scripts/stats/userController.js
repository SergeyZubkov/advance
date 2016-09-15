(function() {

	'use strict';

	angular
		.module('App')
		.controller('UserController', UserController);

	UserController.$inject = ['$http', 'serviceLogin', '$state'];

	function UserController($http, serviceLogin, $state) {
		var vm = this;

		vm.users;
		vm.error;

		vm.getUsers = getUser;
		vm.logout = logout;

		function getUser() {

			//Grab the list of users from the API
			$http.get('api/authenticate').success(function(users) {
				vm.users = users;
			}).error(function(error) {
				vm.error = error;
			});
		}

		// We would normally put the logout method in the same
		// spot as the login method, ideally extracted out into
		// a service. For this simpler example we'll leave it here
		
		function logout() {

			serviceLogin.logout().then(function() {
				$state.go('auth');
			})
		}
	}
	
})();