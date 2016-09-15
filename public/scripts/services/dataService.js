(function() {
    'use strict';
    angular
        .module('App')
        .factory('dataService', dataService);
    dataService.$inject = ['$http'];
    /* @ngInject */
    function dataService($http) {
        var service = {
            getUsers: getUsers,
            getAllQuotes: getAllQuotes,
            addQuote: addQuote,
            deleteQuoteById: deleteQuoteById,
            updateQuote: updateQuote,
            getRandomQuotesForUser: getRandomQuotesForUser,
        };
        return service;
        ////////////////
      function getUsers() {
        return $http.get('api/authenticate');
      }
      function getAllQuotes() {
        return $http.get('api/quotesAll');
      }
      function addQuote(quote) {
        return $http.post('api/addQuote', quote);
      }
      function deleteQuoteById(id) {
        return $http.post('api/deleteQuoteById', {id: id});
      }
      function updateQuote(quote) {
        return $http.post('api/updateQuote', quote);
      }
      function getRandomQuotesForUser(forUser) {
        return $http.post('api/getRandomQuotesForUser', forUser);
      }
    }
})();