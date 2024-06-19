// Values initialized for testing

let cityName = "Austin";
let stateCode = "TX";
let countryCode = "US";
let lat;
let lon;

const apiKey = "0c1d7915ad2662f0e450b432130b6989";
const forecastQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const geoQueryUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&appid=${apiKey}`;

const submitButton = document.querySelector('#btn-submit');
const currentWeatherCard = document.querySelector('#current-weather-card');
const forecastCardSection = document.querySelector('#forecast-cards')




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
                const updatedForecastQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
                getWeather(updatedForecastQueryUrl);  
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
                console.log(data.list[0].wind.speed, data.list[0].main.temp, data.list[0].weather[0].main);
                createCurrentWeatherCard(cityName, stateCode, data.list[0].main.temp, data.list[0].wind.speed, data.list[0].main.humidity, data.list[0].weather[0].icon);
                
                // create 5 day forecast cards

            });
}

// Create function for search submit, add search to localStorage

function search() {



}

// Create function for creating current weather card (may use dayjs)

function createCurrentWeatherCard(city, state, temp, wind, humidity, sky) {
    
    const currentCity = document.createElement('h2');
    currentCity.textContent = `${city}, ${state}`;

    currentWeatherCard.append(currentCity);

    const skyCondition = document.createElement('h4');
    const skyIcon = document.createElement('img');
    
    skyCondition.textContent = `Sky Condition: `
    skyIcon.setAttribute('src', "http://openweathermap.org/img/w/" + sky + ".png");

    skyCondition.append(skyIcon);
    currentWeatherCard.append(skyCondition);

    const currentTemp = document.createElement('p'); 

    currentTemp.textContent = `Temp: ${Math.round(temp)} F`;
    
    currentWeatherCard.append(currentTemp);

    const currentWind = document.createElement('p');
    currentWind.textContent = `Wind Speed: ${wind} MPH`;

    currentWeatherCard.append(currentWind);

    const currentHumidity = document.createElement('p');
    currentHumidity.textContent = `Humidity: ${humidity}%`

    currentWeatherCard.append(currentHumidity);




}



// Create function for creating forecast weather cards

// Create function for rendering search history, only allow a certain amount into the history

// Create function to convert city to lat and long to plug into forecast api

// Event Listener for search submit

// Create function to render search history


latLonQuery(geoQueryUrl, cityName, stateCode, countryCode);
console.log(lat, lon);

