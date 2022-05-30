// Feature #1

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentWeekDay = document.querySelector("#current-week-day");
currentWeekDay.innerHTML = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let currentMonth = months[now.getMonth()];
let currentYear = now.getFullYear();
let currentDay = now.getDate();

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${currentMonth} ${currentDay}, ${currentYear}`;

// Feature #2
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Foo

function showTemperature(response) {
  let finalTemp = document.querySelector("#current-temp");
  let realTemp = Math.round(response.data.main.temp);
  finalTemp.innerHTML = `🌤️ ${realTemp} °C`;

  let finalWind = document.querySelector("#current-wind");
  let realWind = Math.round(response.data.wind.speed);
  finalWind.innerHTML = `Wind: ${realWind}km/h`;

  let finalHumidity = document.querySelector("#current-humitidy");
  let realHumidity = Math.round(response.data.main.humidity);
  finalHumidity.innerHTML = `Humidity: ${realHumidity}%`;
}

function displayCityName(event) {
  event.preventDefault();
  let citySearched = document.querySelector("#city-searched");
  let city = document.querySelector("#city");
  city.innerHTML = capitalizeFirstLetter(`${citySearched.value}`);

  // Real data for temperature
  let apiKey = "962ca7dddb46b66aa536e2a7464b8168";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.innerHTML}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

let citySearchButton = document.querySelector("#search-form");
citySearchButton.addEventListener("submit", displayCityName);

// Show temperature based on current location
function showCurrentLocationTemperature(response) {
  let finalTemp = document.querySelector("#current-temp");
  let realTemp = Math.round(response.data.main.temp);
  finalTemp.innerHTML = `🌤️${realTemp} °C`;

  let city = document.querySelector("#city");
  city.innerHTML = capitalizeFirstLetter(`${response.data.name}`);
}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  // Real data for temperature based on location
  let apiKey = "962ca7dddb46b66aa536e2a7464b8168";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCurrentLocationTemperature);
}

function getActualPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("#button-current-location");
button.addEventListener("click", getActualPosition);
