<template>
  <button class="btn">{{ msg }}</button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
