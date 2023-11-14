<template>
  <q-layout :class="$attrs.class || 'bg-grey-1'" :view="view">
    <q-header elevated>
      <q-toolbar :class="toolbarClass" :style="toolbarStyle">
        <q-btn
          flat
          dense
          round
          aria-label="Menu"
          :icon="leftDrawerOpen ? 'menu_open' : 'menu'"
          @click="onToggleLeftDrawer"
        />

        <q-toolbar-title
          class="row col-auto items-center q-gutter-md cursor-pointer"
          @click="onGoHome"
        >
          <span>{{ title }}</span>
        </q-toolbar-title>

        <q-space />

        <div class="row items-center q-gutter-sm">
          <div v-if="showIdentity && $q.screen.gt.sm">
            {{ userIdentity }}
          </div>
          <q-btn flat round dense class="q-ml-sm" icon="account_circle">
            <q-menu>
              <div class="column items-center q-pa-md" style="min-width: 250px">
                <div class="text-subtitle2 q-mt-sm q-mb-xs">
                  {{ userIdentity }}
                </div>
              </div>
              <q-separator />
              <q-list separator>
                <q-item clickable @click="onShowProfile">
                  <q-item-section>
                    <q-item-label>{{ $t("My Profile") }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-icon name="badge" />
                  </q-item-section>
                </q-item>

                <q-item clickable @click="onLogout">
                  <q-item-section>
                    <q-item-label>{{ $t("Logout") }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-icon name="exit_to_app" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :mini="miniSidebar"
      :class="sidebarClass"
      :style="sidebarStyle"
    >
      <q-list separator>
        <q-item to="/" exact clickable>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>{{ $t("Dashboard") }}</q-item-section>
        </q-item>
        <q-item
          v-for="resource in visibileResources"
          :key="resource.name"
          :to="`/${resource.name}`"
          clickable
        >
          <q-item-section avatar>
            <q-icon :name="resource.ui.icon" />
          </q-item-section>
          <q-item-section>
            {{ $t(resource.label || resource.name) }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainLayout",

  props: {
    view: {
      type: String,
      default: "hHh Lpr lFf",
    },

    title: {
      type: String,
      default: "Restboard",
    },

    toolbarClass: {
      type: [String, Object, Array],
    },

    toolbarStyle: {
      type: [String, Object, Array],
    },

    sidebarClass: {
      type: [String, Object, Array],
    },

    sidebarStyle: {
      type: [String, Object, Array],
    },

    showIdentity: {
      type: Boolean,
      default: true,
    },

    miniSidebar: {
      type: Boolean,
    },
  },

  data() {
    return {
      leftDrawerOpen: false,
      userIdentity: null,
    };
  },

  computed: {
    resources() {
      return Object.values(this.$rb || {});
    },

    visibileResources() {
      return this.resources.filter((r) => !r.ui.excludeSidebar);
    },
  },

  mounted() {
    this.reloadUserInfo();
  },

  methods: {
    async reloadUserInfo() {
      if (this.$auth.user) {
        this.userIdentity = await this.$auth.getIdentity(this.$auth.user);
      } else {
        this.userIdentity = null;
      }
    },

    onToggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },

    onGoHome() {
      this.$router.push("/");
    },

    onShowProfile() {
      this.$router.push("/profile");
    },

    onLogout() {
      this.$auth.logout().then(() => {
        this.$auth.user = null;
        this.$router.push("/auth/login");
      });
    },
  },
});
</script>
