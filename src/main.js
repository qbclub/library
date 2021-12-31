import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import firebaseConfig from "../firebaseConfig.js";
import ImageUploader from 'vue-image-upload-resize'

Vue.config.productionTip = false
Vue.use(ImageUploader);

initializeApp(firebaseConfig);
const auth = getAuth();

auth.onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});



new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
