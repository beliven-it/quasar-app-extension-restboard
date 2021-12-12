import { createResourceManager } from 'rb-core-module'
import resources from '../resources'

export default ({ app }) => {
  function install (Vue) {
    const rb = createResourceManager(resources)

    if ('config' in Vue && Vue.config.globalProperties) {
      // Vue 3.x
      Vue.config.globalProperties.$rb = rb
    } else {
      // Vue 2.x
      Vue.prototype.$rb = rb
    }
  }

  app.use(install)
}
