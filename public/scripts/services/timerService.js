(function() {
    'use strict';
    angular
        .module('App')
        .factory('Timer', Timer);
    Timer.$inject = [];
    /* @ngInject */
    function Timer() {
        var service = {
            sTime: null,
            eTime: null,
            start: start,
            endAndGetTime: endAndGetTime,
            getTime: getTime
        };
        return service;
        ////////////////
        function start() {
           this.sTime = new Date().getTime();
        };
        function endAndGetTime() {
          this.eTime = new Date().getTime();
          return this.getTime()
        };
        function getTime() {
          var res = ((this.eTime - this.sTime)/1000).toFixed(2);
          this.sTime = null;
          this.eTime = null;
          return res;
        };

    }
})();
