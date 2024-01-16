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
          <rb-data-table
            class="full-width"
            :title="props.resource.label"
            :columns="props.resource.ui.columns"
            :row-key="props.resource.key"
            :rows="props.items"
            :actions="props.resource.getActions()"
            :selection="selection"
            :selected="selectedRows"
            :pagination="props.pagination"
            @update:selected="onUpdateSelected"
          >
            <template #top-actions>
              <q-btn
                flat
                round
                dense
                icon="sync"
                class="text-grey-7"
                @click="props.clearAndReloadData()"
              />
            </template>
          </rb-data-table>
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
 * A page displaying a collection as a table of items
 */
export default defineComponent({
  name: "ResourceTablePage",

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

    selection: {
      type: String,
    },

    selected: {
      type: Array,
    },
  },

  emits: ["loaded-items", "error"],

  data() {
    return {
      selectedRows: [...(this.selected || [])],
    };
  },

  methods: {
    onUpdateSelected(evt) {
      this.selectedRows = evt;
    },

    onLoadedItems(items) {
      this.$emit("loaded-items", items);
    },

    onError(error) {
      this.$emit("error", error);
    },
  },

  watch: {
    selected(val) {
      this.selectedRows = [...(val || [])];
    },
  },
});
</script>
