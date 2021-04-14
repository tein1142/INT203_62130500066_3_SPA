<template>
  <base-navbar />
  <div class="text-center">
    <h1>Register</h1>
    <p>Please fill in this form to create an account.</p>
    <hr />
    <form @submit.prevent="submitRegister" id="submitForm">
      <div class="boxregister">
        <label for="email"><b>Email</b></label>
        <base-input
          patternValue="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
          type="text"
          label="Enter Email"
          nameValue="email"
          idValue="email"
          v-model.trim="emailRegister"
        />

        <p v-if="invalidEmailInput" class="text-red-600">
          Please Enter Your Email
        </p>
        <p v-if="changeEmail" class="text-red-600">
          Please Change Your Email
        </p>

        <label for="psw"><b>Password</b></label>

        <base-input
          patternValue=".{6,}"
          type="password"
          label="Enter Password"
          nameValue="password"
          idValue="password"
          v-model.trim="pswRegister"
        />

        <p v-if="invalidPasswordInput" class="text-red-600">
          Please Enter Your Password
        </p>

        <label for="psw-repeat"><b>Repeat Password</b></label>

        <base-input
          patternValue=".{6,}"
          type="password"
          label="Enter Password"
          nameValue="password"
          idValue="password"
          v-model.trim="rePswRegister"
        />
        <p v-if="invalidRepeatPassword" class="text-red-600">
          Repeat Your Password
        </p>

        <label for="questionForgotPass"
          ><b>Select a questions for forgetting your password</b></label
        >

        <!-- <p>{{ questionForgotPass }}</p>
        <p>{{ answerForgotPass }}</p> -->
        <div class="inputField">
          <select v-model="questionForgotPass">
            <option disabled value="">Please select one</option>
            <option>What animal do you like</option>
            <option>What is the name of your old high school</option>
            <option>What do you like to eat</option>
          </select>

          <base-input
            type="text"
            patternValue=".{3,}"
            label="Enter Answer"
            v-model.trim="answerForgotPass"
          />
        </div>

        <hr />

        <button type="submit" class="registerbtn">Register</button>
      </div>
    </form>

    <div class="login">
      <p>Already have an account? <a href="/Login">Login</a>.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",

  data() {
    return {
      urlRegisterData: "http://localhost:5000/registerData",
      emailRegister: "",
      pswRegister: "",
      rePswRegister: "",
      questionForgotPass: "",
      answerForgotPass: "",
      changeEmail: false,
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
      this.invalidEmailInput = this.emailRegister === "" ? true : false;
      this.invalidPasswordInput = this.pswRegister === "" ? true : false;
      this.invalidRepeatPassword =
        this.rePswRegister === "" || this.pswRegister != this.rePswRegister
          ? true
          : false;
      // console.log(this.registerData)

      for (let prop in this.registerData) {
        console.log(this.registerData[prop]);
        if (this.emailRegister === this.registerData[prop].emailRegister) {
          return;
        }else {
          this.changeEmail = true;
        }
            
        
      }

      if (
        this.questionForgotPass != ""&&
        this.answerForgotPass != "" &&
        this.emailRegister != "" &&
        this.pswRegister != "" &&
        this.rePswRegister != "" &&
        this.pswRegister === this.rePswRegister
      ) {
        const data = axios
          .post(this.urlRegisterData, {
            questionForgotPass: this.questionForgotPass,
            answerForgotPass: this.answerForgotPass,
            emailRegister: this.emailRegister,
            pswRegister: this.pswRegister,
            rePswRegister: this.rePswRegister,

          })
          .then((response) => {
            console.log(response);
            window.location.href = "/login";
          });
        return data;
      } else {
        
        console.log("Can't use this username");
        // window.location.href = '/'
      }

      // console.log("invalidEmail: " + this.invalidEmailInput);
      // console.log("email: " + this.emailRegister);
    },
  },
  async created() {
    this.registerData = await this.fetchDataRegis();
  },
};
</script>
