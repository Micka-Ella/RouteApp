<script setup>
</script>

<template>
  <div class="home">
    <h1>Bienvenue sur RouteApp</h1>
    <p>Votre application de gestion de routes</p>
    
    <div class="features">
      <div class="feature">
        <h3>📍 Créer des routes</h3>
        <p>Planifiez vos itinéraires facilement</p>
      </div>
      <div class="feature">
        <h3>🗺️ Visualiser</h3>
        <p>Affichez vos routes sur une carte</p>
      </div>
      <div class="feature">
        <h3>📱 Mobile</h3>
        <p>Accédez à vos routes depuis votre mobile</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
}

h1 {
  color: #42b883;
  font-size: 2.5rem;
}

.features {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
  flex-wrap: wrap;
}

.feature {
  background: #f5f5f5;
  padding: 2rem;
  border-radius: 10px;
  width: 250px;
}

.feature h3 {
  color: #35495e;
}
</style>
