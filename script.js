'use strict';

// selecting elements
const playerZeroElement = document.querySelector('.player--0');
const playerOneElement = document.querySelector('.player--1');

const scoreZeroElement = document.querySelector('#score--0');
const scoreOneElement = document.getElementById('score--1');
const currentZeroElement = document.getElementById('current--0');
const currentFirstElement = document.getElementById('current--1');

const diceElement = document.querySelector('.dice');
const buttonNew = document.querySelector('.btn--new');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scoreZeroElement.textContent = 0;
  scoreOneElement.textContent = 0;
  currentZeroElement.textContent = 0;
  currentFirstElement.textContent = 0;

  diceElement.classList.add('hidden');
  playerZeroElement.classList.remove('player--winner');
  playerOneElement.classList.remove('player--winner');
  playerZeroElement.classList.add('player--active');
  playerOneElement.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerZeroElement.classList.toggle('player--active');
  playerOneElement.classList.toggle('player--active');
};

// rolling dice functionality
buttonRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true
    if (dice !== 1) {
      // add dice to the current score
      // currentScore += dice;
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

buttonHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active players score
    // scores[1] = scores[1] + current score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >=100

    if (scores[activePlayer] >= 100) {
      // finish the game
      playing = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

buttonNew.addEventListener('click', init);
