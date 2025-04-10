/**
 * Quasar App Extension install script
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/install-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/InstallAPI.js
 */
const path = require("path");
const fs = require("fs");

function installCoreModule(api) {
  api.render("./templates/core");

  const restboardPackageJsonFilename = path.join(__dirname, "../package.json");
  const restboardPackageJson = JSON.parse(
    fs.readFileSync(restboardPackageJsonFilename)
  );

  const deps = {
    dependencies: restboardPackageJson.dependencies,
    devDependencies: restboardPackageJson.devDependencies,
    bin: {
      restboard:
        "./node_modules/@beliven/quasar-app-extension-restboard/src/cli/index.js",
      rb: "./node_modules/@beliven/quasar-app-extension-restboard/src/cli/index.js",
    },
  };

  // Remove "vuelentino" from target deps bundle
  delete deps.devDependencies.vuelentino;

  api.extendPackageJson(deps);

  const extensionsFilename = api.resolve.app("quasar.extensions.json");
  if (!fs.existsSync(extensionsFilename)) {
    fs.writeFile(extensionsFilename, "{}");
  }

  api.extendJsonFile("quasar.extensions.json", {
    "@beliven/rb-ui": {},
  });
}

function installExamplesModule(api) {
  api.render("./templates/examples");
}

module.exports = function (api) {
  installCoreModule(api);

  if (api.prompts.examples) {
    installExamplesModule(api);
  }
};
