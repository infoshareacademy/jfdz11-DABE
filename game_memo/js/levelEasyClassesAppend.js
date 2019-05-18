const levelEasyClasses = [
  "red",
  "red",
  "orange",
  "orange",
  "blue",
  "blue",
  "yellow",
  "yellow",
  "lightgreen",
  "lightgreen",
  "brown",
  "brown",
  "purple",
  "purple",
  "cadetblue",
  "cadetblue"
];

const getLevelEasyNodes = _ => {
  levelEasyClasses.forEach(levelEasyClass => {
    const board = document.querySelector(".board");
    const card = document.createElement("div");
    card.classList.add("cardEasy");
    board.appendChild(card);
  });
};
