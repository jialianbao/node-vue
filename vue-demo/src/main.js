// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// 引入一些全局样式

import './assets/css/common.css'

import Vue from 'vue'
import App from './App'
import router from './router'
//import store from './config/store.js'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

// 挂载elementui
Vue.use(ElementUI);
//Vue.use(Element, { size: 'small' });

Vue.use(VueResource);
// 将自定义过滤器挂载在全局上
Vue.http.options.emulateHTTP = true;
Vue.http.options.emulateJSON = true;

// 声明根组件
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
//store,
  components: { App },
  template: '<App/>'
})
