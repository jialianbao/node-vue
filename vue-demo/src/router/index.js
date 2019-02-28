import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Hello from '@/pages/Hello'
import Login from '@/pages/login'
import Adduser from '@/pages/addUser'
import Setpassword from '@/pages/setPassword'

Vue.use(Router)

export default new Router({
  routes: [
	  {
	  	path: '/',
	  	name: 'Login',
	  	component: Login
	  },
    {
      path: '/addUser',
      name: 'addUser',
      component: Adduser
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/setpassword',
      name: 'Setpassword',
      component: Setpassword
    }
  ]
})
