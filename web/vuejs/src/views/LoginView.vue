<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await axios.post('/api/auth/login', {
      email: email.value,
      password: password.value
    })
    
    localStorage.setItem('token', response.data.token)
    router.push('/')
  } catch (err) {
    error.value = err.response?.data?.error || 'Erreur de connexion'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login">
    <h1>Connexion</h1>
    
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input 
          type="email" 
          id="email" 
          v-model="email" 
          required 
          placeholder="votre@email.com"
        />
      </div>
      
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          required 
          placeholder="••••••••"
        />
      </div>
      
      <div v-if="error" class="error">{{ error }}</div>
      
      <button type="submit" :disabled="loading" class="btn-primary">
        {{ loading ? 'Connexion...' : 'Se connecter' }}
      </button>
    </form>
    
    <p class="register-link">
      Pas encore de compte ? 
      <RouterLink to="/register">S'inscrire</RouterLink>
    </p>
  </div>
</template>

<style scoped>
.login {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f5f5f5;
  border-radius: 10px;
}

h1 {
  text-align: center;
  color: #42b883;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #42b883;
}

.btn-primary {
  width: 100%;
  background-color: #42b883;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
}

.btn-primary:hover {
  background-color: #35a070;
}

.btn-primary:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error {
  color: #e74c3c;
  text-align: center;
  margin: 1rem 0;
}

.register-link {
  text-align: center;
  margin-top: 1rem;
}

.register-link a {
  color: #42b883;
}
</style>
