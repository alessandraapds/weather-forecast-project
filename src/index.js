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
currentWeekDay.innerHTML = `${days[now.getDay()]}, ${now.getHours()}:${String(
  now.getMinutes()
).padStart(2, "0")}`;

console.log(now.getHours());
console.log(now.getMinutes());

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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index >= 1 && index <= 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
            <span class="day-week" id="day-plus-1">${formatDay(
              forecastDay.dt
            )}</span>
            <br />
            <span ><img class="emoji"
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          
        /></span>
            <br />
            <span class="max-temperature">${Math.round(
              forecastDay.temp.max
            )} °C</span>
            <br />
            <span class="min-temperature">${Math.round(
              forecastDay.temp.min
            )}°C</span>
          </div>
   `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "962ca7dddb46b66aa536e2a7464b8168";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// Foo

function showTemperature(response) {
  let finalIcon = document.querySelector("#current-icon");
  let realIcon = response.data.weather[0].icon;
  let iconURL = `http://openweathermap.org/img/wn/${realIcon}@2x.png`;
  finalIcon.setAttribute("src", `${iconURL}`);

  celsiusTemperature = Math.round(response.data.main.temp);

  let finalTemp = document.querySelector("#current-temp");
  let realTemp = Math.round(response.data.main.temp);
  finalTemp.innerHTML = `<strong>${realTemp}</strong>`;

  let finalWind = document.querySelector("#current-wind");
  let realWind = Math.round(response.data.wind.speed);
  finalWind.innerHTML = `Wind: ${realWind}km/h`;

  let finalHumidity = document.querySelector("#current-humitidy");
  let realHumidity = Math.round(response.data.main.humidity);
  finalHumidity.innerHTML = `Humidity: ${realHumidity}%`;

  let finalAlert = document.querySelector("#alert-text");
  let realAlert = response.data.weather[0].description;
  finalAlert.innerHTML = capitalizeFirstLetter(`${realAlert}`);

  getForecast(response.data.coord);
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
  let finalIcon = document.querySelector("#current-icon");
  let realIcon = response.data.weather[0].icon;
  let iconURL = `http://openweathermap.org/img/wn/${realIcon}@2x.png`;
  finalIcon.setAttribute("src", `${iconURL}`);

  celsiusTemperature = Math.round(response.data.main.temp);

  let finalTemp = document.querySelector("#current-temp");
  let realTemp = Math.round(response.data.main.temp);
  finalTemp.innerHTML = `<strong>${realTemp}</strong>`;

  let finalWind = document.querySelector("#current-wind");
  let realWind = Math.round(response.data.wind.speed);
  finalWind.innerHTML = `Wind: ${realWind}km/h`;

  let finalHumidity = document.querySelector("#current-humitidy");
  let realHumidity = Math.round(response.data.main.humidity);
  finalHumidity.innerHTML = `Humidity: ${realHumidity}%`;

  let finalAlert = document.querySelector("#alert-text");
  let realAlert = response.data.weather[0].description;
  finalAlert.innerHTML = capitalizeFirstLetter(`${realAlert}`);

  let city = document.querySelector("#city");
  city.innerHTML = capitalizeFirstLetter(`${response.data.name}`);

  getForecast(response.data.coord);
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

function changeToCelsius(event) {
  event.preventDefault();
  let finalTemp = document.querySelector("#current-temp");
  finalTemp.innerHTML = `<strong>${celsiusTemperature}</strong>`;
}

let celsiusLink = document.querySelector("#current-temperature-celsius");
celsiusLink.addEventListener("click", changeToCelsius);

let celsiusTemperature = null;

function changeToFahrenheit(event) {
  event.preventDefault();
  let finalTemp = document.querySelector("#current-temp");
  let tempFahrenheit = Math.round((celsiusTemperature * 9) / 5 + 32);
  finalTemp.innerHTML = `<strong>${tempFahrenheit}</strong>`;
}

let fahrenheitLink = document.querySelector("#current-temperature-fahreinheit");
fahrenheitLink.addEventListener("click", changeToFahrenheit);
