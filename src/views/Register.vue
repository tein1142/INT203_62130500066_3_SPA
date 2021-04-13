<template>
  <div class="text-center">
    <h1>Register</h1>
    <p>Please fill in this form to create an account.</p>
    <hr />
    <form @submit.prevent="submitRegister">
      <div class="boxregister">
        <label for="email"><b>Email</b></label>
        <input
          pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
          type="text"
          placeholder="Enter Email"
          name="email"
          id="email"
          v-model.trim="emailRegis"
        />
        <p v-if="invalidEmailInput" class="text-red-600">
          Please Enter Your Email
        </p>

        <label for="psw"><b>Password</b></label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          id="psw"
          v-model.trim="pswRegis"
        />
        <p v-if="invalidPasswordInput" class="text-red-600">
          Please Enter Your Password
        </p>

        <label for="psw-repeat"><b>Repeat Password</b></label>
        <input
          type="password"
          placeholder="Repeat Password"
          name="psw-repeat"
          id="psw-repeat"
          v-model.trim="rePswRegis"
        />
        <p v-if="invalidRepeatPassword" class="text-red-600">
          Repeat Your Password
        </p>

        <hr />
        <p>
          By creating an account you agree to our
          <a href="#">Terms & Privacy</a>.
        </p>

        <button type="submit" class="registerbtn">Register</button>
      </div>
    </form>

    <div class="signin">
      <p>Already have an account? <a href="/Login">Sign in</a>.</p>
    </div>
  </div>
</template>

<script>
// import Vue from "vue";
import axios from "axios";
// import VueAxios from "vue-axios";
// Vue.use(VueAxios, axios);
export default {
  data() {
    return {
      urlRegisterData: "http://localhost:5000/registerData",
      emailRegis: "",
      pswRegis: "",
      rePswRegis: "",
      invalidEmailInput: false,
      invalidPasswordInput: false,
      invalidRepeatPassword: false,
      registerData: [{}],
    };
  },
  methods: {
    async fetchDataRegis() {
      const res = await fetch(this.urlRegisterData);
      const data = await res.json();
      return data;
    },
    submitRegister() {
      this.invalidEmailInput = this.emailRegis === "" ? true : false;
      this.invalidPasswordInput = this.pswRegis === "" ? true : false;
      this.invalidRepeatPassword =
        this.rePswRegis === "" || this.pswRegis != this.rePswRegis
          ? true
          : false;
      // console.log(this.registerData)

      for (let prop in this.registerData) {
        console.log(this.registerData[prop]);
        if (this.emailRegis === this.registerData[prop].emailRegis) {
            return ;
        }
      }

      if (
        this.emailRegis != "" &&
        this.pswRegis != "" &&
        this.rePswRegis != "" && this.pswRegis === this.rePswRegis
      ) {
        const data = axios
          .post(this.urlRegisterData, {
            emailRegis: this.emailRegis,
            pswRegis: this.pswRegis,
            rePswRegis: this.rePswRegis,
          })
          .then((response) => {
            console.log(response);
             window.location.href = '/login'
          });
        return data;
      } else {
        console.log("Can't use this username");
        // window.location.href = '/'
      }

      console.log("invalidRepeatPass: " + this.invalidRepeatPassword);
    },
  },
  async created() {
    this.registerData = await this.fetchDataRegis();
  },
};
</script>
