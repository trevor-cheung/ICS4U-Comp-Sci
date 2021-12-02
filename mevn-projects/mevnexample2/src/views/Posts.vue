<template>
  <div class="posts">
    <PostsComponent/>
  </div>
</template>

<script>
import PostsComponent from '@/components/PostsComponent.vue'

export default {
  name: 'Posts',
  props: {
    
  },
  components: {
    PostsComponent,
  }
}

</script>

