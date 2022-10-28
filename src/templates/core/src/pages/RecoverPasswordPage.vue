<template>
  <q-card class="q-pa-sm shadow-1">
    <q-card-section class="column items-center q-gutter-md">
      <q-avatar size="128px">
        <img src="~assets/logo.svg" />
      </q-avatar>
      <div class="text-h6">{{ $t("Password recovery") }}</div>
    </q-card-section>

    <q-card-section class="column q-gutter-md">
      <q-input
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
        color="primary"
        :label="$t('Recover')"
        @click="onRecoverPasswordRequest"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "RecoverPasswordPage",

  data() {
    return {
      username: null,
    };
  },

  methods: {
    onCancel() {
      this.$router.push("/auth/login");
    },

    onRecoverPasswordRequest() {
      this.$store
        .dispatch("core/recoverPassword", this.username)
        .then(() => this.$router.push("/auth/login"));
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
