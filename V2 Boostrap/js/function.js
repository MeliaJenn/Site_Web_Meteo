let timeoutId;
var weatherData = null;

function toggleDetails() {
    var button = document.getElementById('details-switch-button');
    var weatherDetails = document.getElementById("weather-details");
    var forecastDiv = document.getElementById("weather-forecast");

    if (button.textContent === 'En savoir plus') {
        button.textContent = 'Retirer les détails';
        weatherDetails.style.backgroundColor = '#BC8F8F';
        showWeatherDetails();
        getForecast(document.getElementById("cityName").value); // Appeler getForecast avec le nom de la ville
        forecastDiv.style.display = "block";
    } else {
        button.textContent = 'En savoir plus';
        weatherDetails.style.backgroundColor = 'transparent';
        weatherDetails.innerHTML = '';
        forecastDiv.style.display = "none";
        forecastDiv.innerHTML = '';
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

function getForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&appid=ee07e2bf337034f905cde0bdedae3db8&lang=fr`;
    const forecastDiv = $("#weather-forecast");
    forecastDiv.empty();

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const forecastTitle = $("<h4>").addClass("home-text").text(`Prévisions sur 7 jours à ${city}`);
            forecastDiv.append(forecastTitle);

            const forecastRow = $("<div>").addClass("d-flex flex-wrap justify-content-center");

            for (let i = 0; i < 7; i++) {  // Afficher les prévisions sur 7 jours
                const day = data.list[i];
                const date = new Date(day.dt * 1000);
                const dayName = date.toLocaleDateString('fr-FR', { weekday: 'long' });
                const dayNameFormated = dayName.charAt(0).toUpperCase() + dayName.slice(1);
                const temp = day.temp.day;
                const desc = day.weather[0].description;
                const icon = day.weather[0].icon;

                const dayDiv = $("<div>")
                    .addClass("col-md-2 forecast-day card p-3 m-2")
                    .css({
                        "border-radius": "20px",
                        "background-color": "#bc8f8f",
                        "border": "none"
                    })
                    .hover(
                        function () {
                            $(this).css({
                                "background-color": "#805151", // Couleur de fond au survol
                                "transform": "scale(1.05)", // Effet de zoom léger
                                "transition": "background-color 0.3s, transform 0.3s"
                            });
                        }, function () {
                            $(this).css({
                                "background-color": "#bc8f8f", // Couleur de fond initiale
                                "transform": "scale(1)"
                            });
                        }
                    );
                const iconImg = $("<img>")
                    .attr("src", "images/" + weatherData.icon.slice(undefined, -1) + ".png")
                    .css("border-radius", "50px");
                const details = $("<p>").html(`
                    <span class="d-flex justify-content-center font-weight-bold">${dayNameFormated}</span>
                    Température: ${temp} °C<br>
                    Description: ${desc}<br>
                `);

                dayDiv.append(iconImg);
                dayDiv.append(details);
                forecastRow.append(dayDiv);
            };

            forecastDiv.append(forecastRow);
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
