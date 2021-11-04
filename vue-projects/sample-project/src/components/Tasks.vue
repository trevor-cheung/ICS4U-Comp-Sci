<template>
<div>
  <div :key="task.id" v-for="task in tasks">
    <Task 
    @toggle-reminder="$emit('toggle-reminder', task.id)"
    @delete-task="$emit('delete-task', task.id)"
    :task="task"
    />
  </div>
</div>
</template>

<script>
import Task from './Task.vue'

export default {
  name: 'Tasks',
  props: {
    tasks: []
  },
  components: {
    Task
  },
  emits: ['delete-task', 'toggle-reminder']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
