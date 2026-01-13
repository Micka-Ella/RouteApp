<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <header>
      <nav>
        <RouterLink to="/">Accueil</RouterLink>
        <RouterLink to="/routes">Routes</RouterLink>
        <RouterLink to="/about">À propos</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>

    <footer>
      <p>&copy; 2026 RouteApp - Tous droits réservés</p>
    </footer>
  </div>
</template>

<style scoped>
header {
  background-color: #42b883;
  padding: 1rem;
}

nav {
  display: flex;
  gap: 1rem;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

nav a:hover {
  text-decoration: underline;
}

main {
  min-height: calc(100vh - 150px);
  padding: 2rem;
}

footer {
  background-color: #35495e;
  color: white;
  text-align: center;
  padding: 1rem;
}
</style>
