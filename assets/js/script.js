var locationFormEl = document.querySelector("#user-form");
var locationInputEl = document.querySelector("#location");
var currentDate = moment().format("M[/]D[/]YY");
var tomorrowDate = moment().add(1, 'days').format("M[/]D[/]YY");
var dayTwoDate = moment().add(2, 'days').format("M[/]D[/]YY");
var dayThreeDate = moment().add(3, 'days').format("M[/]D[/]YY");
var dayFourDate = moment().add(4, 'days').format("M[/]D[/]YY");
var dayFiveDate = moment().add(5, 'days').format("M[/]D[/]YY");
var locationName = "";
var previousSearch = document.querySelector("#previous-search");
var buttonClickedRecentEl = document.querySelector(".btn-recent");


// From submit get input
function formSubmitHandler() {
    event.preventDefault();
    locationName = "";
    // get input from user
    locationName = locationInputEl.value.trim();

    if (locationName) {
        getUserLocation(locationName);
    } else {
        alert("Please enter a city.");
    }
};

// get coordinates for user location
function getUserLocation(location) {
    // Get location lon and lat
    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + location + "&limit=1&appid=bb2c88d223252f9cbf3c41f7d0c2aa16";

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

                var locationArray = [];
                locationArray.push(location);

                var recentItem = document.createElement("button");
                recentItem.textContent = location;
                recentItem.setAttribute("id", location);
                recentItem.setAttribute("type", "submit");
                recentItem.className = "btn btn-primary col-12 btn-style btn-recent";
                previousSearch.appendChild(recentItem);



                if (localStorage.getItem('searchHistory')) {
                    locationArray = [...JSON.parse(localStorage.getItem('searchHistory'))];
                    locationArray.push(location);
                    localStorage.setItem('searchHistory', JSON.stringify(locationArray));

                } else {
                    localStorage.setItem('searchHistory', JSON.stringify(locationArray));
                }

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

function reloadPage() {
    var locationArray = [];
    if (localStorage.getItem('searchHistory')) {
        locationArray = [...JSON.parse(localStorage.getItem('searchHistory'))];
        for (var i = 0; i < locationArray.length; i++) {
            var recentItem = document.createElement("button");
            recentItem.textContent = locationArray[i];
            recentItem.setAttribute("id", locationArray[i]);
            recentItem.className = "btn btn-primary col-12 btn-style btn-recent";
            previousSearch.appendChild(recentItem);
        }
    }
}

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
    // City Name and date
    var currentCityNameEl = document.querySelector(".jumbotron-header");
    currentCityNameEl.textContent = locationName.toUpperCase() + " (" + currentDate + ")";
    // Weather Icon
    var currentWeatherIconEl = document.querySelector("#current-icon");
    currentWeatherIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png")

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

    // Day 1 Date
    var firstDayDateEl = document.querySelector("#day-1-date");
    firstDayDateEl.textContent = tomorrowDate;
    // Day 1 Icon
    var firstDayIcon = document.querySelector("#icon-1");
    firstDayIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.daily[0].weather[0].icon + ".png");
    // Day 1 temp
    var firstDayTempEl = document.querySelector("#day-1-temp");
    firstDayTempEl.textContent = data.daily[0].temp.day + "F";
    // Day 1 wind
    var firstDayWindEl = document.querySelector("#day-1-wind");
    firstDayWindEl.textContent = data.daily[0].wind_speed + "MPH";
    // Day 1 humidity
    var firstDayHumidityEl = document.querySelector("#day-1-humidity");
    firstDayHumidityEl.textContent = data.daily[0].humidity + "%";


    // Day 2 Date
    var secondDayDateEl = document.querySelector("#day-2-date");
    secondDayDateEl.textContent = dayTwoDate;
    // Day 2 Icon
    var secondDayIcon = document.querySelector("#icon-2");
    secondDayIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + ".png");
    // Day 2 temp
    var secondDayTempEl = document.querySelector("#day-2-temp");
    secondDayTempEl.textContent = data.daily[1].temp.day + "F";
    // Day 2 wind
    var secondDayWindEl = document.querySelector("#day-2-wind");
    secondDayWindEl.textContent = data.daily[1].wind_speed + "MPH";
    // Day 2 humidity
    var secondDayHumidityEl = document.querySelector("#day-2-humidity");
    secondDayHumidityEl.textContent = data.daily[1].humidity + "%";


    // Day 3 Date
    var thirdDayDateEl = document.querySelector("#day-3-date");
    thirdDayDateEl.textContent = dayThreeDate;
    // Day 3 Icon
    var thirdDayIcon = document.querySelector("#icon-3");
    thirdDayIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + ".png");
    // Day 3 temp
    var thirdDayTempEl = document.querySelector("#day-3-temp");
    thirdDayTempEl.textContent = data.daily[2].temp.day + "F";
    // Day 3 wind
    var thirdDayWindEl = document.querySelector("#day-3-wind");
    thirdDayWindEl.textContent = data.daily[2].wind_speed + "MPH";
    // Day 3 humidity
    var thirdDayHumidityEl = document.querySelector("#day-3-humidity");
    thirdDayHumidityEl.textContent = data.daily[2].humidity + "%";


    // Day 4 Date
    var fourthDayDateEl = document.querySelector("#day-4-date");
    fourthDayDateEl.textContent = dayFourDate;
    // Day 4 Icon
    var fourthDayIcon = document.querySelector("#icon-4");
    fourthDayIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + ".png");
    // Day 4 temp
    var fourthDayTempEl = document.querySelector("#day-4-temp");
    fourthDayTempEl.textContent = data.daily[3].temp.day + "F";
    // Day 4 wind
    var fourthDayWindEl = document.querySelector("#day-4-wind");
    fourthDayWindEl.textContent = data.daily[3].wind_speed + "MPH";
    // Day 4 humidity
    var fourthDayHumidityEl = document.querySelector("#day-4-humidity");
    fourthDayHumidityEl.textContent = data.daily[3].humidity + "%";


    // Day 5 Date
    var fifthDayDateEl = document.querySelector("#day-5-date");
    fifthDayDateEl.textContent = dayFiveDate;
    // Day 5 Icon
    var fifthDayIcon = document.querySelector("#icon-5");
    fifthDayIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + ".png");
    // Day 5 temp
    var fifthDayTempEl = document.querySelector("#day-5-temp");
    fifthDayTempEl.textContent = data.daily[4].temp.day + "F";
    // Day 5 wind
    var fifthDayWindEl = document.querySelector("#day-5-wind");
    fifthDayWindEl.textContent = data.daily[4].wind_speed + "MPH";
    // Day 5 humidity
    var fifthDayHumidityEl = document.querySelector("#day-5-humidity");
    fifthDayHumidityEl.textContent = data.daily[4].humidity + "%";

}

reloadPage();

previousSearch.addEventListener("click", function (event) {

    var location = event.target.textContent;
    getUserLocation(location);
})
// Submit button for the form
locationFormEl.addEventListener("submit", formSubmitHandler);