<template>
  <div class="posts">
    <IndexComponent :posts="posts"/>
  </div>
</template>

<script>
import IndexComponent from '@/components/IndexComponent.vue'

export default {
  name: 'Posts',
  props: {
    posts: [],
  },
  components: {
    IndexComponent,
  }
}

</script>

