/**************
 * Simon Game *
 *************/

// Defining Button Colors
var buttonColors = ['red', 'blue', 'yellow', 'green'];

// Arrays to Store Patterns
var gamePattern = [];
var userPattern = [];

// Game Variables
var gameStarted = false;
var level = 0;

// Start the game on Key Press
$(document).on('keypress', function() {
  // Checking if the game started or not
  if (!gameStarted) {
    // Reseting the title
    $('#level-title').text('Level 0');

    // Setting the game to start
    gameStarted = true;

    // Calling the next Sequence
    nextSequence();
  }
});

// When User Click on a Button
$('.btn').click(function() {
  // Get the button ID
  var userColor = $(this).attr('id');

  // Store it in User Pattern
  userPattern.push(userColor);

  // Play relevant sound
  playSound(userColor);
  // Animate the button
  animateClass('#' + userColor, 'pressed', 100);

  // Check if the sequence is correct
  checkAnswer(userPattern.length - 1);
});

// Creating a new sequence
function nextSequence() {
  // Generating a random Number
  var randomNumber = Math.floor(Math.random() * 4);
  // Getting a random Color
  var randomColor = buttonColors[randomNumber];

  // Storing the color in game sequence
  gamePattern.push(randomColor);

  // Animating the button
  $('#' + randomColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  // Playing relevant sound
  playSound(randomColor);

  // Changing the level and game title
  level++;
  $('#level-title').text('Level ' + level);

  // Resseting the User Sequence
  userPattern = [];
}

// Check the use Sequence
function checkAnswer(currentColorIndex) {
  // Check if the current color index in user pattern matches with that of in game pattern
  if (userPattern[currentColorIndex] === gamePattern[currentColorIndex]) {
    // Check if the User finished the pattern
    if (userPattern.length === gamePattern.length) {
      // Generate the next sequence
      setTimeout(function() {
        nextSequence();
      }, 300);
    }
  } else {
    // Play game over sound
    playSound('wrong');

    // Animate the background
    animateClass('body', 'game-over', 200);

    // Change the game title
    $('#level-title').text('Game Over, Press Any Key to Restart');

    // Reset the game
    startOver();
  }
}

// Reset the Game
function startOver() {
  // Reseting the patterns
  gamePattern = [];
  userPattern = [];

  // Reseting game variables
  gameStarted = false;
  level = 0;
}

// Play a sound
function playSound(sound) {
  var audio = new Audio('sounds/' + sound + '.mp3');
  audio.play();
}

// Add and remove a class after some interval
function animateClass(selector, className, interval) {
  // Add the class
  $(selector).addClass(className);

  // Remove the class
  setTimeout(function() {
    $(selector).removeClass(className);
  }, interval);
}
