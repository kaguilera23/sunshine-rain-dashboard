var apiKey = "1b7c33fb52c132526c5dc290cb0ea24d"
var searchSection = document.getElementById("city-search");
var searchBox = document.getElementById("search-box");

searchSection.addEventListener("submit", function (event) {
    event.preventDefault();
    var cityInput = (searchBox.value)
    getLatLon(cityInput)
})

function getLatLon (city) {
    
var geocoder = "http://api.openweathermap.org/geo/1.0/direct?q="+ city + "&&appid=" + apiKey

    
fetch(geocoder)
.then(function(res) {
    return res.json();
}
)
.then(function (data) {
    var cityLatitude = data[0].lat;
    var cityLongitude = data[0].lon
    console.log(cityLatitude, cityLongitude)
});
}