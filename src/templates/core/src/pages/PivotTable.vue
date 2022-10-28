<template>
  <q-page class="flex justify-center">
    <rb-container :full-width="fullWidth">
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
          />
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
  name: "PagePivotTable",

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
