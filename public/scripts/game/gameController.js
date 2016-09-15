(function() {
  'use strict';

  angular.module('App')
         .controller("GameController", GameController);

  GameController.$inject = ['dataService', '$rootScope', '$scope','Quotes', 'Timer', '$state'];

  function GameController(dataService, $rootScope, $scope, Quotes, Timer, $state) {
    var vm = this;
    init()

    $scope.$on('timer-stopped', function() {
      vm.stage = 'game';
      $scope.$apply();
    })

    /////////////////
    function init() {
      vm.begin = begin;
      vm.stage = 'intro';
      vm.error;
      vm.currentItem = 1;
      vm.showResults = showResults;
      vm.reload = reload;
    }
    function begin() {
      vm.stage = 'countdownStart';
      dataService.getRandomQuotesForUser({user: $rootScope.currentUser})
                 .success(function(response) { 
                  // $scope.$broadcast('timer-start')
                    vm.data = response;
                    vm.stage = 'game';  
                    Timer.start()
                 })
                 .error(function(error) {
                    vm.error = error;
                 });
    }
    function showResults(answers) {
      vm.time = Timer.endAndGetTime();
      vm.stage = 'result';
      vm.answers = answers;
      vm.score = vm.answers.reduce(function(score, value) {return value.isRight ? score+1 : score},0);
      console.log(vm.answers)
    }
    function reload() {
      init();
      vm.begin();
    }
  }
})();