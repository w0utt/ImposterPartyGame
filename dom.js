export const screens = {
  setup: document.getElementById("setup-screen"),
  reveal: document.getElementById("reveal-screen"),
  end: document.getElementById("end-screen")
};

export function showScreen(screen) {
  Object.values(screens).forEach(s => s.classList.add("hidden"));
  screen.classList.remove("hidden");
}
