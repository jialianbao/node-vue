<template>
  <div class="login">
  	<img height="50px" src="../assets/img/logo.png"/>
	  <div class="addUser">
	  	<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm mr10">
			  <el-form-item label="账号" prop="username">
			    <el-input v-model.number="ruleForm2.username" placeholder="请输入手机号"></el-input>
			  </el-form-item>
			  <el-form-item label="密码" prop="pass">
			    <el-input type="password" v-model="ruleForm2.pass" placeholder="请输入密码" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="确认密码" prop="checkPass">
			    <el-input type="password" v-model="ruleForm2.checkPass" placeholder="请再次确认密码" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
			    <el-button @click="resetForm('ruleForm2')">重置</el-button>
			  </el-form-item>
			</el-form>
	  </div>
  </div>
</template>

<script>
 export default {
    data() {
      var checkUser = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (!(/^1{1}[35789]{1}[0-9]{9}$/).test(value)) {
              callback(new Error('请输入正确的手机号'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {//在修改密码的时候如果确认密码不为空再次运行验证
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          username: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          username: [
            { validator: checkUser, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	this.$http.get('/api/add_user',{params:{
          		'username':this.ruleForm2.username,
          		'password1':this.ruleForm2.checkPass
          	}},{}).then((res)=>{
          		console.log(res)
          		if(res.body.code==1){
								  this.$alert(res.body.desc, '添加成功', {
								    confirmButtonText: '确定',
								    callback: action => {
								    	// 字符串
											// 对象
											//this.$router.push({ path: '/home/first' })
											//
											//// 命名的路由
											//this.$router.push({ name: 'home', params: { userId: wise }})
								      console.log('跳到登陆页')// 这里是点击确定后的回调函数
								      this.$router.push('/')
					          }
				      		});
							}else{
							  this.$alert(res.body.desc, '添加失败', {
							    confirmButtonText: '确定',
							    callback: action => {
							      console.log('添加失败了')// 这里是点击确定后的回调函数
				          }
				        });
							}
          	})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.mr10{
		margin-right: 10px;
	}
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
