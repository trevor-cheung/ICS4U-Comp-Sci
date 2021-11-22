<template>
  <div class="create">
    <CreateComponent @add-task="addTask"/>
  </div>
</template>

<script>
import CreateComponent from '@/components/CreateComponent.vue'

export default {
  name: 'Posts',
  props: {
    posts: [],
  },
  components: {
    CreateComponent,
  }
}

</script>

