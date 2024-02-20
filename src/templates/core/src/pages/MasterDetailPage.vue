<template>
  <q-page class="flex justify-center q-pa-none">
    <q-splitter
      v-model="splitterModel"
      class="full-width"
      :horizontal="horizontal || $q.screen.lt.md"
      before-class="q-layout-padding"
      after-class="full-width"
    >
      <template v-slot:before>
        <q-breadcrumbs class="q-mb-md text-subtitle1">
          <q-breadcrumbs-el icon="home" to="/" />
          <q-breadcrumbs-el :label="resource.label" />
        </q-breadcrumbs>
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
                  color="grey-7"
                  :title="$t('Refresh')"
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
        <div class="fit" style="max-height: calc(100vh - 50px)">
          <rb-resource-instance
            v-if="resource && activeRow"
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
          <div v-else class="fit column flex-center q-gutter-y-lg">
            <q-img src="~/assets/add.svg" width="150px" />
            <q-btn
              icon="add"
              color="primary"
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

/**
 * A page displaying a resource collection with the ability to select
 * and show details of one of them
 */
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
      default: 70,
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
