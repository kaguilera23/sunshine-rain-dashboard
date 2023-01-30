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
var submittedSection = document.getElementById("submitted")
var dayOne = (today.add(1, 'day')).format("YYYY-MM-DD 12:00:00")
var dayTwo = (today.add(2, 'day')).format("YYYY-MM-DD 12:00:00")
var dayThree = (today.add(3, 'day')).format("YYYY-MM-DD 12:00:00")
var dayFour = (today.add(4, 'day')).format("YYYY-MM-DD 12:00:00")
var dayFive = (today.add(5, 'day')).format("YYYY-MM-DD 12:00:00")

todayEl.textContent = today.format("dddd, M/D/YYYY")

searchSection.addEventListener("submit", function (event) {
    event.preventDefault();
    submittedSection.textContent = "Working on Your Forecast!"

    setTimeout(() => {
        submittedSection.textContent = ""
    }, 4000);

    var cityInput = (searchBox.value.split(" ").join(""))
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
    var cityLatitude = data[0].lat;
    var cityLongitude = data[0].lon
    getCurrentWeather(cityLatitude, cityLongitude)
    getFiveDayForecast(cityLatitude, cityLongitude)

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
})
}

function getFiveDayForecast (lat, lon) {

    var fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat +"&lon=" + lon + "&appid=" + apiKey + "&units=imperial"
    
    fetch(fiveDayUrl)
    .then(function(res) {
        return res.json()
    })
    .then(function(data) {
        console.log(data)
    })
    }