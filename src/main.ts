import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
// import cookie from "@/utils/cookie";

Vue.config.productionTip = false
Vue.prototype.$pb = process.env.BASE_URL
// Vue.prototype.$cookies = cookie

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
