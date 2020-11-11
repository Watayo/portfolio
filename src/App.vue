<template>
  <div id="app">
    <header class="app-header">
      <nav id="nav">
        <ul>
          <li>
            <router-link class="nav-tag" to="/">Top</router-link>
          </li>
          <li>
            <router-link class="nav-tag" to="/main">About</router-link>
          </li>
          <li>
            <router-link class="nav-tag" to="/works">Works</router-link>
          </li>
        </ul>
      </nav>
    </header>
    <div class="pc"></div>
    <router-view />
    <router-view name="about" />
    <router-view name="skills" />
  </div>
</template>

<script>
export default {
  name: "App"
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

nav {
  width: 90%;
}

nav ul {
  margin: 0;
  padding: 0;
  text-align: right;
}

nav ul li {
  list-style: none;
  display: inline-block;
  text-align: center;
  width: 10%; /* ここで項目の幅を指定します */
}

.nav-tag {
  text-decoration: none;
  font-size: 15px;
  color: #333;
}

nav li:hover {
  text-decoration: underline;
}
</style>
