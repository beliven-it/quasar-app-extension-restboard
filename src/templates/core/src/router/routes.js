import resources from '../resources'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      ...Object.keys(resources).map((resourceName) => ({
        path: resourceName,
        component: () => import('pages/MasterDetail.vue'),
        props: {
          resource: resources[resourceName]
        }
      }))
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
