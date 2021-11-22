<template>
  <div class="home">
    <HomeComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeComponent from '@/components/HomeComponent.vue'

export default {
  name: 'Home',
  props: {
    posts: []
  },
  components: {
    HomeComponent,
  },
  data() {
    return {
      posts: [],
    }
  },
  methods: {
    
  }
}
</script>
