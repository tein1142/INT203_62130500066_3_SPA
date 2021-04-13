<template>
  <div class="text-center">
    <h1>Login</h1>
    <p>Please fill in this form to Login your account.</p>
    <hr />
    <form @submit.prevent="submitLogin">
      <div class="boxregister">
        <label for="email"><b>Email</b></label>
        <input
        pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
          type="text"
          placeholder="Enter Email"
          name="email"
          id="email"
          v-model.trim="emailRegister"
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
          v-model.trim="pswRegister"
        />
        <p v-if="invalidPasswordInput" class="text-red-600">
          Please Enter Your Password
        </p>
        <hr />

        <button type="submit" class="registerbtn">Login</button>

        <p v-if="invalidUsernameOrPass" class="text-red-600">
          Username or Password is Wrong
        </p>
      </div>
    </form>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  data() {
    return {
      urlRegisterData: "http://localhost:5000/registerData",
      emailRegister: "",
      pswRegister: "",
      invalidUsernameOrPass: false,
      invalidEmailInput: false,
      invalidPasswordInput: false,
      registerData: [{}],
    };
  },
  methods: {
    async fetchDataRegis() {
      const res = await fetch(this.urlRegisterData);
      const data = await res.json();
      return data;
    },
    submitLogin() {
      this.invalidEmailInput = this.emailRegister === "" ? true : false;
      this.invalidPasswordInput = this.pswRegister === "" ? true : false;

      for (let prop in this.registerData) {
        console.log(this.registerData[prop])
        if (
          this.emailRegister === this.registerData[prop].emailRegis &&
          this.pswRegister === this.registerData[prop].pswRegis

        ) {
          console.log("Login Sucsess.");
          window.location.href = '/jjcry'
        }else{
          this.invalidUsernameOrPass = true
        }
      }

    },
    checkUernameOrPass(){
      this.invalidUsernameOrPass = true;
          console.log("Login Failed.");
         console.log(this.invalidUsernameOrPass);
    }
  },
  async created() {
    this.registerData = await this.fetchDataRegis();
  },
};
</script>
