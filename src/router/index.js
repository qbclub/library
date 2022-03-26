import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store/index.js'
import auth from './middleware/auth.js'
import admin from './middleware/admin.js'

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
    meta: {
      middleware: [
        admin
      ]
    },
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
    component: () => import('../components/Cabinet.vue'),
    meta: {
      middleware: [
        auth
      ]
    },
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
    meta: {
      middleware: [
        admin
      ]
    },
    component: () => import('../components/EventList.vue')
  },
  {
    path: '/userinfo',
    name: 'UserInfo',
    meta: {
      middleware: [
        admin
      ]
    },
    component: () => import('../components/UserInfo.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../components/Admin.vue'),
    meta: {
      middleware: [
        admin
      ]
    },
  },
  {
    path: '/user-actions',
    name: 'UserActions',
    meta: {
      middleware: [
        admin
      ]
    },
    component: () => import('../components/admin/userActions.vue')
  },
  {
    path: '/book-actions',
    name: 'BookActions',
    meta: {
      middleware: [
        admin
      ]
    },
    component: () => import('../components/admin/bookActions.vue')
  },
  {
    path: '/bookflow-actions',
    name: 'BookflowActions',

    component: () => import('../components/admin/bookflowActions.vue')
  },
  {
    path: '/editbook',
    name: 'EditBook',
    meta: {
      middleware: [
        admin
      ]
    },
    component: () => import('../components/EditBook.vue')
  },
  {
    path: '/UserList',
    name: 'UserList',
    meta: {
      middleware: [
        admin
      ]
    },
    component: () => import('../components/UserList.vue')
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware
  const context = {
    to,
    from,
    next,
    store


  }
  return middleware[0]({
    ...context
  })

})

export default router