import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue') //Route qui va nous diriger vers l'accueil
    },
    {
      path: '/login',
      name: 'admin.login',
      component: () => import('../components/AdminLogin.vue') //Route qui va nous diriger vers le login.
    },
    {
      path: '/dashboard',
      name: 'admin.dashboard',
      component: () => import('../views/Admin/Dashboard.vue') //Route qui va nous diriger vers le dashboard.
    },
    {
      path: '/edit/:id?',
      name: 'admin.edit',
      component: () => import('../components/EditPair.vue'), //Route qui va nous diriger vers le formulaire d'édition.
      props:true
    },
    {
      path: '/lists',
      name: 'list',
      component: () => import('../components/PairList.vue') //Route qui va nous diriger vers le dashboard.
    }
  ]
})

export default router
