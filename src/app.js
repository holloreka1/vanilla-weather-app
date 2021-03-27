let apiKey = "91f0b5f6eea9750d66bc243bf6b7b91e";
let cityName = "Sydney";
let units = "metric";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

function fillData(response) {
  console.log(response.data);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let temperatureElement = document.querySelector("#temperature");
  let temperatureSelection;
  if (units === "metric") {
    temperatureSelection = `<span>°C</span>|<a href="#">°F</a>`;
  } else {
    temperatureSelection = `<span>°F</span>|<a href="#">°C</a>`;
  }
  temperatureElement.innerHTML =
    Math.round(response.data.main.temp) + temperatureSelection;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
}

axios.get(url).then(fillData);
