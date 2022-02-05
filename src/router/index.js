import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'About',

    component: () => import('../views/About.vue')
  },
  {
    path: '/book',
    name: 'Book',

    component: () => import('../components/Book.vue')
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: () => import('../components/AddBook.vue')
  },
  {
    path: '/',
    name: 'StartPage',
    component: () => import('../components/StartPage.vue')
  },
  {
    path: '/books',
    name: 'ListOfBooks',
    component: () => import('../components/ListOfBooks.vue')
  },
  {
    path: '/cabinet',
    name: 'Cabinet',

    component: () => import('../components/Cabinet.vue')
  },
  {
    path: '/reg',
    name: 'Registration',

    component: () => import('../components/Registration.vue')
  },
  {
    path: '/auth',
    name: 'Auth',

    component: () => import('../components/Auth.vue')
  },

  {
    path: '/eventList',
    name: 'EventList',

    component: () => import('../components/EventList.vue')
  },
  {
    path: '/userinfo',
    name: 'UserInfo',

    component: () => import('../components/UserInfo.vue')
  },
  {
    path: '/admin',
    name: 'Admin',

    component: () => import('../components/Admin.vue')
  },
  {
    path: '/user-actions',
    name: 'UserActions',

    component: () => import('../components/admin/userActions.vue')
  },
  {
    path: '/book-actions',
    name: 'BookActions',

    component: () => import('../components/admin/bookActions.vue')
  },
  {
    path: '/bookflow-actions',
    name: 'BookflowActions',

    component: () => import('../components/admin/bookflowActions.vue')
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router