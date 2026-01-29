import { GAME_CONFIG, MODES } from "./config.js";
import { state } from "./state.js";
import { screens, showScreen } from "./dom.js";

/* =========================
   Helpers
========================= */

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* =========================
   Game setup
========================= */

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

/* =========================
   Render role (dispatcher)
========================= */

export function renderRole(currentIndex, roleContainer) {
  roleContainer.innerHTML = "";

  if (state.gameMode === MODES.PROMPT) {
    roleContainer.appendChild(renderPromptRole(currentIndex));
    return;
  }

  // ⬇️ CATEGORIES modus blijft exact zoals vroeger
  roleContainer.appendChild(renderCategoryRole(currentIndex));
}

/* =========================
   PROMPT mode (GEEN imposter info)
========================= */

function renderPromptRole(currentIndex) {
  const isImposter = currentIndex === state.imposterIndex;

  const box = document.createElement("div");
  box.className = "word-display";

  const title = document.createElement("div");
  title.className = "question-title";
  title.textContent = "Jouw vraag:";
  box.appendChild(title);

  const question = document.createElement("div");
  question.className = "question";
  question.textContent = isImposter
    ? state.promptPair.imposter
    : state.promptPair.publiek;
  box.appendChild(question);

  const hint = document.createElement("div");
  hint.className = "small";
  hint.style.marginTop = "6px";
  hint.textContent =
    "Beantwoord deze vraag eerlijk. Mogelijk heeft iemand een andere vraag.";
  box.appendChild(hint);

  const answerLabel = document.createElement("div");
  answerLabel.className = "small";
  answerLabel.style.marginTop = "8px";
  answerLabel.textContent = "Typ hier (optioneel) je antwoord:";
  box.appendChild(answerLabel);

  const textarea = document.createElement("textarea");
  textarea.id = "answerInput";
  textarea.placeholder = "Jouw antwoord...";
  textarea.value = state.answers[currentIndex] || "";
  box.appendChild(textarea);

  return box;
}

/* =========================
   CATEGORIES mode (ongewijzigd)
========================= */

function renderCategoryRole(currentIndex) {
  const isImposter = currentIndex === state.imposterIndex;

  if (isImposter) {
    const box = document.createElement("div");
    box.className = "imposter-display";

    const title = document.createElement("div");
    title.className = "title";
    title.textContent = "JIJ BENT DE IMPOSTER 😈";
    box.appendChild(title);

    const theme = document.createElement("div");
    theme.className = "theme";
    theme.textContent = "Thema: " + state.category.naam;
    box.appendChild(theme);

    const text = document.createElement("div");
    text.className = "text";
    text.innerHTML =
      "De andere spelers krijgen een geheim woord.<br>" +
      "Jij ziet het woord niet. Luister goed en probeer niet op te vallen.";
    box.appendChild(text);

    return box;
  }

  const box = document.createElement("div");
  box.className = "word-display";

  const theme = document.createElement("div");
  theme.className = "theme";
  theme.textContent = "Thema: " + state.category.naam;
  box.appendChild(theme);

  const word = document.createElement("div");
  word.className = "word";
  word.textContent = state.secretWord;
  box.appendChild(word);

  const hint = document.createElement("div");
  hint.className = "small";
  hint.style.marginTop = "6px";
  hint.textContent = "Onthoud dit woord. Eén speler kent het woord niet.";
  box.appendChild(hint);

  return box;
}
