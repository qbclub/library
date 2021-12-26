import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from "../firebaseInit.js";
import ImageUploader from 'vue-image-upload-resize'

Vue.config.productionTip = false


Vue.use(ImageUploader);
// firebase.auth().onAuthStateChanged(user => {
//   store.dispatch("fetchUser", user);
// });

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
