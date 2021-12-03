/**
 * Quasar App Extension install script
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/install-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/InstallAPI.js
 */

function installCoreModule (api) {
  api.render('./templates/core')

  api.extendJsonFile('package.json', {
    dependencies: {
      'rb-auth-provider-simple': '^0.11.0',
      'rb-core-module': '^0.15.0',
      'rb-data-provider-json-server': '^0.18.0',
      'rb-vue': '^0.6.0',
      'vue-i18n': '^9.0.0',
      vuex: '^4.0.1'
    },

    devDependencies: {
      'quasar-app-extension-rb-ui': '^0.6.0'
    }
  })
}

function installExamplesModule (api) {
  api.render('./templates/examples')
}

module.exports = function (api) {
  installCoreModule(api)

  if (api.prompts.examples) {
    installExamplesModule(api)
  }
}
