<template>
  <rb-main-layout
    :userIdentity="userIdentity"
    @profile="onShowProfile"
    @logout="onLogout"
  />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  computed: {
    userIdentity () {
      return this.$store.state.core.userIdentity
    }
  },

  methods: {
    onShowProfile () {
      this.$router.push('/profile')
    },

    onLogout () {
      this.$store.dispatch('core/logout')
        .then(() => this.$router.push('/auth/login'))
    }
  }
})
</script>
