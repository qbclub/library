import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './assets/styles/styles.scss'
import './assets/style/style.scss'
import { getAuth } from "firebase/auth";
import firebaseInit from "../firebaseConfig.js";
import ImageUploader from 'vue-image-upload-resize'

Vue.config.productionTip = false
Vue.use(ImageUploader);


const auth = getAuth(firebaseInit);

auth.onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

// store.dispatch("getAllBooks")

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
