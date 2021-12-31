import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
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
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router