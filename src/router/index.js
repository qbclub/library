import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
  path: '/about',
  name: 'About',

  component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
},
{
  path: '/book',
  name: 'Book',

  component: () => import( /* webpackChunkName: "about" */ '../components/Book.vue')
},
{
  path: '/addbook',
  name: 'AddBook',
  component: () => import( /* webpackChunkName: "takebook" */ '../components/AddBook.vue')
},
{
  path: '/',
  name: 'ListOfBooks',
  component: () => import( /* webpackChunkName: "takebook" */ '../components/ListOfBooks.vue')
},
{
  path: '/cabinet',
  name: 'Cabinet',

  component: () => import( /* webpackChunkName: "about" */ '../components/Cabinet.vue')
},
{
  path: '/reg',
  name: 'Registration',

  component: () => import( /* webpackChunkName: "about" */ '../components/Registration.vue')
},
{
  path: '/logIn',
  name: 'LogIn',

  component: () => import( /* webpackChunkName: "about" */ '../components/LogIn.vue')
},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router