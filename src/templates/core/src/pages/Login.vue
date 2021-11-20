<template>
  <rb-login-page
    @login="onLogin"
    @forgot-password="onForgotPassword"
  />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageLogin',

  methods: {
    async onLogin (credentials) {
      await this.$store.dispatch('core/login', credentials)
      this.$router.push('/')
    },

    onForgotPassword () {
      this.$router.push('auth/recover')
    }
  }
})
</script>
