// Values initialized for testing

let cityName = "Austin";
let stateCode = "TX";
let countryCode = "US";

// Latitude and longitude to plug into weather API
let lat;
let lon;

// Set up query URLs
const apiKey = "0c1d7915ad2662f0e450b432130b6989";
const forecastQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const geoQueryUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&appid=${apiKey}`;

// Get handle on certain elements globally
const submitButton = document.querySelector('#btn-submit');
const currentWeatherCard = document.querySelector('#current-weather-card');
const forecastCardSection = document.querySelector('#forecast-cards');
const searchAsideDiv = document.querySelector('.search-history');


// Get search history from localStorage

let searchHistory = JSON.parse(localStorage.getItem('searchHistory'));




// Read what we get back, look at the documentation

// Create function for fetching the geographic data

function latLonQuery(query) {

    // Get latitude and longitude by city name
    fetch(query)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
            .then(function (data) {
                
                console.log(data);

                checkSearchHistory(data);
                
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
                document
                createCurrentWeatherCard(data.city.name, stateCode, data.list[0].main.temp, data.list[0].wind.speed, data.list[0].main.humidity, data.list[0].weather[0].icon);
                
                // create 5 day forecast cards

                // Remove child elements from card section to remove cards before adding new ones
                while (forecastCardSection.firstChild)
                {
                    forecastCardSection.removeChild(forecastCardSection.lastChild);
                }

                createForecastCards(data.list[3].dt_txt, data.list[3].main.temp, data.list[3].wind.speed, data.list[3].main.humidity, data.list[3].weather[0].icon);
                createForecastCards(data.list[11].dt_txt, data.list[11].main.temp, data.list[11].wind.speed, data.list[11].main.humidity, data.list[11].weather[0].icon);
                createForecastCards(data.list[19].dt_txt, data.list[19].main.temp, data.list[19].wind.speed, data.list[19].main.humidity, data.list[19].weather[0].icon);
                createForecastCards(data.list[27].dt_txt, data.list[27].main.temp, data.list[27].wind.speed, data.list[27].main.humidity, data.list[27].weather[0].icon);
                createForecastCards(data.list[35].dt_txt, data.list[35].main.temp, data.list[35].wind.speed, data.list[35].main.humidity, data.list[35].weather[0].icon);
            });
}

// Create function for search submit, add search to localStorage

function search(event) {

    event.preventDefault();
    const cityName = document.querySelector('#city').value;
    const stateCode = document.querySelector('#state-code').value;
    console.log("got search data");
    latLonQuery(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&appid=${apiKey}`)

}

// Create function for creating current weather card (may use dayjs)

function createCurrentWeatherCard(city, state, temp, wind, humidity, sky) {

    generateSearchHistory();
    

    while (currentWeatherCard.firstChild)
        {
            currentWeatherCard.removeChild(currentWeatherCard.lastChild);
        }

    const currentCity = document.createElement('h2');
    currentCity.textContent = `${city}`;

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
    currentWind.textContent = `Wind Speed: ${Math.round(wind)} MPH`;

    currentWeatherCard.append(currentWind);

    const currentHumidity = document.createElement('p');
    currentHumidity.textContent = `Humidity: ${humidity}%`

    currentWeatherCard.append(currentHumidity);




}



// Create function for creating forecast weather cards

function createForecastCards(date, temp, wind, humidity, sky) {

    const forecastWeatherCard = document.createElement('div');
    

    const forecastDate = document.createElement('h4');
    forecastDate.textContent = date;

    forecastWeatherCard.append(forecastDate);

    const skyCondition = document.createElement('p');
    const skyIcon = document.createElement('img');
    
    skyCondition.textContent = `Sky Condition: `
    skyIcon.setAttribute('src', "http://openweathermap.org/img/w/" + sky + ".png");

    skyCondition.append(skyIcon);
    forecastWeatherCard.append(skyCondition);

    const currentTemp = document.createElement('p'); 

    currentTemp.textContent = `Temp: ${Math.round(temp)} F`;
    
    forecastWeatherCard.append(currentTemp);

    const currentWind = document.createElement('p');
    currentWind.textContent = `Wind Speed: ${Math.round(wind)} MPH`;

    forecastWeatherCard.append(currentWind);

    const currentHumidity = document.createElement('p');
    currentHumidity.textContent = `Humidity: ${humidity}%`

    forecastWeatherCard.append(currentHumidity);
    forecastCardSection.append(forecastWeatherCard);

}


// Checks search history to avoid duplicates

function checkSearchHistory(data)
{
    let searched = false;
                if (searchHistory) {
                    for (let i = 0; i < searchHistory.length; i++) {
                            if ((searchHistory[i].city == data[0].name) && (searchHistory[i].lat == data[0].lat) && (searchHistory[i].lon == data[0].lon)) {
                                    searched = true;
                                }
                        }
                    if (!searched) {
                        if (searchHistory.length >= 10) {
                            searchHistory.pop();
                        }

                        searchHistory.unshift({city: data[0].name, 
                            state: data[0].state,
                            lat: data[0].lat,
                            lon: data[0].lon
                        });
                        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
                        }
                }
                else {
                    searchHistory = [{city: data[0].name, 
                        lat: data[0].lat,
                        lon: data[0].lon}]
                        console.log(searchHistory);
                    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
                }
}

// Create function for rendering search history, only allow a certain amount into the history
function generateSearchHistory() {

    while (searchAsideDiv.firstChild)
        {
            searchAsideDiv.removeChild(searchAsideDiv.lastChild);
        }

    if (searchHistory) {
        for (let i = 0; i < searchHistory.length; i++) {
            const newButton = document.createElement('button');
            newButton.setAttribute('type', 'submit');
            newButton.setAttribute('class', 'search-button')
            
            // Set datasets with appropriate data
            newButton.setAttribute('data-city', searchHistory[i].city);
            newButton.setAttribute('data-state', searchHistory[i].state);
            newButton.setAttribute('data-lat', searchHistory[i].lat);
            newButton.setAttribute('data-lon', searchHistory[i].lon);
            
            newButton.textContent = searchHistory[i].city;
            searchAsideDiv.append(newButton);
        }
    }
}
// Create function to convert city to lat and long to plug into forecast api

// Event Listener for search submit

latLonQuery(geoQueryUrl);
console.log(lat, lon);

submitButton.addEventListener('click', search);
searchAsideDiv.addEventListener('click', function (event) {
    if (event.target.classList.contains('search-button')) {
        
        //Set lat and lon and call the geo query function
        lat = event.target.getAttribute('data-lat');
        lon = event.target.getAttribute('data-lon');
        getWeather(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`);
    }
});

