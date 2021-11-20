<template>
  <rb-recover-password-page @recover-password="onRecoverPassword" />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageRecoverPassword',

  methods: {
    async onRecoverPassword (email) {
      await this.$store.dispatch('core/recoverPassword', email)
      this.$router.push('/auth/login')
    }
  }
})
</script>
