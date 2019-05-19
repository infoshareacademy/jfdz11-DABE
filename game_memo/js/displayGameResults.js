const gameResults = [[], []];
const localStorageGameResults = downloadResultsFromLocalStorage("results");

function sortGameResults(arr) {
  arr.sort((result_A, result_B) => result_A.gameTime - result_B.gameTime);
}

function cutGameResultsToTopFive(arr) {
  arr.length > 5 ? arr.splice(5, 1) : arr;
}

function createResultsNodes(arr, listOfResults) {
  arr
    .map(result => {
      const listResults = document.createElement("li");
      listResults.innerText = `${result.user} -> ${result.gameTime}`;
      return listResults;
    })
    .forEach(result =>
      document.getElementById(listOfResults).appendChild(result)
    );
}

function displayLevelHardResults() {
  if (localStorageGameResults === null) {
    gameResults[1].push({
      user: valueInput.value,
      gameTime: timer.gameTime.toFixed(2)
    });
    saveToLocalStorage(gameResults);
    createResultsNodes(gameResults[1], "results-list_hard");
  } else {
    localStorageGameResults[1].push({
      user: valueInput.value,
      gameTime: timer.gameTime.toFixed(2)
    });
    sortGameResults(localStorageGameResults[1]);
    cutGameResultsToTopFive(localStorageGameResults[1]);
    saveToLocalStorage(localStorageGameResults);
    createResultsNodes(localStorageGameResults[1], "results-list_hard");
    if (localStorageGameResults[0]) {
      createResultsNodes(localStorageGameResults[0], "results-list_easy");
    }
  }
}

function displayLevelEasyResults() {
  if (localStorageGameResults === null) {
    gameResults[0].push({
      user: valueInput.value,
      gameTime: timer.gameTime.toFixed(2)
    });
    saveToLocalStorage(gameResults);
    createResultsNodes(gameResults[0], "results-list_easy");
  } else {
    localStorageGameResults[0].push({
      user: valueInput.value,
      gameTime: timer.gameTime.toFixed(2)
    });
    sortGameResults(localStorageGameResults[0]);
    cutGameResultsToTopFive(localStorageGameResults[0]);
    saveToLocalStorage(localStorageGameResults);
    createResultsNodes(localStorageGameResults[0], "results-list_easy");
    if (localStorageGameResults[1]) {
      createResultsNodes(localStorageGameResults[1], "results-list_hard");
    }
  }
}
