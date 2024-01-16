<template>
  <q-page padding class="column">
    <q-breadcrumbs class="col-auto q-mb-md text-subtitle1">
      <q-breadcrumbs-el icon="home" to="/" />
      <q-breadcrumbs-el :label="$t('Profile')" />
    </q-breadcrumbs>
    <rb-container class="col self-center" max-width="600px">
      <q-card>
        <q-card-section class="flex flex-center q-py-md">
          <q-icon color="primary" name="account_circle" size="128px" />
        </q-card-section>
        <q-separator />
        <q-list separator>
          <q-item>
            <q-item-section class="text-body1">{{ $t("Name") }}</q-item-section>
            <q-item-section side>{{ userIdentity }}</q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </rb-container>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

/**
 * A page displaying current user profile details
 */
export default defineComponent({
  name: "ProfilePage",

  data() {
    return {
      userIdentity: "",
    };
  },

  mounted() {
    this.reloadUserIdentity();
  },

  methods: {
    reloadUserIdentity() {
      if (!this.$auth?.user) {
        return;
      }
      this.$auth
        .getIdentity(this.$auth.user)
        .then((identity) => (this.userIdentity = identity));
    },
  },
});
</script>
