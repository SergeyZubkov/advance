(function() {
    'use strict';
    angular
        .module('App')
        .factory('Quotes', Quotes);
    Quotes.$inject = [];
    /* @ngInject */
    function Quotes() {
        var service = {
            getQuotesWithMissingWords: getQuotesWithMissingWords,
            userAnswers: [],
            pullingWords: [],
            getResult: getResult,
        };
        return service;
        ////////////////
        function getQuotesWithMissingWords(list, nmbWords) {
          // var list = angular.copy(list);
          // var pullingWords = '';
          // list.forEach(function(quote) {
          //   var obj = deleteWords(quote.text, nmbWords);
          //   quote.text = obj.holeyString;
          //   pullingWords += obj.pullingWords;
          // });
          // this.pullingWords.push($.trim(pullingWords));
          // return  list;
          var list = angular.copy(list);
          return list.map(function(quote) {
            return angular.extend(quote, {text: deleteWords(quote.text, nmbWords)})
          })
        }

        function deleteWords(text, nmbWords) {
         /*
            1 - Сделать из строки массив слов
            2 - n раз брать случайное слово добавлять его в массив с ответами и 
                заменять на кусок разметки (Слово должно быть больше 2 символов)
            3 - Объеденить массив в строку
            4 - Вернуть строку
            
            Что имеем:
            Получаем список уникальных рандомных индексов, по которым удаляем слова.
            Нужно:
            Удалять только слова которые состоят из 2 букв
            Решение:
            Получаем индексы нужных слов(слов состоящих из более чем 2 букв). Рандомно выбераем из них 
            нужное количество
          */
          var words = text.split(' ');
          
          // ------------------------------------
          var suitableWords = [];
  
          for (var i=0; i<words.length; i++) {
            if (words[i].length > 2) suitableWords.push(i);
          }
          
          function getUniqueNmbs(pool, nmb) {
            var res = [];
            while(nmb--) {
              var i = Math.floor(pool.length * Math.random());
              res.push(pool.splice(i,1)[0]);
            }
            return res
          }
          // ---------------------------------------
          var randomIndices = getUniqueNmbs(suitableWords, +nmbWords).sort(function(a,b) {
            return a-b;
          });
          var reg = /[A-Za-zА-Яа-яё]+/i;
          for (var i=0; i<randomIndices.length; i++) {
            var newValue = "<input type='text' placeholder='...' class='text-center'>";
            var word = words[randomIndices[i]].match(reg)[0];
            service.pullingWords.push(word);
            words[randomIndices[i]] = words[randomIndices[i]].replace(reg, newValue);
            
          }
          return words.join(" ");
        }
        
        function getUniqueRandomNumbersInRange(from, to , number) {
          if (from > to) return;
          if ((to - from) < number) number = to;
          var res = [];
          while(res.length < number) {
              var rnd = Math.floor(Math.random()* to + from);
              if ( res.indexOf(rnd) === -1 ) {
                res.push(rnd)
              }
          }
          return res;
        }
        function getResult() {
          var answers = [];
          this.userAnswers.forEach(function(uAnswer, i) {
            var answer = {}
            answer.userAnswer = uAnswer.toLowerCase()||'...';
            console.log(this)
            answer.rightAnswer = this.pullingWords[i].toLowerCase();
            answer.isRight = answer.userAnswer === answer.rightAnswer;
            answers.push(answer)
          }, this);
          this.pulingWords = [];
          this.userAnswer = [];
          return answers;
        }
    }
})();