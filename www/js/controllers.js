angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $state, Practice) {  

  // define counters of times table
  $scope.firstRowCounters = {1:'positive', 2:'calm', 3:'balanced', 4:'energized', 5:'assertive', 6:'royal'};
  $scope.secondRowCounters = {7:'assertive', 8:'royal', 9:'positive', 10:'calm', 11:'energized', 12:'balanced'};

  // show times table for give counter
  $scope.showTable = function(counter, counterColor) {
    if($scope.counter != counter) {
      $scope.tableVisible = false;
    }

    $scope.counter = counter;
    $scope.counterColor = counterColor; 
    
    if($scope.tableVisible === undefined || $scope.tableVisible == false) {
      $scope.tableVisible = true;
    } else {
      $scope.tableVisible = false;
    }
  };

  $scope.practice = function(counter) {
    Practice.reset(counter);
    $state.go('tab.chats');
  };
})

.controller('ChatsCtrl', function($scope, $state, Practice) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.counter = Practice.getCounter() != undefined ? Practice.getCounter() : 1;  
  $scope.multipliee = Practice.getMultiplier();
  $scope.answerPool = Practice.getAnswerPool();  
  $scope.answerCorrect = Practice.getAnswerCorrect();
  $scope.answerText = 'Select correct answer';
  $scope.correct = 0;
  $scope.answeredCorrect = false;
  $scope.currentLastCounter = Practice.isCurrentLastCounter();
  $scope.allCorrectForCurrentMultipler = false;
  $scope.isFinishTimetable = false;

  $scope.tryAnswer = function(ans, ansCorrect) {
    $scope.isFinishTimetable = false;

    if(ans == ansCorrect){
      $scope.correct = 1;
      $scope.answerText = $scope.currentLastCounter ? 'Well Done' : 'Next';

      // if timestable is finish override the message with congratulations
      if($scope.counter == 12 && $scope.currentLastCounter) {
        $scope.answerText = 'Congratulations!';
        $scope.isFinishTimetable = true;
      }

      $scope.allCorrectForCurrentMultipler = $scope.currentLastCounter ? true : false;
      $scope.answeredCorrect = true;
    } else {
      $scope.allCorrectForCurrentMultipler = false;
      $scope.correct = -1;
      $scope.answerText = 'Try again';
      $scope.answeredCorrect = false;
    }
  }

  $scope.nextQuestion = function() {
    if($scope.answeredCorrect) {
      if($scope.currentLastCounter) {
        return;
      }
      Practice.setNextQuestion();
      Practice.setAnswerPool();
      $state.go($state.current, {}, {reload: true});  
    }
  }

  $scope.startNextMultiplier = function() {
    Practice.reset(parseInt(Practice.getCounter()) + 1);
    $state.go($state.current, {}, {reload: true});  
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $state, $timeout, Pool, Level) {
  $scope.levels = Level.getLevels();
  $scope.currentLevel = 0;  
  $scope.numberOfQuestionAskedInCurrentLevel = 0;
  $scope.questionNumber = 1;
  $scope.answerText = 'Select correct answer';
  $scope.correct = 0;

  $scope.resetQuestions = function() {
    $scope.questions = [];
    $scope.timeout = true;
  };

  $scope.getQuestions = function() {
    $scope.timeout = false;
    $scope.questions = Pool.getQuestions();    
  };

  $scope.getLevelQuestions = function(lvl) {
    $scope.timeout = false;
    $scope.setCurrentLevel(lvl);
    $scope.questions = Level.getLevelQuestions(lvl);  
    $scope.resetTimer();
    $scope.startTimer($scope.currentLevel.timeAvailable);
  };

  $scope.setCurrentLevel = function(lvl) {
    $scope.currentLevel = $scope.levels[lvl];
  };

  $scope.isLastQuestionOfCurrentLevel = function() {
    return $scope.numberOfQuestionAskedInCurrentLevel == $scope.currentLevel.quizLimit;
  };

  $scope.goToNextLevel = function() {
    $scope.currentLevel.completed = true;
    $scope.numberOfQuestionAskedInCurrentLevel = 0;
    $scope.getLevelQuestions(parseInt($scope.currentLevel.value) + 1);
  };

  $scope.tryAnswer = function(ans, ansCorrect) {
    if(ans == ansCorrect){
      //$scope.numberOfQuestionAskedInCurrentLevel++;      
      $scope.correct = 1;
      
      if($scope.isLastQuestionOfCurrentLevel()) {
        $scope.correct = 100;
        $scope.answerText = 'Go to next level';
      } else {
        $scope.answerText = 'Next question';
      }
      
      $scope.answeredCorrect = true;
    } else {
      $scope.correct = -1;
      $scope.answerText = 'Try again';
      $scope.answeredCorrect = false;
    }
  }; 

  $scope.nextQuestion = function() {
    if($scope.answeredCorrect) {
      $scope.numberOfQuestionAskedInCurrentLevel++;      
      $scope.correct = 0;
      $scope.answerText = 'Select correct answer';

      if($scope.isLastQuestionOfCurrentLevel()) {
        $scope.goToNextLevel();
        return;
      }
      $scope.getLevelQuestions($scope.currentLevel.value);
      $state.go($state.current, {}, {reload: true});  
    }
  };

  // Timer functions
  var mytimeout = null; // the current timeoutID

  // actual timer method, counts down every second, stops on zero
  $scope.onTimeout = function() {
    if ($scope.timer === 0) {
      $scope.$broadcast('timer-stopped', 0);
      $timeout.cancel(mytimeout);
      return;
    }
    $scope.timer--;
    mytimeout = $timeout($scope.onTimeout, 1000);
  };

  // functions to control the timer
  // starts the timer
  $scope.startTimer = function(timeAvailable) {
    $scope.selectTimer(timeAvailable);
    mytimeout = $timeout($scope.onTimeout, 1000);
    $scope.started = true;
  };

  $scope.resetTimer = function() {
    $timeout.cancel(mytimeout);
  };

  // // stops and resets the current timer
  // $scope.stopTimer = function(closingModal) {
  //   if (closingModal != true) {
  //     $scope.$broadcast('timer-stopped', $scope.timer);
  //   }
  //   $scope.timer = $scope.timeForTimer;
  //   $scope.started = false;
  //   $scope.paused = false;
  //   $timeout.cancel(mytimeout);
  // };

  // // pauses the timer
  // $scope.pauseTimer = function() {
  //   $scope.$broadcast('timer-stopped', $scope.timer);
  //   $scope.started = false;
  //   $scope.paused = true;
  //   $timeout.cancel(mytimeout);
  // };

  // triggered, when the timer stops, you can do something here, maybe show a visual indicator or vibrate the device
  $scope.$on('timer-stopped', function(event, remaining) {
    if (remaining === 0) {
      $scope.done = true;
      $scope.resetQuestions();
    }
  });

  // UI
  // When you press a timer button this function is called
  $scope.selectTimer = function(val) {
    $scope.timeForTimer = val;
    $scope.timer = val
    $scope.started = false;
    $scope.paused = false;
    $scope.done = false;
  };
});
