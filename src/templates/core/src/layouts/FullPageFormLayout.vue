<template>
  <q-layout class="bg-grey-2">
    <q-page-container>
      <div class="flex flex-center">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";

/**
 * A layout used to display a page with a single, full-page form
 */
export default defineComponent({
  name: "FullPageFormLayout",
});
</script>
