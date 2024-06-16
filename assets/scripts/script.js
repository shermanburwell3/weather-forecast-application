const cityName = "Austin";
const apiKey = "12341234123412341234123412341234";
const queryUrl = `api.weathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

fetch(queryUrl);
