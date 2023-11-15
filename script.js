'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

let currentScore = 0;
let activePlayer = true;

const isCheck = function (dice) {
  let player, player2, current, current2;
  const score = activePlayer ? score0El : score1El;
  if (activePlayer) {
    player = player0El;
    current = current0;
    player2 = player1El;
    current2 = current1;
  } else {
    player = player1El;
    current = current1;
    player2 = player0El;
    current2 = current0;
  }

  currentScore += dice;
  current.textContent = currentScore;
  if (currentScore > 21) {
    if (activePlayer) {
      player1El.classList.add('player--winner');
      score += 1;
    } else {
      player0El.classList.add('player--winner');
      score += 1;
    }
  } else if (
    currentScore == 21 ||
    (parseInt(current2.textContent) != 0 &&
      currentScore > parseInt(current2.textContent))
  ) {
    player.classList.add('player--winner');
    score += 1;
  }
};

btnRoll.addEventListener('click', function () {
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.classList.remove('hidden');
  diceEl.src = `/img/dice-${dice}.png`;
  isCheck(dice);
});

btnHold.addEventListener('click', function () {
  currentScore = 0;
  activePlayer = false;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
});

btnNew.addEventListener('click', function () {
  currentScore = 0;
  activePlayer = true;
  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
});
