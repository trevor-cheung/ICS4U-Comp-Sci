<template>
  <div class="container">
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/create" class="nav-link">Create Post</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/posts" class="nav-link">Posts</router-link>
        </li>
      </ul>
    </nav><br />
    <transition name="fade">
      <router-view :posts="posts"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    
  },
  data() {
    return {
      posts: []
    }
  },
  created() {
    this.posts = [
      {
        "id": "1",
        "title": "Doctors Appointment",
        "body": "March 5th at 2:30pm",
      },
      {
        "id": "2",
        "title": "Meeting with boss",
        "body": "March 6th at 1:30pm",
      },
      {
        "id": "3",
        "title": "Food shopping",
        "body": "March 7th at 2:00pm",
      }
    ]
  },
  methods: {
    
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

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
