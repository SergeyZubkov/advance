(function() {
    'use strict';
    angular
        .module('App')
        .directive('myGameDirective', myGameDirective);
    myGameDirective.$inject = ['$sce', 'Quotes'];
    /* @ngInject */
    function myGameDirective(Quotes, $sce) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: GameController,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            templateUrl: '/scripts/directives/myGameDirective.html',
            scope: {
              items: '=',
              currentItem: '=',
              onEnd: "&",
              deleteWords: "@"
            }
        };
        return directive;
        function link(scope, element, attrs) {
        }
    }
    /* @ngInject */
    function GameController($scope, $element, $sce,Quotes) {
      var vm = this;
      init();
      console.log(vm)

      function init() {
          vm.currentItem = 1;
          // vm.items = Quotes.ripOutWords(vm.items, +vm.deleteWords).holeyQuotes;
      }

      vm.next =  function() {
        var $elm = $element.find('.wrap'),
            $inputs = $elm.find('li').eq(vm.currentItem-1).find('input');
            
        if ($inputs.length) {
          getUserAnswer();
        }
        
        if(vm.currentItem < vm.items.length&&!vm.animation) {
          vm.animation = true;
          vm.currentItem++;
          var offset = $($element).find('li').outerWidth(true);
           $elm.find('li').eq(vm.currentItem-1).css('visibility','visible');
          $elm.animate({
            left: '-=' + offset
          },300,'swing', function() {
            vm.animation = false;
            $elm.find('li').eq(vm.currentItem-1).find('input').first().focus();
          })
        }else if (!vm.animation){
           vm.onEnd({answers:Quotes.getResult()});
        }
        
        function getUserAnswer() {
            $inputs.each(function(i, input) {
              Quotes.userAnswers.push($(input).val());
            })
        }
      }

      vm.trustAsHtml = function(string) {
        return $sce.trustAsHtml(string)
      }


      $scope.$watch('vm.items', function(nv, ov) {
        if(nv&&ov == undefined) {
          vm.items = [].concat(vm.items, Quotes.getQuotesWithMissingWords(vm.items, +vm.deleteWords));
        }
      })
    }
})();