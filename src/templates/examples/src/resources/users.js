import { defineAsyncComponent } from 'vue'
import { createVueResource } from 'rb-vue'
import { dataProvider } from '../providers'

export default createVueResource({
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
    formComponent: defineAsyncComponent(() => import('components/UserForm.vue'))
  }
})
