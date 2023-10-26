<template>
  <q-page padding class="flex justify-center">
    <rb-container max-width="600px">
      <q-card>
        <q-card-section class="flex flex-center q-py-md">
          <q-icon color="primary" name="account_circle" size="128px"/>
        </q-card-section>
        <q-separator/>
        <q-list separator>
          <q-item>
            <q-item-section class="text-body1">{{ $t('Name') }}</q-item-section>
            <q-item-section side>{{ userIdentity }}</q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </rb-container>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProfilePage',

  data () {
    return {
      userIdentity: ''
    }
  },

  mounted () {
    this.reloadUserIdentity()
  },

  methods: {
    reloadUserIdentity() {
      if (this.$auth.user) {
        this.$auth.getIdentity(this.$auth.user)
          .then(identity => this.userIdentity = identity)
      }
    }
  }
})
</script>
