import { is } from "quasar";

export default {
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },

    loading: {
      type: Boolean,
      default: false,
    },

    key: {
      type: String,
      default: "id",
    },
  },

  data () {
    return {
      form: {}
    }
  },

  computed: {
    isUpdating() {
      return this.modelValue && this.modelValue[this.key];
    },
  },

  methods: {
    parseData(data) {
      return data
    },

    serializeData(data) {
      return data
    }
  },

  watch: {
    modelValue: {
      handler (val, old) {
        if (! is.deepEqual(val, old)) {
          this.form = this.parseData(JSON.parse(JSON.stringify(val)))
        }
      },
      immediate: true,
      deep: true
    },

    form: {
      handler (val, old) {
        if (! is.deepEqual(val, old)) {
          const data = this.serializeData(JSON.parse(JSON.stringify(val)))
          this.$emit("update:modelValue", data);
        }
      },
      deep: true
    }
  }
};
