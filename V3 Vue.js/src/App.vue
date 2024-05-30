<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <HeaderComponent />
    <RouterView />
    <FooterComponent />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
</script>

<style scoped></style>
