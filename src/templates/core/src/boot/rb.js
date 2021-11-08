import rb from 'rb-vue'
import rbVueSmartComponents from 'rb-vue-smart-components'
import resources from '../resources'

export default ({ app }) => {
  app.use(rbVueSmartComponents)
  app.use(rb, { resources })
}
