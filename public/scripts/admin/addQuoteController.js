(function() {
    'use strict';
    angular
        .module('App')
        .controller('AddQuoteController', AddQuoteController);
    AddQuoteController.$inject = ['dataService', 'Notification'];
    /* @ngInject */
    function AddQuoteController(dataService, Notification) {
        var vm = this;
        vm.addQuote = addQuote;

        activate();
        ////////////////
        function activate() {
            console.log(vm.author);
        }
        function addQuote() {
            if(!vm.author&&!vm.text) return;
            var data = {
                author: vm.author,
                text: vm.text
            };
            vm.author = '';
            vm.text = '';
            dataService.addQuote(data).success(function(response) {
                Notification.success('Цитата добавлена');
            }).error(function(error) {
                Notification.error("Цитата не была добавлена");

            })
        }
    }
})();

