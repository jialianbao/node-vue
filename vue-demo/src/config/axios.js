/**
 * Created by esonline on 2017/9/21.
 */
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

import {DATA_URL} from '../service/util'

// 配置axios------------------------------------------------------------------------------------------------------------------
axios.defaults.timeout = 50000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';           //配置请求头
axios.defaults.baseURL = DATA_URL;   //配置接口地址
//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  //在发送请求之前做某件事
  if(config.method  === 'post' ||　config.method  === 'get'){
    if(config.url.match('login') != null){
      config.data = qs.stringify(config.data);
    }
    if(localStorage.token){
      config.headers['Access-Token'] = JSON.parse(localStorage.token);
    }
  }
  return config;
},(error) =>{
  _.toast("错误的传参", 'fail');
  return Promise.reject(error);
});

Vue.prototype.$axios = axios;

// 配置axios结束---------------------------------------------------------------------------------------------------------------
