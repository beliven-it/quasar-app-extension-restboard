<template>
  <q-layout
    :class="$attrs.class || 'bg-grey-1'"
    :view="view"
  >
    <q-header elevated>
      <rb-toolbar
        :class="toolbarClass"
        :style="toolbarStyle"
        :title="title"
        :is-menu-open="leftDrawerOpen"
        @toggle-menu="onToggleLeftDrawer"
      >
        <template v-slot:logo>
          <img src="~assets/logo.svg" height="40" :alt="title" />
        </template>

        <rb-user-area
          :show-identity="showIdentity && $q.screen.gt.sm"
          :user-avatar="userAvatar"
          :user-identity="userIdentity"
          :tenant-identity="tenantIdentity"
          @profile="onShowProfile"
          @logout="onLogout"
        />
      </rb-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :mini="miniSidebar"
      :class="sidebarClass"
      :style="sidebarStyle"
    >
      <rb-sidebar :resources="resources" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  props: {
    view: {
      type: String,
      default: 'hHh Lpr lFf'
    },
    title: {
      type: String,
      default: 'Restboard'
    },
    toolbarClass: {
      type: [String, Object, Array]
    },
    toolbarStyle: {
      type: [String, Object, Array]
    },
    sidebarClass: {
      type: [String, Object, Array]
    },
    sidebarStyle: {
      type: [String, Object, Array]
    },
    showIdentity: {
      type: Boolean,
      default: true
    },
    userAvatar: {
      type: String
    },
    tenantIdentity: {
      type: String
    },
    miniSidebar: {
      type: Boolean
    }
  },

  data () {
    return {
      leftDrawerOpen: false
    }
  },

  computed: {
    resources () {
      return Object.values(this.$rb)
    },

    userIdentity () {
      return this.$store.state.core.userIdentity
    }
  },

  methods: {
    onToggleLeftDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },

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

