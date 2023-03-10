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
// future forecasts will load that date's weather at noon
var dayOne = (today.add(1, 'day')).format("YYYY-MM-DD 12:00:00")
var dayTwo = (today.add(2, 'day')).format("YYYY-MM-DD 12:00:00")
var dayThree = (today.add(3, 'day')).format("YYYY-MM-DD 12:00:00")
var dayFour = (today.add(4, 'day')).format("YYYY-MM-DD 12:00:00")
var dayFive = (today.add(5, 'day')).format("YYYY-MM-DD 12:00:00")
var dayOneDate = document.getElementById("day-one")
var dayTwoDate = document.getElementById("day-two")
var dayThreeDate = document.getElementById("day-three")
var dayFourDate = document.getElementById("day-four")
var dayFiveDate = document.getElementById("day-five")

// I'm used to vanilla JS but needed jquery for second paramater in event listener
localStorageSection = document.getElementById("local-storage")
localStorageSections = $("#local-storage")

todayEl.textContent = today.format("dddd, M/D/YYYY")
dayOneDate.textContent = (today.add(1, 'day')).format("ddd, M/D")
dayTwoDate.textContent = (today.add(2, 'day')).format("ddd, M/D")
dayThreeDate.textContent = (today.add(3, 'day')).format("ddd, M/D")
dayFourDate.textContent = (today.add(4, 'day')).format("ddd, M/D")
dayFiveDate.textContent = (today.add(5, 'day')).format("ddd, M/D")

// // Set default city to Atlanta and display on load
getCurrentWeather(33.7489924, -84.3902644)
getFiveDayForecast(33.7489924, -84.3902644)

// render local storage on load
var previouslySearched = JSON.parse(localStorage.getItem("city"))
if (!previouslySearched) {
    localStorageSection.textContent = "Your Previous Searches Will Go Here!"
} else {
    for (var i = 0; i < previouslySearched.length; i++) {
        
        var newSearch = document.createElement("p")
        newSearch.textContent = previouslySearched[i]
        newSearch.classList.add("previously-searched")
        localStorageSection.appendChild(newSearch)
    }
}

// previously searched event listenter
localStorageSections.on("click", ".previously-searched", function(event) {
    submittedSection.textContent = "Working on Your Forecast!"

    setTimeout(() => {
        submittedSection.textContent = ""
    }, 3000);

    var research = event.target.textContent
    getLatLon(research)
})

// Search a new city on submit/enter
searchSection.addEventListener("submit", function (event) {
    event.preventDefault();
    submittedSection.textContent = "Working on Your Forecast!"

    setTimeout(() => {
        submittedSection.textContent = ""
    }, 3000);

    var cityInput = (searchBox.value.split(" ").join("-"))
    getLatLon(cityInput)

    var newCity = searchBox.value
    if (localStorage.getItem("city") == null) {
        localStorage.setItem("city", "[]")
    }

    var previousCities = JSON.parse(localStorage.getItem("city"))
    previousCities.push(newCity)
    localStorage.setItem("city", JSON.stringify(previousCities))
})

// Get latitude and longitude coordinates for weather api call
function getLatLon (city) {
    
var geocoderUrl = "https://api.openweathermap.org/geo/1.0/direct?q="+ city + "&&appid=" + apiKey
    
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

// api call for current weather data
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

    var icon = document.createElement("img")
    icon.setAttribute("src", "./assets/icons/" + data.weather[0].icon + ".png")
    searchedCityEl.appendChild(icon)
})
}

// api call for future weather data
function getFiveDayForecast (lat, lon) {

    var fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat +"&lon=" + lon + "&appid=" + apiKey + "&units=imperial"
    
    fetch(fiveDayUrl)
    .then(function(res) {
        return res.json()
    })
    .then(function(data) {
        var timestampsArray = data.list

        for (var i = 0; i < timestampsArray.length; i++) {

            var fetchDates = timestampsArray[i].dt_txt

            if (fetchDates === dayOne) {
                
                var dayOneIcon = document.getElementById("oneIcon")
                var dayOneTemp = document.getElementById("oneTemp")
                var dayOneHumidity = document.getElementById("oneHumidity")
                var dayOneWind = document.getElementById("oneWind")

                var iconOne = document.createElement("img")
                iconOne.setAttribute("src", "./assets/icons/" + timestampsArray[i].weather[0].icon + ".png")
                dayOneIcon.appendChild(iconOne)

                dayOneTemp.textContent = timestampsArray[i].main.temp + " \xB0F"
                dayOneHumidity.textContent = timestampsArray[i].main.humidity + " %"
                dayOneWind.textContent = timestampsArray[i].wind.speed + " MPH"           
            } else if (fetchDates === dayTwo) {
                var dayTwoIcon = document.getElementById("twoIcon")
                var dayTwoTemp = document.getElementById("twoTemp")
                var dayTwoHumidity = document.getElementById("twoHumidity")
                var dayTwoWind = document.getElementById("twoWind")

                var iconTwo = document.createElement("img")
                iconTwo.setAttribute("src", "./assets/icons/" + timestampsArray[i].weather[0].icon + ".png")
                dayTwoIcon.appendChild(iconTwo)

                dayTwoTemp.textContent = timestampsArray[i].main.temp + " \xB0F"
                dayTwoHumidity.textContent = timestampsArray[i].main.humidity + " %"
                dayTwoWind.textContent = timestampsArray[i].wind.speed + " MPH"
            } else if (fetchDates === dayThree) {
                var dayThreeIcon = document.getElementById("threeIcon")
                var dayThreeTemp = document.getElementById("threeTemp")
                var dayThreeHumidity = document.getElementById("threeHumidity")
                var dayThreeWind = document.getElementById("threeWind")

                var iconThree = document.createElement("img")
                iconThree.setAttribute("src", "./assets/icons/" + timestampsArray[i].weather[0].icon + ".png")
                dayThreeIcon.appendChild(iconThree)

                dayThreeTemp.textContent = timestampsArray[i].main.temp + " \xB0F"
                dayThreeHumidity.textContent = timestampsArray[i].main.humidity + " %"
                dayThreeWind.textContent = timestampsArray[i].wind.speed + " MPH" 
            } else if (fetchDates === dayFour) {
                var dayFourIcon = document.getElementById("fourIcon")
                var dayFourTemp = document.getElementById("fourTemp")
                var dayFourHumidity = document.getElementById("fourHumidity")
                var dayFourWind = document.getElementById("fourWind")

                var iconFour = document.createElement("img")
                iconFour.setAttribute("src", "./assets/icons/" + timestampsArray[i].weather[0].icon + ".png")
                dayFourIcon.appendChild(iconFour)

                dayFourTemp.textContent = timestampsArray[i].main.temp + " \xB0F"
                dayFourHumidity.textContent = timestampsArray[i].main.humidity + " %"
                dayFourWind.textContent = timestampsArray[i].wind.speed + " MPH"
            } else if (fetchDates === dayFive) {
                var dayFiveIcon = document.getElementById("fiveIcon")
                var dayFiveTemp = document.getElementById("fiveTemp")
                var dayFiveHumidity = document.getElementById("fiveHumidity")
                var dayFiveWind = document.getElementById("fiveWind")

                var iconFive = document.createElement("img")
                iconFive.setAttribute("src", "./assets/icons/" + timestampsArray[i].weather[0].icon + ".png")
                dayFiveIcon.appendChild(iconFive)

                dayFiveTemp.textContent = timestampsArray[i].main.temp + " \xB0F"
                dayFiveHumidity.textContent = timestampsArray[i].main.humidity + " %"
                dayFiveWind.textContent = timestampsArray[i].wind.speed + " MPH"
            }
        }
    })
    }