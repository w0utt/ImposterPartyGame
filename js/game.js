// =====================================================

const MODES = {
  CATEGORIES: "categories",
  PROMPT: "prompt"
};

// DOM - Main Menu
const mainMenuScreen = document.getElementById("main-menu-screen");
const localGameBtn = document.getElementById("localGameBtn");
const hostGameBtn = document.getElementById("hostGameBtn");
const joinGameBtn = document.getElementById("joinGameBtn");

// DOM - Host Setup
const hostSetupScreen = document.getElementById("host-setup-screen");
const hostNameInput = document.getElementById("hostName");
const createRoomBtn = document.getElementById("createRoomBtn");
const backFromHostBtn = document.getElementById("backFromHostBtn");

// DOM - Join Setup
const joinSetupScreen = document.getElementById("join-setup-screen");
const joinNameInput = document.getElementById("joinName");
const roomCodeInput = document.getElementById("roomCode");
const joinRoomBtn = document.getElementById("joinRoomBtn");
const backFromJoinBtn = document.getElementById("backFromJoinBtn");

// DOM - Waiting Room
const waitingRoomScreen = document.getElementById("waiting-room-screen");
const displayedRoomCode = document.getElementById("displayedRoomCode");
const playersListDiv = document.getElementById("playersList");
const hostControls = document.getElementById("hostControls");
const startMultiplayerGameBtn = document.getElementById("startMultiplayerGameBtn");
const leaveRoomBtn = document.getElementById("leaveRoomBtn");
const connectionStatus = document.getElementById("connectionStatus");

// DOM - Setup/Game screens
const setupScreen = document.getElementById("setup-screen");
const revealScreen = document.getElementById("reveal-screen");
const endScreen = document.getElementById("end-screen");

const playerCountInput = document.getElementById("playerCount");
const namesContainer = document.getElementById("namesContainer");
const startGameBtn = document.getElementById("startGameBtn");

const revealInstruction = document.getElementById("reveal-step-instruction");
const roleContainer = document.getElementById("roleContainer");
const primaryRevealBtn = document.getElementById("primaryRevealBtn");
const restartFromRevealBtn = document.getElementById("restartFromRevealBtn");

const playAgainSamePlayersBtn = document.getElementById("playAgainSamePlayersBtn");
const newSetupBtn = document.getElementById("newSetupBtn");
const endSummary = document.getElementById("end-summary");
const endMainText = document.getElementById("end-main-text");

const modeGroup = document.getElementById("modeGroup");
const modeRadioInputs = document.querySelectorAll("input[name='mode']");

const showAnswersBtn = document.getElementById("showAnswersBtn");
const answersContainer = document.getElementById("answersContainer");

// State
let players = [];
let imposterIndex = null;
let currentIndex = 0;
let category = null;
let secretWord = "";
let promptPair = null;
let rolesRevealed = false;
let gameMode = MODES.CATEGORIES;
let answers = []; // per speler antwoord (vraag-modus)
let isMultiplayer = false; // Track if we're in multiplayer mode

// Helpers
function showScreen(screen) {
  mainMenuScreen.classList.add("hidden");
  hostSetupScreen.classList.add("hidden");
  joinSetupScreen.classList.add("hidden");
  waitingRoomScreen.classList.add("hidden");
  setupScreen.classList.add("hidden");
  revealScreen.classList.add("hidden");
  endScreen.classList.add("hidden");
  screen.classList.remove("hidden");
}

function initNameInputs(count) {
  namesContainer.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const row = document.createElement("div");
    row.className = "name-row";
    const label = document.createElement("span");
    label.textContent = (i + 1) + ".";
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Naam speler " + (i + 1);
    input.dataset.index = i;
    row.appendChild(label);
    row.appendChild(input);
    namesContainer.appendChild(row);
  }
}

function getPlayerNamesFromInputs() {
  const inputs = namesContainer.querySelectorAll("input[type='text']");
  const names = [];
  inputs.forEach((input, index) => {
    const raw = input.value.trim();
    if (raw.length === 0) {
      names.push("Speler " + (index + 1));
    } else {
      names.push(raw);
    }
  });
  return names;
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getSelectedMode() {
  let value = MODES.CATEGORIES;
  modeRadioInputs.forEach(r => {
    if (r.checked) value = r.value;
  });
  return value;
}

function setupGameState(useExistingPlayers = false) {
  if (!useExistingPlayers) {
    const count = parseInt(playerCountInput.value, 10);
    if (isNaN(count) || count < 3) {
      alert("Gebruik minimaal 3 spelers.");
      return false;
    }
    players = getPlayerNamesFromInputs().slice(0, count);
  }

  gameMode = useExistingPlayers ? gameMode : getSelectedMode();

  imposterIndex = Math.floor(Math.random() * players.length);
  answers = new Array(players.length).fill("");

  if (gameMode === MODES.CATEGORIES) {
    category = randomItem(GAME_CONFIG.categories);
    secretWord = randomItem(category.woorden);
    promptPair = null;
  } else {
    promptPair = randomItem(GAME_CONFIG.prompts);
    category = null;
    secretWord = "";
  }

  currentIndex = 0;
  rolesRevealed = false;

  // reset answer view
  answersContainer.classList.add("hidden");
  answersContainer.innerHTML = "";
  showAnswersBtn.classList.add("hidden");

  return true;
}

function renderRevealInstruction() {
  const name = players[currentIndex];
  revealInstruction.innerHTML = `Geef de telefoon aan <span class="player-highlight">${name}</span>.`;
}

function renderRole() {
  roleContainer.innerHTML = "";
  const isImposter = currentIndex === imposterIndex;

  if (gameMode === MODES.CATEGORIES) {
    if (isImposter) {
      const box = document.createElement("div");
      box.className = "imposter-display";

      const title = document.createElement("div");
      title.className = "title";
      title.textContent = "JIJ BENT DE IMPOSTER 😈";
      box.appendChild(title);

      const theme = document.createElement("div");
      theme.className = "theme";
      theme.textContent = "Thema: " + category.naam;
      box.appendChild(theme);

      const text = document.createElement("div");
      text.className = "text";
      text.innerHTML =
        "De andere spelers krijgen een geheim woord (persoon, land, stad, merk, ...).<br>" +
        "Jij ziet het woord niet. Luister goed, stel vragen, en probeer niet op te vallen.";
      box.appendChild(text);

      roleContainer.appendChild(box);
    } else {
      const box = document.createElement("div");
      box.className = "word-display";

      const theme = document.createElement("div");
      theme.className = "theme";
      theme.textContent = "Thema: " + category.naam;
      box.appendChild(theme);

      const word = document.createElement("div");
      word.className = "word";
      word.textContent = secretWord;
      box.appendChild(word);

      const hint = document.createElement("div");
      hint.className = "small";
      hint.style.marginTop = "6px";
      hint.textContent = "Onthoud dit woord. De Imposter kent het woord niet.";
      box.appendChild(hint);

      roleContainer.appendChild(box);
    }
  } else {
    // vraag-modus
    if (isImposter) {
      const box = document.createElement("div");
      box.className = "word-display";

      const title = document.createElement("div");
      title.className = "question-title";
      title.textContent = "Jouw vraag:";
      box.appendChild(title);

      const question = document.createElement("div");
      question.className = "question";
      question.textContent = promptPair.imposter;
      box.appendChild(question);

      const hint = document.createElement("div");
      hint.className = "small";
      hint.style.marginTop = "6px";
      hint.textContent = "Onthoud je antwoord. Er zit één Imposter met een andere vraag.";
      box.appendChild(hint);

      const answerLabel = document.createElement("div");
      answerLabel.className = "small";
      answerLabel.style.marginTop = "8px";
      answerLabel.textContent = "Typ hier (eventueel) jouw antwoord:";
      box.appendChild(answerLabel);

      const textarea = document.createElement("textarea");
      textarea.id = "answerInput";
      textarea.placeholder = "Bijv. mijn antwoord op deze vraag...";
      textarea.value = answers[currentIndex] || "";
      box.appendChild(textarea);

      roleContainer.appendChild(box);
    } else {
      const box = document.createElement("div");
      box.className = "word-display";

      const title = document.createElement("div");
      title.className = "question-title";
      title.textContent = "Jouw vraag:";
      box.appendChild(title);

      const question = document.createElement("div");
      question.className = "question";
      question.textContent = promptPair.publiek;
      box.appendChild(question);

      const hint = document.createElement("div");
      hint.className = "small";
      hint.style.marginTop = "6px";
      hint.textContent = "Onthoud je antwoord. Er zit één Imposter met een andere vraag.";
      box.appendChild(hint);

      const answerLabel = document.createElement("div");
      answerLabel.className = "small";
      answerLabel.style.marginTop = "8px";
      answerLabel.textContent = "Typ hier (eventueel) jouw antwoord:";
      box.appendChild(answerLabel);

      const textarea = document.createElement("textarea");
      textarea.id = "answerInput";
      textarea.placeholder = "Bijv. mijn antwoord op deze vraag...";
      textarea.value = answers[currentIndex] || "";
      box.appendChild(textarea);

      roleContainer.appendChild(box);
    }
  }
}

function goToRevealScreen() {
  showScreen(revealScreen);
  roleContainer.classList.add("hidden");
  primaryRevealBtn.textContent = "Toon rol";
  renderRevealInstruction();
}

function handlePrimaryRevealClick() {
  const roleHidden = roleContainer.classList.contains("hidden");

  if (roleHidden) {
    // Toon rol van huidige speler
    renderRole();
    roleContainer.classList.remove("hidden");
    primaryRevealBtn.textContent =
      currentIndex === players.length - 1
        ? "Verberg en start het spel"
        : "Verberg en geef door";
  } else {
    // Bij vraag-modus eerst antwoord opslaan (als ingevuld)
    if (gameMode === MODES.PROMPT) {
      const input = document.getElementById("answerInput");
      if (input) {
        answers[currentIndex] = input.value.trim();
      }
    }

    // Verberg rol en ga naar volgende speler of einde
    roleContainer.classList.add("hidden");
    currentIndex++;

    if (currentIndex >= players.length) {
      rolesRevealed = true;
      showEndScreen();
    } else {
      renderRevealInstruction();
      primaryRevealBtn.textContent = "Toon rol";
    }
  }
}

function buildAnswersView() {
  answersContainer.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "answers-list";

  const title = document.createElement("h3");
  if (gameMode === MODES.PROMPT) {
    title.textContent = `Antwoorden per speler (vraag-modus)`;
  } else {
    title.textContent = `Antwoorden per speler`;
  }
  wrapper.appendChild(title);

  if (gameMode === MODES.PROMPT && promptPair) {
    const info = document.createElement("div");
    info.className = "small";
    info.style.marginBottom = "6px";
    info.textContent =
      `Vraag voor de meeste spelers: "${promptPair.publiek}". Eén Imposter had een andere vraag.`;
    wrapper.appendChild(info);
  }

  const list = document.createElement("ul");

  players.forEach((name, index) => {
    const li = document.createElement("li");
    const label = `${name}: `;
    const answerText = answers[index] && answers[index].length > 0
      ? answers[index]
      : "(geen antwoord ingegeven)";
    li.textContent = label + answerText;
    list.appendChild(li);
  });

  wrapper.appendChild(list);
  answersContainer.appendChild(wrapper);
}

function showEndScreen() {
  showScreen(endScreen);
  answersContainer.classList.add("hidden");
  answersContainer.innerHTML = "";

  if (gameMode === MODES.CATEGORIES) {
    endMainText.innerHTML =
      "Alle spelers kennen nu hun rol.<br />Bespreek hints over het woord en probeer de Imposter te vinden.";
    endSummary.textContent =
      `Thema was: "${category.naam}". Eén speler is Imposter en kent het geheime woord niet.`;
    showAnswersBtn.classList.add("hidden");
  } else {
    endMainText.innerHTML =
      "Alle spelers kennen nu hun rol.<br />Beantwoord de vraag hardop en probeer te raden wie een andere vraag heeft.";
    endSummary.textContent =
      `Vraag-modus: de meeste spelers kregen: "${promptPair.publiek}". Eén Imposter kreeg een andere vraag.`;
    showAnswersBtn.classList.remove("hidden");
  }
}

function showSetupScreen() {
  showScreen(setupScreen);
}

// Events
modeGroup.addEventListener("click", (e) => {
  const option = e.target.closest(".mode-option");
  if (!option) return;
  const radio = option.querySelector("input[type='radio']");
  if (radio) {
    radio.checked = true;
    document.querySelectorAll(".mode-option").forEach(o => o.classList.remove("active"));
    option.classList.add("active");
  }
});

playerCountInput.addEventListener("change", () => {
  let count = parseInt(playerCountInput.value, 10);
  if (isNaN(count) || count < 1) count = 1;
  if (count > 12) count = 12;
  playerCountInput.value = count;
  initNameInputs(count);
});

startGameBtn.addEventListener("click", () => {
  if (!setupGameState(false)) return;
  goToRevealScreen();
});

primaryRevealBtn.addEventListener("click", handlePrimaryRevealClick);

restartFromRevealBtn.addEventListener("click", () => {
  showSetupScreen();
});

playAgainSamePlayersBtn.addEventListener("click", () => {
  if (!setupGameState(true)) return;
  goToRevealScreen();
});

newSetupBtn.addEventListener("click", () => {
  showSetupScreen();
});

showAnswersBtn.addEventListener("click", () => {
  if (answersContainer.classList.contains("hidden")) {
    buildAnswersView();
    answersContainer.classList.remove("hidden");
    showAnswersBtn.textContent = "Verberg antwoorden";
  } else {
    answersContainer.classList.add("hidden");
    showAnswersBtn.textContent = "Toon antwoorden";
  }
});

// Init
initNameInputs(parseInt(playerCountInput.value, 10));

// Show main menu on load
showScreen(mainMenuScreen);

// =====================================================
// Multiplayer Event Handlers
// =====================================================

// Main Menu
localGameBtn.addEventListener("click", () => {
  isMultiplayer = false;
  showScreen(setupScreen);
});

hostGameBtn.addEventListener("click", () => {
  MULTIPLAYER.init();
  showScreen(hostSetupScreen);
});

joinGameBtn.addEventListener("click", () => {
  MULTIPLAYER.init();
  showScreen(joinSetupScreen);
});

// Host Setup
createRoomBtn.addEventListener("click", async () => {
  const name = hostNameInput.value.trim();
  if (!name) {
    alert("Vul je naam in");
    return;
  }
  
  // For demo mode without Firebase, generate immediate room code
  if (!MULTIPLAYER.db) {
    const roomCode = MULTIPLAYER.generateRoomCode();
    MULTIPLAYER.isHost = true;
    MULTIPLAYER.playerName = name;
    MULTIPLAYER.roomCode = roomCode;
    MULTIPLAYER.playerId = MULTIPLAYER.generatePlayerId();
    MULTIPLAYER.players = [{ id: MULTIPLAYER.playerId, name: name, isHost: true }];
    
    isMultiplayer = true;
    displayedRoomCode.textContent = roomCode;
    hostControls.classList.remove("hidden");
    updatePlayersListUI(MULTIPLAYER.players);
    showScreen(waitingRoomScreen);
    return;
  }
  
  const roomCode = await MULTIPLAYER.hostGame(name);
  if (!roomCode) return;
  
  isMultiplayer = true;
  
  // Show waiting room
  displayedRoomCode.textContent = roomCode;
  hostControls.classList.remove("hidden");
  updatePlayersListUI(MULTIPLAYER.players);
  showScreen(waitingRoomScreen);
});

backFromHostBtn.addEventListener("click", () => {
  showScreen(mainMenuScreen);
});

// Join Setup
joinRoomBtn.addEventListener("click", async () => {
  const name = joinNameInput.value.trim();
  const code = roomCodeInput.value.trim().toUpperCase();
  
  if (!name) {
    alert("Vul je naam in");
    return;
  }
  
  if (!code || code.length !== 6) {
    alert("Vul een geldige 6-cijferige code in");
    return;
  }
  
  // For demo mode without Firebase
  if (!MULTIPLAYER.db) {
    alert("Multiplayer vereist Firebase configuratie. Zie MULTIPLAYER_SETUP.md voor instructies.\n\nJe kunt wel het lokale spel gebruiken door op 'Terug' te klikken en 'Lokaal spel (één apparaat)' te selecteren.");
    return;
  }
  
  const success = await MULTIPLAYER.joinGame(name, code);
  if (success) {
    isMultiplayer = true;
    displayedRoomCode.textContent = code;
    hostControls.classList.add("hidden");
    showScreen(waitingRoomScreen);
  }
});

backFromJoinBtn.addEventListener("click", () => {
  showScreen(mainMenuScreen);
});

// Waiting Room
startMultiplayerGameBtn.addEventListener("click", () => {
  if (MULTIPLAYER.players.length < 3) {
    alert("Er zijn minimaal 3 spelers nodig om te starten");
    return;
  }
  
  // Notify all players that game is starting
  MULTIPLAYER.startGame();
  
  // Start game for host
  startMultiplayerGame();
});

leaveRoomBtn.addEventListener("click", () => {
  MULTIPLAYER.leaveRoom();
  isMultiplayer = false;
  playerCountInput.disabled = false;
  returnToMainMenu();
});

// Handle multiplayer game start
function startMultiplayerGame() {
  // Set up players from multiplayer list
  players = MULTIPLAYER.players.map(p => p.name);
  
  // Setup game and go to setup screen to choose mode
  showScreen(setupScreen);
  
  // Auto-fill player count
  playerCountInput.value = players.length;
  playerCountInput.disabled = true;
  
  // Fill in names
  initNameInputs(players.length);
  const nameInputs = namesContainer.querySelectorAll("input[type='text']");
  nameInputs.forEach((input, index) => {
    input.value = players[index];
    input.disabled = true;
  });
}

// Make function available to multiplayer.js
window.handleMultiplayerGameStart = startMultiplayerGame;

// Helper functions for multiplayer
function updatePlayersListUI(playersList) {
  playersListDiv.innerHTML = "";
  
  playersList.forEach((player, index) => {
    const div = document.createElement("div");
    div.className = "player-item";
    div.textContent = `${index + 1}. ${player.name}`;
    if (player.isHost) {
      div.textContent += " 👑";
    }
    playersListDiv.appendChild(div);
  });
}

function returnToMainMenu() {
  showScreen(mainMenuScreen);
  // Reset inputs
  hostNameInput.value = "";
  joinNameInput.value = "";
  roomCodeInput.value = "";
  playerCountInput.disabled = false;
}

// Make functions available to multiplayer.js
window.updatePlayersListUI = updatePlayersListUI;
window.returnToMainMenu = returnToMainMenu;
