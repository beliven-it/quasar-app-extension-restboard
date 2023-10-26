import { WHITELIST_URLS } from "src/config";
import { authProvider } from "src/providers";
import resources from "../resources";

async function checkRoutePermissions(route) {
  // Check first for whitelisted routes (don't require auth* at all)
  if (WHITELIST_URLS.includes(route.path)) {
    return true;
  }

  // Authentication
  const { data: user } = await authProvider.checkAuth();
  if (!user) {
    return false;
  }

  // Authorization
  return authProvider.can(user, route.meta.permissions || []);
}

export default ({ app }) => {
  function install (Vue) {
    const router = Vue.config.globalProperties.$router

    // Add an auth guard before each route
    router.beforeEach(async (to, from, next) => {
      try {
        const authorized = await checkRoutePermissions(to, from);
        if (!authorized) {
          throw new Error(`Unauthorized access to ${to.fullPath}`);
        }
        console.debug(`[ALLOW] Routing from ${from.fullPath} to ${to.fullPath}...`);
        return next();
      } catch (err) {
        console.debug(`[BLOCK] Routing from ${from.fullPath} to ${to.fullPath}...`);
        return next("/auth/login");
      }
    });

    // Register default routes
    router.addRoute({
      path: "/auth",
      component: () => import("layouts/FullPageFormLayout.vue"),
      children: [
        {
          path: "login",
          component: () => import("pages/LoginPage.vue"),
        },
        {
          path: "recovery",
          component: () => import("pages/RecoverPasswordPage.vue"),
        },
      ],
    })

    router.addRoute({
      path: "/",
      component: () => import("layouts/MainLayout.vue"),
      children: [
        {
          path: "",
          component: () => import("pages/IndexPage.vue"),
        },
        // Add default routes for each registered resource
        ...Object.values(resources).map((resource) => {
          return {
            path: resource.name,
            component: resource.ui.indexComponent
              ? resource.ui.indexComponent
              : () => import("pages/MasterDetailPage.vue"),
            props: {
              resource,
              padding: true,
            },
          };
        }),
      ],
    })
  }

  app.use(install)
}
