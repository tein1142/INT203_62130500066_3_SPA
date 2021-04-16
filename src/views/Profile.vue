<template>
  <base-navbar />

  <div class="boxinput text-center">
    <div v-if="showNameInput">
      <div class="flex justify-center mt-16">
        <img class="picframe" src="../assets/Tien.jpg " width="200" />
      </div>
      <form class="mt-6" @submit.prevent="submitForm">
        <label for="firstname"><b>First Name</b></label>
        <div class="boxpost">
          <base-input
            label="Enter Your First Name"
            patternValue=".{5,}"
            type="text"
            v-model.trim="firstnameInput"
          />
          <p v-if="invalidFirstname" class="text-red-600">
            Please Enter Your Firstname
          </p>

          <label for="lastname"><b>Last Name</b></label>
          <base-input
            patternValue=".{5,}"
            type="text"
            label="Enter Your Last Name"
            v-model.trim="lastnameInput"
          />
          <p v-if="invalidLastname" class="text-red-600">
            Please Enter Your Lastname
          </p>
          <button type="submit" class="btn">Submit</button>
        </div>
      </form>
    </div>
  </div>
  <!-- Post -->
  <!-- component -->
  <div v-if="showPostInput">
    <post-form
      label="Text Here"
      :firstname="firstnameInput"
      :lastname="lastnameInput"
      v-model.trim="postCommentUser"
      @submit-post="submitPost"
      :profiledata="profileData"
      @delete-post="deletePost"
    ></post-form>
  </div>

  <!-- -------------------- -->
</template>
<script>
import axios from "axios";
import PostForm from "../components/PostForm.vue";
export default {
  name: "Profile",
  components: {
    PostForm,
  },
  data() {
    return {
      urlProfile: "http://localhost:5000/profileData",
      firstnameInput: "",
      lastnameInput: "",
      postCommentUser: "",
      showEditInput: false,
      invalidFirstname: false,
      invalidLastname: false,
      showNameInput: true,
      showPostInput: false,
      hasPost: false,
      profileData: [],
    };
  },
  methods: {
    async fetchDataProfile() {
      const res = await fetch(this.urlProfile);
      const data = await res.json();
      return data;
    },
    getDataProfile() {
      axios.get(this.urlProfile).then((res) => {
        console.log(res);
        this.profileData = res.data;
      });
    },

    deletePost(id) {

      axios.delete(this.urlProfile + "/" + id).then((res) => {
        this.getDataProfile();
        console.log(this.profile);
        console.log(res);
        console.log(this.profileData);
      });
    },
    submitPost() {
      if (this.postCommentUser) {
        axios
          .post(this.urlProfile, {
            firstname: this.firstnameInput,
            lastname: this.lastnameInput,
            postFormUser: this.postCommentUser,
          })
          .then((res) => {
            console.log(res);
            const data = res.data;
            this.profileData = [...this.profileData, data];
            console.log(this.profileData);
            this.postCommentUser = "";
          });
      }
    },
    submitForm() {
    
      this.showRegisterForm();
      this.invalidName();
      
    },
    showRegisterForm() {
      if (this.firstnameInput && this.lastnameInput ) {
        this.showNameInput = false;
        this.showPost();
      } else {
        this.showNameInput = true;
      }
    },
    invalidName() {
      if (this.firstnameInput === "" && this.lastnameInput === "") {
        (this.invalidFirstname = true), (this.invalidLastname = true);
      } else {
        (this.invalidFirstname = false), (this.invalidLastname = false);
      }
    },
    showPost() {
      this.showPostInput = true;
    },
  },
  async created() {
    this.profileData = await this.fetchDataProfile();
  },
};
</script>
