<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const routes = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await axios.get('/api/routes')
    routes.value = response.data.routes
  } catch (error) {
    console.error('Erreur lors du chargement des routes:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="routes">
    <h1>Mes Routes</h1>
    
    <div v-if="loading" class="loading">
      Chargement...
    </div>
    
    <div v-else-if="routes.length === 0" class="empty">
      <p>Aucune route trouvée</p>
      <button class="btn-primary">Créer une route</button>
    </div>
    
    <div v-else class="routes-list">
      <div v-for="route in routes" :key="route.id" class="route-card">
        <h3>{{ route.name }}</h3>
        <p>{{ route.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.routes {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: #42b883;
}

.loading, .empty {
  text-align: center;
  padding: 2rem;
}

.btn-primary {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary:hover {
  background-color: #35a070;
}

.routes-list {
  display: grid;
  gap: 1rem;
}

.route-card {
  background: #f5f5f5;
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 4px solid #42b883;
}
</style>
