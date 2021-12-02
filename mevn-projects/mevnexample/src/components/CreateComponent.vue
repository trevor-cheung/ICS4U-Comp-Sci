<template>
  <div>
    <h1>Create A Post</h1>
    <form @submit.prevent="addPost">
      <div class="row">
        <div class="col-md-6">
          <div class="form-control">
            <label>Task</label>
            <input type="text" v-model="text" name="text" placeholder="Add Task" />
          </div>
          <div class="form-control">
            <label>Day & Time</label>
            <input
                type="text"
                v-model="day"
                name="day"
                placeholder="Add Day & Time"
            />
          </div>
          <div class="form-control form-control-check">
            <label>Set Reminder</label>
            <input type="checkbox" v-model="reminder" name="reminder" />
          </div>
        </div>
      </div><br />
        <div class="form-group">
          <button class="btn btn-primary">Create</button>
        </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {},
    };
  },
  methods: {
    addPost() {
      if (!this.text) {
        alert("Please add a task");
        return;
      }

      const newPost = {
        text: this.text,
        day: this.day,
        reminder: this.reminder,
      };

      this.$emit("add-post", newPost);

      this.text = "";
      this.day = "";
      this.reminder = false;
    },
  },
};
</script>