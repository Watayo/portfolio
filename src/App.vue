<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Top</router-link>
      <router-link to="/main">About</router-link>
      <router-link to="/works">Works</router-link>
    </div>
    <router-view />
    <router-view name="about"></router-view>
    <router-view name="skills"></router-view>
  </div>
</template>
<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
