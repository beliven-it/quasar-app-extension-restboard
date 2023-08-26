<template>
  <div class="column q-gutter-y-md">
    <template v-if="loading">
      <q-skeleton type="QInput" v-for="i in 2" :key="i" />
    </template>
    <template v-else>
      <q-input
        outlined
        v-model="form.name"
        :label="$t('Name')"
      />
      <q-input
        outlined
        v-model="form.email"
        :label="$t('Email')"
      />
    </template>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Form from "../mixins/Form";

export default defineComponent({
  name: "UserForm",

  mixins: [Form]
});
</script>
