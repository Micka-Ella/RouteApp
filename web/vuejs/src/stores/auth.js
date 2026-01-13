import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user
  },
  
  actions: {
    async login(email, password) {
      this.loading = true
      try {
        const response = await axios.post('/api/auth/login', { email, password })
        this.token = response.data.token
        localStorage.setItem('token', this.token)
        await this.fetchUser()
        return true
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async register(userData) {
      this.loading = true
      try {
        await axios.post('/api/auth/register', userData)
        return true
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async fetchUser() {
      if (!this.token) return
      try {
        const response = await axios.get('/api/users/me', {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        this.user = response.data.user
      } catch (error) {
        this.logout()
      }
    },
    
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    }
  }
})
