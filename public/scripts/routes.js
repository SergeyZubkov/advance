(function(){

  'use strict';

  angular.module('App')
         .config(routes);

  routes.$inject = ['$urlRouterProvider', '$stateProvider'];

  function routes($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/intro');

    $stateProvider
      .state('intro', {
          url: '/intro',
          templateUrl: 'scripts/intro/introView.html',
          controller: 'IntroController as intro',
          data: {
            title: 'Главная'
          },
          step: 1
        })
        .state('auth', {
          url: '/auth',
          templateUrl: 'scripts/auth/authView.html',
          controller: 'AuthController as auth',
          data: {
            title: 'Авторизация'
          }
        })
        .state('users', {
          url: '/users',
          templateUrl: 'scripts/stats/userView.html',
          controller: 'UserController as user',
          resolve: {
            isAuth: isAuth
          },
          data: {
            title: 'Статистика'
          },
          step: 3
        })
        .state('game', {
          url: '/game',
          templateUrl: 'scripts/game/gameView.html',
          controller: 'GameController as vm',
          data: {
            title: 'Тренировка'
          },
          step: 2
        })
        .state('admin', {
          url: '/admin',
          templateUrl: 'scripts/admin/adminView.html',
          controller: 'AdminController as vm',
          resolve: {
            isAdm: isAdm
          },
          data: {
            title: 'Админка'
          },
          step: 4
        })
        .state('admin.users', {
          url: '/users',
          templateUrl: 'scripts/admin/users.html',
          controller: 'UsersController as vm',
          step: 5
        })
         .state('admin.quotes', {
          url: '/quotes',
          templateUrl: 'scripts/admin/quotes.html',
          controller: 'QuotesController as vm',
          step: 5
        })
        .state('admin.addQuote', {
          url: '/addQuote',
          templateUrl: 'scripts/admin/addQuote.html',
          controller: 'AddQuoteController as vm',
          step: 5
         })
        .state('registration', {
          url: '/registration',
          templateUrl: 'scripts/auth/registrationView.html',
          controller: 'RegistrationController as reg',
          data: {
            title: 'Регистрация'
          }
        });

    isAdm.$inject = ['$rootScope', '$q', '$state', '$timeout'];

    function isAdm($rootScope,$q, $state, $timeout) {
        var defer = $q.defer();
        if($rootScope.currentUser.admin) {
          $timeout(function() {
            $state.go('admin.users');
          })
          defer.resolve();
        }else {
          $timeout(function(){
              $state.go('auth');
          })
          defer.reject();
        }
        return defer.promise;
    }

    isAuth.$inject = ['$rootScope', '$q', '$state', '$timeout'];

    function isAuth($rootScope,$q, $state, $timeout) {
        var defer = $q.defer();
        if($rootScope.currentUser) {
          defer.resolve();
        }else {
          $timeout(function(){
              $state.go('auth');
          })
          defer.reject();
        }
        return defer.promise;
    }
  }

})();