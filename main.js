import { setupGame } from "./game.js";
import { MODES } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startGameBtn");

  if (startBtn) {
    startBtn.addEventListener("click", () => {
      setupGame(
        ["Speler 1", "Speler 2", "Speler 3"],
        MODES.CATEGORIES
      );
    });
  }
});
