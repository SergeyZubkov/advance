(function() {

	'use strict';

	angular
		.module('App')
		.controller('headerController', headerController);


		function headerController($auth, $state, $http, $rootScope) {

			var vm = this
			vm.logout = function() {

				$auth.logout().then(function() {

				// Remove the authenticated user from local storage
				localStorage.removeItem('user');

				// Flip authenticated to false so that we no longer
				// show UI elements dependant on the user being logged in
				$rootScope.authenticated = false;

				// Remove the current user info from rootscope
				$rootScope.currentUser = null;

				// Redirect to auth (necessary for Satellizer 0.12.5+)
				$state.go('auth');
			});
			}
		}

})();
