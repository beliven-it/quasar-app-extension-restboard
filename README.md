# quasar-app-extension-restboard

A starter kit to install [Restboard](https://restboard.github.io/) in a fresh new [Quasar Framework](https://donate.quasar.dev) project

## Install

```bash
quasar ext add restboard
```

Quasar CLI will retrieve it from the NPM registry and install the extension to your project.

## Uninstall

```bash
quasar ext remove restboard
```

## Overview

This extension installs and wires all Restboard dependencies and provides
a clean and working application built on top of default [Quasar Framework](https://quasar.dev)
starter kit:

| Package | Description |
|---------|-------------|
| `rb-core-module` | The Restboard core module. It provides base classes and interfaces for resource definition and management |
| `rb-data-provider-json-server` | A reference data provider to interact with a JSON-based REST API |
| `rb-auth-provider-simple` | A simple reference auth provider to include basic authentication & authorization management |
| `quasar-app-extension-rb-ui` | The Restboard UI kit. It provides handy components to cover common use cases when creating admin panels and dashboards. |

While this is the best way to include automatically all the features of
Restboard in your project, you can also decide to manually install just
some of the mentioned packages according to your needs.

For example, if you just want to use **resources** and **providers** without
the optional Restboard UI kit, you can just install the following packages:

```bash
# The Restboard core module (required)
npm i --save rb-core-module

# Data and auth providers (optional, you can replace them with your owns)
npm i --save rb-data-provider-json-server
npm i --save rb-auth-provider-simple
```

At this point you are free to structure and organize your resources as you
prefer, while the suggested approach is to add a `src/boot/rb.js` file in
your Quasar project with the following content:

```js
// src/boot/rb.js
import resources from '../resources'

export default ({ app }) => {
  function install (Vue) {
    if ('config' in Vue && Vue.config.globalProperties) {
      // Vue 3.x
      Vue.config.globalProperties.$rb = resources
    } else {
      // Vue 2.x
      Vue.prototype.$rb = resources
    }
  }

  app.use(install)
}
```

Now, you can create a `src/resources.js` file when you can define all
your project resources:

```js
// src/resources.js
import { createResource } from 'rb-core-module'

const users = createResource({
  ...
})

export default {
  users,
  // other resources...
}
```

## Contribute

If you want, you can also freely donate to fund the project development:

[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://paypal.me/EBertoldi)

## Have you found a bug?

Please open a new issue on:

<https://github.com/restboard/quasar-app-extension-restboard/issues>

## License

Copyright (c) Emanuele Bertoldi

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
