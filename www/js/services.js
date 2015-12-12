angular.module('starter.services', [])

.factory('Practice', function() {
  practice = {};
  practice.counter;
  practice.multiplier = 1;
  practice.answerPool = [];
  practice.answerCorrect;

  practice.setCounter = function(counter) {
    practice.counter = counter;
  } 

  practice.getCounter = function() {
    return practice.counter;
  }

  practice.setAnswerPool = function() {
    // set answer pool
    practice.answerPool = [];
    for (var i = 1; i <= 4; i++) {
      practice.answerPool.push(practice.counter * i); 
    }; 

    // set correct answer
    practice.answerCorrect = practice.counter * practice.multiplier;
  }

  practice.getAnswerPool = function() {
    return practice.answerPool;
  }
  
  practice.getAnswerCorrect = function() {
    return practice.answerCorrect;
  }

  practice.getMultiplier = function() {
    return practice.multiplier;
  }
  
  return practice;
});
