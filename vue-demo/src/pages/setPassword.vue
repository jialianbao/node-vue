<template>
	<div class="setPassword">
		<img height="50px" src="../assets/img/logo.png" />
		<el-form :model="ruleForm2" status-icon :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
			<el-form-item label="账号" prop="username">
				<el-input v-model.number="ruleForm2.username" placeholder="请输入手机号"></el-input>
			</el-form-item>
			<el-form-item label="原密码" prop="pass1">
				<el-input type="password" v-model="ruleForm2.pass1" placeholder="请输入原密码" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="新密码" prop="pass">
				<el-input type="password" v-model="ruleForm2.pass" placeholder="请输入新密码" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="确认新密码" prop="checkPass">
				<el-input type="password" v-model="ruleForm2.checkPass" placeholder="请再次确认新密码" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
				<el-button @click="resetForm('ruleForm2')">重置</el-button>
			</el-form-item>
		</el-form>
		<router-link to="/">登陆</router-link>
		<router-link to="/addUser">注册</router-link>
	</div>
</template>

<script>
	export default {
		name: 'Setpassword',
		data() {
			var checkUser = (rule, value, callback) => {
				if(!value) {
					return callback(new Error('账号不能为空'));
				}
				setTimeout(() => {
					if(!Number.isInteger(value)) {
						callback(new Error('请输入数字值'));
					} else {
						if(!(/^1{1}[35789]{1}[0-9]{9}$/).test(value)) {
							callback(new Error('请输入正确的手机号'));
						} else {
							callback();
						}
					}
				}, 1000);
			};
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					if(this.ruleForm2.checkPass !== '') { //在修改密码的时候如果确认密码不为空再次运行验证
						this.$refs.ruleForm2.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.ruleForm2.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				ruleForm2: {
					pass: '',
					pass1: '',
					checkPass: '',
					username: ''
				},
				rules: {
			      	pass1: [
				        { required: true, message: '请输入密码', trigger: 'blur' },
				        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
				    ],
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}],
					username: [{
						validator: checkUser,
						trigger: 'blur'
					}]
				}
			};
		},
		beforeDestory() {

		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$http.get('/api/set_user', {
							params: {
								'username': this.ruleForm2.username,
								'pass1': this.ruleForm2.pass1,
								'password1': this.ruleForm2.checkPass
							}
						}, {}).then((res) => {
							console.log(res)
							if(res.body.code == 1) {
								this.$message('修改成功');
								this.$router.push('/');
							} else {
								this.$alert(res.body.desc, '修改失败', {
									confirmButtonText: '确定',
									callback: action => {
										console.log('修改失败了') // 这里是点击确定后的回调函数
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
	h1,
	h2 {
		font-weight: normal;
	}
	
	ul {
		list-style-type: none;
		padding: 0;
	}
	
	li {
		display: inline-block;
		margin: 0 10px;
	}
	
	a {
		color: #42b983;
	}
</style>