function refreshWeather(response) {
  let currentTemperatureElement = document.querySelector(
    "#current-temperature"
  );
  let currentTemperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let weatherConditionsElement = document.querySelector("#weather-conditions");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let currentTimeElement = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);
  let iconImageElement = document.querySelector("#icon-image");

  cityElement.innerHTML = response.data.city;
  currentTimeElement.innerHTML = formatDate(date);
  weatherConditionsElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}mph`;
  currentTemperatureElement.innerHTML = Math.round(
    response.data.temperature.current
  );
  iconImageElement.innerHTML = `<img src=${response.data.condition.icon_url} class="current-temperature-icon"/>`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "cbfa4f3bo097d8bbfbd63t0a17f12af3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(refreshWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search-input");

  searchCity(searchInput.value);
}

let citySearchElement = document.querySelector("#city-search");
citySearchElement.addEventListener("submit", searchSubmit);

displayForecast();
