var locationFormEl = document.querySelector("#user-form");
var locationInputEl = document.querySelector("#location");

// From submit get input
function formSubmitHaldler() {
    event.preventDefault();

    // get input from user
    var locationName = locationInputEl.value.trim();

    if (locationName) {
        getUserLocation(locationName);
    } else {
        alert("Please enter a city.");
    }
};

// get coordinates for user location
function getUserLocation(location) {
    // Get location lon and lat
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + location + "&limit=1&appid=bb2c88d223252f9cbf3c41f7d0c2aa16";

    // Make fetch request
    fetch(apiUrl).then(function (response) {
        // Check for valid response
        if (response.ok) {
            response.json().then(function (data) {
                // Gets the lon and lat of the location
                var locationLat = data[0].lat;
                var locationLon = data[0].lon;
                // Convert from Int to Str
                var latString = locationLat.toString();
                var lonString = locationLon.toString();
                console.log(locationLat);
                console.log(locationLon);

                // Call function to get values
                getLocationWeather(latString, lonString);
            });
        } else {
            alert("Location not found!");
        }
    }).catch(function (error) {
        alert("Unable to get weather");
    });
};

// get location weather
function getLocationWeather(lat, lon) {

    // Get wearther url
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=bb2c88d223252f9cbf3c41f7d0c2aa16";

    fetch(apiUrl).then(function (response) {
        // Check if returned data
        if (response.ok) {
            response.json().then(function (data) {
                displayWeatherResults(data);
            });
        } else {
            alert("Unable to get weather");
        }
    }).catch(function (error) {
        alert("Unable to get weather");
    });

};

function displayWeatherResults(data) {
    // City Name
    var currentCityNameEl = document.querySelector(".jumbotron-header");
    var cityName = data.timezone.split("/")[1];
    currentCityNameEl.textContent = cityName;

    // Current Temp
    var currentTempEl = document.querySelector("#current-temp");
    currentTempEl.textContent = data.current.temp + "F";
    // Current Wind
    var currentWindEl = document.querySelector("#current-wind");
    currentWindEl.textContent = data.current.wind_speed + "MPH";
    // Current Humidity
    var currentHumidityEl = document.querySelector("#current-humidity");
    currentHumidityEl.textContent = data.current.humidity + "%";
    // Current Uv
    var currentUvEl = document.querySelector("#uv-style");
    currentUvEl.textContent = data.current.uvi;

}


// Submit button for the form
locationFormEl.addEventListener("submit", formSubmitHaldler);