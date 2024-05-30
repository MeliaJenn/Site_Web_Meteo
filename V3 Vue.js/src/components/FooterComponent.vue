<template>
  <footer class="text-white text-center py-3 mt-auto">
    <nav>
      <ul class="list-unstyled d-flex justify-content-center mb-0">
        <li class="mx-3"><a class="text-white" href="/">Accueil</a></li>
        <li class="mx-3"><a class="text-white" href="/contact">Contact</a></li>
        <li class="mx-3"><a class="text-white" href="/aide">Aide</a></li>
      </ul>
    </nav>
  </footer>
</template>
<script setup></script>
<style scoped>
/* --------------- Footer --------------- */
footer {
  background-color: var(--footer-color) !important;
  color: #fff;
  /* Assurez-vous que le texte est visible sur le fond */
  position: relative;
  bottom: 0;
  width: 100%;
}
</style>
