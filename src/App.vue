<template>
  <div id="app">
    <header class="app-header">
      <nav id="nav">
        <p>Watayo's dev</p>
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
body {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 15px;
}

.app-header {
  margin-bottom: 15px;
}

nav {
  width: 95%;
  display: inline-flex;
}

nav p {
  margin: 0;
  padding: 0;
  flex-basis: 60%;
  text-align: left;
  font-weight: bold;
}

nav ul {
  margin: 0;
  padding: 0;
  flex-basis: 40%;
  text-align: right;
}

nav ul li {
  list-style: none;
  display: inline-block;

  margin-left: 30px;
  /* ここで項目の幅を指定します */
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
