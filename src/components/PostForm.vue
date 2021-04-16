<template>

  <div class="text-center profileCard">
    <form @submit.prevent="submit">
      <div class="flex justify-center mt-16">
        <img class="picframe" src="../assets/Tien.jpg " width="200" />
      </div>
      <span>{{ firstname }}</span> <span>{{ lastname }}</span>
      <div class="boxpost ">
        <input
          :value="modelValue"
          :placeholder="label"
          @input="$emit('update:modelValue', $event.target.value)"
          class="inputField"
        />
      </div>
      <button class="button-post" style="vertical-align:middle">
        <span>Post</span>
      </button>
    </form>

    <div v-for="profile in profiledata" v-bind:key="profile.id">
      <div class="postCard">
        <div class="text-center">
          <h1>
            <span>{{ profile.firstname }} :</span>
            <span>{{ profile.postFormUser }}</span>
          </h1>
        </div>
        <div class="mr-9">
          <button
            @click="deletePost(profile.id)"
            class="button-post"
            style="vertical-align:middle"
          >
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
     label:{
        type: String,
        default: ''
        },
    modelValue: {
        type: [String,Number],
        default: ''
    },
    profiledata: Object,
    firstname: String,
    lastname: String,
  },
  name: "PostForm",
  data() {
    return {};
  },
  methods: {
    submit() {
      this.$emit("submit-post");
    },
    deletePost(id){
      this.$emit("delete-post",id);
    }
  },
};
</script>
<style>
.inputField{
    width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}
.inputField:focus{
    background-color: #ddd;
  outline: none;
}</style>
