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

  getForecast(response.data.city);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "cbfa4f3bo097d8bbfbd63t0a17f12af3";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="forecast-details">
        <div class="weather-forecast-day">${formatDay(day.time)}</div>
        <div >
				  <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
				</div>
        <div class="weather-forecast-temps">
          <div class="weather-forecast-temp"><strong>${Math.round(
            day.temperature.maximum
          )}°</strong></div>
          <div class="weather-forecast-temp">${Math.round(
            day.temperature.minimum
          )}°</div>
        </div>
      </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let citySearchElement = document.querySelector("#city-search");
citySearchElement.addEventListener("submit", searchSubmit);

searchCity("Paris");
