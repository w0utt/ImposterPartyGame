import { GAME_CONFIG, MODES } from "./config.js";
import { state } from "./state.js";
import { screens, showScreen } from "./dom.js";

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function setupGame(players, mode) {
  state.players = players;
  state.gameMode = mode;
  state.currentIndex = 0;
  state.imposterIndex = Math.floor(Math.random() * players.length);
  state.answers = new Array(players.length).fill("");

  if (mode === MODES.CATEGORIES) {
    state.category = randomItem(GAME_CONFIG.categories);
    state.secretWord = randomItem(state.category.woorden);
    state.promptPair = null;
  } else {
    state.promptPair = randomItem(GAME_CONFIG.prompts);
    state.category = null;
    state.secretWord = "";
  }

  showScreen(screens.reveal);
}
