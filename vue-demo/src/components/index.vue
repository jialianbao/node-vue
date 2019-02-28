<template>
  <div class="hello">
		<img src="./../assets/img/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Ecosystem</h2>
    <el-row class="row-bg">
		  <el-col :span="8"><div class="grid-content bg-purple-dark">1</div></el-col>
		  <el-col :span="8"><div class="grid-content bg-purple-light">2</div></el-col>
		  <el-col :span="8"><div class="grid-content bg-purple">3</div></el-col>
		  <el-col :span="6">1</el-col>
		  <el-col :span="6">2</el-col>
		  <el-col :span="6">3</el-col>
		  <el-col :span="6">4</el-col>
		</el-row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  method(){
  	
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #FFFFDD;
  }
</style>
