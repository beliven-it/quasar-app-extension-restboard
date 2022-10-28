import resources from "../resources";

function createRoutes(store) {
  const routes = [
    {
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
    },

    {
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
    },

    // Always leave this as last one,
    // but you can also remove it
    {
      path: "/:catchAll(.*)*",
      component: () => import("pages/ErrorNotFound.vue"),
    },
  ];

  return routes;
}

export default createRoutes;
