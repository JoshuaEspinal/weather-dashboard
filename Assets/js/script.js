async function weatherData() {
  var placeholder =
    "https://api.openweathermap.org/data/2.5/forecast?lat=0&lon=0&appid=432fad41a437703e113b6042a67d5fb6";

  var response = await fetch(placeholder);
  return await response.json();
}
// weatherData().then((response) => console.log(response));
