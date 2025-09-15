let is24Hour = true;
let timer;

const countries = [
  {name: "Afghanistan", timezone: "Asia/Kabul"},
  {name: "Albania", timezone: "Europe/Tirane"},
  {name: "Algeria", timezone: "Africa/Algiers"},
  {name: "Andorra", timezone: "Europe/Andorra"},
  {name: "Angola", timezone: "Africa/Luanda"},
  {name: "Argentina", timezone: "America/Argentina/Buenos_Aires"},
  {name: "Australia", timezone: "Australia/Sydney"},
  {name: "Austria", timezone: "Europe/Vienna"},
  {name: "Azerbaijan", timezone: "Asia/Baku"},
  {name: "Bahamas", timezone: "America/Nassau"},
  {name: "Bahrain", timezone: "Asia/Bahrain"},
  {name: "Bangladesh", timezone: "Asia/Dhaka"},
  {name: "Barbados", timezone: "America/Barbados"},
  {name: "Belarus", timezone: "Europe/Minsk"},
  {name: "Belgium", timezone: "Europe/Brussels"},
  {name: "Belize", timezone: "America/Belize"},
  {name: "Benin", timezone: "Africa/Porto-Novo"},
  {name: "Bhutan", timezone: "Asia/Thimphu"},
  {name: "Bolivia", timezone: "America/La_Paz"},
  {name: "Bosnia and Herzegovina", timezone: "Europe/Sarajevo"},
  {name: "Botswana", timezone: "Africa/Gaborone"},
  {name: "Brazil", timezone: "America/Sao_Paulo"},
  {name: "Brunei", timezone: "Asia/Brunei"},
  {name: "Bulgaria", timezone: "Europe/Sofia"},
  {name: "Burkina Faso", timezone: "Africa/Ouagadougou"},
  {name: "Cambodia", timezone: "Asia/Phnom_Penh"},
  {name: "Cameroon", timezone: "Africa/Douala"},
  {name: "Canada", timezone: "America/Toronto"},
  {name: "China", timezone: "Asia/Shanghai"},
  {name: "Denmark", timezone: "Europe/Copenhagen"},
  {name: "Egypt", timezone: "Africa/Cairo"},
  {name: "France", timezone: "Europe/Paris"},
  {name: "Germany", timezone: "Europe/Berlin"},
  {name: "India", timezone: "Asia/Kolkata"},
  {name: "Italy", timezone: "Europe/Rome"},
  {name: "Japan", timezone: "Asia/Tokyo"},
  {name: "Mexico", timezone: "America/Mexico_City"},
  {name: "Netherlands", timezone: "Europe/Amsterdam"},
  {name: "Norway", timezone: "Europe/Oslo"},
  {name: "Pakistan", timezone: "Asia/Karachi"},
  {name: "Russia", timezone: "Europe/Moscow"},
  {name: "South Africa", timezone: "Africa/Johannesburg"},
  {name: "Spain", timezone: "Europe/Madrid"},
  {name: "Sweden", timezone: "Europe/Stockholm"},
  {name: "Switzerland", timezone: "Europe/Zurich"},
  {name: "United Kingdom", timezone: "Europe/London"},
  {name: "United States", timezone: "America/New_York"}
  
];

const input = document.getElementById('countryInput');
const suggestions = document.getElementById('suggestions');
const countryNameEl = document.getElementById('countryName');
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');

input.addEventListener('input', () => {
  const query = input.value.toLowerCase();
  suggestions.innerHTML = '';
  if(query.length === 0) return;

  const matches = countries.filter(c => c.name.toLowerCase().includes(query)).slice(0,5);
  matches.forEach(c => {
    const li = document.createElement('li');
    li.textContent = c.name;
    li.addEventListener('click', () => selectCountry(c));
    suggestions.appendChild(li);
  });
});

input.addEventListener('keypress', (e) => {
  if(e.key === 'Enter') {
    const country = countries.find(c => c.name.toLowerCase() === input.value.toLowerCase());
    if(country) selectCountry(country);
  }
});

function selectCountry(c) {
  input.value = c.name;
  suggestions.innerHTML = '';
  countryNameEl.textContent = 'Country: ' + c.name;
  startClock(c.timezone);
}

function startClock(timezone) {
  clearInterval(timer);
  function update() {
    const now = new Date();
    const optionsTime = {hour:'numeric', minute:'numeric', second:'numeric', hour12: !is24Hour, timeZone: timezone};
    const optionsDate = {weekday:'long', year:'numeric', month:'long', day:'numeric', timeZone: timezone};
    timeEl.textContent = new Intl.DateTimeFormat([], optionsTime).format(now);
    dateEl.textContent = new Intl.DateTimeFormat([], optionsDate).format(now);
  }
  update();
  timer = setInterval(update, 1000);
}

document.getElementById('toggleFormat').addEventListener('click', () => {
  is24Hour = !is24Hour;
  const timezone = countries.find(c => c.name === input.value)?.timezone || 'Asia/Kolkata';
  startClock(timezone);
});

document.getElementById('toggleTheme').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.getElementById('toggleTheme').innerText = document.body.classList.contains('dark') ? 'Light' : 'Dark';
});

const defaultCountry = countries.find(c => c.name === "India");
input.value = defaultCountry.name;
countryNameEl.textContent = 'Country: ' + defaultCountry.name;
startClock(defaultCountry.timezone);
