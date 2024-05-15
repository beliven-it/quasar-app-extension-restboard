<template>
  <q-card class="q-pa-sm shadow-1">
    <q-card-section class="column items-center q-gutter-md">
      <q-avatar size="128px">
        <img src="~assets/logo.svg" />
      </q-avatar>
      <div class="text-h6">{{ $t("Password recovery") }}</div>
    </q-card-section>

    <q-card-section class="column q-gutter-md">
      <q-banner v-if="sent" inline-actions class="text-white bg-positive">
        <template v-slot:avatar><q-icon name="check" /></template>
        {{ $t("Request sent") }}
      </q-banner>
      <q-input
        v-else
        filled
        required
        v-model="username"
        :label="$t('Username or email')"
      />
    </q-card-section>

    <q-card-actions class="row justify-between">
      <q-btn
        flat
        dense
        no-caps
        :label="$t('Back to sign in')"
        @click="onCancel"
      />
      <q-btn
        v-if="!sent"
        color="primary"
        :label="$t('Recover')"
        :disable="!username"
        :loading="loading"
        @click="onRecoverPasswordRequest"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

/**
 * A page displaying a password recovery form
 */
export default defineComponent({
  name: "RecoverPasswordPage",

  data() {
    return {
      username: null,
      loading: false,
      sent: false,
    };
  },

  methods: {
    onCancel() {
      this.$router.push("/auth/login");
    },

    onRecoverPasswordRequest() {
      this.loading = true;
      this.$auth
        .recoverCredentials({ username: this.username })
        .then(() => (this.sent = true))
        .finally(() => (this.loading = false));
    },
  },
});
</script>

<style scoped lang="sass">
.q-card
  min-width: 320px

  @media (min-width: $breakpoint-md-min)
    min-width: 400px
</style>
