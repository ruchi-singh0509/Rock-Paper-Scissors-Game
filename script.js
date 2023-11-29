const computerScoreDisplay = document.querySelector(".computer_score");
const userScoreDisplay = document.querySelector(".user_score");
const keys = Array.from(document.querySelectorAll(".icon"));
const gameZone = document.querySelector(".game_zone");
const resultZone = document.querySelector(".result_zone");
const winMessage = document.querySelector("#won");
const lostMessage = document.querySelector("#lost");
const tieMessage = document.querySelector("#tie");
const subMessage = document.querySelector(".sub_message");
const playAgainButton = document.querySelector(".play_again_button");
const replayButton = document.querySelector(".replay_button");
const userRock = document.querySelector("#user_stone");
const pcRock = document.querySelector("#pc_stone");
const userPaper = document.querySelector("#user_paper");
const pcPaper = document.querySelector("#pc_paper");
const userScissor = document.querySelector("#user_scissor");
const pcScissor = document.querySelector("#pc_scissor");
const userOptions = document.querySelector(".user_options");
const pcOptions = document.querySelector(".pc_options");
const nextButton = document.querySelector(".next_button");
const rulesButton = document.querySelector(".rules_button");
const GameScreen = document.querySelector(".Game_page");
const HurrayPage = document.querySelector(".Hurray_page");
const NewGamePlayAgainButton = document.querySelector(".new_game_button");
const rulesDisplay = document.querySelector(".RULES");
const crossButton = document.querySelector(".cross");

// Function to get scores from local storage
const updateScoreDisplay = () => {
  const scoreJSON = localStorage.getItem("score");
  const updatedScore = scoreJSON ? JSON.parse(scoreJSON) : { user: 0, computer: 0 };
  computerScoreDisplay.innerText = updatedScore.computer;
  userScoreDisplay.innerText = updatedScore.user;
};
updateScoreDisplay();

// Helper function to get the value of the key
const valueOfKey = (name) =>
  name === "paper" ? 2 : name === "scissors" ? 3 : 1;

// Helper function to get a random number between 1 and 3
const getRandomNumber = () =>
  Math.floor(Math.random() * 3) + 1;

// Helper function to determine the winner
const determineWinner = (userPicked, compPicked) => {
  if (userPicked === compPicked) {
    return "tie";
  } else if (
    (userPicked === 1 && compPicked === 3) ||
    (userPicked === 2 && compPicked === 1) ||
    (userPicked === 3 && compPicked === 2)
  ) {
    return "user";
  } else {
    return "comp";
  }
};

// Helper function to update the scores in local storage
const updateScore = (Result) => {
  const scoreJSON = localStorage.getItem("score");
  const score = scoreJSON ? JSON.parse(scoreJSON) : { user: 0, computer: 0 };

  if (Result === "user") {
    score.user += 1;
  } else if (Result === "comp") {
    score.computer += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreDisplay();
};

// Helper function to update the result sides
const updateResultSides = (userPicked, compPicked) => {
  const userIcons = [userRock, userPaper, userScissor];
  const pcIcons = [pcRock, pcPaper, pcScissor];

  userIcons.forEach((icon, index) => {
    icon.style.display = userPicked === index + 1 ? "flex" : "none";
  });

  pcIcons.forEach((icon, index) => {
    icon.style.display = compPicked === index + 1 ? "flex" : "none";
  });
};

// Helper function to update the result zone
const updateResultZone = (Result, userPicked, compPicked) => {
  gameZone.style.display = "none";
  resultZone.style.display = "flex";

  winMessage.style.display = Result === "user" ? "block" : "none";
  lostMessage.style.display = Result === "comp" ? "block" : "none";
  tieMessage.style.display = Result === "tie" ? "block" : "none";
  subMessage.style.display = "block";
  playAgainButton.style.display = Result ==="tie" ? "none" : "block";
  replayButton.style.display = Result === "tie" ? "block" : "none";
  nextButton.style.display = Result === "user" ? "inline" : "none";

  updateResultSides(userPicked, compPicked);

  userOptions.classList.toggle("shadow", Result === "user");
  pcOptions.classList.toggle("shadow", Result === "comp");
};

// Event handler for key click
const keyClickHander = (event) => {
  const keyClicked = event.target.closest(".icon");

  if (keyClicked) {
    const userPicked = valueOfKey(keyClicked.id);
    const compPicked = getRandomNumber();
    const result = determineWinner(userPicked, compPicked);
    updateScore(result);
    updateResultZone(result, userPicked, compPicked);
  }
};

// Event handler for play again button
const playAgainHandler = () => {
  gameZone.style.display = "flex";
  resultZone.style.display = "none";
  GameScreen.style.display = "block";
  HurrayPage.style.display = "none";
};

// Event handler for next button
const nextPageHandler = () => {
  GameScreen.style.display = "none";
  HurrayPage.style.display = "flex";
  nextButton.style.display = "none";
};

// Event handler for rules button
const showRulesHandler = () => {
  crossButton.style.display = "flex";
  rulesDisplay.style.display = "flex";
};

// Event handler for cross button
const removeRulesHandler = () => {
  crossButton.style.display = "none";
  rulesDisplay.style.display = "none";
};

keys.forEach((key) => key.addEventListener("click", keyClickHander));
replayButton.addEventListener("click", playAgainHandler);
playAgainButton.addEventListener("click", playAgainHandler);
nextButton.addEventListener("click", nextPageHandler);
NewGamePlayAgainButton.addEventListener("click", playAgainHandler);
rulesButton.addEventListener("click", showRulesHandler);
crossButton.addEventListener("click", removeRulesHandler);