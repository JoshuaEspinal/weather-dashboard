async function getStateCoordinates(state) {
  var placeholder = `http://api.openweathermap.org/geo/1.0/direct?q=${state}&appid=432fad41a437703e113b6042a67d5fb6`;

  var response = await fetch(placeholder);
  return await response.json();
}

async function weatherData(lon, lat) {
  var placeholder = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${lat}&lon=${lon}&appid=432fad41a437703e113b6042a67d5fb6`;

  var response = await fetch(placeholder);
  return await response.json();
}

function createCard(i, forecast) {
  var cardContainer = $("#card-container");

  var newDiv = $("<div>");
  newDiv.addClass("bg-dark col m-1");
  cardContainer.append(newDiv);

  var newH5 = $("<h5>");
  newH5.addClass("text-white");
  newDiv.append(newH5);

  var newSpan = $("<h5>");
  newSpan.text("☀");
  newDiv.append(newSpan);

  var newUl = $("<ul>");
  newUl.addClass("list-unstyled");

  var newLiTemp = $("<li>");
  newLiTemp.addClass("text-white my-3");
  newLiTemp.text(`Temp: ${forecast.list[i].main.feels_like} degrees`);

  var newLiWind = $("<li>");
  newLiWind.addClass("text-white my-3");
  newLiWind.text(`Wind: ${forecast.list[i].wind.speed} MPH`);

  var newLiHumidity = $("<li>");
  newLiHumidity.addClass("text-white my-3");
  newLiHumidity.text(`Humidity: ${forecast.list[i].main.humidity}%`);

  newUl.append(newLiTemp);
  newUl.append(newLiWind);
  newUl.append(newLiHumidity);
  newDiv.append(newUl);
}

$(document).ready(function () {
  $("#search-forecast").click(async function (e) {
    e.preventDefault();
    $("#card-container").empty();

    var state = $("#city-name").val();
    var response = await getStateCoordinates(state);
    var forecast = await weatherData(response[0].lon, response[0].lat);
    // response[0].lon, response[0].lat
    $("#city-title").text(forecast.city.name);

    $("#temp").text(forecast.list[0].main.feels_like);
    $("#wind").text(forecast.list[0].wind.speed);
    $("#humidity").text(forecast.list[0].main.humidity);

    for (var i = 0; i < 5; i++) {
      createCard(i, forecast);
    }
  });
});
