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

  $scope.tryAnswer = function(ans, ansCorrect) {
    if(ans == ansCorrect){
      $scope.correct = 1;
      $scope.answerText = $scope.currentLastCounter ? 'Well Done' : 'Next';
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

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
