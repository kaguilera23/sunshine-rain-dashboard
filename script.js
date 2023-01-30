var apiKey = "1b7c33fb52c132526c5dc290cb0ea24d"
var today = dayjs()
var searchSection = document.getElementById("city-search");
var searchBox = document.getElementById("search-box");
var searchedCityEl = document.getElementById("searched-city")
var currentWeatherContainer = document.getElementById("current-container")
var todayEl = document.getElementById("today-date")
var tempEl = document.getElementById("temperature")
var humidityEl = document.getElementById("humidity")
var windSpeedEl = document.getElementById("wind-speed")
var currentCondition = document.getElementById("condition")

todayEl.textContent = today.format("dddd, M/D/YYYY")


searchSection.addEventListener("submit", function (event) {
    event.preventDefault();
    var cityInput = (searchBox.value.split(" ").join(""))
    console.log(cityInput)
    getLatLon(cityInput)
})

function getLatLon (city) {
    
var geocoderUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+ city + "&&appid=" + apiKey
    
fetch(geocoderUrl)
.then(function(res) {
    return res.json();
}
)
.then(function (data) {
    console.log(data[0])
    var cityLatitude = data[0].lat;
    var cityLongitude = data[0].lon
    getCurrentWeather(cityLatitude, cityLongitude)
});
}

function getCurrentWeather(lat, lon) {

var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial"

fetch(currentWeatherUrl)
.then(function(res) {
    return res.json();
})
.then(function (data) {

    searchedCityEl.textContent = data.name
    tempEl.textContent = data.main.temp + " \xB0F"
    humidityEl.textContent = data.main.humidity + " %"
    windSpeedEl.textContent = data.wind.speed + " MPH"
    currentCondition.textContent = data.weather[0].description

    console.log(data.weather[0].icon)
    console.log(data)
})

}