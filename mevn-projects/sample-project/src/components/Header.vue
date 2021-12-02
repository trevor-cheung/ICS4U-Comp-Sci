<template>
<header>
  <h1 :style="{color:color}">{{ msg }}</h1>
  <Button :msg="msg" />
</header>
</template>

<script>
import Button from './Button.vue'

export default {
  name: 'Header',
  components: {
      Button
  },
  props: {
      msg: String,
      color: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
