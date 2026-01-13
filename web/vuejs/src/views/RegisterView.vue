<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const firstName = ref('')
const lastName = ref('')
const error = ref('')
const loading = ref(false)

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Les mots de passe ne correspondent pas'
    return
  }
  
  loading.value = true
  error.value = ''
  
  try {
    await axios.post('/api/auth/register', {
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value
    })
    
    router.push('/login')
  } catch (err) {
    error.value = err.response?.data?.error || 'Erreur lors de l\'inscription'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="register">
    <h1>Inscription</h1>
    
    <form @submit.prevent="handleRegister">
      <div class="form-row">
        <div class="form-group">
          <label for="firstName">Prénom</label>
          <input type="text" id="firstName" v-model="firstName" placeholder="Prénom" />
        </div>
        
        <div class="form-group">
          <label for="lastName">Nom</label>
          <input type="text" id="lastName" v-model="lastName" placeholder="Nom" />
        </div>
      </div>
      
      <div class="form-group">
        <label for="email">Email *</label>
        <input type="email" id="email" v-model="email" required placeholder="votre@email.com" />
      </div>
      
      <div class="form-group">
        <label for="password">Mot de passe *</label>
        <input type="password" id="password" v-model="password" required placeholder="••••••••" />
      </div>
      
      <div class="form-group">
        <label for="confirmPassword">Confirmer le mot de passe *</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required placeholder="••••••••" />
      </div>
      
      <div v-if="error" class="error">{{ error }}</div>
      
      <button type="submit" :disabled="loading" class="btn-primary">
        {{ loading ? 'Inscription...' : 'S\'inscrire' }}
      </button>
    </form>
    
    <p class="login-link">
      Déjà un compte ? 
      <RouterLink to="/login">Se connecter</RouterLink>
    </p>
  </div>
</template>

<style scoped>
.register {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f5f5f5;
  border-radius: 10px;
}

h1 {
  text-align: center;
  color: #42b883;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-row .form-group {
  flex: 1;
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

.login-link {
  text-align: center;
  margin-top: 1rem;
}

.login-link a {
  color: #42b883;
}
</style>
