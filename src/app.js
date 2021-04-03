function formatDate(timestamp) {
  //Sunday 13:50
  let date = new Date(timestamp);

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

  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }

  let minutes = date.getMinutes();
  if (minutes === 0) {
    minutes = minutes + "0";
  }

  return `${day} ${hours}:${minutes}`;
}

function setWeatherIcon(elementId, weather) {
  let weatherIconElement = document.querySelector(elementId);
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weather.icon}@2x.png`
  );
  weatherIconElement.setAttribute("alt", weather.main);
}

function fillData(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  temperature = response.data.main.temp;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  modifySelection(units);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity + "%";

  let windElement = document.querySelector("#wind");
  //imperial?
  windElement.innerHTML = Math.round(response.data.wind.speed) + "km/h";

  let pressureElement = document.querySelector("#pressure");
  pressureElement.innerHTML = response.data.main.pressure + "hPa";

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  setWeatherIcon("#main-weather-icon", response.data.weather[0]);
}

function modifySelection(units) {
  let fahrenHeitSymbolLink = document.querySelector("#fahrenheit-link");
  let celsiusSymbolLink = document.querySelector("#celsius-link");
  if (units === "metric") {
    celsiusSymbolLink.classList.add("selected-unit");
    fahrenHeitSymbolLink.classList.remove("selected-unit");
  } else {
    fahrenHeitSymbolLink.classList.add("selected-unit");
    celsiusSymbolLink.classList.remove("selected-unit");
  }
}

function search(cityName) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(fillData);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  let newCityName = cityInputElement.value;
  search(newCityName);
}

function convertTemperature(unit) {
  let temperatureElement = document.querySelector("#temperature");
  let currentTemperature;
  if ("imperial" === unit) {
    currentTemperature = Math.round((temperature * 9) / 5 + 32);
  } else {
    currentTemperature = Math.round(temperature);
  }
  temperatureElement.innerHTML = currentTemperature;
  modifySelection(unit);
}

function handleFahrenheitConversion(event) {
  event.preventDefault();
  convertTemperature("imperial");
}

function handleCelsiusConversion(event) {
  event.preventDefault();
  convertTemperature("metric");
}
// Start execution

let apiKey = "91f0b5f6eea9750d66bc243bf6b7b91e";
let units = "metric";
let temperature = null;

// Load default city weather forecast
search("Madrid");

let searchFormElement = document.querySelector("#city-search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

let fahrenheitLinkElement = document.querySelector("#fahrenheit-link");
fahrenheitLinkElement.addEventListener("click", handleFahrenheitConversion);

let celsiusLinkElement = document.querySelector("#celsius-link");
celsiusLinkElement.addEventListener("click", handleCelsiusConversion);
