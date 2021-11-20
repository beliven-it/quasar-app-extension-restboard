<template>
  <rb-recover-password-page @recover-password="onRecoverPassword" />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageRecoverPassword',

  methods: {
    onRecoverPassword (email) {
      await this.$store.dispatch('core/recoverPassword', email)
    }
  }
})
</script>
