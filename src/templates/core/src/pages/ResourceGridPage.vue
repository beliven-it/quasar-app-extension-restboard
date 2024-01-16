<template>
  <q-page class="column">
    <q-breadcrumbs class="col-auto q-mb-md text-subtitle1">
      <q-breadcrumbs-el icon="home" to="/" />
      <q-breadcrumbs-el :label="resource.label" />
    </q-breadcrumbs>
    <rb-container class="col" :full-width="fullWidth">
      <rb-resource-collection
        :keep-on-empty="keepOnEmpty"
        :resource="resource"
        :filters="filters"
        :offset="offset"
        :limit="limit"
        @loaded="onLoadedItems"
        @error="onError"
      >
        <template #default="props">
          <rb-data-grid
            class="full-width"
            :items="props.items"
            :itemsPerRow="itemsPerRow"
            :loading="props.loading"
          >
            <template v-slot:default="slotProps">
              <component
                :is="cardComponent"
                class="fit"
                :resource="resource"
                :item="slotProps.item"
              />
            </template>
            <template v-slot:skeleton>
              <component
                :is="cardComponent"
                class="fit"
                loading
                :resource="resource"
              />
            </template>
          </rb-data-grid>
        </template>

        <template #empty>
          <rb-empty-banner>{{ $t("No results") }}</rb-empty-banner>
        </template>
      </rb-resource-collection>
    </rb-container>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

/**
 * A page displaying a resource collection as a grid of item
 */
export default defineComponent({
  name: "ResourceGridPage",

  props: {
    resource: {
      type: Object,
    },

    filters: {
      type: Object,
    },

    offset: {
      type: Number,
      default: 0,
    },

    limit: {
      type: Number,
    },

    fullWidth: {
      type: Boolean,
    },

    keepOnEmpty: {
      type: Boolean,
    },

    xs: {
      type: Number,
      default: 1,
    },

    sm: {
      type: Number,
      default: 2,
    },

    md: {
      type: Number,
      default: 3,
    },

    lg: {
      type: Number,
      default: 4,
    },

    xl: {
      type: Number,
      default: 4,
    },
  },

  emits: ["loaded-items", "error"],

  computed: {
    itemsPerRow() {
      if (this.$q.screen.xs) {
        return this.xs;
      }
      if (this.$q.screen.sm) {
        return this.sm;
      }
      if (this.$q.screen.md) {
        return this.md;
      }
      if (this.$q.screen.lg) {
        return this.lg;
      }
      return this.xl;
    },

    cardComponent() {
      return this.resource.ui.cardComponent || "rb-resource-card";
    },
  },

  methods: {
    onLoadedItems(items) {
      this.$emit("loaded-items", items);
    },

    onError(error) {
      this.$emit("error", error);
    },
  },
});
</script>
