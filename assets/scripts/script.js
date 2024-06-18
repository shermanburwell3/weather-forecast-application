let cityName = "Austin";
let stateCode = "TX";
let countryCode = "US"
let lat;
let lon;
const apiKey = "0c1d7915ad2662f0e450b432130b6989";
const forecastQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
const geoQueryUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&appid=${apiKey}`



// Read what we get back, look at the documentation

// Create function for fetching the data

function fetchWeather(query, city, state, country) {

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
                lat = data[0].lat;
                lon = data[0].lon;
                console.log(lat, lon);
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


fetchWeather(geoQueryUrl, cityName, stateCode, countryCode);