import { createResource } from "rb-core-module";
import { defineAsyncComponent } from "vue";
import { dataProvider } from "../providers";

export default createResource({
  name: "users",
  provider: dataProvider,
  displayAttr: "name",
  schema: {
    type: "object",
    properties: {
      id: {
        type: "number",
      },
      name: {
        type: "string",
      },
      email: {
        type: "string",
      },
    },
  },
  actions: {
    delete: {
      icon: "delete",
      class: "text-negative",
      isVisible(item) {
        return !!this.getKey(item);
      },
      async run(item) {
        this.deleteOne(this.getKey(item));
      },
    },
  },
  ui: {
    icon: "group",
    formComponent: defineAsyncComponent(() =>
      import("components/UserForm.vue")
    ),
    columns: [
      {
        name: "id",
        sortable: true,
      },
      {
        name: "name",
        filterable: true,
      },
      {
        name: "email",
        filterable: true,
      },
    ],
  },
});
