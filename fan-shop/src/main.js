import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate'
import axiosPlugin from '@/plugins/axiosPlugin'
import { authService } from '@/services/authServices'

Vue.config.productionTip = false
Vue.use(Vuelidate);
Vue.use(axiosPlugin);
Vue.mixin(authService);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')