(function() {

	'use strict';

	angular
		.module('App')
		.controller('RegistrationController', RegistrationController);

	RegistrationController.$inject = ['$auth','$state','serviceLogin'];

	function RegistrationController($auth, $state, serviceLogin) {

		var vm = this;

		vm.submit = submit;

		function submit() {

			var credentials = {
				email: vm.email,
				password: vm.password,
				name: vm.name
			}

		  serviceLogin.registration(credentials).then(function() {
		  	  // Everything worked out so we can now redirect to
          // the users state to view the data
          $state.go('users');
		  })
		}
	}

})();