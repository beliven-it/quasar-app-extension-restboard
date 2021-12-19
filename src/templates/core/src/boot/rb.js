import resources from '../resources'

export default ({ app }) => {
  function install (Vue) {
    Vue.config.globalProperties.$rb = resources
  }

  app.use(install)
}
