import Vue from 'vue';
import Antd from 'ant-design-vue/es';
import App from './App';
import router from './router';
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false;

Vue.use(Antd)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');