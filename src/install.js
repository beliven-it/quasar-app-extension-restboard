/**
 * Quasar App Extension install script
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/install-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/InstallAPI.js
 */
const path = require('path')
const fs = require('fs')

function installCoreModule (api) {
  api.render('./templates/core')

  restboardPackageJsonFilename = path.join(__dirname, '../package.json')
  restboardPackageJson = JSON.parse(
    fs.readFileSync(restboardPackageJsonFilename)
  )

  api.extendPackageJson({
    dependencies: restboardPackageJson.dependencies,
    devDependencies: restboardPackageJson.devDependencies
  })

  const extensionsFilename = api.resolve.app('quasar.extensions.json')
  if (!fs.existsSync(extensionsFilename)) {
    fs.writeFile(extensionsFilename, '{}')
  }

  api.extendJsonFile('quasar.extensions.json', {
    'rb-ui': {}
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
