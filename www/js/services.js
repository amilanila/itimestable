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

.factory('Quis', function() {
  quis = {};
  quis.multiplier = 1;
  quis.multipliee = 1;
  quis.correctAnswer;
  quis.answerPool;

  quis.levels = [1, 2, 3, 4];
  quis.levels[0] = [1, 2, 3];
  quis.levels[1] = [4, 5, 6];
  quis.levels[2] = [10, 11, 12];
  quis.levels[3] = [7, 8, 9]; 
  quis.currentLevel = 1; 
  quis.currentQuisIndex = 1;

  return quis;  
})

.factory('Game', function(Quis){
  game = {};
  game.quis = Quis;

  game.shuffle = function(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }

  game.counters = game.shuffle([1,2,3,4,5,6,7,8,9,10,11,12]);
  game.roundQuesIndex = 1;

  game.generateGameQuestion = function(level) {    
    game.quis.answerPool = [];
    game.currentLevelMultiplers = game.shuffle(game.quis.levels[level]);
    game.multiplier = game.currentLevelMultiplers[0];

    game.quis.correctAnswer = parseInt(game.multiplier) * parseInt(game.quis.multipliee);
    game.quis.answerPool.push(game.quis.correctAnswer);

    $.each(game.counters, function(i, val){
      game.quis.answerPool.push(parseInt(game.multiplier) * parseInt(val));
      if(game.quis.answerPool.length == 8){
          return false;
      }
    });    
    game.shuffle(game.quis.answerPool);   
  }

  game.getQuis = function(level) {
    game.generateGameQuestion(level);
    return game.quis;
  }

  return game;
})

.factory('Question', function() {
  question = {};
  question.multiplier = 0;
  question.answerPool = [];
  
  question.shuffle = function(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }
  
  question.counters = question.shuffle([1,2,3,4,5,6,7,8,9,10,11,12]);

  question.getNextQuestion = function(index) {
    var currentMultiplier = ++question.multiplier;
    var currentCounter = parseInt(question.counters[index]);

    question.correctAnswer = parseInt(currentMultiplier) * parseInt(currentCounter);
    question.currentCounter = currentCounter;

    question.answerPool.push(question.correctAnswer);

    $.each(question.counters, function(i, val){
      question.answerPool.push(parseInt(currentMultiplier) * parseInt(val));
    });
    return question;
  }

  return question;
})

.factory('Pool', function(Question) {
  pool = {};
  pool.questions = [];
  pool.questionNumber = 1;

  pool.addQuestion = function() {
    //for (var i = 1; i < 4; i++) {
      var q = Question.getNextQuestion(pool.questionNumber++);
      pool.questions.push(q);
    //};    
  }

  pool.getQuestions = function() {
    pool.addQuestion();
    return pool.questions;
  }

  return pool;
});