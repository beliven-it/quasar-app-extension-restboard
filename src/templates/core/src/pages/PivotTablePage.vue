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
          <rb-pivot-data-table
            class="full-width"
            :title="props.resource.label"
            :model-value="props.items"
            :pagination="props.pagination"
            :column-key="columnKey"
            :row-key="rowKey"
            :cell-key="cellKey"
            :with-column-total="withColumnTotal"
            :with-row-total="withRowTotal"
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
          </rb-pivot-data-table>
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

export default defineComponent({
  name: "PivotTablePage",

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

    rowKey: {
      type: String,
    },

    columnKey: {
      type: String,
    },

    cellKey: {
      type: String,
    },

    withRowTotal: {
      type: Boolean,
    },

    withColumnTotal: {
      type: Boolean,
    },
  },

  emits: ["loaded-items", "error"],

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
