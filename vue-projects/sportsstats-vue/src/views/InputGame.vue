<template>
  <div class="inputGame">
      <InputGameComp />
  </div>
</template>

<script>
// @ is an alias to /src
import InputGameComp from '@/components/InputGameComp.vue'

export default {
  name: 'InputGame',
  components: {
    InputGameComp,
  }
}
</script>
