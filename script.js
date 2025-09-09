let is24Hour = true;

function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  let ampm = "";
  if (!is24Hour) {
    ampm = hours >= 12 ? " PM" : " AM";
    hours = hours % 12 || 12;
  }

  const timeStr = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}${ampm}`;
  document.getElementById("time").innerText = timeStr;

  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const dateStr = now.toLocaleDateString("en-US", options);
  document.getElementById("date").innerText = dateStr;
}

function padZero(num) {
  return num < 10 ? "0" + num : num;
}

setInterval(updateClock, 1000);
updateClock();

// Toggle 12H / 24H
document.getElementById("toggleFormat").addEventListener("click", () => {
  is24Hour = !is24Hour;
  document.getElementById("toggleFormat").innerText = is24Hour ? "Switch to 12H" : "Switch to 24H";
  updateClock();
});

// Toggle Theme
document.getElementById("toggleTheme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const btn = document.getElementById("toggleTheme");
  btn.innerText = document.body.classList.contains("dark") ? "Light" : "Dark";
});
