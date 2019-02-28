<template>
  <div id="app">
    <router-view/>
	  <!--<ul>
	  	<li><router-link to="/hello">hello</router-link></li>
	  	<li><router-link to="/">默认页面</router-link></li>
	  </ul>-->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
</style>
