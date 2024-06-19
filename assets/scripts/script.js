// Values initialized for testing

let cityName = "Austin";
let stateCode = "TX";
let countryCode = "US"
let lat;
let lon;

const apiKey = "0c1d7915ad2662f0e450b432130b6989";
const forecastQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
const geoQueryUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&appid=${apiKey}`;

const submitButton = document.querySelector('#btn-submit');
const currentWeatherCard = document.querySelector('#current-weather');
const forecastCards = document.querySelectorAll('forecast-card');



// Read what we get back, look at the documentation

// Create function for fetching the geographic data

function latLonQuery(query, city, state, country) {

    cityName = city;
    stateCode = state;
    countryCode = country;
    fetch(query)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
            .then(function (data) {
                console.log(data);
                console.log(lat, lon);
                console.log(data[0].lat, data[0].lon);
                setLatLon(data[0].lat, data[0].lon);
                
            });
            
}

function setLatLon(latitude, longitude) {

    lat = latitude;
    lon = longitude;


}

function getWeather(query) {

    fetch(query)
        .then(function(response) {
            return response.json();
        })
            .then(function(data) {
                console.log(data);
                // create current forecast card

                // create 5 day forecast cards

            });
}

// Create function for search submit, add search to localStorage

function search() {



}

// Create function for creating current weather card (may use dayjs)

// Create function for creating forecast weather cards

// Create function for rendering search history, only allow a certain amount into the history

// Create function to convert city to lat and long to plug into forecast api

// Event Listener for search submit


latLonQuery(geoQueryUrl, cityName, stateCode, countryCode);
console.log(lat, lon);
getWeather(forecastQueryUrl);
