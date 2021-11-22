<template>
  <div>
    <header id="main-header" class="bg-success text-white p-4 mb-3">
      <div class="container">
         <h1 id="header-title">MLB</h1>
      </div>
    </header>
    <div id="nav">
      <nav class="navbar navbar-expand-lg bg-light navbar-light py-3 fixed-top">
        <div class="container">
          <router-link to="/" class="navbar-brand"><h1>MLB</h1></router-link>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse justify-content-end" id="navmenu">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <router-link to="/" class="nav-link">Standings</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/scores" class="nav-link">Scores</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/input-game" class="nav-link">Input Game</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    
  },
  mounted() {
    
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
