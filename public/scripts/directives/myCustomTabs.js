(function() {
  'use strict';

  angular.module('App')
         .directive('myCustomTabs', myCustomTabs);

  myCustomTabs.$inject = [];

  function myCustomTabs() {
    return {
      restrict: 'A',
      scope: {
        onSelect: '&'
      },
      link: function(scope, elm, attrs) {
        elm.find('li').on('click', function(e) {
          e.preventDefault();
          elm.find('li').removeClass('active');
          $(e.target).closest('li').addClass('active');
        });

      }
    }
  }
})();
