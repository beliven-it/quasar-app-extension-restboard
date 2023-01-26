<template>
  <q-page class="flex justify-center">
    <q-splitter
      v-model="splitterModel"
      class="full-width"
      :horizontal="horizontal"
      :before-class="horizontal ? 'full-width q-pa-xs' : 'full-height q-pa-xs'"
      :after-class="horizontal ? 'full-width q-pa-xs' : 'full-height q-pa-xs'"
      :separator-class="horizontal ? 'q-my-lg' : 'q-mx-lg'"
    >
      <template v-slot:before>
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
              :loading="props.loading"
              :title="props.resource.label"
              :columns="props.resource.ui.columns"
              :row-key="props.resource.key"
              :rows="props.items"
              :actions="props.resource.getActions()"
              :selection="selection"
              :selected="selectedRows"
              :pagination="props.pagination"
              @update:selected="onUpdateSelected"
              @row-click="onRowClicked"
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
      </template>
      <template v-slot:after>
        <rb-resource-instance
          v-if="activeRow"
          ref="resourceInstance"
          :id="activeRow[resource.key]"
          :resource="resource"
          v-slot="props"
          @loaded="onLoadedItem"
          @error="onError"
        >
          <rb-form-wrapper
            class="fit"
            dismissible
            :resource="resource"
            :id="props.id"
            :schema="props.schema"
            :loading="props.loading"
            :saving="props.saving"
            :model-value="props.instance"
            @submit="onFormSubmitted"
            @dismiss="onFormDismissed"
          />
        </rb-resource-instance>
        <div v-else class="fit column items-center">
          <div class="column q-gutter-sm text-center" style="max-width: 200px">
            <p>{{ $t("Select an item from the list or") }}</p>
            <q-btn
              color="primary"
              icon="add"
              :label="$t('Add new')"
              @click="onAddNewRow"
            />
          </div>
        </div>
      </template>
    </q-splitter>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MasterDetailPage",

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

    keepOnEmpty: {
      type: Boolean,
    },

    selection: {
      type: String,
    },

    selected: {
      type: Array,
    },

    horizontal: {
      type: Boolean,
    },

    ratio: {
      type: Number,
      default: 60,
    },
  },

  emits: ["loaded-items", "loaded-item", "error"],

  data() {
    return {
      activeRow: null,
      selectedRows: this.selected || undefined,
      splitterModel: ref(this.ratio),
    };
  },

  methods: {
    onUpdateSelected(evt) {
      this.selectedRows = evt;
      this.$emit("update:selected", evt);
    },

    onRowClicked(evt, row) {
      this.activeRow = row;
    },

    onAddNewRow() {
      this.activeRow = {};
    },

    onFormSubmitted(data) {
      this.$refs.resourceInstance.saveData(data);
    },

    onFormDismissed() {
      this.activeRow = null;
    },

    onLoadedItems(items) {
      this.$emit("loaded-items", items);
    },

    onLoadedItem(item) {
      this.$emit("loaded-item", item);
    },

    onError(error) {
      this.$emit("error", error);
    },
  },

  watch: {
    selected(val) {
      this.selectedRows = val || undefined;
    },
  },
});
</script>
