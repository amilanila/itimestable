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
})

.factory('Profile', function() {
  profile = {};
  profile.name = 'amila';
  profile.level;
  profile.score;

  return profile;
})

.factory('Quis', function() {
  quis = {};
  quis.multiplier = 1;
  quis.multipliee = 1;
  quis.correctAnswer;
  quis.answerPool;

  return quis;  
})

.factory('Game', function(Quis){
  game = {};

  game.quis = Quis;
  game.level1 = [1, 2, 3];
  game.level2 = [4, 5, 6];
  game.level3 = [7, 8, 9];
  game.level4 = [10, 11, 12];

  game.shuffle = function(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }

  game.counters = game.shuffle([1,2,3,4,5,6,7,8,9,10,11,12]);
  game.roundQuesIndex = 1;

  game.getGameQuestions = function() {    
    game.quis.answerPool = [];
    game.quis.correctAnswer = parseInt(game.quis.multiplier) * parseInt(game.quis.multipliee);
    game.quis.answerPool.push(game.quis.correctAnswer);
    
    $.each(game.counters, function(i, val){
      game.quis.answerPool.push(parseInt(game.quis.multiplier) * parseInt(val));
      if(game.quis.answerPool.length == 8){
          return false;
      }
    });       
  }

  return game;
});
