(function() {

	'use strict';

	angular
		.module('App')
		.controller('AuthController', AuthController);

	AuthController.$inject = ['serviceLogin', '$state'];
	
	function AuthController(serviceLogin, $state) {

		var vm = this;

		vm.loginError = false;
		vm.loginErrorText;
		// methods
		vm.login = login;

		function login() {

			var credentials = {
				email: vm.email,
				password: vm.password
			}

			serviceLogin.login(credentials).then(function(response) {
          $state.go('users');
      }, function(error) {
        vm.loginError = true;
        vm.loginErrorText = error.data.error;
      });
		}
	}

})();