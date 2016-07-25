(function() {

	'use strict';

	angular
		.module('App')
		.controller('registrationController', registrationController);


	function registrationController($auth, $state, $http, $rootScope) {

		var vm = this;

		vm.submit = function() {

			var credentials = {
				email: vm.email,
				password: vm.password,
				name: vm.name
			}
			console.log('dfsdf')
			$http.post('api/registration', credentials).then(function(response) {
				$auth.login(credentials)
				var user = JSON.stringify(response.data.user);

					// Set the stringified user data into local storage
					localStorage.setItem('user', user);

					// The user's authenticated state gets flipped to
					// true so we can now show parts of the UI that rely
					// on the user being logged in
					$rootScope.authenticated = true;

					// Putting the user's data on $rootScope allows
					// us to access it anywhere across the app
					$rootScope.currentUser = response.data.user;

					// Everything worked out so we can now redirect to
					// the users state to view the data
					$state.go('users');
				console.log(response)
			});
		}
	}

})();