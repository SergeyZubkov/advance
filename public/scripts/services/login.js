(function() {
  'use strict';

  angular.module('App')
         .factory('serviceLogin', serviceLogin);

  serviceLogin.$inject = ['$auth', '$http','$rootScope'];
  
  function serviceLogin($auth, $http, $rootScope) {

    var service =  {
      login: login,
      logout: logout,
      registration: registration
    };

    return service;

    function login(credentials) {
      return $auth.login(credentials).then(function() {

        // Return an $http request for the now authenticated
        // user so that we can flatten the promise chain
        return $http.get('api/authenticate/user').then(function(response) {

          // Stringify the returned data to prepare it
          // to go into local storage
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

          return response;
        });

      // Handle errors
      });
    }

    function logout() {
      return $auth.logout().then(function() {

        // Remove the authenticated user from local storage
        localStorage.removeItem('user');

        // Flip authenticated to false so that we no longer
        // show UI elements dependant on the user being logged in
        $rootScope.authenticated = false;

        // Remove the current user info from rootscope
        $rootScope.currentUser = null;
      });
    }

    function registration(credentials) {

      return $http.post('api/registration', credentials).then(function(response) {
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

      });
    }
  }
})();