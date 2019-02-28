<template>
  <div class="login">
  	<img height="50px" src="../assets/img/logo.png"/>
  	<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  		<el-form-item label="手机号" prop="username">
		    <el-input type="text" v-model="ruleForm.username" auto-complete="off"></el-input>
		  </el-form-item>
		  
		  <el-form-item label="密码" prop="password1">
		    <el-input type="password" v-model="ruleForm.password1" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
		    <el-button @click="resetForm('ruleForm')">重置</el-button>
		  </el-form-item>
		</el-form>
		
    <router-link to="/addUser">立即注册</router-link>
    <router-link to="/setPassword">找回密码</router-link>
			<!--<el-input placeholder="请输入账号" autofocus="true" v-model="userId" maxlength="11" clearable>
		    <template slot="prepend"><i class="el-icon-mobile-phone"></i></template>
		  </el-input>
		  
			<el-input placeholder="请输入密码" type="password" v-model="passWord" maxlength="22" clearable>
		    <template slot="prepend"><i class="el-icon-goods"></i></template>
		 </el-input>
		 
		<el-button type="primary" class="login_btn">登陆</el-button>-->
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
  	let zidingyi =  (rule, value, callback) => {
  			if (value === '') {
          callback(new Error('请输入手机号'));
        }else if (!(/^1{1}[35789]{1}[0-9]{9}$/).test(value)) {
          callback(new Error('请输入正确的手机号'));
        } else {
//        if (this.ruleForm.username !== '') {
//          this.$refs.ruleForm.validateField('username');
//        }
          callback();
        }
      };
    return {
      login: '欢迎来到登陆页面',
      ruleForm:{
      	password1:'',
      	username:''
      },
      rules:{
      	username:[
//    		{ required: true, message: '请输入密码', trigger: 'blur' },
      		{ validator:zidingyi,trigger: 'blur' }
      	],
      	password1: [
	        { required: true, message: '请输入密码', trigger: 'blur' },
	        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
	      ],
      }
    }
  },
	methods: {
		submitForm(formName) {
			// 验证标单
	    this.$refs[formName].validate((valid) => {
	      if (valid) {
//		  		console.log(this.ruleForm.username);
					this.$http.get('/api/get_user',{// 在get请求时添加参数一定要加上 params
						params:{
							"password1":this.ruleForm.password1,
							"username":this.ruleForm.username
						}
					},
					{
//	      		'headers': { 'Content-Type': 'x-www-form-urlencoded' }
	      	})
						.then((res) => {
							if(res.body.code==1){
								this.$message('登陆成功');
								this.$router.push('/hello');
							}else{
								this.$alert(res.body.desc, '登陆失败', {
				          confirmButtonText: '确定',
				          callback: action => {
				          	console.log('haha')// 这里是点击确定后的回调函数
//				            this.$message({
//				              type: 'info',
//				              message: `action: ${ action }`
//				            });
				          }
				        });
							}
						})
						.catch(function(res) {
					    console.log(res)
						})
					
					
	      } else {
	        console.log('error submit!!');
	        return false;
	      }
	    });
	  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.login{
		padding-top: 50px;
	}
	.login>img{
		margin-bottom: 50px;
	}
	.login_box{
		width: 90%;
		margin:5px auto;
	}
	.login_box>.el-col{
		/*background: #C5CACD;
		border-radius: 5px;*/
		min-height: 36px;
		margin-bottom: 5px;
		line-height: 36px;
		border-bottom: 1px solid #F0F0F0;
	}
	.login_btn{
		width: 80%;
		font-size: 1.2em;
		margin-top: 100px;
	}
</style>
