let cardsClasses;
let cards;
let pairsNumber;
let pointCunter = 0;
let activeCard = "";
const activeCards = [];
let levelHard;
let pause = true;
const valueInput = document.getElementById("userNameInput");

function discoverCard() {
  activeCard.classList.remove("hidden");
}

function removeListenersFromAllAccessibleCards() {
  cards.forEach(card => card.removeEventListener("click", clickCard));
}

function offPairTheSameCards() {
  activeCards.forEach(card => card.classList.add("off"));
}

function removePairTheSameCards() {
  cards = cards.filter(card => !card.classList.contains("off"));
}

function removeListenersFromPauseAndReturn() {
  document.getElementById("pause").onclick = false;
  document.getElementById("return").onclick = false;
}

function displayResults() {
  levelHard ? displayLevelHardResults() : displayLevelEasyResults();
  document.getElementById("results").style.display = "flex";
}

function endGame() {
  timer.stop();
  removeListenersFromPauseAndReturn();
  displayResults();
}

function checkTheGameIsFinished() {
  if (pointCunter === pairsNumber) {
    endGame();
  }
}

function handlingTwoTheSameCards() {
  offPairTheSameCards();
  pointCunter++;
  removePairTheSameCards();
  checkTheGameIsFinished();
}

function hiddenActiveCards() {
  activeCards.forEach(card => card.classList.add("hidden"));
}

function handlingTwoSelectedCards() {
  activeCards[0].className === activeCards[1].className
    ? handlingTwoTheSameCards()
    : hiddenActiveCards();
}

function addListenersForCards() {
  cards.forEach(card => card.addEventListener("click", clickCard));
}

function compareSelectedTwoCards() {
  setTimeout(() => {
    handlingTwoSelectedCards();
    activeCard = "";
    activeCards.length = 0;
    addListenersForCards();
  }, 500);
}

function clickCard() {
  activeCard = this;
  if (activeCard === activeCards[0]) return;
  discoverCard();
  if (activeCards.length === 0) {
    activeCards[0] = activeCard;
    return;
  } else {
    activeCards[1] = activeCard;
    removeListenersFromAllAccessibleCards();
    compareSelectedTwoCards();
  }
}

function randomCardsOnBoard() {
  cards.forEach(card => {
    const position = Math.floor(Math.random() * cardsClasses.length);
    card.classList.add(cardsClasses[position]);
    cardsClasses.splice(position, 1);
  });
}

function hideCardsAndAddListeners() {
  cards.forEach(card => {
    card.classList.add("hidden");
    card.addEventListener("click", clickCard);
  });
}

function showAllCardsPerSecond() {
  setTimeout(hideCardsAndAddListeners, 1000);
}

function init() {
  randomCardsOnBoard();
  showAllCardsPerSecond();
}

function hideInitialBoard() {
  document.getElementById("userName").style.display = "none";
}

function addListenersToButtons() {
  document.getElementById("pause").onclick = _ => {
    if (pause) {
      timer.stop();
      removeListenersFromAllAccessibleCards();
      pause = false;
    }
  };
  document.getElementById("return").onclick = _ => {
    if (!pause) {
      timer.start();
      addListenersForCards();
      pause = true;
    }
  };
  document.getElementById("restart").onclick = _ => location.reload();
}

const initGameLevelHard = _ => {
  hideInitialBoard();
  cardsClasses = levelHardClasses;
  getLevelHardNodes();
  cards = [...document.querySelectorAll(".cardHard")];
  pairsNumber = cards.length / 2;
  levelHard = true;
  init();
  timer.start();
  addListenersToButtons();
};

const initGameLevelEasy = _ => {
  hideInitialBoard();
  cardsClasses = levelEasyClasses;
  getLevelEasyNodes();
  cards = [...document.querySelectorAll(".cardEasy")];
  pairsNumber = cards.length / 2;
  levelHard = false;
  init();
  timer.start();
  addListenersToButtons();
};

document.getElementById("hard").onclick = _ => {
  if (valueInput.value) {
    document.getElementById("board").classList.remove("board");
    document.getElementById("board").classList.add("board_hard");
    initGameLevelHard();
  } else {
    alert("Username is required.");
  }
};

document.getElementById("easy").onclick = _ => {
  valueInput.value ? initGameLevelEasy() : alert("Username is required.");
};
