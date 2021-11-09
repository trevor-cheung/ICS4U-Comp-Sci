<template>
  <div class="about">
    <h1 @click="test">This is an about page</h1>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'About',
  methods: {
    test() {
      this.$router.push({name:'Home'});
    }
  }
}
</script>
