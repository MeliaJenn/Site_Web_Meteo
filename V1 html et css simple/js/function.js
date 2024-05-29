let timeoutId;
var weatherData = null;

function toggleDetails() {
    var button = document.getElementById('details-switch-button');
    var weatherDetails = document.getElementById("weather-details");

    if (button.textContent === 'En savoir plus') {
        button.textContent = 'Retirer les détails';
        weatherDetails.style.backgroundColor = '#BC8F8F';
        showWeatherDetails();
    } else {
        button.textContent = 'En savoir plus';
        weatherDetails.style.backgroundColor = 'transparent';
        weatherDetails.innerHTML = '';
    }
}

function getWeather() {
    var city = document.getElementById("cityName").value;
    var button = document.getElementById('details-switch-button');
    var weatherDiv = document.getElementById("weather-small");
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=ee07e2bf337034f905cde0bdedae3db8&lang=fr";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            var temp = (data.main.temp - 273.15).toFixed(2);
            var cityName = data.name;
            var desc = data.weather[0].description;

            weatherDiv.innerHTML = `Il fait actuellement ${temp} °C à ${cityName}.`;
            weatherData = {
                temp: temp,
                desc: desc,
                icon: data.weather[0].icon,
                wind: data.wind.speed,
                humid: data.main.humidity
            };
            button.disabled = false;
        })
        .catch(error => {
            console.log("Error fetching data:", error);
            var weatherDiv = document.getElementById("weather");
            button.disabled = true;
            weatherDiv.innerHTML = "Aucune ville trouvée";
        });
}


function showWeatherDetails() {
    var weatherDetails = document.getElementById("weather-details");
    var iconImg = document.createElement("img");
    iconImg.src = "images/" + weatherData.icon.slice(undefined, -1) + ".png";
    iconImg.className = "weather-icon";
    weatherDetails.appendChild(iconImg);

    var details = document.createElement("p");
    details.innerHTML += "Description : " + weatherData.desc + "<br>";
    details.innerHTML = "Temperature : " + weatherData.temp + " °C<br>";

    var tempFeel = 13.12 + 0.6215 * weatherData.temp - 11.37 * Math.pow(weatherData.wind, 0.16) + 0.3965 * weatherData.temp * Math.pow(weatherData.wind, 0.16);
    tempFeel = tempFeel.toFixed(2);
    details.innerHTML += "Température ressentie : " + tempFeel + " °C <br>";

    details.innerHTML += "Humidité : " + weatherData.humid + " % <br>";
    details.innerHTML += "Vitesse du vent : " + weatherData.wind + " m/s<br>";

    weatherDetails.appendChild(details);
}
