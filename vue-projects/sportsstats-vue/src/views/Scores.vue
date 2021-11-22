<template>
  <div class="scores">
    <ScoresComp />
  </div>
</template>

<script>
// @ is an alias to /src
import ScoresComp from '@/components/ScoresComp.vue'

export default {
  name: 'Scores',
  components: {
    ScoresComp,
  }
}
</script>
