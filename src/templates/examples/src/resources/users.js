import { defineAsyncComponent } from 'vue'
import { createResource } from 'rb-core-module'
import { dataProvider } from '../providers'

export default createResource({
  name: 'users',
  provider: dataProvider,
  schema: {
    type: 'object',
    properties: {
      id: {
        type: 'number'
      },
      name: {
        type: 'string',
        filterable: true
      },
      email: {
        type: 'string'
      }
    }
  },
  ui: {
    icon: 'group',
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
