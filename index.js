var timeLeft = 10;
var currentScore = 0;
var highScore = 0;
var maxNumber = 10;
var round = true;

var createOperation = function() {
  var operateOption = [];
  if ( $('#add').is(':checked') ) {
    operateOption.push('+');
  }
  if ( $('#subs').is(':checked') ) {
    operateOption.push('-');
  }
  if ( $('#mult').is(':checked') ) {
    operateOption.push('*');
  }
  if ( $('#divis').is(':checked') ) {
    operateOption.push('/');
  }
  var randomOperation = function () {
    if (operateOption.length === 1) {
      return operateOption[0];
    }
    else {
      var position = Math.floor( Math.random() * operateOption.lenght);
      return(operateOption[position]);
    }
  }

  var rangeRandom = function(min, max) {
    var randomNumber = ( Math.random() * (max - min) ) + min;
    return Math.round (randomNumber);
  }

  var operator = randomOperation();
  var number1 = rangeRandom(0, maxNumber);
  var number2 = function() {
    if(operator === '/') {
      var possibleNumbers = [1];
      for (var i = 2; i <= maxNumber; i++) {
        if (number1 % i === 0) possibleNumbers.push[i];
      }
      var position = rangeRandom(0, possibleNumbers.length - 1);
      return possibleNumbers[position];
    }
    if (operator === '-'){
      return rangeRandom(0, number1)
    }
    return rangeRandom(0, maxNumber);
  }
  var operation = `${String(number1)} ${operator} ${String(number2())}`;
  var result = Math.floor(eval(operation));
  return([operation, result]);
}

  var currentOperation;
  var setQuestion = function () {
    currentOperation = createOperation();
    $('#operations').text(currentOperation[0]);
  }
  var showTime = function() {
    $('#time-start').text(timeLeft);
  }
  var endGame = function () {
    $('#end-game').show();
    $('#user-answer').attr('readonly', true);
  }

  var countingDown = function() {
    var timer = setInterval(function() {
      timeLeft--;
      if(timeLeft >= 0) {
        showTime();
      } else {
        clearInterval(timer);
        endGame();
      }
    }, 1000);
  }

  var updateScores = function() {
    $('#current-score').text(currentScore);
    if(currentScore > highScore){
      highScore = currentScore;
      $('#highest-score').text(highScore);
    }
  }
  var starGame = function() {
    if(round) {
      round = false;
      countingDown();
    }
  }

  var checkAnswer = function () {
    var userAnswer = $('#user-answer').val();
    if (Number(userAnswer) === Number(currentOperation[1]) ) {
      currentScore++;
      updateScores();
      $('#user-answer').val('');
      timeLeft++;
      showTime();
      setQuestion();
    }
    else {
      $('#user-answer').val('');
    }
  }
  var restartGame = function() {
    $('#end-game').hide();
    round = true;
    timeLeft = 10;
    showTime();
    currentScore = 0;
    updateScores();
    $('#user-answer').removeAttr('readonly')
  }

  var changeValue = function() {
    var maxNumberChanged = $('#number-control').val();
    $('#number-limit').text(maxNumberChanged);
    maxNumber = maxNumberChanged;
  }
  var firstGame = function () {
    $('#end-game').hide();
    setQuestion();
    $('#number-limit').text(maxNumber);
    $('#number-control').val(maxNumber);
  }

  $(document).ready(function () {
    firstGame();
    $(document).on('keydown', '#user-answer', starGame);
    $(document).on('change', '#user-answer', checkAnswer);
    $(document).on('click', '#restart', restartGame);
    $(document).on('change', '#number-control', changeValue);

  })
