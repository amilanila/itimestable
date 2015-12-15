angular.module('starter.services', [])

.factory('Practice', function() {
  practice = {};
  practice.counter;  
  practice.questionIndex = 1;
  
  practice.shuffle = function(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }

  practice.multipliees = practice.shuffle([1,2,3,4,5,6,7,8,9,10,11,12]);
  practice.multipliee = practice.multipliees[practice.questionIndex];
  practice.answerPool = [];
  practice.answerCorrect;
  practice.currentLastCounter = false;  

  practice.setCounter = function(counter) {
    practice.counter = counter;
  } 

  practice.getCounter = function() {
    return practice.counter;
  }

  practice.setAnswerPool = function() {
    practice.answerPool = [];
    practice.answerCorrect = parseInt(practice.counter) * parseInt(practice.questionIndex);
    practice.answerPool.push(practice.answerCorrect);

    $.each(practice.multipliees, function(i, val){
        if(val != practice.questionIndex){
            practice.answerPool.push(parseInt(practice.counter) * parseInt(val));
            if(practice.answerPool.length == 4){
                return false;
            }
        }        
    });    
  }

  practice.getAnswerPool = function() {
    return practice.shuffle(practice.answerPool);    
  }
  
  practice.getAnswerCorrect = function() {
    return practice.answerCorrect;
  }

  practice.getMultiplier = function() {
    return practice.questionIndex;
  } 
  
  practice.setNextQuestion = function() {
    if(practice.questionIndex == 12){      
      return;
    }

    if(practice.questionIndex == 11) {
      practice.currentLastCounter = true;
    }

    ++practice.questionIndex;
  }

  practice.resetQuestionIndex = function() {
    practice.questionIndex =1;
  }

  practice.isCurrentLastCounter = function() {
    return practice.currentLastCounter;
  }

  practice.resetCurrentLastCounter = function() {
    practice.currentLastCounter = false;
  }

  practice.reset = function(counter) {
    practice.setCounter(counter);
    practice.resetQuestionIndex();
    practice.resetCurrentLastCounter();
    practice.setAnswerPool();    
  }
  return practice;
});
