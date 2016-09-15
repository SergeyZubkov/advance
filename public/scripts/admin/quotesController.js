(function() {
    'use strict';
    angular
        .module('App')
        .controller('QuotesController', QuotesController);
    QuotesController.$inject = ['dataService', '$filter', "NgTableParams", 'Notification'];
    /* @ngInject */
    function QuotesController(dataService, $filter, NgTableParams, Notification) {
        var vm = this;
        vm.cancel = cancel;
        vm.del = del;
        vm.save = save;
        activate();
        ////////////////
        function activate() {
          dataService.getAllQuotes().success(function(quotes) {
            vm.originalData = angular.copy(quotes);
            vm.tableParams = new NgTableParams({},{dataset: angular.copy(quotes)});
          }).error(function(error) {
            vm.error = error;
          });
        }
        function cancel(quote, quoteForm) {
          var originalquote = resetquote(quote, quoteForm);
          angular.extend(quote, originalquote);
        }

        function del(quote) {
          vm.tableParams.settings().dataset = _.without(vm.tableParams.settings().dataset, quote);

          vm.tableParams.reload().then(function(data) {
            if (data.length === 0 && vm.tableParams.total() > 0) {
              vm.tableParams.page(vm.tableParams.page() - 1);
              vm.tableParams.reload();
            }
          });
          dataService.deleteQuoteById(quote.id).success(function(response) {
            Notification.success('Цитата была удалена');
          }).error(function(error) {
            document.write(error);
          });
        }
        function resetquote(quote, quoteForm){    
          quote.isEditing = false;
          quoteForm.$setPristine();
          vm.tableTracker.untrack(quote);
          return _.findWhere(vm.originalData, {id: quote.id });
        }

        function save(quote, quoteForm) {
          var originalquote = resetquote(quote, quoteForm);
          var updateQuote = angular.extend(originalquote, quote);

          dataService.updateQuote(updateQuote).success(function(response) {
            Notification.success('Цитата был изменена');
          }).error(function(error) {
          })
        }
    }
})();