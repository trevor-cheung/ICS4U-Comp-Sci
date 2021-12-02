<template>
  <div class="standings">
    <StandingsComp />
  </div>
</template>

<script>
// @ is an alias to /src
import StandingsComp from '@/components/StandingsComp.vue'

export default {
  name: 'Standings',
  components: {
    StandingsComp,
  }
}
</script>
