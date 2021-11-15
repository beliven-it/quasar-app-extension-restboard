<template>
  <div v-if="loading">
    <div v-for="i in 3" :key="i" class="column q-gutter-y-sm">
      <q-skeleton type="QInput" />
    </div>
  </div>
  <div v-else>
    <q-input
      outlined
      :model-value="modelValue.name"
      :label="$t('Name')"
      @update:modelValue="val => onInput('name', val)"
    />
    <q-input
      outlined
      :model-value="modelValue.email"
      :label="$t('Email')"
      @update:modelValue="val => onInput('email', val)"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UserForm',

  props: {
    modelValue: {
      type: Object
    },

    loading: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onInput (field, val) {
      this.$emit('update:modelValue', {
        ...this.modelValue,
        [field]: val
      })
    }
  }
})
</script>
