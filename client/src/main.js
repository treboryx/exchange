// App initiation, import our packages in here such as vue, the vue-router for our routes
// and bootstrap for quick styling

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');