<template>
  <div class="col-md-2 forecast-day card p-3 m-2">
    <div class="d-flex justify-content-center">
      <img :src="`images/${weather.icon.slice(undefined, -1)}.png`" :alt="weather.icon" class="weather-icon" />
    </div>
    <p class="text-center">
      <span class="day-name">{{ weather.dayName }}</span><br />
      Température: <span class="temperature">{{ weather.temp }} °C</span><br />
      Description: <span class="description">{{ weather.desc }}</span><br />
    </p>
  </div>
</template>

<script setup>
defineProps({
  weather: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style scoped>
.forecast-day {
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  background: linear-gradient(to bottom, #bc8f8f 50%, #d2b48c);
  border-width: 0;
  color: #ffffff;
}

.forecast-day:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.weather-icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.day-name {
  font-weight: bold;
  font-size: 1.2em;
}

.temperature {
  color: #ffffff;
  font-weight: bold;
}

.description {
  color: #ffffff;
}
</style>
