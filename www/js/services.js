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

.factory('Question', function() {
  question = {};
  question.answerPool = [];
  question.level = 1;
  
  question.shuffle = function(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }
  
  question.getRandomCounter = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  question.getNextQuestion = function(index) {
    question.counters = question.shuffle([1,2,3,4,5,6,7,8,9,10,11,12]);
    question.multiplier = question.getRandomCounter(1, 12);
    var currentCounter = parseInt(question.counters[index]);

    question.correctAnswer = parseInt(question.multiplier) * parseInt(currentCounter);
    question.currentCounter = currentCounter;

    question.answerPool = [];
    question.answerPool.push(question.correctAnswer);

    $.each(question.counters, function(i, val){
      var possibleAnswer = parseInt(question.multiplier) * parseInt(val);
      if(possibleAnswer != question.correctAnswer){
        question.answerPool.push(possibleAnswer);  
      }      
    });
    question.answerPool = question.shuffle(question.answerPool);
    return question;
  }
  return question;
})

.factory('Pool', function(Question) {
  pool = {};
  pool.questions = [];
  pool.questionNumber = 1;

  pool.getRandomCounter = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  pool.addQuestion = function() {
    pool.resetQuestions();
    var counter = pool.getRandomCounter(1, 12);
    var q = Question.getNextQuestion(counter);
    pool.questions.push(q);
  }

  pool.addQuestionForLevel = function(counters, possibleAnswers) {
    var counter = pool.getRandomCounter(1, 12);
    var q = Question.getNextQuestion(counter);
    pool.questions.push(q);
  }

  pool.resetQuestions = function() {
    pool.questions = [];
  }

  pool.getQuestions = function() {    
    pool.addQuestion();
    return pool.questions;
  }

  pool.getLevelQuestions = function(counters, possibleAnswers) {    
    pool.addQuestionForLevel(counters, possibleAnswers);
    return pool.questions;
  }

  return pool;
})

.factory('Level', function(Pool){ 
  level = {};

  var level1 = {'counters':[1, 2, 5], 'answersAvailable':4, 'timeAvailable':15, 'name':'Level 1', 'value':'0'};
  var level2 = {'counters':[3, 10, 11], 'answersAvailable':4, 'timeAvailable':15, 'name':'Level 2', 'value':'1'};
  var level3 = {'counters':[4, 6, 7], 'answersAvailable':4, 'timeAvailable':15, 'name':'Level 3', 'value':'2'};
  var level4 = {'counters':[8, 9, 12], 'answersAvailable':4, 'timeAvailable':15, 'name':'Level 4', 'value':'3'};

  var level5 = {'counters':[2, 3, 4, 5, 6], 'answersAvailable':8, 'timeAvailable':10, 'name':'Level 5', 'value':'4'};
  var level6 = {'counters':[7, 8, 9, 10, 12], 'answersAvailable':8, 'timeAvailable':10, 'name':'Level 6', 'value':'5'};

  var level7 = {'counters':[2, 3, 4, 5, 6], 'answersAvailable':8, 'timeAvailable':5, 'name':'Level 7', 'value':'6'};
  var level8 = {'counters':[7, 8, 9, 10, 12], 'answersAvailable':8, 'timeAvailable':5, 'name':'Level 8', 'value':'7'};

  level.levels = [level1, level2, level3, level4, level5, level6, level7, level8];

  level.getLevels = function() {
    return level.levels;    
  }

  level.getLevelQuestions = function(lvl) {
    level.currentLevel = level.levels[lvl];
    return Pool.getLevelQuestions(level.currentLevel.counters, level.currentLevel.answersAvailable);
  }

  return level;
});