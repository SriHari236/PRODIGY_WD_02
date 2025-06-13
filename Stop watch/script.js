let startTime = 0;
let elapsedTime = 0;
let interval;
let running = false;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const lapsContainer = document.getElementById("laps");

function updateDisplay() {
  const time = elapsedTime;
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = time % 1000;

  display.textContent =
    `${String(hours).padStart(2, '0')}:` +
    `${String(minutes).padStart(2, '0')}:` +
    `${String(seconds).padStart(2, '0')}.` +
    `${String(milliseconds).padStart(3, '0')}`;
}

function toggleStartPause() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    interval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    startBtn.textContent = "⏸ Pause";
    running = true;
  } else {
    clearInterval(interval);
    running = false;
    startBtn.textContent = "▶ Start";
  }
}

function resetStopwatch() {
  clearInterval(interval);
  running = false;
  elapsedTime = 0;
  updateDisplay();
  startBtn.textContent = "▶ Start";
  lapsContainer.innerHTML = "";
}

function recordLap() {
  if (!running) return;

  const li = document.createElement("li");
  li.textContent = `Lap: ${display.textContent}`;
  lapsContainer.appendChild(li);
}

function clearLaps() {
  lapsContainer.innerHTML = "";
}
