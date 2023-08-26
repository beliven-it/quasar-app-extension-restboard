import { route } from 'quasar/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'
import createRoutes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function ({ store }) {
  let createHistory = createWebHashHistory

  if (process.env.SERVER) {
    createHistory = createMemoryHistory
  }

  if (process.env.VUE_ROUTER_MODE === 'history') {
    createHistory = createWebHistory
  }

  const routes = createRoutes(store)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    )
  })

  // If user is not authenticated or authorized, redirect her to login page.
  Router.beforeEach(async (to, from, next) => {
    const routingDescr = `Routing from ${from.fullPath} to ${to.fullPath}...`;
    try {
      await store.dispatch("core/checkRoutePermissions", to);
      console.debug(`[ALLOW] ${routingDescr}`);
      return next();
    } catch (err) {
      console.debug(`[BLOCK] ${routingDescr}`);
      return next("/auth/login");
    }
  });

  return Router
})
