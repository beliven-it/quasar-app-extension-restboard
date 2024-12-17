<template>
  <q-card class="q-pa-sm shadow-1" tag="form" @submit.prevent>
    <q-card-section class="column items-center q-gutter-md">
      <q-avatar size="128px">
        <img src="~assets/logo.svg" />
      </q-avatar>
      <div class="text-h6">{{ $t("Sign in") }}</div>
    </q-card-section>

    <q-card-section class="column q-gutter-md">
      <q-input
        filled
        required
        v-model="username"
        :label="$t('Username or email')"
      />
      <q-input
        filled
        required
        v-model="password"
        :type="showPwd ? 'text' : 'password'"
        :label="$t('Password')"
      >
        <template v-slot:append>
          <q-icon
            :name="showPwd ? 'visibility' : 'visibility_off'"
            class="cursor-pointer"
            @click="showPwd = !showPwd"
          />
        </template>
      </q-input>
      <div class="row justify-between">
        <q-checkbox dense v-model="keepLogged" :label="$t('Remember me')" />
        <q-btn
          flat
          dense
          no-caps
          :label="$t('Forgot password?')"
          @click="onForgotPassword"
        />
      </div>
    </q-card-section>

    <q-card-actions vertical class="q-pa-md">
      <q-btn
        type="submit"
        class="q-mb-sm"
        color="primary"
        :label="$t('Sign in')"
        :disable="!username || !password"
        :loading="loading"
        @click="onLoginClicked"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

/**
 * A page displaying a login form
 */
export default defineComponent({
  name: "LoginPage",

  data() {
    return {
      username: null,
      password: null,
      showPwd: false,
      keepLogged: false,
      loading: false,
    };
  },

  methods: {
    onLoginClicked() {
      const credentials = {
        username: this.username,
        password: this.password,
        keepLogged: this.keepLogged,
      };
      this.loading = true;
      this.$auth
        .login(credentials)
        .then(() => {
          this.$router.push("/");
        })
        .finally(() => (this.loading = false));
    },

    onForgotPassword() {
      this.$router.push("/auth/recovery");
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
