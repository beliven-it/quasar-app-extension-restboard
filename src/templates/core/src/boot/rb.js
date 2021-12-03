import rb from 'rb-vue'
import resources from '../resources'

export default ({ app }) => {
  app.use(rb, { resources })
}
