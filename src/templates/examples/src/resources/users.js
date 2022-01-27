import { defineAsyncComponent } from 'vue'
import { createResource } from 'rb-core-module'
import { dataProvider } from '../providers'

export default createResource({
  name: 'users',
  provider: dataProvider,
  displayAttr: 'name',
  schema: {
    type: 'object',
    properties: {
      id: {
        type: 'number'
      },
      name: {
        type: 'string'
      },
      email: {
        type: 'string'
      }
    }
  },
  // actions: {
  //   edit: {
  //     icon: 'edit',
  //     async run (item) {
  //       // ...
  //     }
  //   }
  // },
  ui: {
    icon: 'group',
    // indexComponent: defineAsyncComponent(() =>
    //   import('components/ResourceTable.vue')
    // ),
    // cardComponent: defineAsyncComponent(() =>
    //   import('components/ResourceCard.vue')
    // ),
    formComponent: defineAsyncComponent(() =>
      import('components/UserForm.vue')
    ),
    columns: [
      {
        name: 'id'
      },
      {
        name: 'name',
        filterable: true
      },
      {
        name: 'email',
        filterable: true
      }
    ]
  }
})
