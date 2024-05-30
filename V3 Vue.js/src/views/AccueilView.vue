<template>
  <div class="container my-4 flex-grow-1">
    <div class="text-center">
      <h2>Comment utiliser le site ?</h2>
      <h3>Ecrire le nom de la ville souhaité</h3>
      <h3>Appuyer sur "En savoir plus" pour plus de détails</h3>
      <h3>Appuyer sur "Retirer les détails" pour moins de détails</h3>
    </div>

    <div class="form-group text-center my-4">
      <input type="text" class="form-control d-inline-block w-50" id="cityName" placeholder="ex : Paris" />
    </div>
    <div class="text-center">
      <button id="search-city-button" class="btn btn-primary" @click="onSearch()">Valider</button>
    </div>

    <div v-if="city" id="weather-small" class="text-center my-4">
      <p>{{ weather.text }}</p>
    </div>
    <br>

    <div class="text-center">
      <button id="details-switch-button" class="btn btn-secondary" :disabled="!city"
        @click="weatherDetails = !weatherDetails">
        {{ weatherDetails ? 'Retirer les détails' : 'En savoir plus' }}
      </button>
    </div>

    <div v-if="weatherDetails" id="weather-details" class="text-center my-4">
      <div v-if="weather" class="weather-info">
        <img :src="`images/${weather.icon.slice(undefined, -1)}.png`" :alt="weather.icon" class="weather-icon" />
        <p>
          Température : {{ weather.temp }} °C<br />
          Température ressentie : {{ tempFeel }} °C<br />
          Humidité : {{ weather.humid }} %<br />
          Vitesse du vent : {{ weather.wind }} m/s<br />
        </p>
      </div>
    </div>

    <div v-if="weatherDetails" id="weather-forecast" class="forecast-container">
      <div class="text-center">
        <h4 class="home-text">Prévisions sur 7 jours à {{ city }}</h4>
      </div>
      <div class="cards-wrapper">
        <ForecastComponent v-for="weather in weatherForecast" :weather="weather" :key="weather.dayName" />
      </div>
    </div>


  </div>
</template>

<script setup>
import ForecastComponent from '@/components/ForecastComponent.vue'
import { ref } from 'vue'

const city = ref('')
const weather = ref(null) // Current weather
const weatherForecast = ref(null)
const weatherDetails = ref(false)

async function onSearch() {
  city.value = document.getElementById('cityName').value
  if (!city.value) {
    return
  }
  await getWeather()
  await getForecast()
}

async function getWeather() {
  var url =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    city.value +
    '&appid=ee07e2bf337034f905cde0bdedae3db8&lang=fr'

  const response = await fetch(url).then((response) => response.json())

  if (response.cod != 200) {
    console.log('Error fetching data:', response.message)
    weather.value = null
  } else {
    var temp = (response.main.temp - 273.15).toFixed(2)
    var desc = response.weather[0].description

    weather.value = {
      text: `Il fait actuellement ${temp} °C à ${response.name}.`,
      temp: temp,
      desc: desc,
      icon: response.weather[0].icon,
      wind: response.wind.speed,
      humid: response.main.humidity
    }
  }
}

async function getForecast() {
  const url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city.value}&units=metric&appid=ee07e2bf337034f905cde0bdedae3db8&lang=fr`
  const response = await fetch(url).then((response) => response.json())

  if (response.cod != 200) {
    console.log('Error fetching data:', response.message)
    weatherForecast.value = null
  } else {
    const weathers = []
    for (let i = 0; i < 7; i++) {
      const day = response.list[i]
      const date = new Date(day.dt * 1000)
      const dayName = date.toLocaleDateString('fr-FR', { weekday: 'long' })
      const dayNameFormated = dayName.charAt(0).toUpperCase() + dayName.slice(1)
      const temp = day.temp.day
      const desc = day.weather[0].description
      const icon = day.weather[0].icon

      const forecastDay = {
        dayName: dayNameFormated,
        temp: temp,
        desc: desc,
        icon: icon
      }
      weathers.push(forecastDay)
    }
    weatherForecast.value = weathers
  }
}
</script>

<style scoped>
.forecast-container {
  display: flex;
  flex-direction: column;
  /* Pour empiler les éléments verticalement */
  align-items: center;
  /* Pour centrer les éléments horizontalement */
}

.cards-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* Pour centrer les cartes horizontalement */
  margin-top: 20px;
  /* Espace entre le titre et les cartes */
}

/* Assurez-vous de conserver les styles des cartes ForecastComponent */

/* Styles pour la section "Détails météo" */
#weather-details {
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  background: linear-gradient(to bottom, #bc8f8f 60%, #d2b48c);
  border-width: 0;
  color: #ffffff;
  padding: 20px;
  max-width: 400px;
  margin: auto;
  position: relative;
  z-index: 1;
  /* Définissez un z-index plus élevé */
}

#weather-details:hover {
  transform: scale(2);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.weather-info {
  margin-bottom: 15px;
}

.weather-info p {
  margin: 0;
}

.weather-icon {
  width: 150;
  height: 150;
  margin-bottom: 10px;
}

/* Styles spécifiques aux informations météorologiques */
.weather-temp {
  font-size: 18px;
}

.weather-humidity,
.weather-wind {
  font-size: 16px;
}
</style>
