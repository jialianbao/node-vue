<template>
  <div class="hello">
    <img src="./../assets/img/logo.png">
    <h1>{{ msg }}</h1>

    <el-row>
		  <el-col class="ml10 mt10" :span="24" v-for="(list,key) in lists" :key="list.id">
		  	{{key+1}}
		  	<span>{{list.content}}</span>
		  	<img class="block" :src=list.url />
		  </el-col>
		</el-row>

  </div>
</template>

<script>
export default {
  name: 'Hello',
  data () {
    return {
      msg: '欢迎来到我的页面',
      startNumber:0,
      pageSize:10,
      lists:[]
    }
  },
	methods: {
		getJoke(startNumber,pageSize){
			startNumber = startNumber||this.startNumber;
			pageSize = pageSize||this.pageSize;
			this.$http.get('/api/get_joke',
				{// 在get请求时添加参数一定要加上 params
					params:{/*请求参数*/
						'startNumber':startNumber,
						'pageSize':pageSize
					}
				},{/*'headers': { 'Content-Type': 'x-www-form-urlencoded' }  // 设置请求头的*/}
			).then((res) => {// 回调函数
				if(res.body.code==1){
					this.$message('获取成功');
					this.lists = this.lists.concat(res.body.data);
					console.log(this.lists);
				}else{
					this.$message({
	  				type: 'info',
	      		message: `获取失败`
	    		});
				}
			}).catch(function(res) {// 失败时的回调
		    console.log(res)
			})
		}
	},
	mounted:function(){
		this.getJoke();
	},
	beforeCreate:function(){// 在创建之前
	    console.log('beforeCreate:刚刚new Vue()之后，这个时候，数据还没有挂载呢，只是一个空壳')           
	    console.log(this.msg)//undefined
	    console.log(document.getElementsByClassName("myp")[0])//undefined
	},
	created:function(){// 创建后
	    console.log('created:这个时候已经可以使用到数据，也可以更改数据,在这里更改数据不会触发updated函数')
	    this.msg+='!!!'
	    console.log('在这里可以在渲染前倒数第二次更改数据的机会，不会触发其他的钩子函数，一般可以在这里做初始数据的获取')
	    console.log('接下来开始找实例或者组件对应的模板，编译模板为虚拟dom放入到render函数中准备渲染')
	},
	beforeMount:function(){// 安装前
	    console.log('beforeMount：虚拟dom已经创建完成，马上就要渲染,在这里也可以更改数据，不会触发updated')
	    this.msg+='@@@@'
	    console.log('在这里可以在渲染前最后一次更改数据的机会，不会触发其他的钩子函数，一般可以在这里做初始数据的获取')
	    console.log(document.getElementsByClassName("myp")[0])//undefined
	    console.log('接下来开始render，渲染出真实dom')
	},
	render:function(createElement){
	     console.log('render')
//	     return createElement('div','hahaha')
	},
//	mounted:function(){ 
//	    console.log('mounted：此时，组件已经出现在页面中，数据、真实dom都已经处理好了,事件都已经挂载好了')
//	    console.log(document.getElementsByClassName("myp")[0])
//	    console.log('可以在这里操作真实dom等事情...')
//	
//	//    this.$options.timer = setInterval(function () {
//	//        console.log('setInterval')
//	//         this.msg+='!'  
//	//    }.bind(this),500)
//	},
	beforeUpdate:function(){
	    //这里不能更改数据，否则会陷入死循环
	    console.log('beforeUpdate:重新渲染之前触发')
	    console.log('然后vue的虚拟dom机制会重新构建虚拟dom与上一次的虚拟dom树利用diff算法进行对比之后重新渲染')         
	},
	updated:function(){
	    //这里不能更改数据，否则会陷入死循环
	    console.log('updated:数据已经更改完成，dom也重新render完成')
	},
	beforeDestroy:function(){
	    console.log('beforeDestory:销毁前执行（$destroy方法被调用的时候就会执行）,一般在这里善后:清除计时器、清除非指令绑定的事件等等...')
	    // clearInterval(this.$options.timer)
	},
	destroyed:function(){
	    console.log('destroyed:组件的数据绑定、监听...都去掉了,只剩下dom空壳，这里也可以善后')
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	
</style>
