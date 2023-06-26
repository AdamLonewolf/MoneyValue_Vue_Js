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
      component: () => import('../views/Admin/Dashboard.vue') //Route qui va nous diriger vers le dashboard de la liste des paires
    },
    {
      path: '/dashboard/currency',
      name: 'admin.dashboard.currency',
      component: () => import('../views/Admin/DashboardCurrency.vue') //Route qui va nous diriger vers le dashboard de la liste des devises
    },

    {
      path: '/form/:id?',
      name: 'admin.edit',
      component: () => import('../components/PairForm.vue'), //Route qui va nous diriger vers le formulaire d'édition.
      props:true
    },
    {
      path: '/currencyform/:id?',
      name: 'admin.edit.currency',
      component: () => import('../components/CurrencyForm.vue'), //Route qui va nous diriger vers le formulaire d'édition.
      props:true
    },

  ]
})

//Je fais un guard pour protéger mes routes
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('User_token'); //On récupère le token dans le session storage
  const requiresAuth = ['admin.dashboard', 'admin.dashboard.currency', 'admin.edit', 'admin.edit.currency'];
  
  //Si on souhaite naviger vers une page contenue dans le tableau requiresAuth et que qu'on a pas le token, on est redirigé vers le login

  if (requiresAuth.includes(to.name) && !token) {
    // Je redirige vers la page de connexion si l'administrateur n'est pas connecté
    next({ name: 'admin.login' });
  } else {
    // Sinon j'autorise l'accès à la route demandée
    next();
  }
});

export default router
