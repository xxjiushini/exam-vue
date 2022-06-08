import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios  from 'axios';
Vue.prototype.$http = axios;

require('./api/index.js')//请求封装引用

import '@babel/polyfill';//转ES5

require('./assets/style/index.scss')//scss引用

//elementUI组件按需引入
import 'element-ui/lib/theme-chalk/index.css'
import element from './element'
Vue.use(element)
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };

import { Toast, Popup } from 'vant';//vant框架
import 'vant/lib/index.css';
Vue.use(Toast);
Vue.use(Popup);

if (process.env.NODE_ENV == 'development') {
    require('../mock'); //引入mock数据，关闭则注释该行
}

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
