/*jshint esversion: 6 */

console.log('JS loaded');
const buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gameon = false;

// Event Handlers
$(document).keypress((e) => {
  if (!gameon) {
    $('[id=level-title]').text(`Level ${level}`);
    gameon = true;
    nextSequence();
  }
});

$('[type=button]').click((e) => {
  if (gameon) {
    let userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  }
});

// Functions
function playSound(fileName) {
  try {
    let audio = new Audio(`sounds/${fileName}.mp3`);
    audio.play();
  } catch (error) {}
}

function animatePress(buttonId) {
  $(`[id=${buttonId}]`).addClass('pressed');
  setTimeout(() => {
    $(`[id=${buttonId}]`).removeClass('pressed');
  }, 100);
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $('[id=level-title]').text(`Level ${level}`);
  let randomNumber = Math.floor(Math.random() * buttonColors.length);
  let randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);
  $(`[id=${randomColor}]`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}

function checkAnswer(index) {
  if (gamePattern[index] === userClickedPattern[index]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 800);
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  playSound('wrong');
  $('[id=level-title]').text(`Game Over, Press Any Key to Restart`);
  $('body').addClass(`game-over`);
  setTimeout(() => {
    $(`body`).removeClass('game-over');
  }, 100);
  gameon = false;
  level = 0;
  gamePattern.length = 0;
  userClickedPattern.length = 0;
}
